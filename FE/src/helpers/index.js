import { ref, Ref } from '@vue/composition-api'

export function toggleModal() {
	const modalOpen = ref(false)

	function openModal() {
		modalOpen.value = true
	}

	function closeModal() {
		modalOpen.value = false
	}

	return { modalOpen, openModal, closeModal }
}
