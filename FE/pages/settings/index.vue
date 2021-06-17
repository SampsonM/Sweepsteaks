<template>
	<div class="settings-page">
		<h2>Settings</h2>

		<UpdateUserSettingsForm />

		<nuxt-link
			v-if="allwd && $route.name == 'settings'"
			@click.native="logout"
			class="my-button my-button--cta-1"
			to="/">
			Log out
		</nuxt-link>

	</div>
</template>

<script>
import UpdateGroupSettingsForm from '@/components/forms/UpdateGroupSettingsForm.vue'
import UpdateUserSettingsForm from '@/components/forms/UpdateUserSettingsForm.vue'
import MyButton from '@/components/elements/button.vue'
import { mapState, mapActions } from 'vuex'

export default {
	middleware: 'auth',
	name: 'settings',
	components: {
		MyButton,
		UpdateUserSettingsForm,
		UpdateGroupSettingsForm
	},
	computed: {
		...mapState(['currentGroups','allwd'])
	},
	methods: {
		...mapActions(['logout'])
	}
}
</script>

<style lang="scss">
.settings-page {
	h2 {
		text-align: center;
		color: $red;
	}

	section {
		margin: 0 auto 50px auto;
		max-width: 1400px;
		padding: 10px;
		text-align: left;
		background: rgba($dark-yellow, 0.6);
		backdrop-filter: blur(4px);
		border-radius: 6px;
	
		@include breakpoint(tablet) {
			width: 80%;
		}
	}
}
</style>