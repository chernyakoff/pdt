<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer" />
				<q-toolbar-title> Терминал Сбора Данных </q-toolbar-title>
				<q-btn round color="brown-5" icon="directions" :href="apiUrl" target="_blank" />
			</q-toolbar>
		</q-header>
		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered>
			<MainMenu />
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MainMenu from 'components/MainMenu.vue'

const apiUrl = process.env.API_URL;
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
