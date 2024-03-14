<template>
  <div class="fit row wrap justify-center items-start content-start">
    <q-layout class="app-layout" view="lhr lpr lfr">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat href="/">
            <div class="logo"></div>
          </q-btn>
          <q-toolbar-title>
            <div class="q-pl-10">{{ $route.meta.title }}</div>
          </q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer" />
        </q-toolbar>
      </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
          <q-item clickable exact :to="{ name: 'home' }">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>ТСД</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/stock/cell/move">
            <q-item-section avatar>
              <q-icon name="swap_horiz" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Перемещение</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/stock/cell/move-v1">
            <q-item-section avatar>
              <q-icon name="all_inbox" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Содержимое склада</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable exact :to="{ name: 'settings' }">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Настройки</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
  <vue-easy-lightbox
    :visible="lightbox.visible"
    :imgs="lightbox.images"
    :index="lightbox.index"
    @hide="lightbox.onHide()" />
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "stores/settings";
import { useLightboxStore } from "stores/lightbox";
import { useMeta } from "quasar";
const settings = useSettingsStore();
const lightbox = useLightboxStore();
const route = useRoute();
useMeta({
  title: route.meta.title,
});


await settings.init()

if (!settings.stock) {
  settings.stock = settings.stocks[0].value
}

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
