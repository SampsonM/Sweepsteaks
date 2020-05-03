<template>
	<div class="sweep-steaks">
		<nuxt />
	</div>
</template>

<style lang="scss">
@import "@/assets/styles/_global.scss";

.sweep-steaks {
  font-family: $font, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url("~@/assets/img/wood.svg") no-repeat center top fixed;
  background-size: 310% auto;
  height: 100vh;
  min-width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;

  @include breakpoint(tablet) {
    height: 100%;
    background-size: cover;
  }
}
</style>
