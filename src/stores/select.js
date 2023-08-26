import { defineStore } from 'pinia'
import {
  ref,
  inject,
  computed,
  watch
} from 'vue';
import { Notify } from 'quasar'
import { Fabric, Cart } from './classes'


export const useSelectStore = defineStore('select',
  () => {
    const confirmDialog = inject('confirmDialog')
    const carts = ref([])
    const cells = ref([])
    const api = inject('api');

    const move = ref({
      toCart: 0,
      toCell: 0,
      fromCart: 0
    })

    const step = ref(0)

    const resolveCode = async (code) => {
      const response = await api.codeResolve(code);
      if (!response) return
      if (response.type === 'product') {
        const _cart = carts.value.find(item => item.active == true);
        if (typeof _cart !== 'undefined') {
          _cart.add(response.data)
          _cart.expanded = true
        }
      } else {
        addCell(response.data)
      }
    }

    const cart = (id = null) => {
      return id ? carts.value.find(item => item.id == id) : activeCart.value
    }

    const activeCart = computed(() => carts.value.find(item => item.active == true));

    const init = () => {
      if (carts.value.length < 1) addCart();
    }

    const addCart = () => {
      const id = Cart.makeId(carts);
      carts.value.push(Fabric.make('Cart', { id, active: true, expanded: true }));
      setActiveCart(id)
    }

    const setActiveCart = (id) => {
      for (const cart of carts.value) {
        if (cart.id !== id) {
          cart.active = false;
          cart.expanded = false;

        } else {
          cart.active = true;
          cart.expanded = true;
        }
      }
    }

    const setInactiveCart = (id) => {
      cart(id).active = false
      cart(id).expanded = false
    }


    const cell = (id) => {
      return cells.value.find(cell => cell.id === id)
    }

    const addCell = (props) => {
      if (!cell(props.id)) {
        if (props.contents.length > 0) props.expanded = true
        cells.value.push(Fabric.make('Cell', props));

      }
    }

    const deleteItem = (cartId, productId, contentId = null) => {
      confirmDialog(() => {
        cart(cartId).delete(productId, contentId)
      })
    }

    const deleteCell = (id) => {
      confirmDialog(() => {
        cells.value = cells.value.filter(item => item.id !== id);
      })
    }

    const deleteCart = (id) => {
      if (carts.value.length > 1) {
        confirmDialog(() => {
          carts.value = carts.value.filter(cart => {
            return cart.id !== id;
          });
        })
      } else Notify.create('Нельзя удалить единственную корзину')
    }

    const setSourceCart = (id) => {
      move.value.fromCart = id
      step.value = 1
    }

    const setDestinationCart = (id) => {
      if (move.value.fromCart < 1) return false
      move.value.toCart = id
      step.value = 2
    }

    const setDestinationCell = (id) => {
      if (move.value.fromCart < 1) return false
      move.value.toCell = id
      step.value = 2
    }

    const clearMove = () => {
      move.value = {}
    }



    return {
      init,
      resolveCode,

      cart,
      addCart,
      deleteCart,
      setActiveCart,
      setInactiveCart,

      activeCart,


      deleteItem,
      cell,
      addCell,
      deleteCell,

      setSourceCart,
      setDestinationCart,
      setDestinationCell,

      carts,
      cells,
      move,
      clearMove,
      step
    }
  })
