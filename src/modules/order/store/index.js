import { defineStore } from 'pinia'
import {
    ref,
    reactive,
    computed
} from 'vue';
import { useApi, useInitStore } from 'composables';
import { useSettingsStore } from 'store/settings'

export const useIndexStore = defineStore('order-index',
    () => {

        const settings = useSettingsStore()
        const api = useApi()



        const _items = ref([])


        const orderIds = ref([])

        const order = ref(null)
        const query = ref("")
        const product = ref(null)
        const total = ref(null)
        const cell = ref(null)

        const showDialog = ref(false)

        const filterByOrder = (item) => order.value != null ? item.order_id == order.value : true

        const filterByQuery = (item) => query.value != "" ? `${item.name} ${item.code}`.toLowerCase().indexOf(query.value.toLowerCase()) > -1 : true

        const items = computed(() => _items.value.filter(item => filterByOrder(item) && filterByQuery(item)));



        const init = async () => {

            _items.value = await api.order.index(settings.stock)
            orderIds.value = [...new Set(_items.value.map(x => x.order_id))];
        }

        const { initialized, loading } = useInitStore(async () => {
            await init()
        });


        const pick = async () => {

            showDialog.value = false;

            const item = _items.value.find(o => o.id === product.value.id);
            const response = await api.order.pick({
                cell: cell.value.value,
                item: item.id,
                total: total.value,
                order: item.order_id
            });

            if (response.message != 'success') {
                notify('error', response.message)
            } else {
                total.value = null
                cell.value = null
                product.value = null
                notify('success')
                await init()
            }
        }

        const resolve = async (code) => {


            const response = await api.orders.resolve(code);
            if (!response) {
                notify('notfound')
                return
            }
            if (response.type === 'product') {

                const needed = _items.value.find(o => o.id === response.id);
                if (!needed) {
                    notify('notinlist')
                    return
                }
                if (showDialog.value === true) {
                    // пик по тому же самому продукту
                    if (response.id == product.value.id) {
                        total.value++
                        return
                    }
                }
                total.value = 1
                response.total = needed.total
                product.value = response
                product.value.options = product.value.cells.map(item => {
                    return { label: `${item.name} (${item.total} шт.)`, value: item.id, total: parseInt(item.total) }
                })
                cell.value = product.value.options[0]
                showDialog.value = true
            }
        }

        return {
            query,
            items,
            order,
            orderIds,
            resolve,
            pick,
            initialized,
            loading,
            product,
            total,
            cell,
            showDialog
        }


    });
