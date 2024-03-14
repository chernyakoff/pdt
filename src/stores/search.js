import { defineStore } from 'pinia'
import {
  ref,
  inject,
  computed
} from 'vue';
import { Notify } from 'quasar'
import { useSettingsStore } from "stores/settings";
const notify = (type, message = '') => {

  const ntypes = {
    'notfound': {
      position: 'top',
      type: 'negative',
      message: 'Товар с таким кодом не найден'
    },
    'notinlist': {
      position: 'top',
      type: 'warning',
      message: 'Товара с таким кодом нет в новых продажах'
    },
    'error': {
      position: 'top',
      type: 'negative',
      message: 'Ошибка'
    },
    'success': {
      position: 'top',
      type: 'positive',
      message: 'Товар подобран'
    }
  }
  const params = ntypes[type]
  if (message) {
    params.message = message
  }
  Notify.create(params)
}

export const useSearchStore = defineStore('search',
  () => {
    const settings = useSettingsStore()
    const api = inject("api");
    const rawItems = ref([])
    const orderIds = ref([])
    const order = ref(null)
    const query = ref("")
    const product = ref(null)
    const total = ref(null)
    const cell = ref(null)
    const showDialog = ref(false)
    const filterByOrder = (item) => order.value != null ? item.order_id == order.value : true

    const filterByQuery = (item) => query.value != "" ? `${item.name} ${item.code}`.toLowerCase().indexOf(query.value.toLowerCase()) > -1 : true
    const items = computed(() => rawItems.value.filter(item => filterByOrder(item) && filterByQuery(item)));
    const notLoaded = ref(true)


    const search = async () => {

      rawItems.value = await api.search(settings.stock)
      orderIds.value = [...new Set(rawItems.value.map(item => item.order_id))];
      notLoaded.value = false
    }

    const select = async () => {
      showDialog.value = false;

      const item = rawItems.value.find(o => o.id === product.value.id);
      const response = await api.select({
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
        await search()
      }
    }

    const resolve = async (code) => {


      const response = await api.resolve(code);
      if (!response) {
        notify('notfound')
        return
      }
      if (response.type === 'product') {

        const needed = rawItems.value.find(o => o.id === response.id);
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
      search,
      resolve,
      select,
      notLoaded,
      orderIds,
      order,
      showDialog,
      product,
      total,
      cell
    }


  });
