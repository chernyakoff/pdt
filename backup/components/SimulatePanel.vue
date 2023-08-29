<template>
  <q-list style="max-width: 350px; background-color: white">
    <q-item v-for="code in products" v-bind:code="code" v-bind:key="code">
      <q-item-section>
        <q-input :model-value="code" />
      </q-item-section>
      <q-item-section side>
        <q-btn
          flat
          dense
          :icon="getIcon('product')"
          @click="store.resolveCode(code)"
        />
      </q-item-section>
    </q-item>
    <q-item v-for="code in cells" v-bind:code="code" v-bind:key="code">
      <q-item-section>
        <q-input :model-value="code" />
      </q-item-section>
      <q-item-section side>
        <q-btn
          flat
          dense
          :icon="getIcon('cell')"
          @click="store.resolveCode(code)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { inject, ref } from "vue";
import { useSelectStore } from "stores/select";

const store = useSelectStore();

const products = ["4813413007155", "YC00104411", "4690259191504"];

const cells = ["C0000765", "C0000052", "C0000153"];
const icons = {
  cell: "",
  product: "",
};

const getIcon = (type) => {
  switch (type) {
    case "cell":
      return "inbox";
    case "product":
      return "shopping_bag";
  }
  return icons[type];
};

const onScan = inject("onScan");

const simulate = (code) => {
  onScan.simulate(window, code);
};
</script>
