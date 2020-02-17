<template>
  <div id="sweep-steaks">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
}

#sweep-steaks {
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
</style>
