<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/_vars.scss";
@import "./styles/_mixins.scss";

* {
  margin: 0;
}

#app {
  font-family: $font, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url('./assets/wood.svg') no-repeat fixed center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  a {
    font-weight: bold;
    color: $dark-blue;
    text-decoration: none;
    &.router-link-exact-active {
      color: $light-blue;
    }
  }

  @include breakpoint(tablet) {
    justify-content: flex-end;
    font-size: 1.5em;
  }
}
</style>
