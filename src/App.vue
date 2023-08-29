<template>
  <router-view />
</template>

<script setup>
import { inject, onMounted, onUnmounted } from "vue";
import { useSearchStore } from "stores/search";

const store = useSearchStore();
const onScan = inject("onScan");

const options = {
  minLength: 8,
  prefixKeyCode: [16],
  suffixKeyCodes: [13],
  onScan: async (code) => {
    await store.resolve(code);
  },
};
onMounted(() => {
  onScan.attachTo(window, options);
});

onUnmounted(() => {
  onScan.detachFrom(window);
});
</script>
