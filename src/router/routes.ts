import MainPage from '@/pages/MainPage.vue'; 
import { createRouter, createWebHistory } from 'vue-router';
import PokemonDetails from '@/pages/PokemonDetails.vue';
import NotFound from '@/layouts/notfound/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  {
    path: '/:id',
    name: 'pokemon-details',
    component: PokemonDetails,
  },
  {
    path: '/:catchAll(.*)', 
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;