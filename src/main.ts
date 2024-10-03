import App from './App.vue';
import router from '@/router/routes'; 
import Notifications from '@kyvg/vue3-notification'
import { createApp } from 'vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {CoHamburgerMenu } from "oh-vue-icons/icons";
import { createPinia } from 'pinia';

import './index.css';
import './css/globals.css';
import DashboardLayout from './layouts/dashboard/DashboardLayout.vue';
import EmptyLayout from './layouts/empty/EmptyLayout.vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import './assets/tailwind.css';


addIcons(CoHamburgerMenu);

const app = createApp(App);
const pinia = createPinia();
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.component("v-icon", OhVueIcon);
app.component('v-select', vSelect)

app.use(router);
app.use(Notifications)
app.use(pinia);

app.mount('#app');