<template>
	<block
		class="leaderboards-block"
		header="Your Leaderboards:">
	</block>
</template>

<script>
import block from '@/components/elements/block.vue'

export default {
	name: 'LeaderBoardBlock',
	components: {
		block
	},
	mounted() {
		console.log(this.$route)
	}
}
</script>

<style>

</style>