<template>
	<section class="update-user-settings-form">
		<h3>User Settings</h3>

		<form>
			<MyInput
				v-model.trim.lazy="firstName"
				@blur="handleBlur('firstName')"
				label="First name"
				name="firstName"
				aria-placeholder="enter first name"
				class="firstName-input"
				:has-error="$v.firstName.$error"
				:err-message="fieldErr('firstName')"
			/>

			<MyInput
				v-model.trim.lazy="lastName"
				@blur="handleBlur('lastName')"
				label="Last name"
				name="lastName"
				aria-placeholder="enter last name"
				class="lastName-input"
				:has-error="$v.lastName.$error"
				:err-message="fieldErr('lastName')"
			/>

			<p v-if="userSettingsErrSubmitting" class="error">{{userSettingsErrSubmitting}}</p>

			<MyButton
				type="button"
				btn-style="cta-1"
				@click="updateUserSettings"
			>
				Update user settings
			</MyButton>
		</form>
	</section>
</template>

<script>
import MyButton from '@/components/elements/button.vue'
import MyInput from '@/components/elements/input.vue'
import validationHelpers from '@/helpers/validations'

export default {
	components: {
		MyButton,
		MyInput
	},
	validations() {
		return this.$UpdateUserSettingsValidations
	},
	data() {
		return {
			firstName: '',
			lastName: '',
			userSettingsErrSubmitting: ''
		}
	},
	created() {
		this.firstName = this.$store.state.user.firstName
		this.lastName = this.$store.state.user.lastName
	},
	watch: {
		firstName() {
			this.userSettingsErrSubmitting = ''
		},
		lastName() {
			this.userSettingsErrSubmitting = ''
		}
	},
	methods: {
		async updateUserSettings() {
			try {
				const userData = {}

				if (this.firstName !== this.$store.state.user.firstName) {
					userData.firstName = this.firstName
				}

				if (this.lastName !== this.$store.state.user.lastName) {
					userData.lastName = this.lastName
				}

				if (Object.keys(userData).length > 0) {
					const userId = this.$cookie.get('uid')
					const { data } = await this.$UserApi.updateUser(userId, userData)
					const user = {
						firstName: data.firstName,
						lastName: data.lastName
					}

					this.$store.commit('UPDATE_USER', user)

				} else {
					this.userSettingsErrSubmitting = 'You have not changed your user settings?'
				}

			} catch (err) {
				this.userSettingsErrSubmitting = 'Error updating user settings'
			}
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
	},
}
</script>

<style lang="scss" scoped>
.update-user-settings-form {
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