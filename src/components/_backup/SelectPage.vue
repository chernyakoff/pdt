<template>
  <q-page>
    <ActionHelper />
    <SelectCart v-for="cart in store.carts" :key="cart.id" v-bind:id="cart.id">
    </SelectCart>
    <CellCard v-for="cell in store.cells" :key="cell.id" v-bind="cell">
    </CellCard>
    <SimulatePanel />
  </q-page>
</template>

<script setup>
import SimulatePanel from 'components/SimulatePanel.vue';
import CellCard from 'components/CellCard.vue';
import ActionHelper from 'components/ActionHelper.vue';
import SelectCart from 'components/SelectCart.vue';
import { useSelectStore } from 'stores/select';
const store = useSelectStore();
store.init()


</script>
