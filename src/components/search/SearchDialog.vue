<template>
  <q-dialog v-model="store.showDialog" persistent>
    <q-card style="width: 350px">
      <q-card-section class="bg-primary text-white">
        <div class="subtitle1">{{ store.product.name }}</div>
      </q-card-section>
      <q-form @submit="store.select">
        <q-card-section>
          <q-select
            ref="select"
            class="col-2"
            square
            v-model="store.cell"
            :options="store.product.options"
            options-dense
            lazy-rules
            label="Ячейка"
            tabindex="0"
            autofocus
            :readonly="store.product.options.length < 2"
          />

          <q-input
            label="Количество"
            square
            v-model="store.total"
            tabindex="1"
            type="number"
            lazy-rules
            :hint="`нужно ${store.product.total} шт.`"
            :rules="[
              (val) => (val && val.length > 0) || 'укажите количество',
              (val) =>
                val <= store.product.total ||
                'количество не может быть больше чем нужно в продаже',
              (val) =>
                val <= store.cell.total ||
                'количество не может быть больше чем есть в ячейке',
            ]"
          />
        </q-card-section>

        <q-card-actions class="text-primary float-right">
          <q-btn flat label="Отмена" type="reset" v-close-popup />
          <q-btn label="Подбор" tabindex="0" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useSearchStore } from "stores/search";

const store = useSearchStore();
</script>
