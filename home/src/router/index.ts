import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'Home',
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home/index.vue'),
    },
    {
        path: '/child/:page*',
        name: 'child',
        component: () => import(/* webpackChunkName: "Child" */'@/views/Child/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
