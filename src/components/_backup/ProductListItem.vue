<template>
  <q-item dense v-for="content in contents" :key="content.id" v-bind="content">
    <q-item-section class="col-1">
      <q-avatar v-if="image == ''" size="48px" text-color="white" icon="shopping_bag" color="teal" />
      <q-avatar v-else size="48px">
        <q-img height="100%" width="48px" fit="cover" position="50% 50%" :src="lightbox.getImage(id)" @click="lightbox.showImage(id)" />
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-6">
      <q-item-label>{{ name }} </q-item-label>
      <q-item-label caption>{{ code }}</q-item-label>
    </q-item-section>
    <template v-if="content.cell">
      <q-item-section class="col-2">
        <q-item-label>Ячейка: {{ content.cell.name }}</q-item-label>
        <q-item-label caption>Склад: {{ content.stock.name }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-1" v-if="content.cell">
        <q-input style="width:130px" item-aligned square dense outlined v-model="content.qty" :label="content.inputLabel" :rules="[val => val < content.total || 'Столько товара нет на складе']" />
      </q-item-section>
      <q-item-section class="col-1">
        <q-btn flat round color="red" style="width:42px;height:42px;margin-left:42px" title="Удалить товар" icon="close" @click="store.deleteItem(cartId, id, content.id)" />
      </q-item-section>
    </template>
    <template v-else>
      <q-item-section class="col-2">
        <q-item-label>Ячейка: &mdash;</q-item-label>
        <q-item-label caption>не принималось</q-item-label>
      </q-item-section>
      <q-item-section class="col-1">
        <q-input style="width:130px" item-aligned square dense outlined v-model="content.qty" :rules="[val => val < content.total || 'Столько товара нет на складе']" />
      </q-item-section>
      <q-item-section class="col-1">
        <q-btn flat round color="red" style="width:42px;height:42px;margin-left:42px" title="Удалить товар" icon="close" @click="store.deleteItem(cartId, id)" />
      </q-item-section>
    </template>
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

  contents: Array
});

lightbox.addImage(props.id, props.image)
/*
const qty = ref(props.qty);

watch(qty, (newVal) => {
  store.updateQty(props.id, newVal);
}) */



</script>
