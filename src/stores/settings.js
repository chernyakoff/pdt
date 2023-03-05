import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useSettingsStore = defineStore('settings', () => {


  const manualMode = ref(false);

  return {
    manualMode
  }

})
