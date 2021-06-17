<template>
	<div class="dashboard">
		<DashHasGroupContent v-if="groupsAvailable" />
		<DashNoGroupContent v-if="!groupsAvailable" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DashHasGroupContent from '@/components/content/DashHasGroupContent.vue'
import DashNoGroupContent from '@/components/content/DashNoGroupContent.vue'

export default {
	middleware: 'auth',
	components: {
		DashNoGroupContent,
		DashHasGroupContent
	},
	methods: {
		...mapActions(['logout'])
	},
	computed: {
		...mapState(['currentGroups']),
		sweepAdminAccess() {
			return this.$cookie.get('adminAccess') || false
		},
		groupsAvailable() {
			return this.currentGroups.length > 0
		}
	}
}
</script>

<style lang="scss">
.dashboard {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
