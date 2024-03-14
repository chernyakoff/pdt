<template>
  <q-page class="bg-white text-gray">
    <!-- <simulate-panel /> -->
    <search-toolbar />
    <Suspense>
      <search-results />
    </Suspense>
  </q-page>
</template>

<script setup>
import SearchToolbar from "components/search/SearchToolbar.vue";
import SearchResults from "components/search/SearchResults.vue";
//import SimulatePanel from "components/tools/SimulatePanel.vue";
</script>
