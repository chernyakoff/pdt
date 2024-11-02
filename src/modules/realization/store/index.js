import { defineStore } from 'pinia'
import { useApi, useInitStore } from 'composables'
import { useSettingsStore } from 'store/settings'
import { useDetailStore } from './detail';
import { useEditStore } from './edit';
import { usePickStore } from './pick';
import { useCellStore } from './cell';
import { ref } from 'vue';

const useIndexStore = defineStore('realization-index', () => {

    const settings = useSettingsStore()

    const api = useApi()

    const realizations = ref([])

    const { initialized, loading } = useInitStore(async () => {
        realizations.value = await api.realization.index(settings.stock);
    });


    return { realizations, initialized, loading }

})

export {
    useIndexStore, useDetailStore, useEditStore, usePickStore, useCellStore
}
