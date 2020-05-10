<template>
	<header class="header">
		<nuxt-link to="/" class="header__logo">
			<img
				itemprop="logo"
				class="header__logo-brush"
				alt="Sweepsteaks"
				src="../assets/icons/broom.svg"
			/>
			<img
				itemprop="logo"
				class="header__logo-steak"
				alt="Sweepsteaks"
				src="../assets/icons/meat.svg"
			/>
			<img
				itemprop="logo"
				class="header__logo-steak"
				alt="Sweepsteaks"
				src="../assets/icons/meat.svg"
			/>
		</nuxt-link>

		<div class="header__ctas">
			<nuxt-link
				v-if="!allwd && $route.name !== 'login'"
				tabindex="-1"
				to="/login"
			>
				<MyButton btn-style="cta-1">
					Login
				</MyButton>
			</nuxt-link>
			<nuxt-link tabindex="-1" to="/dashboard">
				<MyButton v-if="allwd" btn-style="cta-1">
					Dashboard
				</MyButton>
			</nuxt-link>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import MyButton from '@/components/button.vue'

export default {
	components: {
		MyButton
	},
	computed: {
		...mapState(['allwd'])
	}
}
</script>

<style lang="scss">
.header {
	position: relative;
	display: flex;
	background: rgba($yellow, 0.6);
	backdrop-filter: blur(4px);
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	min-height: 80px;

	@include breakpoint(tablet) {
		min-height: 100px;
		padding: 0 60px;
	}

	@include breakpoint(desktop) {
		padding: 0 110px;
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
