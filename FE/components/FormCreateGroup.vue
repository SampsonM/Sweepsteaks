<template>
	<form
		v-if="formOpen"
		:class="['create-group-form', { 'error': $v.$error }]"
		@submit.prevent="createGroup">
		<div v-if="!newGroup">
			Create Group
			
			<MyInput
				v-model.trim.lazy="groupName"
				@blur="handleBlur('groupName')"
				label="Group Name"
				name="groupName"
				type="text"
				class="group-name-input"
				placeholder="Daves_sweeps"
				aria-placeholder="Daves_sweeps"
				:has-error="$v.groupName.$error"
				:err-message="fieldErr('groupName')"
			/>

			<div class="create-group-form__add-user">
				<MyInput
					v-model.trim.lazy="verifiedUser"
					@keypress-enter="addUser"
					label="Enter your friends emails you want to join"
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

			<MyInput
				v-model.trim.lazy="wager"
				label="Select a wager"
				name="wager"
				type="number"
				min="2"
				max="50"
				@blur="handleWagerBlur"
				hint="Choose a wager between £2 and £50, this will be the stake each member puts in"
				class="wager-input"
				placeholder="£10"
				aria-placeholder="£10"
				:has-error="$v.wager.$error"
				:err-message="fieldErr('wager')"
			/>

			<p 
				v-if="submissionErr"
				class="error">
				Sorry there was an error creating your group, please try again later!
			</p>

			<div class="create-group-form__cta-wrapper">
				<MyButton
					btn-style="cta-1"
					type="submit">
					Submit
					<font-awesome-icon
						v-if="submitting"
						class="login__submit-loader"
						:icon="['fas', 'circle-notch']"
					/>
				</MyButton>

				<MyButton
					btn-style="cta-2"
					@click="handleCancel"
					type="button">
					Cancel
				</MyButton>
			</div>
		</div>

		<div
			v-if="newGroup"
			class="created-group">
			<h3 class="created-group__header">
				You have successfully created a new group!
				<br><br>
				To allow people to join your group share the following code, remember you must add them to the verified users before they can join!
				<br>
				<span class="created-group__header-code">
					{{ newGroup._id }}
				</span>
			</h3>
			
			<p class="created-group__text">
				When you are happy to proceed click done to be redirected to the dashboard, you can find this code in your settings menu later.
			</p>

			<MyButton
				btn-style="cta-1"
				@click="finishedCreatingGroup">
				Done
			</MyButton>
		</div>
	</form>
</template>

<script>
import MyButton from './button.vue'
import MyInput from './input.vue'
import { mapActions } from 'vuex'
import validationHelpers from '../helpers/validations'

export default {
	components: {
		MyButton,
		MyInput
	},
	props: {
		formOpen: {
			type: Boolean,
			required: true
		}
	},
	validations() {
		return this.$CreateGroupValidations
	},
	data() {
		return {
			groupName: '',
			verifiedUser: '',
			verifiedUsers: [],
			wager: null,
			createdBy: '',
			submitting: false,
			submissionErr: false,
			newGroup: null
		}
	},
	mounted() {
		this.createdBy = this.$cookie.get('uid')
	},
	methods: {
		...mapActions(['updateCurrentGroups']),
		async createGroup() {
			if (!this.submitting) {
				this.submitting = true

				this.$v.$touch()

				const newGroup = {
					name: this.groupName,
					createdBy: this.createdBy,
					wager: this.wager,
					verifiedUsers: this.verifiedUsers
				}

				if (!this.$v.$error) {
					try {
						const { data } = await this.$GroupApi.createGroup({ newGroup })
						this.newGroup = data.group
					} catch (err) {
						this.submissionErr = true
					}
				}

				this.submitting = false
			}
		},
		addUser(e) {
			this.$v.verifiedUser.$touch()
			this.$v.verifiedUsers.$touch()

			if (this.verifiedUser.length > 0 && !this.$v.verifiedUser.$error && !this.$v.verifiedUsers.$error) {
				e.preventDefault()
				this.verifiedUsers.push(this.verifiedUser)
				this.verifiedUser = ''
			}
		},
		deleteUser(index) {
			this.verifiedUsers.splice(index, 1)
		},
		handleCancel() {
			this.$v.$reset()
			this.$emit('close-create-group')
		},
		handleWagerBlur(e) {
			if (this.wager < 2 || this.wager > 50) {
				this.$v.$touch()
				this.wager = 0
			} else if (this.wager > 50) {
				this.$v.$touch()
			}
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		finishedCreatingGroup() {
			this.updateCurrentGroups(this.newGroup)
		},
		showVerifiedUserErr() {
			return this.$v.verifiedUser.$error || this.$v.verifiedUsers.$error
		}
	}
}
</script>

<style lang="scss">
.create-group-form {
	@include breakpoint(tablet) {
		min-width: 500px;
	}

	&__add-user {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	&__add-user-btn {
		margin: 0 0 20px 10px;
    min-width: 41px;

		@include breakpoint(tablet) {
    	min-width: 50px;
		}
	}

	&__verified-users {
		list-style-type: none;
		text-align: left;
		padding: 0 5px;
		margin-bottom: 20px;
	}

	&__user-email {
		display: flex;
    align-items: center;
    justify-content: space-between;
		border-radius: 6px;
		margin-bottom: 10px;
		padding: 5px 10px;
		background: $dark-yellow;
		color: $light-gold;

		.my-button--icon {
			margin-bottom: 0;
			color: $dark-red;
		}
	}
}

.created-group {
	&__header {
		color: $blue;
		margin-bottom: 30px;
	}

	&__header-code {
		color: $red;
		margin-top: 20px;
	}

	&__text {
		color: $black;
		margin-bottom: 20px;
	}
}
</style>
