<template>
	<div class="dash-with-group">
		<GroupsBlock />
		<div>Competitions</div>
		<div>Leaderboards</div>
	</div>
</template>

<script>
import GroupsBlock from './groupsBlock'

export default {
	name: 'DashHasGroup',
	components: {
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