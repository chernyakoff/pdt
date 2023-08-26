import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLightboxStore = defineStore('lightbox', () => {

  const index = ref(0)
  const visible = ref(false)
  const images = ref([])
  const idToIndex = ref({})

  const getImage = (id) => images.value[idToIndex.value[id]]

  const addImage = (id, image) => {
    if (image !== '') {
      images.value.push(`${process.env.PRODUCT_IMAGES_URL}${image}`)
      idToIndex.value[id] = images.value.length - 1
    }
  }
  const showImage = (id) => {
    index.value = idToIndex.value[id]
    visible.value = true
  }

  const onHide = () => visible.value = false

  return {
    index, visible, images, showImage, onHide, addImage, getImage
  }

})
