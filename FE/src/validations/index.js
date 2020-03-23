import validationHelpers from '../helpers/validations'

export const signUpValidations = {
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

export const loginValidations = {
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
