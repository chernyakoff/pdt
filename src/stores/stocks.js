import { defineStore } from 'pinia'
import { ref, inject } from 'vue'

export const useStocksStore = defineStore('stocks', () => {
  const api = inject('api')
  const list = ref([])
  const load = async () => {
    list.value = await api.stocks()
  }
  return { list, load }

})
