import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useApi } from 'composables'
import { useSettingsStore } from 'store/settings';
import { usePickStore, useCellStore } from './index.js';


export const useEditStore = defineStore('realization-edit', () => {


    const pickStore = usePickStore();
    const settings = useSettingsStore()
    const cellStore = useCellStore();
    const api = useApi(settings.stock);


    const realization_id = ref(null);
    const item_id = ref(null)

    const index = ref(0)

    const item = ref({})

    const cells = computed(() => cellStore.all(realization_id.value, item_id.value))

    const accepted = computed(() => cellStore.accepted(realization_id.value, item_id.value))

    const found = computed(() => pickStore.get(realization_id.value, item_id.value))

    const addCell = (cell = null) => {
        if (!cell) cell = {
            id: settings.cells[0].value,
            total: 0
        }
        cellStore.add(realization_id.value, item_id.value, cell)
        index.value = cellStore.lastIndex(realization_id.value, item_id.value)
    }

    const pick = (index, total = 1) => {
        if (found.value - total >= 0) {
            cellStore.pick(realization_id.value, item_id.value, index, total)
            pickStore.unpick(realization_id.value, item_id.value, total)
        }
    }

    const unpick = (index, total = 1) => {
        if (accepted.value - total >= 0) {
            cellStore.unpick(realization_id.value, item_id.value, index, total)
            pickStore.pick(realization_id.value, item_id.value, total)
        }
    }

    const removeCell = (i) => {
        const { total } = getCell(i)
        cellStore.remove(realization_id.value, item_id.value, i)
        pickStore.pick(realization_id.value, item_id.value, total)
        index.value = cellStore.lastIndex(realization_id.value, item_id.value)
    }

    const getCell = (index) => cellStore.get(realization_id.value, item_id.value, index)


    const init = async (rid, iid) => {
        realization_id.value = rid;
        item_id.value = iid;
        item.value = await api.realization.edit(realization_id.value, item_id.value)
        index.value = cellStore.lastIndex(realization_id.value, item_id.value)
    }


    return {
        realization_id,
        item_id,
        item,
        accepted,
        found,
        init,
        addCell,
        removeCell,
        getCell,
        pick,
        unpick,
        cells,
        index
    }

})
