import validationHelpers from '../helpers/validations'

export function signUpValidations($UserApi) {
  return {
    firstName: {
      required: validationHelpers.required('First name'),
      minLength: validationHelpers.minLength('First name', 2),
      format: validationHelpers.nameFormat('First name')
    },
    lastName: {
      required: validationHelpers.required('Last name'),
      minLength: validationHelpers.minLength('Last name', 2),
      format: validationHelpers.nameFormat('Last name')
    },
    email: {
      required: validationHelpers.required('Email'),
      format: validationHelpers.emailFormat()
    },
    username: {
      required: validationHelpers.required('Username'),
      minLength: validationHelpers.minLength('Username', 6),
      format: validationHelpers.usernameFormat(),
      unique: validationHelpers.usernameUnique($UserApi)
    },
    password: {
      required: validationHelpers.required('Password'),
      minLength: validationHelpers.minLength('Password', 8),
      password: validationHelpers.passwordFormat()
    }
  }
}

export function loginValidations() {
  return {
    username: {
      required: validationHelpers.required('Username'),
      minLength: validationHelpers.minLength('Username', 6),
      format: validationHelpers.usernameFormat()
    },
    password: {
      required: validationHelpers.required('Password'),
      minLength: validationHelpers.minLength('Password', 8),
      password: validationHelpers.passwordFormat()
    }
  }
}

export function createGroupValidations() {
  return {
    groupName: {
      required: validationHelpers.required('Group name'),
      minLength: validationHelpers.minLength('Group name', 6),
      format: validationHelpers.groupNameFormat()
    },
    verifiedUser: {
      format: validationHelpers.emailFormat(),
      exists: validationHelpers.userExists()
    },
    verifiedUsers: {
      userCount: validationHelpers.userCount(),
    },
    wager: {
      required: validationHelpers.required('Wager'),
      minValue: validationHelpers.minValue('wager', 2),
      maxValue: validationHelpers.maxValue('wager', 50)
    }
  }
}
