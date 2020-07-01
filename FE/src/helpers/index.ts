import { ref, Ref } from '@vue/composition-api'

export function toggleModal() {
	const modalOpen: Ref<boolean> = ref(false)

	function openModal(): void {
		modalOpen.value = true
	}

	function closeModal(): void {
		modalOpen.value = false
	}

	return { modalOpen, openModal, closeModal }
}
