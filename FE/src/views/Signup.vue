<template>
  <form class="sign-up">

    <fieldset>
      <label for="firstName">First name:</label>
      <input
        v-model="firstName"
        name="firstName"
        type="text"
        placeholder="First name">
    </fieldset>

    <fieldset>
      <label for="lastName">Last name</label>
      <input
        v-model="lastName"
        name="lastName"
        type="text"
        placeholder="Last name">
    </fieldset>

    <fieldset>
      <label for="email">Email</label>
      <input
        v-model="email"
        name="email"
        type="text"
        placeholder="Email">
    </fieldset>
    
    <fieldset>
      <label for="username">Username:</label>
      <input
        v-model="username"
        name="username"
        type="text"
        placeholder="Username">
    </fieldset>
    
    <fieldset>
      <label for="password">Password</label>
      <input
        class="sign-up__password"
        v-model="password"
        name="password"
        type="text"
        placeholder="Password">
    </fieldset>

    <button class="sign-up__btn" @click.prevent="signup">
      <p>Sign-up</p>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      
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

  fieldset {
    width: 100%;
    margin-bottom: 15px;
    padding: 0;
    border: none;
  }

  label {
    float: left;
    color: #2c2c2c;
    top: 12px;
    position: relative;
  }

  input {
    float: right;
    width: 70%;
    max-width: 320px;
    height: 45px;
    border-radius: 4px;
    border: none;
    padding: 5px;
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
