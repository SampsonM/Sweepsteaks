<template>
	<div class="block">
		<slot/>
	</div>
</template>

<script>
export default {
	name: 'block'
}
</script>

<style lang="scss">
.block {
	padding: 10px;
	width: 100%;
	height: 400px;
	background-color: $yellow;
	border: 2px solid $dark-yellow;
	border-radius: 10px;
}	
</style>
