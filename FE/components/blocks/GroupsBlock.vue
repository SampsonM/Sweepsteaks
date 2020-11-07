<template>
	<Block class="groups-block">
		<h4 class="groups-block__header">Your Groups</h4>
		<div
			v-for="group in currentGroups"
			:key="group.id"
			class="group">

			<div>
				<p class="group__name-label">Group - </p>
				<p class="group__name">{{ group.name }}</p>
			</div>

			<div>
				<p class="group__created-by-label">Created By - </p>
				<p class="group__cretaed-by">{{ group.createdBy }}</p>				
			</div>

			<div>
				<p class="group__created-by-label">Wager - </p>
				<p class="group__cretaed-by">{{ group.wager }}</p>				
			</div>
		</div>
	</Block>
</template>

<script>
import { mapState } from 'vuex'
import Block from './block'

export default {
	name: 'groupsBlock',
	components: {
		Block
	},
	computed: {
		...mapState(['currentGroups'])
	},
	mounted() {
	}
}
</script>
<style lang="scss">
.groups-block {
	&__header {
		color: $blue;
	}
}

.group {
	padding: 3px 2px;
	color: $yellow;
	background: $dark-blue;
	border: 2px solid $light-blue;
	border-radius: 7px;
}
</style>