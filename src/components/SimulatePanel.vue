<template>
  <div class="q-pa-md q-gutter-y-md column" style="max-width: 350px" v-if="dev">
    <q-input rounded outlined v-model="cellCode">
      <template v-slot:append>
        <q-btn round color="primary" icon="inbox" @click="simulate(cellCode)" />
      </template>
    </q-input>
    <q-input rounded outlined v-model="productCode">
      <template v-slot:append>
        <q-btn round color="primary" icon="shopping_bag" @click="simulate(productCode)" />
      </template>
    </q-input>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue';


const onScan = inject('onScan')

const cellCode = ref('C0000765');
const productCode = ref('YC00104411');
const dev = process.env.DEV_MODE;


const simulate = (code) => {
  onScan.simulate(window, code)
}

</script>
