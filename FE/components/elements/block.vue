<template>
	<div class="block">
		<h4 class="block__header">{{ header }}</h4>
		<slot/>
	</div>
</template>

<script>
export default {
	name: 'block',
	props: {
		header: {
			type: String,
			required: true
		}
	}
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
