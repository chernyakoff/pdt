import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useInitStore, useApi } from 'composables';
import { usePickStore } from './pick.js';
import { useRoute } from 'vue-router';
import { useSettingsStore } from 'store/settings'
import notify from 'libs/notify.js';
import cast from 'libs/cast.js';

export const useDetailStore = defineStore('realization-detail', () => {


    const itemSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'number'
            },
            total: {
                type: 'number'
            }
        }
    }

    const infoSchema = {
        type: 'object',
        properties: {
            total: {
                type: 'number'
            }
        }
    }


    const batchCasting = (items, schema) => items.map(x => cast(x, schema))

    const settings = useSettingsStore()
    const api = useApi(settings.stock)
    const route = useRoute()
    const info = ref({});
    const item = ref(null);
    const _items = ref([]);

    const showDialog = ref(false);

    const pickStore = usePickStore();
    const id = computed(() => route.params.id)
    const items = computed(() => pickStore.updateItems(id.value, _items.value))

    const getItem = (id) => items.value.find(x => x.id == id)

    const init = async () => {
        const response = await api.realization.detail(id.value);
        info.value = cast(response.info, infoSchema)
        info.value.id = Number(info.value.id)
        _items.value = batchCasting(response.items, itemSchema)
    }


    const resolve = async (code) => {

        const response = await api.realization.resolve(id.value, code)

        if (!response) {
            notify('notfound')
            return
        }

        if (response.error) {
            notify(response.error)
        }

        if (response.type === 'product') {
            item.value = response.id
            pickStore.pick(id.value, response.id)
            return
        }

    }

    return {
        init,
        info,
        items,
        item,
        id,
        resolve,
        showDialog,
        getItem

    }

})
