import { createApp } from 'vue';
import microApp from '@micro-zoe/micro-app'
import router from '@/router';
import App from './App.vue';

microApp.start({
    'disable-memory-router': true,
    'disable-patch-request': true,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
