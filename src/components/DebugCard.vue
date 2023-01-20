<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section
          avatar>
          <q-icon name="settings" color="teal" size="42px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Дебаг</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label>Сообщение</q-item-label>
            </q-item-section>
            <q-item-section>{{ message }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Код</q-item-label>
            </q-item-section>
            <q-item-section>{{ scanCode }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Длительность</q-item-label>
            </q-item-section>
            <q-item-section>{{ scanDuration }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Ср.скорость нажатия</q-item-label>
            </q-item-section>
            <q-item-section>{{ avgTimeByChar }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Мин. длина кода</q-item-label>
            </q-item-section>
            <q-item-section>{{ minLength }}</q-item-section>
          </q-item>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  scanCode: String,
  scanDuration: Number,
  avgTimeByChar: Number,
  minLength: Number
});
</script>
