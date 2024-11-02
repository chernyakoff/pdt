<template>
    <q-page class="bg-white text-gray">
        <filter-toolbar />
        <q-list
            class="list-no-y-borders"
            bordered
            separator
            padding
            v-show="store.items.length > 0 || store.initialized">
            <q-item v-for="(item, index) in store.items"
                :key="index">
                <q-item-section top avatar><item-image :id="Number(item.id)" :image="item.image" /></q-item-section>
                <q-item-section bottom>
                    <q-item-label lines="2">{{ item.name }} </q-item-label>
                    <q-item-label class="q-gutter-sm">
                        <span class="text-caption text-blue-grey-7">{{ item.code }}</span>
                        <q-badge
                            class="unselectable"
                            outline
                            color="secondary"
                            v-for="(cell, index) in item.cells"
                            :key="index"
                            :label="cell.name" />
                    </q-item-label>
                </q-item-section>
                <q-space />
                <q-item-section top side>
                    <div class="q-gutter-sm">
                        <q-badge color="purple" :label="item.total" />
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>
<script setup>
import FilterToolbar from "../components/FilterToolbar.vue";
import { useIndexStore } from "../store";
import { useOnscan } from 'composables';
import ItemImage from 'components/ItemImage.vue'
const store = useIndexStore();
useOnscan(window, store.resolve)

</script>
