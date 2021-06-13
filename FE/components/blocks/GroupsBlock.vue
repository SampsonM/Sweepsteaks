<template>
	<div class="groups-block">
		<h2>Your Groups:</h2>
		
		<div
			v-for="(group, i) in currentGroups"
			:key="i"
			class="group">

			<div>
				<p class="group__name-label">Group name - {{ group.name }}</p>
				<p class="group__name"></p>
			</div>

			<div>
				<p class="group__created-by-label">Owner - {{ group.createdBy }}</p>
				<p class="group__cretaed-by"></p>				
			</div>

			<div>
				<div><h4 class="group__created-by-label">members</h4></div>
				<p class="group__cretaed-by" v-for="user in group.users">{{ user }}</p>	
			</div>
		</div>

		<DashNoGroupContent :showHeader="false" :slideInTransition="false"></DashNoGroupContent>
	</div>

</template>

<script>
import { mapState } from 'vuex'
import Block from '@/components/elements/block.vue'
import DashNoGroupContent from '@/components/content/DashNoGroupContent.vue'

export default {
	name: 'groupsBlock',
	components: {
		Block,
		DashNoGroupContent
	},
	computed: {
		...mapState(['currentGroups'])
	},
	mounted() {
		// console.log(this.currentGroups)
	},
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