<template>
	<main class="landing-content">
		<transition name="signup-slide-in">
			<SignupForm
				v-show="signUpOpen"
				@closeSignUp="closeSignUp">
			</SignupForm>
		</transition>

		<section class="main-content">
			<h1 class="main-content__title">Sweep Steaks</h1>

			<h2 class="main-content__sub-title">
				<span class="main-content__sub-title-sub-text">Sweepsteaks, Coming soon!!</span><br>
				Free online sweepstakes for you and your mates, 
				set up a group sweeptakes for the horses, 
				World Cup or Premier League!
			</h2>
		</section>

		<MyButton
			type="button"
			v-show="!signUpOpen"
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
		},
		closeSignUp(e) {
			e.preventDefault()
			this.signUpOpen = false
		}
	}
}
</script>

<style lang="scss">
.landing-content {
	width: 95%;
	height: 100%;
	margin: 10px auto 10px auto;
}

.main-content {
	height: 80%;
	padding: 10px;

	@include breakpoint(tablet) {
		margin-bottom: 30px;
	}

	@include breakpoint(desktop) {
		margin-bottom: 0;
		padding: 10px 10px 10px 60px;
	}

	&__title {
		padding: 0 0 5px 0;
		
		@include breakpoint(desktop) {
			max-width: 50%;
		}
	}

	&__sub-title {
		padding-left: 5px;
		
		@include breakpoint(desktop) {
			max-width: 80%;
		}
	}

	&__sub-title-sub-text {
		color: $blue;
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
