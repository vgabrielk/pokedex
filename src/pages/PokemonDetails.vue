<template>
    <button :class="currentTheme.text" class="ml-4" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>    </button>
    <button :class="currentTheme.bg" class="ml-4" @click="toggleFavorite">
        <svg class="bg-none" v-if="isFavorite" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  :fill="isDarkMode ? '#ffffff' : '#111111'"  :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <svg class="bg-none" v-else="isFavorite" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    </button>
    <div :class="currentTheme.bg" class="flex flex-col md:flex-row p-4">
        <div class="flex flex-col-reverse md:flex-row ">
            <div class="sm:w-[100px] md:w-300px mr-4 ">
                <img :class="currentTheme.bg" :src="pokemon?.sprites.front_default" alt="Imagem do Pokémon" class="w-full  rounded-md"
                    v-if="pokemon" />
            </div>
            <div class="flex-col sm:justify-center sm:items-center mt-4 ">
                <h1 :class="currentTheme.text" class="bg-red-500 rounded-full px-2 h-6 w-12 flex items-center justify-center">
                    {{ pokemon?.id }}
                </h1>
                <h1 :class="currentTheme.textTitle" class="capitalize text-[29px] md:text-[49px] font-bold ">
                    {{ pokemon?.name }}
                </h1>
            </div>
        </div>
    </div>
    <div class="flex items-start p-4">
        <div class="w-full">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div :class="currentTheme.bg" class="list-disc list-inside col-span-1 md:col-span-6 p-4">
                    <div class="flex gap-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3"/></svg>
                        <h2 :class="currentTheme.text" class="capitalize text-[20px] font-bold">Base stats</h2>
                    </div>
                    <div v-if="pokemon?.stats && pokemon.stats.length > 0">
                        <div v-for="(stat, index) in pokemon.stats" :key="index" class="mb-2">
                            <div class="relative w-full h-8  rounded">
                                <div :class="[getStatColor(stat.stat.name), currentTheme.text]"
                                    :style="{ width: `${Math.min(stat.base_stat, 100)}%` }"
                                    class="h-full rounded d-flex text-start px-4 py-1 font-semibold">
                                    <p class="text-white uppercase">
                                        {{ stat.stat.name }} {{ stat.base_stat }}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="currentTheme.bg" class="col-span-1 md:col-span-6 p-4">
                    <div class="flex gap-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>
                        <h2 :class="currentTheme.text" class="capitalize text-[20px] font-bold">Types</h2>
                    </div>
                    <div class="flex space-x-2 mx-auto">
                        <span v-for="(type, index) in pokemon?.types" :key="index"
                        :class="currentTheme.text"   class="rounded-sm capitalize flex">
                            <img :src="getPokemonTypeImage(type.type.name)" alt="pokemon type" class="w-40"
                                :title="type.type.name" />
                        </span>
                    </div>
                </div>

                <div :class="currentTheme.bg" class="col-span-1 md:col-span-12 p-4">
                    <div class="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/></svg>
                        <h2 :class="currentTheme.text" class="capitalize text-[20px] font-bold ">Evolutions</h2>
                    </div>
                    <div v-if="evolutionChain.length > 0" class="grid grid-cols-1 md:grid-cols-6 gap-4 flex-wrap">
                        <div v-for="(evolution, index) in evolutionChain" :key="index"
                        :class="currentTheme.bg"
                            class="flex flex-col items-center p-4 col-span-12 md:col-span-2 ">
                            <img :src="getEvolutionImage(evolution)" alt="Pokemon Evolution" class="w-20 h-20" />
                            <p :class="currentTheme.text" class="capitalize">{{ evolution.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, pokeApiUrl } from '@/services/api';
import { PokemonRequestDetail } from '@/types/pokemon-request-types';
import { getStatColor } from '@/utils/pokemon-get-stat-color';
import { getPokemonTypeImage } from '@/utils/pokemon-get-type-image';
import { getEvolutionImage } from '@/utils/pokemon-get-evolution-image';
import { toRefs } from 'vue';
import { useDarkMode } from '@/stores/darkModeStore';
import { toast } from 'vue3-toastify';

const {currentTheme, isDarkMode} = toRefs(useDarkMode());

const pokemon = ref<PokemonRequestDetail | null>(null);
const evolutionChain = ref<{ name: string; id: number }[]>([]);
const isFavorite = ref(false); 

const route = useRoute();
const router = useRouter();

const goBack = () => {
    router.push({
        name:'Home'
    });
};

const getPokemon = async () => {
    try {
        const response = await api.get(`${pokeApiUrl}pokemon/${route.params.id}`);
        pokemon.value = response.data;
        getEvolutionChain();
        checkIfFavorite();
    } catch (error) {
        if (error.status == 404) {
            router.push({
                name: 'NotFound',
                params: {
                    catchAll: '*'
                }
            })
        }
        const errorMessage = error.response?.data?.message || error.message || 'Erro ao carregar dados da API';

        toast(errorMessage, {type: 'error'})

    }
};

const getEvolutionChain = async () => {
    try {
        const speciesResponse = await api.get(`${pokeApiUrl}pokemon-species/${route.params.id}`);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        const evolutionChainResponse = await api.get(evolutionChainUrl);
        const chain = evolutionChainResponse.data.chain;

        evolutionChain.value = getAllEvolutions(chain);
    } catch (error) {
        console.log('Error fetching evolution chain:', error);
    }
};


const getAllEvolutions = (chain: any): { name: string; id: number }[] => {
    const evolutions: { name: string; id: number }[] = [];

    let current = chain;
    while (current) {
        evolutions.push({
            name: current.species.name,
            id: extractPokemonId(current.species.url),
        });

        if (current.evolves_to.length > 0) {
            current = current.evolves_to[0];
        } else {
            current = null;
        }
    }

    return evolutions;
};

const extractPokemonId = (url: string): number => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
};



const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (pokemon.value) {
        isFavorite.value = favorites.some((fav: PokemonRequestDetail) => fav.id === pokemon.value!.id);
    }
};

const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (pokemon.value) {
        const index = favorites.findIndex((fav: PokemonRequestDetail) => fav.id === pokemon.value!.id);

        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(pokemon.value);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        isFavorite.value = !isFavorite.value;
    }
};


watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            getPokemon(); 
        }
    },
    { immediate: true }
);
</script>

<style lang="css" scoped>
@media(max-width: 768px) {
    .pokemon-bg {
        background-color: #e6e6e6;
    }
}
</style>