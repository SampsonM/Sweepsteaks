<template>
	<div class="dash-with-group">
		<GroupsBlock />
	</div>
</template>

<script>
import GroupsBlock from '@/components/blocks/GroupsBlock.vue'

export default {
	name: 'DashHasGroup',
	components: {
		GroupsBlock
	}
}
</script>

<style lang="scss">
.dash-with-group {
	display: block;
	flex: 1;
	padding: 10px;
}
</style>