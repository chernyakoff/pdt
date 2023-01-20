import { defineStore } from 'pinia'
import { api } from 'boot/api';

export const useCodeStore = defineStore('code', {
  state: () => ({
    type: null,
    data: null
  }),

  actions: {
    async check (code) {
      const response = await api.checkCode(code);
      this.type = response.type;
      this.data = response.data;

    }
  }
})
