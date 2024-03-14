<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
    <div class="row q-pt-sm">
      <div class="col-1">
      </div>
      <q-select
        class="col-10"
        hint="Выберите склад с которым будете работать"
        square
        dense
        v-model="settings.stock"
        :options="settings.stocks"
        emit-value
        map-options
        options-dense
        tabindex="1">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <div class="col-1">
      </div>
    </div>
  </transition>
  <q-inner-loading :showing="settings.notLoaded">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>
<script setup>

import { useSettingsStore } from "stores/settings";

const settings = useSettingsStore();



</script>
