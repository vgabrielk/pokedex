<template>
    <button class="ml-4 text-white" @click="goBack">
        <icon-component name="arrow-left" extension="svg" />
    </button>
    <div class="flex flex-col md:flex-row p-4 bg-white">
        <div class="flex flex-col md:flex-row ">
            <div class="sm:w-[100px] md:w-300px mr-4 ">
                <img :src="pokemon?.sprites.front_default" alt="Imagem do Pokémon" class="w-full  rounded-md pokemon-bg"
                    v-if="pokemon" />
            </div>
            <div class="flex-col sm:justify-center sm:items-center mt-4 ">
                <h1 class="bg-red-500 text-white rounded-full px-2 h-6 w-12 flex items-center justify-center">
                    {{ pokemon?.id }}
                </h1>
                <h1 class="capitalize text-[29px] md:text-[49px] font-bold text-[#424242] ">
                    {{ pokemon?.name }}
                </h1>
            </div>
        </div>
    </div>
    <div class="flex items-start p-4">
        <div class="w-full">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div class="list-disc list-inside col-span-1 md:col-span-6 shadow-md p-4">
                    <div class="flex gap-4">
                        <icon-component name="stats" extension="svg" />
                        <h2 class="capitalize text-[20px] font-bold text-[#424242]">Base stats</h2>
                    </div>
                    <div v-if="pokemon?.stats && pokemon.stats.length > 0">
                        <div v-for="(stat, index) in pokemon.stats" :key="index" class="mb-2">
                            <div class="flex items-center justify-between">
                                <span class="uppercase">{{ stat.stat.name }}</span>
                            </div>
                            <div class="relative w-full h-8 bg-gray-200 rounded">
                                <div :class="getStatColor(stat.stat.name)"
                                    :style="{ width: `${Math.min(stat.base_stat, 100)}%` }"
                                    class="h-full rounded d-flex text-start px-4 py-1 text-white font-semibold">
                                    {{ stat.base_stat }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-6 shadow-md p-4">
                    <div class="flex gap-4">
                        <icon-component name="types" extension="svg" />
                        <h2 class="capitalize text-[20px] font-bold text-[#424242]">Types</h2>
                    </div>
                    <div class="flex space-x-2 mx-auto">
                        <span v-for="(type, index) in pokemon?.types" :key="index"
                            class="text-white rounded-sm capitalize flex">
                            <img :src="getPokemonTypeImage(type.type.name)" alt="pokemon type" class="w-40"
                                :title="type.type.name" />
                        </span>
                    </div>
                </div>

                <div class="col-span-1 md:col-span-6 shadow-md p-4">
                    <div class="flex gap-4">
                        <icon-component name="evolutions" extension="svg" />
                        <h2 class="capitalize text-[20px] font-bold text-[#424242]">Evolutions</h2>
                    </div>
                    <div v-if="evolutionChain.length > 0" class="grid grid-cols-1 md:grid-cols-6 gap-4 flex-wrap">
                        <div v-for="(evolution, index) in evolutionChain" :key="index"
                            class="flex flex-col items-center shadow-md p-4 col-span-12 md:col-span-6">
                            <img :src="getEvolutionImage(evolution)" alt="Pokemon Evolution" class="w-20 h-20" />
                            <p class="capitalize">{{ evolution.name }}</p>
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

import IconComponent from '@/components/icons/IconComponent.vue';
import { notify } from '@kyvg/vue3-notification';

const pokemon = ref<PokemonRequestDetail | null>(null);
const evolutionChain = ref<{ name: string; id: number }[]>([]);

const route = useRoute();
const router = useRouter();

const goBack = () => {
    router.back();
};

const getPokemon = async () => {
    try {
        const response = await api.get(`${pokeApiUrl}pokemon/${route.params.id}`);
        pokemon.value = response.data;
        getEvolutionChain();
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

        notify({
            type: 'error',
            text: errorMessage
        });
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

const getEvolutionImage = (evolution: { name: string; id: number }): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
};


watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            getPokemon(); // Carregar Pokémon se o ID mudar
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