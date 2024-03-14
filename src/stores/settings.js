import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {

  const stock = ref(null)
  return { stock }

},
  {
    persist: true,
  })
