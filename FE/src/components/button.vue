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
	margin: 0 auto;
	background-color: #ff8d8d;
	border-radius: 5px;
	transition-duration: 200ms;
	font-family: $font;
	font-size: 16px;
	font-weight: 500;
	color: #2d69ad;
	text-decoration: none;

	&:hover,
	:active,
	:focus {
		background-color: #fda0a0;
		outline: none !important;
		border:1px solid #2d69ad;
		text-decoration: underline;
	}
}
</style>