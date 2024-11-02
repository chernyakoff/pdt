<template>
    <q-avatar v-if="image && !error" :size="width" style="cursor:pointer">
        <q-img
            loading="lazy"
            height="100%"
            :width="width"
            fit="cover"
            position="50% 50%"
            :src="lightbox.get(id)"
            @click="lightbox.show(id)"
            @error="error = true" />
    </q-avatar>
    <q-avatar
        v-else
        :size="width"
        text-color="white"
        icon="shopping_bag"
        color="teal" style="cursor:pointer">
    </q-avatar>
</template>
<script setup>
import { ref } from "vue";
import { useLightboxStore } from "store/lightbox";
const props = defineProps({
    id: Number,
    image: String,
    width: {
        type: String,
        default: '48px'
    }
});
const error = ref(false);
const lightbox = useLightboxStore();
lightbox.add(props.id, props.image);
</script>
