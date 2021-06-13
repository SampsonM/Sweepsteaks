<template>
	<div class="join-group-form" v-if="formOpen">

		<form>
			<div v-if="!joinedGroup">
				<MyInput
					v-model.trim.lazy="groupId"
					@blur="handleBlur('groupId')"
					label="Group Id"
					name="groupId"
					placeholder="61487109827..."
					aria-placeholder="61487109827..."
					class="group-id-input"
					:has-error="$v.groupId.$error"
					:err-message="fieldErr('groupId')"
					type="text"
					hint="Get this from the owner of the group!"
				/>

				<p 
					v-if="submissionErr"
					class="error">
					Sorry there was an error creating your group, please try again later!
				</p>

				<div class="join-group-form__cta-wrapper">
					<MyButton
						btn-style="cta-1"
						type="submit"
						@click.prevent="joinGroup">
						Join group!
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
				v-if="joinedGroup"
				class="joined-group">
				<h3 class="joined-group__header">
					Success!
					<br><br>
					You are now part of the {{ this.joinedGroup.name }} group.
					<br><br>
					You can now badger the owner to start a sweepstake asap!!
				</h3>
				
				<p class="joined-group__text">
					When you are happy to proceed click done to be redirected to your dashboard.
					You can join more groups later or start a swepstake from there.
				</p>

				<MyButton
					btn-style="cta-1"
					@click="finishedJoiningGroup">
					Done
				</MyButton>
			</div>

		</form>
	</div>
</template>

<script>
import MyInput from '@/components/elements/input.vue'
import MyButton from '@/components/elements/button.vue'
import validationHelpers from '@/helpers/validations'
import { mapActions } from 'vuex'

export default {
	components: {
		MyInput,
		MyButton
	},
	props: {
		formOpen: {
			type: Boolean,
			required: true
		}
	},
	validations() {
		return this.$JoinGroupValidations
	},
	data() {
		return {
			groupId: '',
			submitting: false,
			submissionErr: false,
			joinedGroup: null
		}
	},
	methods: {
		...mapActions(['updateCurrentGroups']),
		async joinGroup() {
			if (!this.submitting) {
				this.submitting = true

				this.$v.$touch()

				if (!this.$v.$error) {
					try {
						const { data } = await this.$GroupApi.joinGroup(this.groupId)
						this.joinedGroup = data.group
					} catch (err) {
						this.submissionErr = true
					}
				}

				this.submitting = false
			}
		},
		handleCancel() {
			this.$v.$reset()
			this.$emit('close-join-group')
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		},
		finishedJoiningGroup() {
			this.updateCurrentGroups([this.joinedGroup])
		}
	}
}
</script>

<style lang="scss">
.join-group-form {

}

.joined-group {
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