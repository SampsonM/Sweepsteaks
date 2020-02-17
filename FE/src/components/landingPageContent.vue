<template>
	<main class="landing-content">
		<section class="main-content">
			Landing page content
		</section>

		<SignupForm></SignupForm>
	</main>
</template>

<script>
import SignupForm from '../components/Signup'

export default {
	components: {
		SignupForm
	}	
}
</script>

<style lang="scss">
.landing-content {
	padding-top: 40px;
}
</style>
