<template>
	<div>
		<div class="create-group-form__add-user">
			<MyInput
				v-model.trim.lazy="verifiedUser"
				@keypress-enter="addUser"
				label="Enter friends emails here"
				name="verifiedUser"
				type="text"
				class="verified-users-input"
				hint="You can remove or add friends to your group later in the group settings menu. You can have a maximum of 10 people per group."
				placeholder="your_friends_email@gmail.com"
				aria-placeholder="your_friends_email@gmail.com"
				:has-error="$v.verifiedUser.$error || $v.verifiedUsers.$error"
				:err-message="fieldErr('verifiedUser') || fieldErr('verifiedUsers')"
			/>
			<MyButton
				btn-style="cta-1"
				class="create-group-form__add-user-btn"
				@click="addUser"
				type="button">
				+
			</MyButton>
		</div>

		<ul v-if="verifiedUsers.length > 0" class="create-group-form__verified-users">
			<li
				v-for="(user, index) in verifiedUsers"
				:key="index"
				class="create-group-form__user-email">
				{{ user }}

				<MyButton
					btn-style="icon"
					type="button"
					@click="deleteUser(index)">
					Delete
				</MyButton>
			</li>
		</ul>
	</div>
</template>

<script>
import MyInput from '@/components/elements/input.vue'
import MyButton from '@/components/elements/button.vue'
import validationHelpers from '@/helpers/validations'

export default {
	components: {
		MyInput,
		MyButton
	},
	validations() {
		return this.$CreateGroupValidations
	},
	props: {
		verifiedUsers: {
			required: true,
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			// verifiedUsers: [],
			verifiedUser: ''
		}
	},
	methods: {
		addUser(e) {
			this.$v.verifiedUser.$touch()
			this.$v.verifiedUsers.$touch()

			if (this.verifiedUser.length > 0 && !this.$v.verifiedUser.$error && !this.$v.verifiedUsers.$error && !this.verifiedUsers.includes(this.verifiedUser)) {
				e.preventDefault()

				const updatedUsers = [...this.verifiedUsers, this.verifiedUser]

				this.$emit('users-updated', updatedUsers)
				this.verifiedUser = ''
			}
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		deleteUser(index) {
			const updatedUsers = this.verifiedUsers.filter((_, i) => i !== index)
			this.$emit('users-updated', updatedUsers)
		},
	}
}
</script>

<style lang="scss" scoped>

</style>