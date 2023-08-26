<template>
  <q-card class="cell-component">
    <q-card-actions>
      <q-btn
        flat
        icon="inbox"
        color="teal"
        @click="store.setDestinationCell(id)"
        :label="store.cell(id).label"
      />
      <q-btn
        v-show="contents.length > 0"
        color="grey"
        round
        flat
        dense
        :icon="store.cell(id).expandIcon"
        @click="store.cell(id).toggleExpand()"
      />
      <q-space />
      <q-btn
        flat
        round
        color="red"
        title="Удалить ячейку"
        icon="delete"
        @click="store.deleteCell(id)"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="store.cell(id).expanded" v-if="contents.length > 0">
        <q-list class="mb-sm">
          <CellListItem
            style="max-width: 70%"
            v-for="content in contents"
            :key="content.id"
            v-bind="content"
            :cartId="id"
          />
        </q-list>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>
import { useSelectStore } from "stores/select";
import CellListItem from "components/CellListItem.vue";
const store = useSelectStore();
const props = defineProps({
  id: Number,
  name: String,
  stock: Object,
  contents: Array,
  expanded: Boolean,
});
</script>
