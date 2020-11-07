<template>
	<Block
		class="leaderboards-block"
		header="Your Leaderboards:">
	</Block>
</template>

<script>
import { Block } from '@/components'

export default {
	name: 'LeaderBoardBlock',
	components: {
		Block
	},
	mounted() {
		console.log(this.$route)
	}
}
</script>

<style>

</style>