<template>
  <q-page class="bg-white text-gray">
    <search-panel />
    <Suspense>
      <search-results />
    </Suspense>
  </q-page>
</template>

<script setup>
import SearchPanel from "components/search/SearchPanel.vue";
import SearchResults from "components/search/SearchResults.vue";
</script>
