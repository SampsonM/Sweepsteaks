import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { signUpValidations, loginValidations } from '@/validations'

Vue.use(Vuelidate)

export default function({ app, $axios, store }, inject) {
  inject('SignUpValidations', signUpValidations(app.$UserApi))
  inject('LoginValidations', loginValidations())
}
