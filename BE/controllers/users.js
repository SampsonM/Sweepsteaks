'use strict'
import { Group, User } from '../models/index'
import passport from 'passport'
import { userNameQuery, userDeleteQuery } from '../config/mongoQueries'

// GET user
async function getUserData(req, res, next) {
  const username = req.params.user_name
  const userId = req.user.id

  if (username === 'unique') {
    return next()
  }

  try {
    const user = await User.findOne({ _id: req.user.id }, userNameQuery)
      .populate('name')
  
    if (`${userId}` !== `${user._id}`) {
      return res.status(404).json({err:'Not your account'})
    
    } else {
      const groups = await populateUsersGroups(user)

      const userData = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        sweepsWon: user.sweepsWon,
        name: user.name,
        groups
      }
      
      return res.status(200).send({ user: userData })
    }


  } catch (err) {
    return res.status(404).json({err:'Invalid username.'})
  }
}

// GET check is username is unique
function isUserNameUnique(req, res, next) {
  const username = req.params.user_name

  return User.findOne({ username: username })
    .lean()
    .then(user => {
      user._id = undefined
      res.status(200).json({ msg: 'Username already exists', unique: false })
    })
    .catch(() => {
      res.status(200).json({ msg: 'Username available', unique: true })
    })
}

// GET checks if user is currently logged in
async function getUserLoginState(req, res, next) {
  if (req.user.id) {
    try {
      const user = await User.findById(req.user.id)
      const groups = await populateUsersGroups(user)

      const userData = {
        ...user.toAuthJSON(),
        groups
      }
      
      return res.status(200).send({ user: userData })

    } catch(err) {
      return res.status(500).send({ err: 'error getting user in get user login state' })
    }
      
  } else {
    return res.status(409).send({err: 'User not signed in.'})
  }
}

// GET Log user out
async function logUserOut(req, res, next) {
  if (req.user.id) {
    try {
      const user = await User.findById(req.user.id)
  
      return res.status(200).send({ user: user.unauthUser() })
    } catch (err) {
      return res.status(404).send('User not found')
    }
  } else {
    return res.status(409).send('User not signed in.')
  }
}

// POST new user 
function createUser(req, res, next) {
  let userData = req.body.userData && JSON.parse(req.body.userData)

  if (userData && Object.keys(userData).length > 0) {
    const validationErr = userDataValid(userData)
    if (validationErr) return res.status(400).send(validationErr)

    passport.authenticate('local', (err, user) => {

      if (err && err.split(' ')[0] !== 'Username') {
        return res.status(404).send(err)
      } else if (!user) {

        const newUser = new User(userData)
        newUser.setHash(userData.password)

        return newUser.save()
          .then(user => res.status(201).send({ user: user.toAuthJSON() }))
          .catch(err => res.status(400).send(err.errors))

      } else if (user) {
        return res.status(409).send(err)
      }

    })(req, res, next)
  } else {
    return res.status(404).send('No userData attached to body')
  }
}

// POST existing user login
async function logUserIn(req, res, next) {
  passport.authenticate('local', async (err, user) => {
    if (err) {
      return res.status(404).send(err)
    }

    if (!user) {
	  	return res.status(401).send('User does not exist')
    }

    const groups = await populateUsersGroups(user)

    const userData ={
      ...user.toAuthJSON(),
      groups
    }

    return res.status(200).send({ user: userData })
	})(req, res, next)
}

// update user
async function updateUser(req, res, next) {
  const id = req.params.user_id
  const userData = req.body

  if (id && Object.keys(userData).length > 0) {
    try {
      const user = await User.findByIdAndUpdate(id, {$set: userData}, {new: true})
      user.hash = undefined
      user.salt = undefined

      return res.status(200).send(user)

    } catch(err) {
      return res.status(404).send(err)
    }
  } else {
    res.status(400).send('No user data found')
  }
}

// delete user
function deleteUser(req, res, next) {
  const id = req.params.user_id

  if (id) {
    return User.findByIdAndDelete(id, userDeleteQuery)
      .then(user => {
        user.hash = undefined
        user.salt = undefined
        user.email = undefined
        return res.status(200).send(user)
      })
      .catch(err => {
        res.status(400).send('User not found')
      })
  } else {
    return res.status(400).send('No user_id provided')
  }
}

function userDataValid(userData) {
  const { firstName, lastName, username, email, password } = userData

  if (!firstName || firstName.length < 2 || firstName.match(/[^A-z]/g)) {
    return 'First name must be at least 2 characters and be alphabetical characters only'
  }

  if (!lastName || lastName.length < 2 || lastName.match(/[^\w\d]/g)) {
    return 'Last name must be at least 2 characters and be alphabetical characters only'
  }

  if (!email || !email.match(/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g)) {
    return 'Email must be a valid format'
  }
  
  if (!username || username.length < 3 || username.length > 12) {
    return 'Username must be between 3 and 12 characters'
  }

  // Password requires at least:
  // 1 lower case character
  // 1 upper case character
  // 1 number
  // 8 characters min
  if (!password || !password.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/g) || password.length < 8 || password.length > 20) {
    return 'Password must contain at least 1 lower & uppercase letter, 1 number and be at least 8 characters'
  }
}

async function populateUsersGroups(user) {
  const groups = []
  
  for (let i = 0; i < user.groups.length; i++) {
    const group = await Group.findById(user.groups[i]).populate('users').populate('createdBy')
    const users = group.users.map(u => u.username)
    const verifiedUsers = user.username === group.createdBy.username ? group.verifiedUsers : null

    groups.push({
      createdBy: group.createdBy.username,
      name: group.name,
      users,
      id: group.id,
      verifiedUsers
    })
  }

  return groups
}

module.exports = {
  getUserData,
  isUserNameUnique,
  logUserOut,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  getUserLoginState
}
