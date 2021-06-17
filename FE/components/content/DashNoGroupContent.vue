<template>
	<div class="dash-no-group">
		<div class="dash-no-group__header-wrapper" v-if="showHeader">
			<h2>You are not currently part of a group</h2>
			<h3>Create or join a group below and get started with your next sweepstake!</h3>
		</div>

		<span v-if="!createGroupModalOpen && !joinGroupModalOpen" class="dah-no-group__cta-wrapper">
			<MyButton
				btn-style="cta-1"
				size="large"
				class="dash-no-group__create-btn"
				@click="openCreateGroup">
				Create Group
			</MyButton>

			<MyButton
				btn-style="cta-1"
				size="large"
				class="dash-no-group__join-btn"
				@click="openJoinGroup">
				Join Group
			</MyButton>
		</span>

		<transition :name="slideInTransition ? 'slide-in': ''">
			<CreateGroupForm
				:formOpen="createGroupModalOpen"
				@close-create-group="closeCreateGroup">
			</CreateGroupForm>
		</transition>

		<transition :name="slideInTransition ? 'slide-in': ''">
			<JoinGroupForm
				:formOpen="joinGroupModalOpen"
				@close-join-group="closeJoinGroup">
			</JoinGroupForm>
		</transition>
	</div>
</template>

<script>
import MyButton from '@/components/elements/button.vue'
import CreateGroupForm from '@/components/forms/CreateGroupForm/CreateGroupForm.vue'
import JoinGroupForm from '@/components/forms/JoinGroupForm.vue'
import { toggleModal } from '@/helpers'

export default {
	name: 'DashNoGroupContent',
	components: {
		MyButton,
		CreateGroupForm,
		JoinGroupForm
	},
	props: {
		showHeader: {
			default: true
		},
		slideInTransition: {
			default: true
		}
	},
	setup() {
		const {
			modalOpen: createGroupModalOpen,
			openModal: openCreateGroup,
			closeModal: closeCreateGroup
		} = toggleModal()

		const {
			modalOpen: joinGroupModalOpen,
			openModal: openJoinGroup,
			closeModal: closeJoinGroup
		} = toggleModal()

		return {
			createGroupModalOpen,
			joinGroupModalOpen,
			openCreateGroup,
			closeCreateGroup,
			openJoinGroup,
			closeJoinGroup
		}
	}
}
</script>

<style lang="scss">
.dash-no-group {
	padding: 20px;

	&__header-wrapper {
		max-width: 700px;
		margin: 0 auto 10px auto;
		text-align: left;

		@include breakpoint(desktop) {
			margin-bottom: 50px;
		}
	}

	&__cta-wrapper {
		display: flex;
	}

	&__create-btn {
		margin-right: 10px;

		@include breakpoint(desktop) {
			margin-right: 20px;
		}
	}

	&__join-btn {
		background-color: $blue;
		color: $yellow;
	
		&:hover,
		&:active {
			text-decoration: underline;
			background-color: $light-blue;
			color: $dark-blue;
		}
	}
}
	
</style>