import { defineStore } from 'pinia'
import { ref, inject, computed } from 'vue'
import { LocalStorage } from 'quasar'

export const useSettingsStore = defineStore('settings', () => {

  const api = inject("api");
  const stocks = ref([]);

  const notLoaded = ref(true);

  const stock = computed({
    get () {
      return LocalStorage.getItem('stock')
    },
    set (v) {
      LocalStorage.set('stock', v)
    },
  })

  const init = async () => {
    stocks.value = await api.stocks()
    notLoaded.value = false
  }

  return {
    stocks, stock, notLoaded, init
  }

})
