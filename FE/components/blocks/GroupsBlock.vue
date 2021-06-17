<template>

	<!-- TODO - Validate the user can edit group by checking user name against owner -->

	<div class="groups-block">
		<h2>Your Groups:</h2>
		
		<div
			v-for="(group, i) in currentGroups"
			:key="i"
			class="group">

			<MyButton
				v-if="!editSettingsStatus[i]"
				ref="settings-cog"
				btn-style="icon"
				class="group__settings-cog"
				type="button"
				size="small"
				@click="() => openGroupSettingsAtIndex(group, i)"
			>
				<font-awesome-icon :icon="['fa', 'cog']" />
			</MyButton>

			<div v-if="!editSettingsStatus[i]">
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

			<form
				v-if="editSettingsStatus[i]" 
				@submit.prevent="() => updateGroup(group, i)"
				class="group__settings">
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
					:verifiedUsers="verifiedUsers" 
					@users-updated="usersUpdated" 
				/>

				<SubmitOrCancelCreateGroup
					:submitting="submitting" 
					@cancel-create-group="() => closeGroupSettingsAtIndex(i)"
				/>
			</form>
		</div>

		<DashNoGroupContent 
			:showHeader="false"
			:slideInTransition="false" 
		/>
	</div>

</template>

<script>
import { mapState } from 'vuex'
import Block from '@/components/elements/block.vue'
import MyButton from '@/components/elements/button.vue'
import MyInput from '@/components/elements/input.vue'
import DashNoGroupContent from '@/components/content/DashNoGroupContent.vue'
import AddUser from '@/components/forms/CreateGroupForm/addUser.vue'
import validationHelpers from '@/helpers/validations'
import SubmitOrCancelCreateGroup from '@/components/forms/CreateGroupForm/submitOrCancelCreateGroup.vue'

export default {
	name: 'groupsBlock',
	components: {
		AddUser,
		Block,
		MyButton,
		MyInput,
		DashNoGroupContent,
		SubmitOrCancelCreateGroup
	},
	computed: {
		...mapState(['currentGroups'])
	},
	validations() {
		return this.$UpdateGroupSettingsValidations
	},
	data() {
		return {
			editSettingsStatus: [],
			groupName: '',
			verifiedUsers: [],
			submitting: false,
			openGroup: {}
		}
	},
	methods: {
		openGroupSettingsAtIndex(group, groupIndex) {
			const groupSettings = this.editSettingsStatus.map((_, i) => i === groupIndex)
			this.groupName = group.name
			this.verifiedUsers = group.verifiedUsers
			
			this.$v.$reset()
			
			this.$set(this, 'editSettingsStatus', groupSettings)
		},
		closeGroupSettingsAtIndex(groupIndex) {
			this.$set(this.editSettingsStatus, groupIndex, false)
		},
		usersUpdated(users) {
			this.verifiedUsers = users
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		async updateGroup(groupToUpdate, groupIndex) {
			if (!this.submitting) {
				this.submitting = true
				this.$v.$touch()

				let updatedGroupData = {}

				if (this.groupName !== groupToUpdate.name) {
					updatedGroupData.name = this.groupName
				}

				const allVerifiedUsersInGroup = this.verifiedUsers.every(u => groupToUpdate.verifiedUsers.includes(u))
				const verifiedUsersUpdated = !(allVerifiedUsersInGroup && this.verifiedUsers.length === groupToUpdate.verifiedUsers.length)
				
				if (verifiedUsersUpdated) {
					updatedGroupData.verifiedUsers = this.verifiedUsers
				}

				if (!this.$v.$error && Object.keys(updatedGroupData).length > 0) {
					try {
						const { data } = await this.$GroupApi.updateGroup(groupToUpdate.id, { updatedGroupData })
						const updatedGroups = this.currentGroups.map(g => g.id === data.id ? data : g)
						this.$store.commit('UPDATE_CURRENT_GROUPS', updatedGroups)
						this.closeGroupSettingsAtIndex(groupIndex)
					} catch (err) {
						this.submissionErr = true
					}
				}

				this.submitting = false
			}
		}
	},
	mounted() {
		this.currentGroups.forEach((group, i) => {
			this.$set(this.editSettingsStatus, i, false)
		});
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
	position: relative;
	padding: 3px 2px;
	color: $yellow;
	background: $dark-blue;
	border: 2px solid $light-blue;
	border-radius: 7px;
	margin-bottom: 10px;

	&__settings-cog, 
	&__settings-close {
		position: absolute;
    top: 2px;
    right: 3px;
	}
}
</style>