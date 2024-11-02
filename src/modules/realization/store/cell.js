import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCellStore = defineStore('realization-cell', () => {


    const data = reactive({})

    const all = (id, item) => {
        try {

            return data[id][item]
        } catch (e) {
            return null
        }
    }

    const lastIndex = (id, item) => {
        try {
            return data[id][item].length - 1
        } catch (e) {
            return 0
        }
    }

    const get = (id, item, index) => {
        try {
            return data[id][item][index]
        } catch (e) {
            return null
        }
    }

    const unpick = (id, item, index, total = 1) => {
        const cell = get(id, item, index)
        if (cell && cell.total - total >= 0) updateTotal(id, item, index, cell.total - total)
    }

    const pick = (id, item, index, total = 1) => {
        const cell = get(id, item, index)
        if (cell) updateTotal(id, item, index, cell.total + total)
    }

    const updateTotal = (id, item, index, total) => {
        data[id][item][index]['total'] = total
    }



    const accepted = (id, item) => {
        let result = 0
        try {
            for (let cell of data[id][item]) {
                result += Number(cell.total)
            }
            return result
        } catch (e) {
            return 0
        }
    }

    const add = (id, item, cell) => {
        if (!data[id]) data[id] = {}
        if (!data[id][item]) data[id][item] = []
        data[id][item].push(cell)
    }

    const remove = (id, item, index) => {
        try {
            data[id][item].splice(index, 1)
        } catch (e) {
            return null
        }
    }

    return { get, all, add, remove, accepted, pick, unpick, lastIndex, data }

}, { persist: true })
