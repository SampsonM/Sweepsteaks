<template>
	<block
		class="competitions-block"
		header="Your Competitions:">
	</block>
</template>

<script>
import { mapState } from 'vuex'
import block from '@/components/elements/block.vue'

export default {
	name: 'competitionsBlock',
	components: {
		block
	},
	mounted() {
		console.log(this.$route)
	}
}
</script>

<style lang="scss">
	
</style>