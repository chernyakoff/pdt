<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn round :href="apiUrl" target="_blank">
            <q-avatar size="42px">
              <img src="/assets/pdt/icons/favicon-96x96.png">
            </q-avatar>
          </q-btn> Терминал Сбора Данных </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

const apiUrl = process.env.API_URL;

</script>
