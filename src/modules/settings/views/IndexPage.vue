<template>
    <q-page class="bg-white text-gray">
        <div class="row q-pt-sm">
            <div class="col-1">
            </div>
            <q-select
                v-show="settings.stocks.length > 0"
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
    </q-page>
</template>
<script setup>
import { useSettingsStore } from 'store/settings';
const settings = useSettingsStore()
</script>
