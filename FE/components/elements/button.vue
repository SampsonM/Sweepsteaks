<template>
	<button
		ref="button"
		v-bind="$attrs"
		:class="['my-button',`my-button--${btnStyle}`, `my-button--${size}`]"
		v-on="$listeners">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'MyButton',
	props: {
		btnStyle: {
			type: String,
			required: true,
			validator: type => ['cta-1', 'cta-2', 'icon'].includes(type)
		},
		size: {
			type: String,
			validator: size => ['small', 'large', 'jumbo'].includes(size)
		}
	}
}
</script>

<style lang="scss">
.my-button {
	display: inline-block;
	position: relative;
	border-radius: 5px;
	padding: 0 15px;
	margin-bottom: 10px;
	transition-duration: 200ms;
	font-family: $font;
	font-size: 16px;
	font-weight: 500;
	text-decoration: none;

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
	}

	&--cta-1 {
		background-color: #e16666;
		color: $light-gold;
		border: 2px solid #e16666;
		height: 42px;
		min-width: 90px;
		line-height: 38px;

		@include breakpoint(tablet) {
			height: 45px;
			min-width: 100px;
			line-height: 43px;
		}

		&:hover,
		&:active,
		&:focus {
			color: #1c3359;
			border: 2px solid darken(#e16666, 10%);
			background-color: lighten(#e16666, 5%);
		}

		&:hover,
		&:active {
			background-color: #f8a0a0;
		}
	}

	&--cta-2 {
		border: 2px solid $blue;
		color: $dark-blue;
		background-color: $light-blue;
		height: 42px;
		min-width: 90px;
		line-height: 38px;

		@include breakpoint(tablet) {
			height: 45px;
			min-width: 100px;
			line-height: 43px;
		}

		&:hover,
		&:active,
		&:focus {
			color: $yellow;
			border: 2px solid $dark-blue;
		}

		&:hover,
		&:active {
			background-color: $blue;
		}
	}

	&--large {
		height: 70px;
		width: 48%;
		max-width: 180px;
		font-size: 20px;
	}

	&--jumbo {
		height: 170px;
		width: 170px;
		border-radius: 10px;
		
		@include breakpoint(tablet) {
			height: 200px;
			width: 200px;
		}

		@include breakpoint(desktop) {
			height: 300px;
			width: 300px;
			font-size: 20px;
		}
	}

	&--icon {
		border: 2px solid transparent;
		padding: 3px;
		color: $red;
		background: transparent;
		line-height: 14px;

		&:focus {
			border-radius: 5px;
			border-color: $blue;
		}
	}
}
</style>
