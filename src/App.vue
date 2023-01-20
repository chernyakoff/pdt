<template>
	<router-view />
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';


const onScan = inject('onScan')
/* 

onMounted(() => {
	document.addEventListener('scan', async function (code, qty = 1) {
		await codeStore.check(code)
	});
}) */
onUnmounted(() => {
	onScan.detachFrom(window)
})

</script>
