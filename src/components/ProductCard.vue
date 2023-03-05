<template>
  <q-card class="my-card" flat bordered :data-id="id">
    <q-expansion-item expand-icon-toggle group="somegroup">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar v-if="image == ''" text-color="white" icon="shopping_bag" color="teal" />
          <q-avatar v-else>
            <q-img :src="getImageUrl()" @click="showImage(0)" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ name }} </q-item-label>
          <q-item-label caption>{{ getCode() }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-input square dense outlined v-model="total" label="Кол-во" style="width:100px" />
        </q-item-section>
      </template>
      <q-card>
        <q-card-section> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-card>
  <vue-easy-lightbox :visible="visibleRef" :imgs="[getImageUrl()]" :index="indexRef" @hide="onHide"></vue-easy-lightbox>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: Number,
  name: Number,
  code: String,
  image: String,
  yc_code: String,
  weight: Number,
  width: Number,
  height: Number,
  price: Number,
});


const total = ref(1);

const getImageUrl = () => {
  return `${process.env.PRODUCT_IMAGES_URL}${props.image}`;
}
const getCode = () => {
  return props.code !== '' ? props.code : props.yc_code;
}
const visibleRef = ref(false)
const indexRef = ref(0)

const showImage = (index) => {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => visibleRef.value = false



</script>
