<template>
	<button
		ref="button"
		v-bind="$attrs"
		:class="[`my-button--${btnStyle}`]"
		v-on="$listeners"
	>
		<slot />
	</button>
</template>

<script>
export default {
	props: {
		btnStyle: {
			type: String,
			required: true,
			validator: type => ['cta-1', 'icon'].includes(type)
		}
	},
	methods: {
		focus() {
			this.$refs.button.focus()
		}
	}
}
</script>

<style lang="scss">
.my-button--cta-1 {
	position: relative;
	height: 42px;
	min-width: 90px;
	line-height: 38px;
	background-color: #ff8d8d;
	border-radius: 5px;
	padding: 0 15px;
	transition-duration: 200ms;
	font-family: $font;
	font-size: 16px;
	font-weight: 500;
	color: #1c3359;
	text-decoration: none;
	border: 1px solid #e16666;

	@include breakpoint(tablet) {
		height: 45px;
		min-width: 100px;
		line-height: 43px;
	}

	&:hover,
	&:active,
	&:focus {
		cursor: pointer;
		outline: none;
		border: 2px solid $blue;
		transition-duration: 0.2s;
	}

	&:hover,
	&:active {
		text-decoration: underline;
		background-color: #f8a0a0;
	}
}

.my-button--icon {
	border: 2px solid transparent;
	padding: 2px 3px;
	font-size: 16px;
	color: $red;
	background: transparent;

	&:focus {
		border-radius: 5px;
		border-color: $blue;
	}
}
</style>
