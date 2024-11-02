import { defineStore } from 'pinia';

import { computed, ref } from 'vue';
import { useApi } from 'composables';

export const useSettingsStore = defineStore('settings', () => {

    const api = useApi()

    const stock = ref(null)

    const stocks = ref([])
    const cells = ref([])
    const firstCell = computed(() => cells.value[0])

    const init = async () => {

        if (stock.value && typeof stock.value != 'number') {
            localStorage.removeItem('settings')
        }

        if (stocks.value.length < 1) stocks.value = await api.common.stocks()

        if (!stock.value && stocks.value.length > 0) {
            stock.value = Number(stocks.value[0].value)
        }

        if (stock.value && cells.value.length < 1) {
            cells.value = await api.common.cells(stock.value)
        }

    }

    return { stock, stocks, cells, firstCell, init }

}, {
    persist: {
        storage: localStorage,
        paths: ['stock'],
    }
})
