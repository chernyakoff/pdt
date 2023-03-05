import { defineStore } from 'pinia'
import { ref, inject, computed } from 'vue';
import { Notify } from 'quasar'


class Cart {

  constructor(id) {
    this.items = [];
    this.id = id;
    this.active = true;
  }

  add (item) {
    const exists = this.items.find(o => o.id === item.id);
    if (!exists) this.items.push(item);
    else exists.total++;
  }

}


class Cell {
  constructor(props) {
    for (const key of Object.keys(props)) {
      this[key] = props[key];
    }
  }
}



export const useSelectStore = defineStore('select', () => {

  const carts = ref([]);
  const cells = ref([]);

  const cartsCount = computed(() => carts.value.length);

  const api = inject('api');

  //const type = ref(null)

  const resolveCode = async (_code) => {
    const response = await api.codeResolve(_code);
    if (!response) return
    if (response.type === 'product') {
      addItem(response.data)
    } else {
      addCell(response.data)
    }
  }

  const isCartActive = (id) => {
    return getActiveCart().id == id;
  }

  const setActiveCart = (id) => {
    for (const cart of carts.value) {
      if (cart.id !== id) cart.active = false;
      else cart.active = true;
    }
  }

  const getActiveCart = () => {
    for (const cart of carts.value) {
      if (cart.active) return cart;
    }
  }

  const getItems = (id) => {
    return getCart(id).items;
  }

  const getCart = (id) => {
    return carts.value.find(cart => cart.id === id)
  }

  const addItem = (props) => {
    getActiveCart().add(props)
  }

  const addCart = () => {
    const id = cartsCount.value + 1;
    carts.value.push(new Cart(id));
  }

  const addCell = (props) => {
    cells.value.push(new Cell(props));
  }

  const deleteCart = (id) => {
    if (cartsCount.value > 1) {
      carts.value = carts.value.filter(cart => {
        return cart.id !== id;
      });
    } else Notify.create('Нельзя удалить единственную корзину')
  }


  return {
    resolveCode, addCart, deleteCart, addCell, addItem, getItems, isCartActive, setActiveCart, cartsCount, carts, cells
  }
})
