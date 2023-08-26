<template>
  <q-item>
    <q-item-section top avatar
      ><search-item-image :id="id" :image="image"
    /></q-item-section>
    <q-item-section top>
      <q-item-label lines="2">{{ name }} </q-item-label>
      <q-item-label caption>{{ code }}</q-item-label>
    </q-item-section>
    <q-space />
    <q-item-section top side>
      <div class="q-gutter-sm">
        <q-badge color="teal" :label="cname" />
        <q-badge color="purple" :label="total" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import SearchItemImage from "components/search/SearchItemImage.vue";

const props = defineProps({
  id: Number,
  name: Number,
  code: String,
  image: String,
  weight: Number,
  width: Number,
  height: Number,
  price: Number,
  total: Number,
  stock: Object,
  cell_name: String,
});

const cname = props.cell_name.replace("Зона приемки", "ЗП");
</script>
