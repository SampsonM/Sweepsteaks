<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
}

#app {
  font-family: $font, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url('./assets/img/wood.svg') no-repeat fixed center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
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
