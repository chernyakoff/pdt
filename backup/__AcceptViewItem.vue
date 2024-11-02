<template>
  <q-list
    bordered
    separator>
    <q-item dense>
      <q-item-section>
        <div style="cursor:pointer" @click="setSelectedItem(id)">
          <q-chip color="white">
            <q-avatar color="white" icon="inventory_2" :text-color="iconColor" size="40px" />
            <span class="text-h6 text-blue-grey-14">{{ name }}</span>
          </q-chip>
        </div>
      </q-item-section>
      <q-space />
      <q-item-section side center>
        <div class="row">
          <q-btn class="col" padding="3px" dense flat size="16px" icon="merge" text-color="blue" title="Поместить все товары в эту ячейку" />
          <q-btn class="col" padding="3px" dense flat size="16px" icon="clear" text-color="red" title="Удалить ячейку" />
        </div>
      </q-item-section>
    </q-item>
    <q-banner v-if="!items" class="bg-primary text-white"> Unfortunately, the credit card did not go through, please try again. </q-banner>
    <accept-view-cell-item
      v-for="(item, index) in items"
      :key="index"
      v-bind="item" />
  </q-list>
</template>
<script setup>
import AcceptViewCellItem from "components/accept-view/AcceptViewCellItem.vue"
import { computed } from 'vue';
import { useAcceptViewStore } from "stores/accept-view.js";
const store = useAcceptViewStore();
const props = defineProps({
  id: Number,
  name: String,
  image: String,
  skus: Object,
  cells: Array
});

const setSelectedItem = (id) => store.selectedItem = id
const iconColor = computed(() => props.id == store.selectedItem ? 'teal' : 'blue-grey-12')
</script>
