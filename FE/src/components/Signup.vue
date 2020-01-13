<template>
  <form id="signup" class="sign-up" autocomplete="on">

    <h2 class="sign-up__title">Sign up</h2>

    <MyInput
      v-for="field in formFields"
      :key="field.label"
      :label="field.label"
      :name="field.name"
      :placeholder="field.placeholder"
      :type="field.type || 'text'"
      @blur="(val) => handleInput(field.name, val)"
      :class="{ 'error' : $v[field.errClass].$error }"
      :hasError="$v[field.errClass].$error"
      :error="$v[field.errClass]">
    </MyInput>

    <button class="sign-up__btn" @click.prevent="signup">
      <p>Sign-up</p>
    </button>
  </form>
</template>

<script>
import MyInput from '../components/input.vue'
import { required, minLength, email} from 'vuelidate/lib/validators'
import UserAPI from '../services/api/userApi'

export default {
  components: {
    MyInput
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
          placeholder: 'First Name',
          errClass: 'firstName'
        },
        {
          name: 'lastName',
          label: 'Last name',
          placeholder: 'Last Name',
          errClass: 'lastName'
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Email',
          errClass: 'email'
        },
        {
          name: 'username',
          label: 'Username',
          placeholder: 'Username',
          errClass: 'username'
        },
        {
          name: 'password',
          label: 'Password',
          placeholder: 'Password',
          errClass: 'username',
          type: 'password'
        }
      ]
    }
  },
  validations: {
    firstName: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
    email: { required, email },
    username: {
      required,
      minLength: minLength(4),
      isUnique: async (username) => {
        if (username === '') return true

        const { data } = await UserAPI.isUserNameUnique(username)  
        return data.unique
      }
    },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async signup() {
      await this.$v.$touch()

      if (!this.$v.$error) {
        // const userData = {
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   username: this.username,
        //   email: this.email,
        //   password: this.password
        // }

        // UserAPI.createUser(userData)
        //   .then(res => {
        //     console.log(res.data.user)
        //     set cookie here to update user auth header and cookie
        //     set logged in to true and send user to dashboard
        //   })
      }
    },
    handleInput(field, value) {
      this[field] = value
      this.$v[field].$touch()
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
  background: #ffd760;
  border-radius: 4px;
  padding: 15px;

  @include breakpoint(tablet) {
    padding: 20px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__btn {
    height: 45px;
    width: 100px;
    margin: 0 auto;
    background-color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;

    &:hover,
    :active,
    :focus {
      background-color: #fda0a0;
      outline: none !important;
      border:1px solid #2d69ad;

      p {
        text-decoration: underline;
      }
    }

    p {
      font-family: $font;
      font-size: 16px;
      font-weight: 500;
      color: #2d69ad;
      text-decoration: none;
    }
  }
}

.error {
  input {
    border-color: red;
  }
}
</style>
