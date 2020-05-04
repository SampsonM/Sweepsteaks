<template>
	<div>
		<h1>Dashboard</h1>

		<div class="coming-soon">
			<h1 itemprop="name">
				Sweepsteaks, Coming soon!!
			</h1>
			<p>Online sweepstakes for you and your mates!</p>
		</div>

		<button @click="logout">
			Logout
		</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	middleware: 'auth',
	methods: {
		...mapActions(['logout'])
	}
}
</script>

<style lang="scss">
.coming-soon {
	background: rgba($yellow, 0.4);
	backdrop-filter: blur(5px);
	margin: 0 auto;
	max-width: 600px;
	margin-top: 100px;
	padding: 50px;

	h1 {
		color: $red;
		font-size: 1.2rem;

		@include breakpoint(tablet) {
			font-size: 3em;
		}
	}

	p {
		margin-top: 20px;
	}
}
</style>
