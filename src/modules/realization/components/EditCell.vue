<template>
    <q-item>
        <div class="icon-col">
            <q-btn
                :color="store.index == index ? 'green' : 'grey-5'" round size="md" unelevated icon="inbox" @click.stop="store.index = index" />
        </div>
        <div class="cell-col">
            <q-select
                @focus="store.index = index"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                emit-value
                map-options
                dense
                outlined
                @filter="filterFn"
                v-model="cell.id"
                :options="options" />
        </div>
        <div class="amount-col">
            <q-input class="column" v-model.number="total" outlined dense input-style="text-align: center" ref="input" @focus="store.index = index">
                <template v-slot:prepend>
                    <q-btn round dense flat icon="remove_circle" @click.stop="total--; store.index = index" />
                </template>
                <template v-slot:append>
                    <q-btn round dense flat icon="add_circle" @click.stop="total++; store.index = index" />
                </template>
            </q-input>
        </div>
        <div class="close-col">
            <q-btn padding="xs" rounded flat color="white" text-color="red" icon="close" @click.stop="store.removeCell(index)" />
        </div>
    </q-item>
</template>
<script setup>
import { useSettingsStore } from 'store/settings';
import { useEditStore } from '../store/';

import { computed, ref } from 'vue';

const input = ref(null)

const props = defineProps({
    index: Number,

});
const settings = useSettingsStore();
const store = useEditStore()

const options = ref(settings.cells)

const cell = computed(() => store.getCell(props.index))


const total = computed({
    get: () => cell.value.total,
    set: (nv) => {
        let amount;
        const ov = cell.value.total
        if (nv < 0) return

        if (nv > ov) {

            if (store.found - (nv - ov) >= 0) {
                amount = nv - ov
            } else {
                amount = store.found
                input.value.blur()
            }


            store.pick(props.index, amount)
        } else if (ov > nv) {
            // decr
            if (store.accepted - (ov - nv) >= 0) {
                amount = ov - nv
            } else {
                amount = store.accepted
            }
            store.unpick(props.index, amount)
        }
    },
})



const filterFn = (val, update) => {

    if (val === '') {
        update(() => options.value = settings.cells)
        return
    }
    update(() => {
        const needle = val.toLowerCase()
        options.value = settings.cells.filter((v) => {
            return v.label.toString().toLowerCase().indexOf(needle) > -1
        })
    })
}

</script>
<style scoped>
.icon-col {
    width: 13%;
}

.cell-col {
    width: 37%;
    padding-right: 10px;
}

.amount-col {
    width: 42%;
}

.close-col {
    width: 8%;
}
</style>
