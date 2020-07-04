<template>
	<div class="sign-up">
		<h3 class="sign-up__title">
			Sign up to SweepSteaks now!
		</h3>

		<form
			v-if="!allwd"
			id="signup"
			:class="['sign-up__form', { error: formHasErrors }]"
			autocomplete="on">
			<MyButton
				class="sign-up__close"
				type="button"
				btn-style="icon"
				@click="e => $emit('closeSignUp', e)">
				<font-awesome-icon :icon="['far', 'times-circle']" />
			</MyButton>

			<MyInput
				v-model.trim.lazy="firstName"
				@blur="handleBlur('firstName')"
				label="First name"
				name="firstName"
				class="firstName-input"
				:has-error="$v.firstName.$error"
				:err-message="fieldErr('firstName')"
			/>

			<MyInput
				v-model.trim.lazy="lastName"
				@blur="handleBlur('lastName')"
				label="Last name"
				name="lastName"
				class="lastName-input"
				:has-error="$v.lastName.$error"
				:err-message="fieldErr('lastName')"
			/>

			<MyInput
				v-model.trim.lazy="email"
				@blur="handleBlur('email')"
				label="Email"
				name="email"
				class="email-input"
				:has-error="$v.email.$error"
				:err-message="fieldErr('email')"
			/>

			<MyInput
				v-model.trim.lazy="username"
				@blur="handleBlur('username')"
				label="Username"
				name="username"
				class="username-input"
				hint="Must be at least 6 characters and include 2 numbers"
				:has-error="$v.username.$error"
				:err-message="fieldErr('username')"
			/>

			<MyInput
				v-model.trim.lazy="password"
				@blur="handleBlur('password')"
				label="Password"
				name="password"
				class="password-input"
				type="password"
				hint="Password must contain 1 lower U+0026 uppercase letter, 1 number and be between 8-20 characters"
				:has-error="$v.password.$error"
				:err-message="fieldErr('password')"
			/>

			<MyButton btn-style="cta-1" @click.prevent="handleSignup">
				Sign-up
			</MyButton>
		</form>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MyButton from './button.vue'
import MyInput from '@/components/input.vue'
import validationHelpers from '@/helpers/validations'

export default {
	components: {
		MyInput,
		MyButton
	},
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: ''
		}
	},
	validations() {
		return this.$SignUpValidations
	},
	computed: {
		...mapState(['allwd']),
		formHasErrors() {
			return (
				this.$v.firstName.$error ||
				this.$v.lastName.$error ||
				this.$v.email.$error ||
				this.$v.username.$error ||
				this.$v.password.$error
			)
		}
	},
	methods: {
		...mapActions(['signup']),
		async handleSignup() {
			await this.$v.$touch()

			if (!this.$v.$error) {
				const userData = {
					firstName: this.firstName,
					lastName: this.lastName,
					username: this.username,
					email: this.email,
					password: this.password
				}

				this.signup(userData)
			}
		},
		handleBlur(field) {
			this.$v[field].$touch()
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		}
	}
}
</script>

<style lang="scss" scoped>
.sign-up {
	height: auto;
	width: 100%;
	padding-top: 20px;

	@include breakpoint(tablet) {
		min-height: 87%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	&__title {
		@include breakpoint(tablet) {
			width: 45%;
			margin-top: -80px;
		}
	}

	&__close {
		display: block;
		position: relative;
		left: 96%;
		top: -8px;
	}

	.firstName-input,
	.lastName-input {
		max-width: 100%;

		@include breakpoint(tablet) {
			margin: 0 0 20px 0;
			max-width: 48%;
			display: inline-block;
		}
	}

	.firstName-input {
		margin-top: -10px;

		@include breakpoint(tablet) {
			margin-right: 9px;
		}
	}
}

.error {
	input {
		border-color: red;
	}
}
</style>
