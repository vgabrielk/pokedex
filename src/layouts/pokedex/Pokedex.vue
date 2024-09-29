<template>
  <filter-component 
      @update:typeFilter="applyTypeFilter" 
      @update:filter="applyFilter" 
    />
  <div class="mt-5">
    <div class="grid grid-cols-1 gap-4">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" @click="() => redirectTo(pokemon.id)"
        :class="[
          Number(route.params.id) === pokemon.id ? 'bg-[#e6e6e6] text-black' : 'bg-white',
          'border-[#e1e1e177] border-b-2 p-1 md:p-4 flex relative rounded cursor-pointer'
        ]">

        <div class="flex-col min-w-[100px]">
          <img :src="pokemon.sprites.other.showdown.front_default" alt="" class="w-14 h-14 mb-2" />
          <div class="mt-4 flex w-[100%] ml-[-6px]">
            <span v-for="(type, index) in pokemon.types" :key="index" class="text-white rounded-sm capitalize ">
              <img :src="getPokemonTypeImage(type.type.name)" alt="pokemon type" class="w-14" />
            </span>
          </div>
        </div>
        
        <div class="flex flex-col">
          <h1 class="bg-red-500 text-white rounded-full px-2 h-6 w-12  flex items-center justify-center">{{ pokemon.id }}</h1>
          <h2 class="text-lg font-semibold capitalize text-[#424242]">{{ pokemon.name }}</h2>
        
        </div>

      </div>
    </div>
  </div>

  <pagination-component
    :total-pages="totalPages"
    :current-page="currentPage"
    @update:currentPage="updateCurrentPage"
  />
</template>

<script setup lang="ts">
import axios from 'axios';
import FilterComponent from '@/components/@filterinput/FilterComponent.vue';

import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import router from '@/router/routes';

import {pokemonTypeMap} from '@/types/pokemon-type-map'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { pokeApiUrl } from '@/services/api';
import { PokemonRequestDetail, PokemonRequestListResult } from '@/types/pokemon-request-types';
import { useRoute } from 'vue-router';
import { getPokemonTypeImage } from '@/utils/pokemon-get-type-image';
import { notify } from '@kyvg/vue3-notification';



const route = useRoute();
const filterQuery = ref<string>('');
const showPagination = ref(false);
const currentPage = ref(1);
const totalPages = ref(0);
const pokemons = ref<PokemonRequestDetail[]>([]);
  const typeFilter = ref<string[] | null>(null); 
    const MAX_LIMIT = 1302;
  const DEFAULT_LIMIT = 20;
  const limit = ref(DEFAULT_LIMIT);

const applyFilter = (query: string) => {
  filterQuery.value = query;
  currentPage.value = 1;
  limit.value = query ? MAX_LIMIT : DEFAULT_LIMIT; 

  fetchPokemons(); 
  notify({
    title: 'Sucesso!',
    type: 'success',
    text: 'Filtros aplicados com sucesso!'
  })
};

const redirectTo = (id: number) => {
  router.push({
    name: 'pokemon-details',
    params: {
      id: id
    }
  })
}


const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 100;
  if (scrollPosition >= threshold) {
    showPagination.value = true;
  } else {
    showPagination.value = false;
  }
};

const fetchPokemons = async (): Promise<void> => {
  try {
    const pokemonList = await fetchPokemonList();
    const pokemonDetails = await fetchPokemonDetails(pokemonList);
    pokemons.value = pokemonDetails;


    if (!typeFilter.value && !filterQuery.value) {
      totalPages.value = Math.ceil(MAX_LIMIT / DEFAULT_LIMIT); 
    } else {
      totalPages.value = 1; 
    }
    
  } catch (error: any) {
  const errorMessage = error.response?.data?.message || error.message || 'Erro ao carregar dados da API';

  notify({
    type: 'error',
    text: errorMessage
  });
}
};

const fetchPokemonList = async (): Promise<PokemonRequestListResult[]> => {
  const activeLimit = !typeFilter.value && !filterQuery.value ? limit.value : MAX_LIMIT;

  const response = await axios.get(`${pokeApiUrl}/pokemon?limit=${activeLimit}&offset=${(currentPage.value - 1) * DEFAULT_LIMIT}`);
  return response.data.results;
};

const fetchPokemonDetails = async (pokemonList: PokemonRequestListResult[]): Promise<PokemonRequestDetail[]> => {
  const detailsPromises = pokemonList.map((pokemon) => axios.get<PokemonRequestDetail>(pokemon.url));
  const detailsResponses = await Promise.all(detailsPromises);
  return detailsResponses.map((res) => res.data);
};

const filteredPokemons = computed(() => {
  if (!pokemons.value.length) return []; // Retorna uma lista vazia se não houver Pokémon carregados

  return pokemons.value.filter(pokemon => {
    const isQueryANumber = !isNaN(Number(filterQuery.value));
    const matchesName = !isQueryANumber && filterQuery.value 
      ? pokemon.name.toLowerCase().includes(filterQuery.value.toLowerCase())
      : true; // Se a consulta não for um número, então verifica o nome
    
    const matchesId = isQueryANumber && filterQuery.value 
      ? pokemon.id === Number(filterQuery.value)
      : true; // Se a consulta for um número, verifica o ID

    const matchesType = typeFilter.value 
      ? pokemon.types.some(item => 
          typeFilter.value.includes(item.type.name.toLowerCase())
        )
      : true; // Se houver um filtro de tipo, verifica o tipo

    return matchesName && matchesId && matchesType; // Retorna verdadeiro se todos os critérios corresponderem
  });
});

const updateCurrentPage = (newPage: number) => {
  currentPage.value = newPage;
  fetchPokemons(); 
};

const applyTypeFilter = (types: string[] | null) => {
  if (!types || types.length === 0) {
    typeFilter.value = null;
    limit.value = DEFAULT_LIMIT; 
  } else {
    typeFilter.value = types.map((type) => {
      const normalizedType = type.trim().toLowerCase();
      return pokemonTypeMap[normalizedType] || normalizedType;
    });
    limit.value = MAX_LIMIT; 
  }

  currentPage.value = 1;
  fetchPokemons();  
};


onMounted(fetchPokemons);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
</style>
