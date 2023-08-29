<template>
  <q-item>
    <q-item-section class="col-1" top>
      <q-avatar v-if="image == ''" size="48px" text-color="white" icon="shopping_bag" color="teal" />
      <q-avatar v-else size="48px">
        <q-img height="100%" width="48px" fit="cover" position="50% 50%" :src="lightbox.getImage(id)" @click="lightbox.showImage(id)" />
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-6">
      <q-item-label>{{ name }} </q-item-label>
      <q-item-label caption>{{ code }}</q-item-label>
    </q-item-section>
    <q-item-section class="col-1"> Количество {{ total }}
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useLightboxStore } from 'stores/lightbox'
import { useSelectStore } from 'stores/select'
const lightbox = useLightboxStore();
const store = useSelectStore();
const props = defineProps({
  cartId: Number,
  id: Number,
  name: Number,
  code: String,
  image: String,
  weight: Number,
  width: Number,
  height: Number,
  price: Number,
  total: Number,
  stock: Object,
  contents: Array
});


lightbox.addImage(props.id, props.image)
/*
const qty = ref(props.qty);

watch(qty, (newVal) => {
  store.updateQty(props.id, newVal);
}) */



</script>
