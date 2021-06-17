<template>
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
			@click="$emit('cancel-create-group')"
			type="button">
			Cancel
		</MyButton>
	</div>
</template>

<script>
import MyInput from '@/components/elements/input.vue'
import MyButton from '@/components/elements/button.vue'

export default {
	components: {
		MyButton,
		MyInput,
	},
	props: {
		submitting: {
			required: true,
			type: Boolean
		}
	}
}
</script>

<style lang="scss" scoped>

</style>