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
