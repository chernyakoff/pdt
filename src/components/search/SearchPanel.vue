<template>
  <q-card square flat>
    <q-card-section>
      <q-input
        v-model="store.query"
        filled
        placeholder="Поиск"
        @focus="focus = true"
        @blur="focus = false"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon
            name="cancel"
            v-if="store.query && focus"
            @click.stop.prevent="store.query = ''"
            class="cursor-pointer"
          ></q-icon>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import { useSearchStore } from "stores/search";
const focus = ref(false);
const store = useSearchStore();
</script>
