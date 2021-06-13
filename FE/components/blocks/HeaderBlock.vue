<template>
	<header class="header">
		<div class="header__container">
			<nuxt-link
				to="/"
				:event="allwd ? '' : 'click'"
				:class="['header__logo', { 'header__logo--no-click': allwd }]">
				<img
					itemprop="logo"
					class="header__logo-brush"
					alt="Sweepsteaks"
					src="../../assets/icons/broom.svg"
				/>
				<img
					itemprop="logo"
					class="header__logo-steak"
					alt="Sweepsteaks"
					src="../../assets/icons/meat.svg"
				/>
				<img
					itemprop="logo"
					class="header__logo-steak"
					alt="Sweepsteaks"
					src="../../assets/icons/meat.svg"
				/>
			</nuxt-link>

			<div class="header__ctas">
				<nuxt-link 
					v-if="!allwd && $route.name !== 'login'"
					class="my-button my-button--cta-1"
					to="/login">
					Login
				</nuxt-link>

				<nuxt-link
					v-if="allwd && ($route.name == 'index' || $route.name === 'settings')"
					class="my-button my-button--cta-1"
					to="/dashboard">
					Dashboard
				</nuxt-link>

				<nuxt-link 
					v-if="allwd && $route.name == 'dashboard'"
					class="my-button my-button--cta-1"
					to="/settings">
					Settings
				</nuxt-link>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'HeaderBlock',
	computed: {
		...mapState(['allwd'])
	},
	methods: {
		...mapActions(['logout'])
	}
}
</script>

<style lang="scss">
.header {
	background: rgba($yellow, 0.6);
	backdrop-filter: blur(4px);
	min-height: 80px;
	display: flex;

	@include breakpoint(tablet) {
		min-height: 100px;
	}

	&__container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		max-width: 1450px;
		margin: 0 auto;
	}

	&__logo {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 0;
		height: 60px;
		width: 88px;

		&:focus {
			border: 2px solid $blue;
			border-radius: 9px;
		}

		@include breakpoint(tablet) {
			padding: 10px;
			height: 90px;
			width: 100px;
		}

		&--no-click {
			cursor: default;

			&:focus {
				border: none;
			}
		}
	}

	&__logo-brush {
		width: 60px;

		@include breakpoint(tablet) {
			width: 70px;
		}
	}

	&__logo-steak {
		position: absolute;
		bottom: 0;
		right: 30px;
		width: 40px;
		height: 30px;

		@include breakpoint(tablet) {
			bottom: 16px;
		}

		&:last-of-type {
			right: 10px;

			@include breakpoint(tablet) {
			}
		}
	}

	&__title {
		display: none;

		@include breakpoint(tablet) {
			display: inline;
		}
	}
}
</style>
