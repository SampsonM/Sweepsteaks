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

			<AddUser
				@users-updated="usersUpdated"
			/>

			<!-- <MyInput
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
			/> -->

			<p 
				v-if="submissionErr"
				class="error">
				Sorry there was an error creating your group, please try again later!
			</p>

			<SubmitOrCancelCreateGroup
				:submitting="submitting" 
				@cancel-create-group="handleCancel"
			/>
		</div>

		<div
			v-if="newGroup"
			class="created-group">
			<h3 class="created-group__header">
				Success!
				<br><br>
				Share your group code with the people you want to join.
				<br><br>
				Remember you must add them to the verified users before they can join!
				<br><br>
				<span class="created-group__code">
					{{ newGroup._id }}
				</span>
			</h3>
			
			<p class="created-group__text">
				When you are happy to proceed click done to be redirected to your dashboard.
				You can find check back to see this code in your settings menu anytime.
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
import MyInput from '@/components/elements/input.vue'
import MyButton from '@/components/elements/button.vue'
import AddUser from '@/components/forms/CreateGroupForm/addUser.vue'
import SubmitOrCancelCreateGroup from '@/components/forms/CreateGroupForm/submitOrCancelCreateGroup.vue'
import { mapActions, mapState } from 'vuex'
import validationHelpers from '@/helpers/validations'

export default {
	components: {
		MyButton,
		MyInput,
		AddUser,
		SubmitOrCancelCreateGroup
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
	computed: {
		...mapState(['currentGroups'])
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
			newGroup: null,
			selectedCompetition: '',
			competitions: []
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
					verifiedUsers: this.verifiedUsers,
					competition: this.selectedCompetition
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
		usersUpdated(users) {
			this.verifiedUsers = users
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
			this.updateCurrentGroups([...this.currentGroups, this.newGroup])
			this.newGroup = null
			this.$emit('close-create-group')
		},
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

	&__code {
		color: $red;
		margin-top: 20px;
	}

	&__text {
		color: $black;
		margin-bottom: 20px;
	}
}
</style>
