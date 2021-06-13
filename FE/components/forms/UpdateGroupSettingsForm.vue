<template>
	<section class="update-group-settings-form">
		<h3>Group Settings</h3>

		<form>
			<div v-for="group in editableGroups" :key="group.id">
				
				{{ group }}

			</div>
	
			<p v-if="editableGroups.length === 0">
				You do not own any groups!
			</p>
		</form>

	</section>
</template>

<script>
import MyInput from '@/components/elements/input.vue'
import MyButton from '@/components/elements/button.vue'
import validationHelpers from '@/helpers/validations'
import { mapState } from 'vuex'

export default {
	components: {
		MyButton,
		MyInput
	},
	validations() {
		return this.$UpdateGroupSettingsValidations
	},
	computed: {
		...mapState(['currentGroups', 'user']),
		editableGroups() {
			return this.currentGroups.filter(g => g.createdBy === this.user.username)
		}
	},
	methods: {
		updateGroupSettings() {

		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
	}
}
</script>

<style lang="scss" scoped>
.update-group-settings-form {
	form {
		max-width: 90%;
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