<template>
  <q-card class="cart-component" bordered>
    <q-card-actions>
      <q-btn flat no-caps icon="shopping_cart" :color="color(id)" @click="store.setActiveCart(id)" :label="label(id)" />
      <q-space />
      <!--  <q-btn flat round color="primary" icon="expand" />
      <q-btn flat round color="primary" icon="get_app" /> -->
      <q-btn flat round color="primary" icon="add_shopping_cart" @click="store.addCart()" />
      <q-btn flat round color="red" title="Удалить корзину" icon="delete" @click="store.deleteCart(id)" />
    </q-card-actions>
    <q-separator />
    <ProductCard v-for="item in store.getItems(id)" :key="item.id" v-bind="item">
    </ProductCard>
  </q-card>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">You are currently not connected to any network.</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

import { useSelectStore } from 'stores/select';
import ProductCard from './ProductCard.vue';
const store = useSelectStore();




const color = (id) => store.isCartActive(id) ? 'teal' : 'blue-grey-4'

const label = (id) => `Корзина ${id}`

const props = defineProps({
  id: Number,
});


</script>
