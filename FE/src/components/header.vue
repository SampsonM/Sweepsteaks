<template>
	<nav class="menu">
		<font-awesome-icon
			class="menu__menu-btn"
			icon="bars"
			@click="toggleMenu" />

		<div :class="['menu__ctas', {'menu__ctas--open' : menuOpen}]"
			v-if="$sweepAccessAllowed">

			<font-awesome-icon
				class="menu__close-btn"
				icon="times-circle"
				@click="toggleMenu" />

			<button class="menu__ctas-login">
				<router-link to="/login">Login</router-link>
			</button>

			<button class="menu__ctas-sign-up">
				<router-link to="/signup">Sign-up</router-link>
			</button>
		</div>
	</nav>
</template>
<script>
export default {
	name: 'menu',
	data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
<style lang="scss">
.menu {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;

  &__menu-btn {
    z-index: 10;
    color: $red;
    float: right;
    font-size: 23px;
  }

  &__close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $red;
    font-size: 26px;
  }

  &__ctas {
    z-index: 10;
    position: absolute;
    width: 100%;
    margin-right: -100%;
    height: 100vh;
    top: 0;
    right: 0;
    padding: 20px;
    color: white;
    background-color: $yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;

    &--open {
      margin-right: 0;
      transition: 0.5s;
    }
  }
  
  &__ctas-login {
    height: 45px;
    width: 100px;
    background-color: #ff8d8d;
    border-radius: 5px;
    transition-duration: 200ms;
    margin-bottom: 10px;

    &:hover,
    :active,
    :focus {
      background-color: #fda0a0;
      outline: none !important;
      border:1px solid #2d69ad;

      a {
        text-decoration: underline;
      }
    }

    a {
      font-family: $font;
      font-size: 16px;
      font-weight: 500;
      color: #2d69ad;
      text-decoration: none;
    }
  }

  &__ctas-sign-up {
    height: 45px;
    width: 100px;
    background-color: #2d69ad;
    border-radius: 5px;
    transition-duration: 200ms;

    &:hover,
    :active,
    :focus {
      background-color: #5684b8;
      outline: none !important;
      border: 1px solid #ff8d8d;

      a {
        text-decoration: underline;
      }
    }

    a {
      font-family: $font;
      font-size: 16px;
      font-weight: 500;
      color: #ff8d8d;
      text-decoration: none;
    }
  }
}
</style>