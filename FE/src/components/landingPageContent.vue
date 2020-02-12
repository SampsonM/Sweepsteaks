<template>
	<div class="landing-content">
		<SignupForm></SignupForm>
	</div>
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
	min-height: 100vh;
	padding-top: 10%;
}
</style>
