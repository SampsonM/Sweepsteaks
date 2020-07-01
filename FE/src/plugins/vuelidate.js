import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { signUpValidations, loginValidations, createGroupValidations } from '@/validations'

Vue.use(Vuelidate)

export default function({ app }, inject) {
  inject('SignUpValidations', signUpValidations(app.$UserApi))
  inject('LoginValidations', loginValidations())
  inject('CreateGroupValidations', createGroupValidations())
}
