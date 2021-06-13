import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {
  signUpValidations, loginValidations, createGroupValidations, joinGroupValidations, updateUserSettingsValidations, updateGroupSettingsValidations
} from '@/validations'

Vue.use(Vuelidate)

export default function (_, inject) {
  inject('SignUpValidations', signUpValidations())
  inject('LoginValidations', loginValidations())
  inject('CreateGroupValidations', createGroupValidations())
  inject('JoinGroupValidations', joinGroupValidations())
  inject('UpdateUserSettingsValidations', updateUserSettingsValidations())
  inject('UpdateGroupSettingsValidations', updateGroupSettingsValidations())
}
