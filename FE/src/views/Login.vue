<template>
  <div class="login">

    <label for="username">Username:</label>
    <input
      v-model="username"
      name="username"
      type="text"
      placeholder="Username">

    <label for="password">Password</label>
    <input
      v-model="password"
      name="password"
      type="text"
      placeholder="Password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('helloe', this.username)
      console.log('your password is', this.password)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
