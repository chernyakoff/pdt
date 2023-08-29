<template>
  <q-avatar v-if="image && !error" size="48px">
    <q-img
      loading="lazy"
      height="100%"
      width="48px"
      fit="cover"
      position="50% 50%"
      :src="lightbox.getImage(id)"
      @click="lightbox.showImage(id)"
      @error="error = true"
    />
  </q-avatar>
  <q-avatar
    v-else
    size="48px"
    text-color="white"
    icon="shopping_bag"
    color="teal"
  >
  </q-avatar>
</template>
<script setup>
import { ref } from "vue";
import { useLightboxStore } from "stores/lightbox";
const props = defineProps({
  id: Number,
  image: String,
});
const error = ref(false);
const lightbox = useLightboxStore();
lightbox.addImage(props.id, props.image);
</script>
