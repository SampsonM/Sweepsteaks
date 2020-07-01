<template>
	<div class="dashboard" v-if="sweepAdminAccess">
		<Header />
		<DashHasGroup v-if="groupsAvailable"></DashHasGroup>
		<DashNoGroup v-else></DashNoGroup>
	</div>

	<div v-else>
		<h1>Dashboard</h1>

		<div class="coming-soon">
			<h1 itemprop="name">
				Sweepsteaks, Coming soon!!
			</h1>
			<p>Online sweepstakes for you and your mates!</p>
		</div>

		<button @click="logout">
			Logout
		</button>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from '@/components/header.vue'
import DashNoGroup from '@/components/DashNoGroup.vue'
import DashHasGroup from '@/components/DashHasGroup.vue'

export default {
	middleware: 'auth',
	components: {
		Header,
		DashNoGroup,
		DashHasGroup
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
.coming-soon {
	background: rgba($yellow, 0.4);
	backdrop-filter: blur(5px);
	margin: 0 auto;
	max-width: 600px;
	margin-top: 100px;
	padding: 50px;

	h1 {
		color: $red;
		font-size: 1.2rem;

		@include breakpoint(tablet) {
			font-size: 3em;
		}
	}

	p {
		margin-top: 20px;
	}
}
</style>
