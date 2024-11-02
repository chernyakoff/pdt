<template>
    <q-item>
        <q-item-section top avatar>
            <q-btn class="btn" color="primary" icon="west" :to="{ name: 'realization-index' }" />
        </q-item-section>
        <q-item-section>
            <q-item-label lines="2">{{ username }}</q-item-label>
            <q-item-label class="q-gutter-sm">
                <span class="text-caption text-blue-grey-7">{{ userphone }}</span>
            </q-item-label>
        </q-item-section>
        <q-space />
        <q-item-section center side>
            {{ date }}
        </q-item-section>
        <q-item-section center side>
            <q-badge color="purple" :label="total" />
        </q-item-section>
    </q-item>
</template>
<script setup>

const props = defineProps({

    id: Number,
    username: String,
    userphone: String,
    date: String,
    total: Number,
});
</script>
