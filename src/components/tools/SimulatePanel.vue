<template>
  <q-list class="bg-white">
    <q-item>
      <q-item-section>
        <q-input
          v-model="code"
          placeholder="Введите код товара" />
      </q-item-section>
      <q-item-section side>
        <q-btn
          flat
          dense
          icon="shopping_bag"
          @click="simulate(code)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { inject, ref } from "vue";

const code = ref();

const onScan = inject("onScan");

const simulate = (code) => {
  onScan.simulate(window, code);
};
</script>
