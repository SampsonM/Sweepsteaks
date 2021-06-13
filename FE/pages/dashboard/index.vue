<template>
	<div class="dashboard">
		<HeaderBlock />
		<DashHasGroupContent v-if="groupsAvailable" />
		<DashNoGroupContent v-if="!groupsAvailable" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DashHasGroupContent from '@/components/content/DashHasGroupContent.vue'
import DashNoGroupContent from '@/components/content/DashNoGroupContent.vue'
import HeaderBlock from '@/components/blocks/HeaderBlock.vue'

export default {
	middleware: 'auth',
	components: {
		HeaderBlock,
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
