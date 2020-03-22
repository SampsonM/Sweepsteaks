<template>
	<button
		v-on="$listeners"
		class="my-button">
		<slot />
	</button>
</template>
<script>
export default {
	
}
</script>

<style lang="scss">
.my-button {
	height: 45px;
	width: 100px;
	line-height: 43px;
	background-color: #ff8d8d;
	border-radius: 5px;
	transition-duration: 200ms;
	font-family: $font;
	font-size: 16px;
	font-weight: 500;
	color: #1c3359;
	text-decoration: none;
	border: 1px solid #e16666;

	&:hover,
	&:active,
	&:focus {
		cursor: pointer;
		outline: none;
		border: 1px solid #1c3359;
		text-decoration: underline;
		transition-duration: 0.2s;
	}

	&:hover,
	&:active {
		background-color: #f8a0a0;
	}
}
</style>