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
    <button @click="logUserIn">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    logUserIn() {
      this.$store.dispatch('logUserIn', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
