<template>
    <q-page class="bg-white text-gray">
        <q-list
            class="list-no-y-borders"
            bordered
            separator
            padding>
            <q-item v-for="(item, index) in  store.realizations "
                :key="index"
                v-bind="item">
                <q-item-section top avatar>
                    <q-btn class=" btn" color="primary" :label="item.id" :to="{ name: 'realization-detail', params: { id: item.id } }" />
                </q-item-section>
                <q-item-section bottom>
                    <q-item-label lines="2">{{ item.username }}</q-item-label>
                    <q-item-label class="q-gutter-sm">
                        <span class="text-caption text-blue-grey-7">{{ item.userphone }}</span>
                    </q-item-label>
                </q-item-section>
                <q-space />
                <q-item-section center side>
                    {{ item.date }}
                </q-item-section>
                <q-item-section center side>
                    <div class="q-gutter-sm">
                        <q-badge color="purple" :label="item.total" />
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>
<script setup>

import { useIndexStore } from "../store"
const store = useIndexStore()
</script>
<style scoped>
.btn {
    min-width: 70px;
}
</style>
