<template>
	<div class="landing-page" itemscope itemtype="http://schema.org/Brand">
		<HeaderBlock />
		<LandingPageContent />
	</div>
</template>

<script>
import LandingPageContent from '@/components/content/LandingPageContent.vue'
import HeaderBlock from '@/components/blocks/HeaderBlock.vue'

export default {
	name: 'Home',
	components: {
		LandingPageContent,
		HeaderBlock
	},
	mounted() {
		this.$cookie.config( 60 * 60 * 12, null, process.env.cookieDomain, false)
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
	display: flex;
	flex-direction: column;

	@include breakpoint(tablet) {
		min-height: 100%;
	}
}
</style>
