<template>
    <div class="q-pa-sm fit row no-wrap justify-between items-center">
        <q-input
            class="col-9"
            v-model="store.query"
            square
            dense
            placeholder="Поиск"
            @focus="focus = true"
            @blur="focus = false"
            tabindex="0">
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
            <template v-slot:append>
                <q-icon
                    name="cancel"
                    v-if="store.query && focus"
                    @click.stop.prevent="store.query = ''"
                    class="cursor-pointer"></q-icon>
            </template>
        </q-input>
        <q-select
            class="col-3"
            square
            dense
            v-model="store.order"
            :options="store.orderIds"
            options-dense
            label="Продажа"
            tabindex="1">
            <template v-if="store.order" v-slot:append>
                <q-icon
                    name="cancel"
                    @click.stop.prevent="store.order = null"
                    class="cursor-pointer" />
            </template>
        </q-select>
        <!-- <div class="col-1 row no-wrap">
      <q-btn
        icon="event"
        round
        :color="rangeSelected ? 'red' : 'teal'"
        size="small"
      >
        <q-popup-proxy
          @before-show="updateProxyDate"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="proxyDate" today-btn range mask="DD.MM.YY">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn
                label="Сброc"
                color="primary"
                flat
                v-close-popup
                @click="clearDate"
              />
              <q-btn
                label="OK"
                color="primary"
                flat
                @click="saveDate"
                v-close-popup
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </div> -->
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useIndexStore } from "order/store";
const store = useIndexStore();
const focus = ref(false);
/* const date = ref({ from: "", to: "" });
const proxyDate = ref({ from: "", to: "" });
const rangeSelected = computed(() => date.value.from || date.value.to);

const updateProxyDate = () => {
  proxyDate.value = date.value;
};
const saveDate = () => {
  date.value = proxyDate.value;
};
const clearDate = () => {
  proxyDate.value = date.value = { from: "", to: "" };
}; */
</script>
