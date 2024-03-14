<template>
  <q-page class="bg-white text-gray">
    <suspense>
      <settings-panel />
    </suspense>
  </q-page>
</template>
<script setup>
import SettingsPanel from "components/settings/SettingsPanel.vue";
</script>
