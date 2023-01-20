<template>
	<q-list>
		<q-item-label
			header> Операции </q-item-label>
		<q-item
			clickable
			tag="div"
			exact
			:href="apiUrl">
			<q-item-section avatar>
				<q-icon name="home" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Админка</q-item-label>
				<q-item-label caption>основной раздел</q-item-label>
			</q-item-section>
		</q-item>
		<template v-for="link in links" :key="link.title">
			<q-item
				clickable
				tag="div"
				exact
				:to="{ name: link.to }">
				<q-item-section
					v-if="link.icon"
					avatar>
					<q-icon :name="link.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ link.title }}</q-item-label>
					<q-item-label caption>{{ link.caption }}</q-item-label>
				</q-item-section>
			</q-item>
		</template>
		<q-item
			clickable
			tag="div"
			@click="somedo">
			<q-item-section avatar>
				<q-icon name="home" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Тест</q-item-label>
				<q-item-label caption>запрос ячейки</q-item-label>
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script setup>
import { inject } from 'vue'
const onScan = inject('onScan')

const links = [
	{
		title: 'Главная',
		icon: 'home',
		to: 'home',
	},
	{
		title: 'Приёмка',
		icon: 'school',
		to: 'accept',
	}
]

const somedo = () => {
	onScan.simulate(window, 'C0000504')
}

const apiUrl = process.env.API_URL;

</script>