import { helpers } from 'vuelidate/lib/validators'
import UserAPI from '../services/api/userApi'

const validFields = ['required', 'minLength', 'format', 'unique', 'password']

export default {
	required(field) {
		return helpers.withParams(
			{ errMsg: `${field} field is required` },
			data => helpers.req(data)
		)
	},
	minLength(field, length) {
		return helpers.withParams(
			{ errMsg: `${field} must be atleat ${length} characters` },
			data => data.length >= length
		)
	},
	nameFormat(field) {
		return helpers.withParams(
			{ errMsg: `${field} can only contain letters` },
			name => {
				if (name === '') return true
				const regExp = /[±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]/g
				return !regExp.test(name)
			}
		)
	},
	emailFormat() {
		return helpers.withParams(
			{ errMsg: 'Email must be valid format' },
			email => {
				if (email === '') return true
				const regExp = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g
				return regExp.test(email)
			}
		)
	},
	usernameFormat() {
		return helpers.withParams(
			{ errMsg: 'Username must contain atleast 2 numbers and no symbols' },
			username => {
				const reg = new RegExp(/[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,][0-9]{2}/)
				return reg.test(username)
			}
		)
	},
	usernameUnique() {
		return helpers.withParams(
			{ errMsg: 'Username already exists' },
			async username => {
				if (username === '') return true
				const { data } = await UserAPI.isUserNameUnique(username)
				return data.unique
			}
		)
	},
	passwordFormat() {
		return helpers.withParams(
			{ errMsg: 'Password must contain atleast 1 lower & uppercase letter, number, special character and be atleast 8 characters' },
			password => {
				if (password === '') return true
				const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/g
				return regExp.test(password)
			}
		)
	},
	createErrorMessages(val) {
		const messages = []

		for (const key in val) {
			if (!val[key] && validFields.indexOf(key) !== -1) {
				messages.push(val.$params[key].errMsg)
				break
			}
		}
		return messages
	}
};
