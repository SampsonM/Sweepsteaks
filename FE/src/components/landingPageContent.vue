<template>
	<main class="landing-content">
		<section class="main-content">
			Landing page content
		</section>

		<MyButton
			v-if="!signUpOpen"
			@click="openSignUp">
			Sign up?
		</MyButton>

		<transition name="slide-in">
			<SignupForm v-if="signUpOpen">
			</SignupForm>
		</transition>
	</main>
</template>

<script>
import SignupForm from '../components/Signup'
import MyButton from './button'

export default {
	components: {
		SignupForm,
		MyButton
	},
	data() {
		return {
			signUpOpen: false
		}
	},
	methods: {
		openSignUp() {
			this.signUpOpen = true
		}
	}
}
</script>

<style lang="scss">
.landing-content {
	padding-top: 40px;
}

.slide-in-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-in-enter, .slide-in-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

</style>
