<template>
	<Block
		class="competitions-block"
		header="Your Competitions:">
	</Block>
</template>

<script>
import { mapState } from 'vuex'
import { Block } from '@/components'

export default {
	name: 'competitionsBlock',
	components: {
		Block
	},
	mounted() {
		console.log(this.$route)
	}
}
</script>

<style lang="scss">
	
</style>