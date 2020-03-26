<template>
  <div class="login">
    <Header />

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

      <MyButton 
        type="submit"
        class="login__submit"
        @click="logUserIn">
        Login
        <font-awesome-icon
          v-if="submitting"
          class="login__submit-loader"
          :icon="['fas','circle-notch']" />
      </MyButton>
    </form>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import MyButton from '@/components/button'
import MyInput from '@/components/input'
import { loginValidations } from '@/validations'
import validationHelpers from '@/helpers/validations'

export default {
  components: {
    Header,
    MyButton,
    MyInput
  },
  data() {
    return {
      username: '',
      password: '',
      submitting: false
    }
  },
  validations: loginValidations,
  methods: {
    async logUserIn(e) {
      e.preventDefault()

      if (!this.submitting && !this.$v.$error) {
        this.submitting = true
        this.$v.$touch()

        if (!this.$v.$error) {
          await this.$store.dispatch('logUserIn', {
            username: this.username,
            password: this.password
          })
        }
          
        this.submitting = false
      }
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
    margin-top: 90px;
  }

  &__submit-loader {
    color: $black;
    position: relative;
    right: -6px;
    animation: spin 1.1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
