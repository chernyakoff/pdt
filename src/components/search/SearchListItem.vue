<template>
  <q-item>
    <q-item-section top avatar
      ><search-item-image :id="id" :image="image" :total="total"
    /></q-item-section>
    <q-item-section bottom>
      <q-item-label lines="2">{{ name }} </q-item-label>
      <q-item-label class="q-gutter-sm">
        <span class="text-caption text-blue-grey-7">{{ code }}</span>
        <q-badge
          class="unselectable"
          outline
          color="secondary"
          v-for="(cell, index) in cells"
          :key="index"
          :label="cell.name"
        />
      </q-item-label>
    </q-item-section>
    <q-space />
    <q-item-section top side>
      <div class="q-gutter-sm">
        <q-badge color="purple" :label="total" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import SearchItemImage from "components/search/SearchItemImage.vue";

const props = defineProps({
  id: Number,
  name: Number,
  code: String,
  image: String,
  total: Number,
  stock: Object,
  cells: Array,
});
</script>
