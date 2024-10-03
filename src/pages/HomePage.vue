<template>
  <div class="flex items-start p-4">
    <div class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div class="list-disc list-inside col-span-1 md:col-span-2 relative">
          <div class="p-4 bg-white">
            <div class="flex flex-col md:flex-row justify-between items-center mb-5">
              <h2 class="capitalize text-[30px] md:text-[60px] mt-0 pt-0 font-bold text-blue-600 text-center md:text-start">
                Highlighted Pokémon
              </h2>
            </div>
            <div v-if="pokemon" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="shadow-md p-4 rounded-md relative bg-white">
                <img class="absolute opacity-5 object-contain h-[60%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src="/images/bluepoke.png" />
                <img :src="pokemon.sprites.front_default" alt="Imagem do Pokémon" class="w-40 rounded-md" />
                <h3 class="text-center mt-2 font-bold text-lg capitalize">{{ pokemon.name }}</h3>
                <p class="text-center text-gray-500"> #{{ pokemon.id }}</p>
              </div>

              <div v-if="pokemon.stats" class="shadow-md bg-white p-4 rounded-md relative">
                <div v-for="(stat, index) in pokemon.stats" :key="index" class="mb-2">
                  <div class="relative w-full h-8 rounded">
                    <div :class="getStatColor(stat.stat.name)"
                      :style="{ width: `${Math.min(stat.base_stat, 100)}%` }"
                      class="h-full rounded d-flex text-start px-4 py-1 text-white font-semibold uppercase">
                      {{ stat.stat.name }} | {{ stat.base_stat }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <p class="text-gray-500">No highlighted Pokémon found.</p>
            </div>
          </div>

        </div>
        <div class="list-disc list-inside col-span-1 md:col-span-2 relative">
          <div class="p-4 bg-white">
            <div class="flex flex-col md:flex-row justify-between items-center mb-5">
              <h2 class="capitalize text-[30px] md:text-[60px] mt-0 pt-0 font-bold text-blue-600 text-center md:text-start">
                Favorites
              </h2>
              <button @click="router.push({name: 'favorites-pokemon'})" class="btn-default">View all</button>
            </div>
            <div v-if="favorites.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div v-for="(pokemon, index) in limitedFavorites" :key="index" class="shadow-md bg-white p-4 rounded-md relative">
                <img class="absolute opacity-5 object-contain h-[60%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src="/images/bluepoke.png" />
                <img :src="pokemon.sprites.front_default" alt="Imagem do Pokémon" class="w-40 rounded-md" />
              </div>
            </div>

            <div v-else>
              <p class="text-gray-500">No favorite Pokémon found.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  

<script setup lang="ts">
import router from '@/router/routes';
import { api, pokeApiUrl } from '@/services/api';
import { getStatColor } from '@/utils/pokemon-get-stat-color';
import { onBeforeMount, ref } from 'vue';



const pokemon = ref<any>();
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
const limitedFavorites = favorites.slice(-8);

const getHighlightPokemon = async () => {
    try {
        const pok = await api.get(`${pokeApiUrl}pokemon/493`)
        pokemon.value = pok.data;
    } catch (error) {
        console.log(error)
    }
}

onBeforeMount(getHighlightPokemon)

</script>

<style scoped></style>