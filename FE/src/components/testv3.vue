<!-- e.g
	<Testv3
		@incremented="testEmit"
		theThing="The prop string we are passing down should be logged on increment">
	</Testv3>
-->
<template>
	<div>
		Capacity: {{ capacity }}
		<button @click="increment">increment</button>
	</div>
</template>
<script>
import { ref, onMounted, onUpdated, onUnmounted } from '@vue/composition-api'

export default {
	/*
		setUp is called in-between beforeCreate and created hooks

		Args:
		- Props: reactive and can be watched, must still be defined in props option
		- Context: includes the properties previously exposed to .this i.e. attrs, slots, emit
	*/
	setup(props, context) {
		// replaces data
		const capacity = ref(0)

		// create variables to anything as per JS
		const $emit = context.emit
		const theThing = props.theThing

		function logTheThing() {
			console.log(theThing)
		}

		/*
		 * Instead of using beforeCreate or created hooks, just
		 * write code or call functions inside setup() instead.
		 * 
		 * The following functions must be imported from composition API
		 * onMounted, onUpdated, onUnmounted
		 */
		onMounted(() => console.log('mounted'))
		onUpdated(() => console.log('updated'))
		onUnmounted(() => console.log('unmounted'))

		// Using standard JS we can access 'capacity' as its in scope
		function increment() {
			capacity.value++

			// use emit as per usual
			$emit('incremented', 'holy shit we incremented!!')

			logTheThing()
		}

		// return anything that needs access in template
		return { capacity, increment }
	},
	props: {
		theThing: String
	}
}
</script>
