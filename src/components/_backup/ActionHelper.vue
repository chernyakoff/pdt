<template>
  <div v-if="visible" class="bg-white" style="margin-top:10px;border-radius:3px;height:66px;display:flex;align-items:center">
    <q-list style="width:80%">
      <q-item>
        <template v-if="store.move.fromCart > 0">
          <q-item-section class="col-1  q-pa-sm">
            <q-avatar size="32px" text-color="white" icon="shopping_cart" color="teal" />
          </q-item-section>
          <q-item-section class="col-1">
            <q-item-label>{{ store.cart(store.move.fromCart).label }}</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 q-pa-sm">
            <q-avatar size="32px" text-color="teal" icon="arrow_forward_ios" color="white" />
          </q-item-section>
        </template>
        <template v-if="store.move.fromCart > 0 && store.move.toCell < 1 && store.move.toCart < 1">
          <q-item-section class="col-10">
            <q-item-label caption>Выберите ячейку или другую корзину</q-item-label>
          </q-item-section>
        </template>
        <template v-if="store.move.toCell > 0">
          <q-item-section class="col-1 q-pa-sm">
            <q-avatar size="32px" text-color="white" icon="inbox" color="teal" />
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label>{{ store.cell(store.move.toCell).label }}</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 q-pa-sm">
            <q-avatar size="32px" text-color="teal" icon="arrow_forward_ios" color="white" />
          </q-item-section>
        </template>
        <template v-if="store.move.toCart > 0">
          <q-item-section class="col-1 q-pa-sm">
            <q-avatar size="32px" text-color="white" icon="shopping_cart" color="teal" />
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label>{{ store.cell(store.move.toCart).label }}</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 q-pa-sm">
            <q-avatar size="32px" text-color="teal" icon="arrow_forward_ios" color="white" />
          </q-item-section>
        </template>
        <template v-if="store.move.fromCart > 0 && (store.move.toCell > 0 || store.move.toCart > 0)">
          <q-item-section class="col-2 q-mr-sm">
            <q-btn unelevated rounded color="teal" size="md" label="Переместить" />
          </q-item-section>
          <q-item-section class="col-2">
            <q-btn outline rounded color="teal" size="md" label="Сбросить" @click="$event => store.clearMove()" />
          </q-item-section>
        </template>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>

import { storeToRefs } from 'pinia';
import { useSelectStore } from 'stores/select';
import { ref, inject, computed } from 'vue';

const store = useSelectStore()

const { move, step } = storeToRefs(store)

const visible = computed(() => store.move.fromCart > 0 || store.move.toCell > 0 || store.move.toCart > 0)


const getText = (step) => {
  if (step == 1) return ' For each ad campaign that you create, you can control how much you\'re willing to  spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.'
  if (step == 2) {
    if (move.toCell > 0) return 'toCell toCellAn ad group contains one or more ads which target a shared set of keywords.'
    if (move.toCart > 0) return 'toCart toCart ad group contains one or more ads which target a shared set of keywords.'
  }
}

const getTitle = (step) => {
  if (step == 1) return store.cart(move.fromCart).label
  if (step == 2) {
    if (move.toCell > 0) return store.cell(move.toCell).label
    if (move.toCart > 0) return store.cart(move.toCart).label
  }
}

const getIcon = (step) => {
  if (step == 1) return 'shopping_cart'
  if (step == 2) {
    if (move.toCell > 0) return 'inbox'
    if (move.toCart > 0) return 'shopping_cart'
  }
}



</script>
