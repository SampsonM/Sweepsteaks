<template>
  <form class="sign-up">

    <MyInput
      label="First name:"
      name="firstName"
      placeholder="First Name"
      @input="handleFirstNameInput"
      :class="{ 'error' : $v.firstName.$error }"
      :hasError="$v.firstName.$error">
    </MyInput>

    <MyInput
      label="Last name:"
      name="lastName"
      placeholder="Last name"
      @input="handleLastNameInput"
      :class="{ 'error' : $v.lastName.$error }"
      :hasError="$v.lastName.$error">
    </MyInput>
    
    <MyInput
      label="Email:"
      name="email"
      placeholder="Email"
      @input="handleEmailInput"
      :class="{ 'error' : $v.email.$error }"
      :hasError="$v.email.$error">
    </MyInput>
   
    <MyInput
      label="Username:"
      name="username"
      placeholder="Username"
      @input="handleUsernameInput"
      :class="{ 'error' : $v.username.$error }"
      :hasError="$v.username.$error">
    </MyInput>
   
    <MyInput
      label="Password:"
      name="password"
      placeholder="Password"
      type="password"
      @input="handlePasswordInput"
      :class="{ 'error' : $v.password.$error }"
      :hasError="$v.password.$error">
    </MyInput>

    <button class="sign-up__btn" @click.prevent="signup">
      <p>Sign-up</p>
    </button>
  </form>
</template>

<script>
import MyInput from '../components/input.vue'
import { required } from 'vuelidate/lib/validators'
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
      password: ''
    }
  },
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required },
    username: { required },
    password: { required }
  },
  methods: {
    signup() {
      if (!this.$v.$error) {
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        }

        UserAPI.createUser(userData)
          .then(res => {
            console.log(res.data.user)
            // set cookie here to update user auth header and cookie
            // set logged in to true and send user to dashboard
          })
      }
    },
    handleFirstNameInput(firstName) {
      this.firstName = firstName
      this.$v.firstName.$touch()
    },
    handleLastNameInput(lastName) {
      this.lastName = lastName
      this.$v.lastName.$touch()
    },
    handleEmailInput(email) {
      this.email = email
      this.$v.email.$touch()
    },
    handleUsernameInput(username) {
      this.username = username
      this.$v.username.$touch()
    },
    handlePasswordInput(password) {
      this.password = password
      this.$v.password.$touch()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_vars.scss";

.sign-up {
  display: flex;
  flex-direction: column;
  width: 96vw;
  max-width: 800px;
  position: relative;
  top: 10px;
  margin: 0 auto;
  background: #ffd760;
  border-radius: 4px;
  padding: 15px 10px;

  @include breakpoint(tablet) {
    padding: 20px;
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
</style>
