<template>
    <q-page class="bg-white text-gray">
        <q-list
            separator padding>
            <detail-info v-bind="store.info" />
            <q-item
                :active="store.item == item.id"
                active-class="active"
                v-for="(item, index) in store.items"
                :key="index"
                v-bind="item">
                <q-item-section center avatar><item-image :id="Number(item.id)" :image="item.image" /></q-item-section>
                <q-item-section bottom>
                    <q-item-label lines="2">
                        <router-link @click="store.item = item.id" v-ripple class="main-btn" :to="{ name: 'realization-edit', params: { id: store.id, item: item.id } }">{{ item.name }} </router-link></q-item-label>
                    <q-item-label class="q-gutter-sm row">
                        <q-badge
                            @click.stop="toClipboard(skuValue)"
                            class="column unselectable"
                            outline
                            color="secondary"
                            v-for="(skuValue, skuName) in item.skus"
                            :key="skuName"
                            :label="`${skuName}: ${skuValue}`" />
                    </q-item-label>
                    <q-item-label class="q-gutter-sm row">
                        <div class="column" v-for="(cell, index) in item.cells" :key="index">
                            <div class="row">
                                <div class="column">{{ cell.name }}</div>
                                <div class="column">{{ cell.total }}</div>
                            </div>
                        </div>
                    </q-item-label>
                </q-item-section>
                <q-space />
                <q-item-section top side class="q-gutter-sm row" v-ripple @click="showDialog(item.id)" style="cursor:pointer">
                    <q-badge class="column" color="purple" :label="item.needed" />
                    <q-badge size="md" class="column" color="teal" :label="item.found" />
                    <q-badge size="md" class="column" color="orange" :label="accepted(item.id)" />
                </q-item-section>
            </q-item>
            <q-item v-if="errors.length">
                <q-list>
                    <q-item v-for="(e, i) in errors" :key="i" class="red">{{ e }}</q-item>
                </q-list>
            </q-item>
            <q-item>
                <q-btn label="Принять товар" @click.stop="showConfirm = true" />
            </q-item>
        </q-list>
    </q-page>
    <pick-dialog />
    <q-dialog v-model="showConfirm">
        <q-card>
            <q-card-section>
                <div class="text-h6">Вы уверены?</div>
                <div class="text-subtitle2">Действие невозможно отменить</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
                <q-btn color="grey" label="Отмена" v-close-popup />
                <q-btn color="green" label="OK" @click="submit()" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>

import { useOnscan, useApi } from 'composables';
import { useDetailStore, useCellStore, usePickStore } from "../store";
import { computed, inject, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import DetailInfo from "../components/DetailInfo.vue";
import ItemImage from "components/ItemImage.vue";
import PickDialog from "../components/PickDialog.vue";
const api = useApi()
const toClipboard = inject('toClipboard')
const store = useDetailStore();
await store.init()
useOnscan(window, store.resolve)

const showConfirm = ref(false)
const cellStore = useCellStore()
const pickStore = usePickStore()
const errors = ref({})
const router = useRouter()

const accepted = computed(() => {
    return (item) => cellStore.accepted(store.id, item)
})
const showDialog = (id) => {
    store.showDialog = true
    store.item = id
}

const submit = async () => {
    if (cellStore.data[store.id]) {
        const response = await api.realization.submit(store.id, cellStore.data[store.id])
        console.log(response)
        if (response.errors) {
            errors.value = response.errors
            setTimeout(() => {
                errors.value = []
            }, 3000)
        }
        if (response.success) {
            cellStore.data[store.id] = null
            pickStore.data[store.id] = null
            router.push({
                name: 'realization-index',
                params: {
                    id: store.realization_id,
                    item: response.id,
                }
            })
        }


    }
}

</script>
<style scoped>
.main-btn {
    color: #263238 !important;
    text-decoration: none;
}

.red {
    color: red;
}

.active {
    border-left: 3px solid red;
}
</style>
