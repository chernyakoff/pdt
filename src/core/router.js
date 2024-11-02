import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


const capitaize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

const page = (module, view = null) => {
    let component = capitaize(module)
    if (view) component += capitaize(view)
    return component + 'Page.vue'
}


const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [

            {
                name: 'home-index',
                path: '',
                component: () => import('home/views/IndexPage.vue'),
                meta: { title: 'ТСД' }
            },
            {
                name: 'order-index',
                path: 'order',
                component: () => import('order/views/IndexPage.vue'),

            },

            {
                name: 'settings-index',
                path: 'settings',
                component: () => import('settings/views/IndexPage.vue'),

            },

            {
                name: 'realization-index',
                path: 'realization',
                component: () => import('realization/views/IndexPage.vue'),


            },

            {
                name: 'realization-detail',
                path: 'realization/:id',
                component: () => import('realization/views/DetailPage.vue'),

            },

            {
                name: 'realization-edit',
                path: 'realization/:id/:item',
                component: () => import('realization/views/EditPage.vue'),

            }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('views/Error404Page.vue')
    }
]


export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    return Router
})
