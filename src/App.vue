<template>
  <router-view />
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import { useSelectStore } from 'stores/select';
const store = useSelectStore()

const onScan = inject('onScan')

const options = {
  minLength: 8,
  prefixKeyCode: [16],
  suffixKeyCodes: [13],
  onScan: async (code, iQty) => {
    await store.resolveCode(code)
  }
}
onMounted(() => {
  onScan.attachTo(window, options)
})

onUnmounted(() => {
  onScan.detachFrom(window);
})


</script>
