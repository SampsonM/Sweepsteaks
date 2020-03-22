<template>
  <form
    id="signup"
    class="sign-up"
    autocomplete="on"
    v-if="!allwd">

    <MyInput
      v-for="field in formFields"
      :key="field.label"
      :label="field.label"
      :name="field.name"
      :type="field.type"
      :hint="field.hint"
      @blur="(val) => handleInput(field.name, val)"
      :class="`${field.name}-input`"
      :hasError="$v[field.errClass].$error"
      :errMessage="fieldErr(field.name)">
    </MyInput>

    {{ firstServerError }}

    <MyButton @click.prevent="handleSignup">
      Sign-up
    </MyButton>
  </form>
</template>

<script>
import MyInput from '@/components/input.vue'
import MyButton from './button'
import { mapActions, mapGetters, mapState } from 'vuex'
import { signUpValidations } from '@/validations'
import validationHelpers from '@/helpers/validations'

export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      formFields: [
        {
          name: 'firstName',
          label: 'First name',
          errClass: 'firstName'
        },
        {
          name: 'lastName',
          label: 'Last name',
          errClass: 'lastName'
        },
        {
          name: 'email',
          label: 'Email',
          errClass: 'email'
        },
        {
          name: 'username',
          label: 'Username',
          hint: 'Must be at least 6 characters and include 2 numbers',
          errClass: 'username'
        },
        {
          name: 'password',
          label: 'Password',
          hint: 'Password must contain 1 lower & uppercase letter, 1 number and be between 8-20 characters',
          errClass: 'password',
          type: 'password'
        }
      ]
    }
  },
  validations: signUpValidations,
  methods: {
    ...mapActions(['signup']),
    async handleSignup() {
      await this.$v.$touch()

      if (!this.$v.$error) {
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        }

        this.signup(userData)
      }
    },
    handleInput(field, value) {
      this[field] = value
      this.$v[field].$touch()
    },
    fieldErr(field) {
      return validationHelpers.createErrorMessages(this.$v[field])[0]
    }
  },
  computed: {
    ...mapGetters([
      'firstServerError'
    ]),
    ...mapState([
      'allwd'
    ])
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
  .firstName-input,
  .lastName-input {
    max-width: 100%;

    @include breakpoint(tablet) {
      margin: 0 0 20px 0;
      max-width: 48%;
      display: inline-block;
    }
  }

  .firstName-input {
    margin-right: 14px;
  }
}

.error {
  input {
    border-color: red;
  }
}
</style>
