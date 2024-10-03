import App from './App.vue';
import router from '@/router/routes'; 
import Notifications from '@kyvg/vue3-notification'
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './index.css';
import './css/globals.css';
import DashboardLayout from './layouts/dashboard/DashboardLayout.vue';
import EmptyLayout from './layouts/empty/EmptyLayout.vue';
import Multiselect from 'vue-multiselect';
import './assets/tailwind.css';



const app = createApp(App);
const pinia = createPinia();
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.component('multi-select', Multiselect)

app.use(router);
app.use(Notifications)
app.use(pinia);

app.mount('#app');