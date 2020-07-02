<template>
	<div class="dash-no-group">
		<div class="dash-no-group__header-wrapper">
			<h2>You are not currently part of a group</h2>
			<h3>Create or join a group below and get started with your next sweepstake!</h3>
		</div>

		<span v-if="!createGroupModalOpen && !joinGroupModalOpen">
			<MyButton
				btn-style="cta-1"
				size="jumbo"
				class="dash-no-group__create-btn"
				@click="openCreateGroup">
				Create Group
			</MyButton>

			<MyButton
				btn-style="cta-1"
				size="jumbo"
				class="dash-no-group__join-btn"
				@click="openJoinGroup">
				Join Group
			</MyButton>
		</span>

		<transition name="slide-in">
			<FormCreateGroup
				:formOpen="createGroupModalOpen"
				@close-create-group="closeCreateGroup">
			</FormCreateGroup>
		</transition>

		<transition name="slide-in">
			<div
				class="join-group-modal"
				v-if="joinGroupModalOpen">
				Join group form!!!!!!!
				<MyButton @click="closeJoinGroup">Close JOIN</MyButton>
			</div>
		</transition>
	</div>
</template>

<script>
import { defineComponent, ref, Ref, watch } from '@vue/composition-api'
import MyButton from './button.vue'
import FormCreateGroup from './FormCreateGroup.vue'
import { toggleModal } from '../helpers'

export default {
	components: {
		MyButton,
		FormCreateGroup
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

	&__create-btn {
		@include breakpoint(tablet) {
			margin-right: 10px;
		}

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