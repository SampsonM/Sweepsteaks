import { helpers } from 'vuelidate/lib/validators'
import UserAPI from '../services/api/userApi'

const validFields = ['required', 'minLength', 'format', 'unique']

export default {
	required(field) {
		return helpers.withParams(
			{ type: 'required', errMsg: `${field} field is required` },
			data => helpers.req(data)
		)
	},
	minLength(field, length) {
		return helpers.withParams(
			{ type: 'minLength', errMsg: `${field} must be atleat ${length} characters` },
			data => data.length >= length
		)
	},
	emailFormat() {
		return helpers.withParams(
			{ type: 'format', errMsg: 'Email must be valid format' },
			email => {
				if (email === '') return true
				const regExp = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g
				return regExp.test(email)
			}
		)
	},
	usernameFormat() {
		return helpers.withParams(
			{ type: 'format', errMsg: 'Username must contain atleast 2 numbers and be atleast 6 characters' },
			username => {
				const reg = new RegExp(/[0-9]{2}/)
				return reg.test(username)
			}
		)
	},
	usernameUnique() {
		return helpers.withParams(
			{ type: 'unique', errMsg: 'Username already exists, please choose another' },
			async username => {
				if (username === '') return true
				const { data } = await UserAPI.isUserNameUnique(username)
				return data.unique
			}
		)
	},
	passwordFormat() {
		return helpers.withParams(
			{ type: 'format', errMsg: 'Password must contain atleast 1 lower & uppercase letter, number, special character and be atleast 8 characters' },
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
