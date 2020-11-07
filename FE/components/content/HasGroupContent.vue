<template>
	<div class="dash-with-group">
		<GroupsBlock />
	</div>
</template>

<script>
import { GroupsBlock, LeaderBoardBlock, CompetitionsBlock } from '@/components'

export default {
	name: 'DashHasGroup',
	components: {
		CompetitionsBlock,
		LeaderBoardBlock,
		GroupsBlock
	}
}
</script>

<style lang="scss">
.dash-with-group {
	display: flex;
	flex-direction: column;
	padding: 10px;
}
</style>