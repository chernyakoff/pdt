<template>
  <div class="fit row wrap justify-center items-start content-start">
    <q-layout class="app-layout" view="lhr lpr lfr">
      <q-header elevated>
        <q-toolbar>
          <q-btn round :href="apiUrl" target="_blank">
            <q-avatar size="36px">
              <img src="/assets/pdt/icons/favicon-96x96.png">
            </q-avatar>
          </q-btn>
          <q-toolbar-title>
            <div class="q-pl-10">{{ $route.meta.title }}</div>
          </q-toolbar-title>
          <q-toggle
            v-model="settings.manualMode" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useSettingsStore } from 'stores/settings';

const settings = useSettingsStore();

</script>
