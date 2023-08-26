import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useSettingsStore = defineStore('settings', () => {
  const manualMode = ref(false);
  const confirm = ref(false);
  const apiUrl = process.env.API_URL;


  return {
    manualMode, apiUrl, confirm
  }

})
