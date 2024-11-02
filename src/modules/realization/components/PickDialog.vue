<template>
    <q-dialog v-model="store.showDialog">
        <q-card style="width: 350px">
            <q-card-section> {{ item.name }} <q-badge
                    class="column unselectable"
                    outline
                    color="secondary"
                    v-for="(skuValue, skuName) in item.skus"
                    :key="skuName"
                    :label="`${skuName}: ${skuValue}`" /> </q-card-section>
            <q-card-section>
                <q-input
                    label="Количество"
                    square
                    v-model.number="total"
                    tabindex="1"
                    type="number"
                    lazy-rules
                    :hint="`нужно ${item.needed} шт.`"
                    :rules="rules" />
            </q-card-section>
            <q-card-actions class="text-primary float-right">
                <q-btn flat label="Закрыть" type="reset" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { useDetailStore, usePickStore } from "../store";
import { computed, ref } from 'vue';
const store = useDetailStore();
const pickStore = usePickStore();
const rules = [
    (val) => (val && val > 0) || 'укажите количество',
]

const item = computed(() => store.getItem(store.item))


const total = computed({
    get: () => item.value.found,
    set: (v) => {
        pickStore.update(store.id, store.item, v)
    }
})



</script>
