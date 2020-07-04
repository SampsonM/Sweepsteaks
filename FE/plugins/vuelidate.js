import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { signUpValidations, loginValidations, createGroupValidations } from '@/validations'

Vue.use(Vuelidate)

export default function(_, inject) {
  inject('SignUpValidations', signUpValidations())
  inject('LoginValidations', loginValidations())
  inject('CreateGroupValidations', createGroupValidations())
}
