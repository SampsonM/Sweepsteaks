import validationHelpers from '../helpers/validations'

export function signUpValidations() {
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
      unique: validationHelpers.usernameUnique()
    },
    password: {
      required: validationHelpers.required('Password'),
      minLength: validationHelpers.minLength('Password', 8),
      password: validationHelpers.passwordFormat()
    }
  }
}

export function updateUserSettingsValidations() {
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
    }
  }
}

export function updateGroupSettingsValidations() {
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
    }
  }
}

export function joinGroupValidations() {
  return {
    groupId: {
      required: validationHelpers.required('Group ID')
    }
  }
}
