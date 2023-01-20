<template>
  <q-page paddng>
    <div class="fit row wrap justify-start items-start content-start">
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
      <div v-if="codeStore.data && codeStore.type == 'CELL'">
        <CellCard v-bind="codeStore.data" />
      </div>
      <div v-if="codeStore.data && codeStore.type == 'PRODUCT'">
        <ProductCard v-bind="codeStore.data" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCodeStore } from 'stores/code'
import { inject } from 'vue'
import ProductCard from 'components/ProductCard.vue'
import CellCard from 'components/CellCard.vue'

const onScan = inject('onScan')
const codeStore = useCodeStore()
const cellCode = ref('C0000765');
const productCode = ref('YC000000104305');
const dev = process.env.DEV_MODE;

const options = {
  minLength: 8,
  prefixKeyCode: [16],
  suffixKeyCodes: [13],
  onScan: async (code, iQty) => {
    await codeStore.check(code)
  }
}

const simulate = (code) => {
  console.log(code)
  onScan.simulate(window, code)
}

onMounted(() => {
  onScan.attachTo(window, options)
})

onUnmounted(() => {
  onScan.detachFrom(window);
})

</script>
