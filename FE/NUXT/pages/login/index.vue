<template>
	<div class="login">
		<Header />

		<form :class="['login__form', { error: loginError || $v.$error }]">
			<MyInput
				label="Username"
				name="username"
				type="text"
				placeholder="Username"
				:has-error="$v.username.$error"
				:err-message="fieldErr('username')"
				@blur="val => handleInput('username', val)"
			/>
			<MyInput
				label="Password"
				name="password"
				type="text"
				placeholder="Password"
				:has-error="$v.password.$error"
				:err-message="fieldErr('password')"
				@blur="val => handleInput('password', val)"
			/>

			<p v-if="!$v.$error" class="login__error-msg">
				{{ loginError }}
			</p>

			<MyButton
				type="submit"
				class="login__submit"
				btn-style="cta-1"
				@click="logUserIn"
			>
				Login
				<font-awesome-icon
					v-if="submitting"
					class="login__submit-loader"
					:icon="['fas', 'circle-notch']"
				/>
			</MyButton>
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/header.vue'
import MyButton from '@/components/button'
import MyInput from '@/components/input'
import validationHelpers from '@/helpers/validations'

export default {
	components: {
		Header,
		MyButton,
		MyInput
	},
	data() {
		return {
			username: '',
			password: '',
			submitting: false
		}
	},
	computed: {
		...mapState(['loginError'])
	},
	validations() {
		return this.$LoginValidations
	},
	methods: {
		async logUserIn(e) {
			e.preventDefault()

			if (!this.submitting && !this.$v.$error) {
				this.submitting = true
				this.$v.$touch()

				if (!this.$v.$error) {
					await this.$store.dispatch('logUserIn', {
						username: this.username,
						password: this.password
					})
				}

				this.submitting = false
			}
		},
		handleInput(field, value) {
			this[field] = value
			this.$v[field].$touch()
		},
		fieldErr(field) {
			return validationHelpers.createErrorMessages(this.$v[field])[0]
		}
	}
}
</script>

<style lang="scss">
.login {
	&__form {
		margin-top: 90px;
	}

	&__error-msg {
		margin-bottom: 15px;
		color: $red;
		font-weight: 600;
	}

	&__submit-loader {
		color: $black;
		position: relative;
		right: -6px;
		animation: spin 1.1s linear infinite;
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
