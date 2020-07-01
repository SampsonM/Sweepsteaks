<template>
	<Block class="competitions-block">
		<h4>Your competitions</h4>
	</Block>
</template>

<script>
import { mapState } from 'vuex'
import Block from './block'

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