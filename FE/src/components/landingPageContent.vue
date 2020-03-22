<template>
	<main class="landing-content">
		<transition name="signup-slide-in">
			<SignupForm v-if="signUpOpen">
			</SignupForm>
		</transition>

		<section class="main-content">
			<h1 class="main-content__title">Sweep Steaks</h1>

			<h2 class="main-content__sub-title">
				Free online sweepstakes for you and your mates, 
				set up a group sweeptakes for the horses, 
				World Cup or Premier League!
			</h2>
		</section>

		<MyButton
			v-if="!signUpOpen"
			@click="openSignUp">
			Sign up
		</MyButton>
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
	width: 95%;
	height: 100%;
	margin: 10px auto 10px auto;
	background: rgba($yellow, 0.6);
	backdrop-filter: blur(4px);
	border-radius: 5px;
}

.main-content {
	height: 80%;
	padding: 10px;

	&__title {
		padding: 15px 0 5px 0;
	}

	&__sub-title {
		padding-left: 5px;
	}
}

.signup-slide-in-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.signup-slide-in-enter, .signup-slide-in-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

</style>
