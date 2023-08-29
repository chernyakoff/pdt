<template>
  <q-card class="cart-component">
    <q-card-actions>
      <q-btn flat icon="shopping_cart" :color="store.cart(id).color" @click="store.setSourceCart(id)" :label="store.cart(id).label" />
      <q-btn
        v-if="store.cart(id).items.length > 0"
        color="grey"
        round
        flat
        dense
        :icon="store.cart(id).expandIcon"
        @click="store.cart(id).toggleExpand()" />
      <q-space />
      <q-btn v-show="store.carts.length > 1" v-if="store.cart(id).active" flat round color="primary" icon="radio_button_checked" @click="store.setInactiveCart(id)" />
      <q-btn v-show="store.carts.length > 1" v-else flat round color="primary" icon="radio_button_unchecked" @click="store.setActiveCart(id)" />
      <q-btn flat round color="primary" icon="add_shopping_cart" @click="store.addCart()" />
      <q-btn v-if="store.carts.length > 1" flat round color="red" title="Удалить корзину" icon="delete" @click="store.deleteCart(id)" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="store.cart(id).expanded" v-if="store.cart(id).items.length > 0">
        <q-list class="mb-sm">
          <ProductListItem style="max-width:70%" v-for="item in store.cart(id).items" :key="item.id" v-bind="item" :cartId="id" />
        </q-list>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>

import { useSelectStore } from 'stores/select'
import ProductListItem from './ProductListItem.vue'

const store = useSelectStore()
const props = defineProps({ id: Number })


</script>
