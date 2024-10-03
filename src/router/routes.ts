

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'


import MainPage from '@/pages/MainPage.vue'
import PokemonDetails from '@/pages/PokemonDetails.vue'
import FavoritesPokemon from '@/pages/FavoritesPokemon.vue'
import Pokedex from '@/pages/Pokedex.vue'
import NotFound from '@/layouts/notfound/NotFound.vue'

const routes: RouteRecordRaw[] = [
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
        path: '/favorites',
        name: 'favorites-pokemon',
        component: FavoritesPokemon,
      },
      {
        path: '/pokedex',
        name: 'pokedex',
        component: Pokedex,
      },
      {
        path: '/:catchAll(.*)', 
        name: 'NotFound',
        component: NotFound,
      },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
