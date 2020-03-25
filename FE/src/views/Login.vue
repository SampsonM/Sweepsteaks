<template>
  <div class="login">
    <form class="login__form">
      <MyInput
        label="Username"
        name="username"
        @blur="(val) => handleInput('username', val)"
        type="text"
        placeholder="Username"
        :hasError="$v.username.$error"
        :errMessage="fieldErr('username')">
      </MyInput>
      <MyInput
        label="Password"
        name="password"
        @blur="(val) => handleInput('password', val)"
        type="text"
        placeholder="Password"
        :hasError="$v.password.$error"
        :errMessage="fieldErr('password')">
      </MyInput>

      <MyButton @click="logUserIn">Login</MyButton>
    </form>
  </div>
</template>

<script>
import MyButton from '@/components/button'
import MyInput from '@/components/input'
import { loginValidations } from '@/validations'
import validationHelpers from '@/helpers/validations'

export default {
  components: {
    MyButton,
    MyInput
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  validations: loginValidations,
  methods: {
    logUserIn(e) {
      e.preventDefault()

      this.$store.dispatch('logUserIn', {
        username: this.username,
        password: this.password
      })
    },
    handleInput(field, value) {
      this[field] = value
      this.$v[field].$touch()
    },
    fieldErr(field) {
      return validationHelpers.createErrorMessages(this.$v[field])[0]
    }
  }
}
</script>

<style lang="scss">
.login {
  &__form {
    margin-top: 140px;
  }
}
</style>
