import { helpers, minValue, maxValue } from 'vuelidate/lib/validators'

const validFields = ['required', 'minLength', 'maxValue', 'format', 'unique', 'password', 'minValue', 'userCount', 'exists']

export default {
  required(field) {
    return helpers.withParams(
      { errMsg: `${field} field is required` },
      data => helpers.req(data)
    )
  },
  minValue(field, min) {
    return helpers.withParams(
      { errMsg: `Minimum ${field} required is ${min}` },
      minValue(min)
    )
  },
  maxValue(field, max) {
    return helpers.withParams(
      { errMsg: `Maximum ${field} required is ${max}` },
      maxValue(max)
    )
  },
  minLength(field, length) {
    return helpers.withParams(
      { errMsg: `${field} must be at least ${length} characters` },
      data => data && data.length >= length
    )
  },
  nameFormat(field) {
    return helpers.withParams(
      { errMsg: `${field} can only contain letters` },
      (name) => {
        if (name === '') { return true }
        const regExp = /[±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]/g
        return !regExp.test(name)
      }
    )
  },
  emailFormat() {
    return helpers.withParams(
      { errMsg: 'Email must be valid format' },
      (email) => {
        if (email === '') { return true }
        const regExp = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g
        return regExp.test(email)
      }
    )
  },
  usernameFormat() {
    return helpers.withParams(
      { errMsg: 'Username must contain at least 2 numbers and no symbols' },
      (username) => {
        const digitMatches = username.match(/\d/g)     
        const reg = new RegExp(/[±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]+/)
        const includesSymbol = reg.test(username)

        if (digitMatches && digitMatches.length >= 2 && !includesSymbol) {
          return true
        } else {
          return false
        }
      }
    )
  },
  usernameUnique() {
    return helpers.withParams(
      { errMsg: 'Username already exists' },
      async (username, vm) => {
        if (username === '' || !vm.$v.username.format || !vm.$v.username.minLength) {
          return true
        }

        try {
          const { data } = await vm.$UserApi.isUserNameUnique(username)
          return data.unique
        } catch (err) {
          return false
        }
      }
    )
  },
  passwordFormat() {
    return helpers.withParams(
      { errMsg: 'Password must contain at least 1 lower & uppercase letter, number, special character and be at least 8 characters' },
      (password) => {
        if (password === '') { return true }
        const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/g
        return regExp.test(password)
      }
    )
  },
  groupNameFormat() {
    return helpers.withParams(
      { errMsg: 'Group name must contain no symbols or spaces' },
      (groupName) => {
        const reg = new RegExp(/[±!@£$%^&*_+§¡€#¢§¶•ªº«\/\\<>?:;|=.,\s]/)
        return !reg.test(groupName)
      }
    )
  },
  userCount() {
    return helpers.withParams(
      { errMsg: 'You can only add a maximum of 9 people to your group' },
      (users, vm) => {
        if (vm.verifiedUser.length > 0) {
          return users.length !== 9
        } else {
          return true
        }
      }
    )
  },
  userExists() {
    return helpers.withParams(
      { errMsg: 'User already exists in verified users below' },
      (newUser, vm) => {
        return vm.verifiedUsers.filter(user => newUser === user).length === 0
      }
    )
  },
  createErrorMessages(val) {
    const messages = []

    for (const key in val) {
      if (!val[key] && validFields.includes(key)) {
        messages.push(val.$params[key].errMsg)
        break
      }
    }
    return messages
  }
}
