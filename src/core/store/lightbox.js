import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'


export const useLightboxStore = defineStore('lightbox', () => {

    const index = ref(0)
    const visible = ref(false)
    const images = ref([])
    const map = ref({})

    const get = (id) => images.value[map.value[id]]

    const add = (id, image) => {

        if (image) {
            if (!image.startsWith('/')) {
                image = `/${image}`
            }
            images.value.push(`${process.env.IMG_URL}${image}`)
            map.value[id] = images.value.length - 1
        }
    }
    const show = (id) => {
        index.value = map.value[id]
        visible.value = true
    }

    const hide = () => visible.value = false

    return {
        index, visible, images, show, hide, add, get
    }

})
