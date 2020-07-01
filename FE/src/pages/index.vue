<template>
	<div class="landing-page" itemscope itemtype="http://schema.org/Brand">
		<Header />
		<LandingPageContent />
	</div>
</template>

<script>
import LandingPageContent from '@/components/LandingPageContent.vue'
import Header from '@/components/header.vue'

export default {
	name: 'Home',
	components: {
		LandingPageContent,
		Header
	},
	mounted() {
		 console.log(this.$route.name)
	},
	head() {
		return {
			title: 'SweepSteaks | Sweepstakes online',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Sweepstakes with your friends, you can use the grand national or the world cup to create sweepstakes for a group of friends, coworkers or strangers online!'
				}
			],
			noscript: [{ innerHTML: 'Body No Scripts', body: true }]
		}
	}
}
</script>

<style lang="scss">
.landing-page {
	height: 100%;
	display: flex;
	flex-direction: column;

	@include breakpoint(tablet) {
		min-height: 100%;
	}
}
</style>
