<template>
    <div class="mt-5 px-4 ">
      <div v-if="favorites.length === 0">
        <h1>No favorite Pokémon found.</h1>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div v-for="pokemon in favorites" :key="pokemon.id" @click="() => redirectToPokemonDetails(pokemon.id)" :class="[ 
          Number(route.params.id) === pokemon.id ? 'bg-[#e6e6e6] text-black' : 'bg-white', 
          'border-[#e1e1e177] border-b-2 p-1 md:p-4 flex relative rounded cursor-pointer shadow-md bg-white' 
        ]">
          <div class="flex-col min-w-[100px]">
            <img :src="pokemon.sprites.other.showdown.front_default" alt="" class="w-14 h-14 mb-2" />
            <div class="mt-4 flex w-full ml-[-6px]">
              <span v-for="(type, index) in pokemon.types" :key="index" class="text-white rounded-sm capitalize ">
                <img :src="getPokemonTypeImage(type.type.name)" alt="pokemon type" class="w-14" />
              </span>
            </div>
          </div>
  
          <div class="flex flex-col">
            <h1 class="bg-white text-blue-600 font-semibold rounded-full flex items-center justify-center">{{ pokemon.id }}</h1>
            <h2 class="text-lg font-semibold capitalize text-white">{{ pokemon.name }}</h2>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import router from '@/router/routes';
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  import { getPokemonTypeImage } from '@/utils/pokemon-get-type-image';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const redirectToPokemonDetails = (id: number) => {
    router.push({
      name: 'pokemon-details',
      params: {
        id: id
      }
    });
  };
  </script>
  