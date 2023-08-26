import { defineStore } from 'pinia'
import {
  ref,
  inject,
  computed,
} from 'vue';


export const useSearchStore = defineStore('search',
  () => {

    const api = inject("api");
    const rawItems = ref([])
    const query = ref("")
    const items = computed(() => rawItems.value.filter((item) => query.value != ""
      ? item.name.toLowerCase().indexOf(query.value.toLowerCase()) > -1
      : true)
    );

    const search = async () => {
      rawItems.value = await api.itemSearch();
    }

    return {
      query,
      items,
      search
    }


  });
