<template>
  <q-list bordered separator padding v-if="store.items.length > 0">
    <SearchListItem
      v-for="(item, index) in store.items"
      :key="index"
      v-bind="item"
    />
  </q-list>
</template>

<script setup>
import { useSearchStore } from "stores/search";
import SearchListItem from "components/search/SearchListItem.vue";
const store = useSearchStore();
await store.search();
</script>
