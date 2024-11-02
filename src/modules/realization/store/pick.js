import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usePickStore = defineStore('realization-pick', () => {


    const data = reactive({})


    const pick = (id, item, total = 1) => {
        if (!data[id]) data[id] = {}
        if (!data[id][item]) data[id][item] = 0
        data[id][item] += total
    }

    const unpick = (id, item, total = 1) => {
        if (!data[id]) data[id] = {}
        if (!data[id][item]) data[id][item] = 0
        if (data[id][item] - total >= 0) data[id][item] -= total
    }
    const update = (id, item, total) => {
        if (!data[id]) data[id] = {}
        data[id][item] = total
    }

    const get = (id, item) => !data[id] || !data[id][item] ? 0 : data[id][item]


    const updateItems = (id, items) => items.map(x => {
        x.found = get(id, x.id)
        return x
    })



    return { data, pick, unpick, update, updateItems, get }

}, { persist: true })
