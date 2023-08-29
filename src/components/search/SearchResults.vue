<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-list
      style="border-top: none; border-bottom: none"
      bordered
      separator
      padding
      v-show="store.items.length > 0 || !store.notLoaded"
    >
      <SearchListItem
        v-for="(item, index) in store.items"
        :key="index"
        v-bind="item"
      />
    </q-list>
  </transition>
  <q-inner-loading :showing="store.notLoaded">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <search-dialog />
</template>

<script setup>
import { ref } from "vue";
import { useSearchStore } from "stores/search";
import SearchListItem from "components/search/SearchListItem.vue";
import SearchDialog from "components/search/SearchDialog.vue";
const store = useSearchStore();
await store.search();
</script>
