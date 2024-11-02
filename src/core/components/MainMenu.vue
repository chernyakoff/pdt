<template>
    <q-list>
        <template v-for="(item, index) in items" :key="index">
            <q-item v-if="item.to"
                clickable
                v-ripple
                :active="link === index"
                @click="link = index"
                active-class="my-menu-link" tag="a" :to="item.to">
                <q-item-section avatar>
                    <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item v-else
                clickable
                v-ripple
                :active="link === index"
                @click="link = index"
                active-class="my-menu-link" tag="a" :href="item.href">
                <q-item-section avatar>
                    <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>
    </q-list>
</template>
<script setup>
import { ref } from 'vue';
const items = ref([
    {
        label: 'ТСД',
        icon: 'home',
        to: { name: "home-index" },
    },
    {
        label: 'Создать забор',
        icon: 'swipe_left',
        href: '/stock/realization/create',

    },
    {
        label: 'Приемка',
        icon: 'outbox',
        to: { name: 'realization-index' },
    },
    {
        label: 'Продажи',
        icon: 'outbox',
        to: { name: 'order-index' },
    },
    {
        label: 'Перемещение',
        icon: 'swap_horiz',
        href: '/stock/cell/move',
    },
    {
        label: 'Содержимое склада',
        icon: 'all_inbox',
        href: '/stock/cell/move-v1',
    },
    {
        label: 'Настройки',
        icon: 'settings',
        to: { name: 'settings-index' },
    },
]);
const link = ref(null)
</script>
