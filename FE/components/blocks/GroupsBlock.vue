<template>
	<Block
		class="groups-block"
		header="Your Groups:">
		<div
			v-for="group in currentGroups"
			:key="group.id"
			class="group">

			<div>
				<p class="group__name-label">Group - {{ group.name }}</p>
				<p class="group__name"></p>
			</div>

			<div>
				<p class="group__created-by-label">Created By - {{ group.createdBy }}</p>
				<p class="group__cretaed-by"></p>				
			</div>

			<div>
				<p class="group__created-by-label">Wager - {{ group.wager }}</p>
				<p class="group__cretaed-by"></p>				
			</div>
		</div>
	</Block>
</template>

<script>
import { mapState } from 'vuex'
import { Block } from '@/components'

export default {
	name: 'groupsBlock',
	components: {
		Block
	},
	computed: {
		...mapState(['currentGroups'])
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