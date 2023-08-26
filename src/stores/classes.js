import { useSettingsStore } from "./settings"

class Record {
  props = {
    id: 'number',
    name: 'string'
  }
}

class Cell {
  props = {
    id: 'number',
    name: 'string',
    stock: 'Record',
    contents: 'CellContent[]',
    expanded: 'boolean'
  }

  get expandIcon () {
    return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
  }

  toggleExpand () {
    this.expanded = this.expanded == true ? false : true;
  }

  expand () {
    this.expanded = true
  }

  collapse () {
    this.expanded = false
  }

  get label () {
    return `Ячейка: ${this.name} (${this.stock.name})`
  }

}

class CellContent {
  props = {
    id: 'number',
    name: 'string',
    code: 'string',
    total: 'number',
  }
}

class ProductContent {
  props = {
    id: 'number',
    total: 'number',
    qty: 'number',
    stock: 'Record',
    cell: 'Record',
  }
  get inputLabel () {
    return `Всего ${this.total}`
  }

}

class Product {
  props = {
    id: 'number',
    name: 'string',
    description: 'string',
    code: 'string',
    image: 'string',
    yc_code: 'string',
    weight: 'number',
    width: 'number',
    height: 'number',
    price: 'number',
    volume: 'number',
    contents: 'ProductContent[]'
  }
}


export class Cart {

  props = {
    id: 'number',
    active: 'boolean',
    items: 'Product[]',
    expanded: 'boolean'
  }

  static makeId (carts) {
    let id
    const ids = carts.value.map(item => item.id)
    id = ids.length + 1
    while (ids.includes(id)) id++
    return id
  }

  get expandIcon () {
    return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
  }

  toggleExpand () {
    this.expanded = this.expanded == true ? false : true;
  }

  expand () {
    this.expanded = true
  }

  collapse () {
    this.expanded = false
  }

  get color () {
    return this.active ? 'teal' : 'blue-grey-4'
  }

  get label () {
    return `Корзина-${this.id}`
  }


  add (props) {
    if (!this.active) return false;
    const item = this.find(props.id)
    if (!item) this.items.push(Fabric.make('Product', props))
    else item.qty++
  }

  find (id) {
    return this.items.find(item => id === item.id)
  }

  deleteContent (id, contentId) {
    const item = this.find(id)
    if (item.contents.length < 2) {
      this.deleteItem(id)
    } else {
      for (let i = 0; i < this.items.length; i++) {
        if (id == this.items[i].id) {
          this.items[i].contents = this.items[i].contents.filter(content => content.id != contentId)
        }
      }
    }
  }

  aftercCreate () {
    this.settings = useSettingsStore()
  }
  deleteItem (id) {
    this.items = this.items.filter(item => item.id !== id);
  }


  delete (id, contentId = null) {
    const settings = useSettingsStore()
    settings.confirm = true
    if (contentId) this.deleteContent(id, contentId)
    else this.deleteItem(id)
  }

}

class StateProp {

  defaults = {
    array: [],
    arrayOfObjects: [],
    object: null,
    string: '',
    number: 0,
    boolean: false

  }

  constructor(type, value) {
    this.value = value
    this.resolveType(type)
    return this;
  }

  get () {
    if (typeof this.value == 'undefined') return this.defaults[this.type];
    switch (this.type) {
      case 'string':
        return this.value.toString();
      case 'boolean':
        return !!this.value;
      case 'number':
        return this.value.toNumber()
      case 'array':
        return this.value;
      case 'arrayOfObjects':
        return this.value.map(item => Fabric.make(this.class, item))
      case 'object':
        return Fabric.make(this.class, this.value)
    }
    return null;
  }

  resolveType (type) {
    this.class = false
    this.type = type
    if (type.charAt(0) === type.charAt(0).toUpperCase()) {
      if (type.endsWith('[]')) {
        this.class = type.replace('[]', '')
        this.type = 'arrayOfObjects'
      } else {
        this.class = type
        this.type = 'object'
      }
    }
  }
}

export const Fabric = {
  classes:
  {
    'Product': Product,
    'ProductContent': ProductContent,
    'Cell': Cell,
    'CellContent': CellContent,
    'Record': Record,
    'Cart': Cart
  },
  make (className, data = {}) {
    if (!this.classes[className]) throw Error(`Отсутсвует класс[${className}]`)
    const object = new this.classes[className]();
    for (const [name, type] of Object.entries(object.props)) {
      if (type == typeof data[name]) {
        object[name] = data[name]
      } else {
        object[name] = new StateProp(type, data[name]).get()
      }
    }
    if (typeof object.afterCreate == 'function') object.afterCreate()
    delete object.props
    return object
  }
}




