
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
			{ name: 'accept', path: 'accept', component: () => import('pages/AcceptPage.vue') },
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
]

export default routes
