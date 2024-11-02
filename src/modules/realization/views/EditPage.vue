<template>
    <q-page class="bg-white text-gray">
        <q-list
            class="list-no-y-borders"
            padding>
            <q-item class="no-top-border">
                <div class="avatar-col">
                    <q-avatar size="60px"><item-image width="60px" :id="Number(store.item.id)" :image="store.item.image" /></q-avatar>
                </div>
                <div class="title-col">
                    <div>{{ store.item.name }}</div>
                    <div class="q-gutter-x-xs q-pt-sm">
                        <q-badge
                            @click.stop="toClipboard(skuValue)"
                            class="column unselectable"
                            outline
                            color="secondary"
                            v-for="(skuValue, skuName) in store.item.skus"
                            :key="skuName"
                            :label="`${skuName}: ${skuValue}`" />
                    </div>
                </div>
            </q-item>
            <q-item class="q-gutter-sm no-bottom-border">
                <div class="col-4 text-no-wrap text-caption">Заказано: {{ store.item.needed }}</div>
                <div class="col-4 text-no-wrap text-caption">Подобрано: {{ store.found }}</div>
                <div class="col-4 text-no-wrap text-caption">Распределено: {{ store.accepted }}</div>
            </q-item>
            <edit-cell v-for="(cell, index) in store.cells" :key="index" :index="index" />
            <q-item class="q-gutter-sm justify-between">
                <q-btn rounded flat icon="west" text-color="grey" label="Вернуться" :to="{ name: 'realization-detail', params: { id: store.realization_id } }" />
                <q-btn rounded flat icon="add" label="Добавить ячейку" @click.stop="store.addCell()" />
            </q-item>
            <!-- <q-item class="q-gutter-sm  justify-between">
                <q-btn rounded glossy label="C0000004" @click.stop="resolve('C0000004')" />
                <q-btn rounded glossy label="139406382" @click.stop="resolve('139406382')" />
                <q-btn rounded glossy label="169024435" @click.stop="resolve('169024435')" />
                <q-btn rounded glossy label="C0000305" @click.stop="resolve('C0000305')" />
            </q-item> -->
        </q-list>
    </q-page>
</template>
<script setup>
import { useOnscan, useApi } from 'composables'
import ItemImage from 'components/ItemImage.vue'
import EditCell from '../components/EditCell.vue'
import { useEditStore, useCellStore } from '../store'
import { useRouter, useRoute } from 'vue-router'
import notify from 'libs/notify'
import { inject } from 'vue'

const api = useApi()
const router = useRouter()
const route = useRoute()
const cellStore = useCellStore()
const store = useEditStore()
await store.init(route.params.id, route.params.item)
const toClipboard = inject('toClipboard')
const resolve = async (code) => {

    const response = await api.realization.editResolve(store.realization_id, code)

    if (!response) {
        return notify('notfound')
    }

    switch (response.type) {
        case 'product':
            if (response.id != store.item_id) {
                router.push({
                    name: 'realization-edit',
                    params: {
                        id: store.realization_id,
                        item: response.id,
                    }
                })
                await store.init(route.params.id, response.id)
            } else {
                // добавить товар в выбранную ячейку
                // по дефолту последняяячейка в списке
            }
            break
        case 'cell':
            const data = cellStore.all(store.realization_id, store.item_id)
            const foundIndex = data.findIndex(x => x.id == response.id)
            if (foundIndex >= 0) {
                console.log(foundIndex)
                store.index = foundIndex
            } else {
                store.addCell({ id: response.id, total: 0 })
            }
            break

    }

}


useOnscan(window, resolve)


</script>
<style scoped>
.avatar-col {
    width: 20%;
}

.title-col {
    width: 80%;
    padding-left: 10px;
}
</style>
