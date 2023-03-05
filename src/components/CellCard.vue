<template>
  <q-card class="cell-component" bordered>
    <q-item>
      <q-item-section
        avatar>
        <q-icon name="inbox" color="teal" size="4.4em" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Ячейка: {{ name }}</q-item-label>
        <q-item-label caption>Склад: {{ stock }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup>
const props = defineProps({

  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },

  stock: {
    type: String,
    required: true
  },
});
</script>
