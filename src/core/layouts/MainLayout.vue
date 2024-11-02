<template>
    <div class="fit row wrap justify-center items-start content-start">
        <q-layout class="app-layout" view="lhr lpr lfr">
            <q-header elevated>
                <q-toolbar>
                    <q-btn flat href="/">
                        <div class="logo"></div>
                    </q-btn>
                    <q-toolbar-title>
                        <div class="q-pl-10">{{ title }}</div>
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
                <main-menu />
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
        @hide="lightbox.hide()" />
</template>
<script setup>
import { ref, computed } from "vue";
import MainMenu from 'components/MainMenu.vue';
import { useLightboxStore } from "store/lightbox";
import { useSettingsStore } from "store/settings";
import { useRoute } from 'vue-router';
import { useMeta } from 'quasar';
const settings = useSettingsStore()
await settings.init()
const route = useRoute()
const titles = {
    'home-index': 'Главная',
    'order-index': 'Продажи',
    'setting-index': 'Настройки',
    'realization-index': 'Список заборов',
    'realization-detail': (route) => 'Забор ' + route.params.id,
    'realization-edit': (route) => route.params.id + ' / ' + route.params.item,
}

const title = computed(() => titles[route.name] ? typeof (titles[route.name]) == 'string' ? titles[route.name] : titles[route.name](route) : 'ТСД');

useMeta(() => ({
    title: title.value
}));

const lightbox = useLightboxStore();
const leftDrawerOpen = ref(true);
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>
