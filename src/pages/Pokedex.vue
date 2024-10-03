<template>
  <div class="mt-5">
    <div v-if="filterNotResults && filteredPokemons.length == 0">
      Nenhum resultado encontrado
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" @click="() => redirectToPokemonDetails(pokemon.id)" :class="[
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
          <h1 class="bg-white text-blue-600 font-semibold rounded-full flex items-center justify-center">{{ pokemon.id
            }}</h1>
          <h2 class="text-lg font-semibold capitalize text-white">{{ pokemon.name }}</h2>

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

import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import router from '@/router/routes';

import { pokemonTypeMap } from '@/types/pokemon-type-map'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { pokeApiUrl } from '@/services/api';
import { PokemonRequestDetail, PokemonRequestListResult } from '@/types/pokemon-request-types';
import { useRoute } from 'vue-router';
import { getPokemonTypeImage } from '@/utils/pokemon-get-type-image';
import { notify } from '@kyvg/vue3-notification';
import { useFilterStore } from '@/stores/filterStore';



const route = useRoute();

const showPagination = ref(false);
const filterStore = useFilterStore();
const currentPage = ref(1);
const totalPages = ref(0);
const pokemons = ref<PokemonRequestDetail[]>([]);
const MAX_LIMIT = 1302;
const DEFAULT_LIMIT = 20;
const filterNotResults = ref(false);

const paginationLimit = computed(() => {
  return useFilterStore().paginationLimit
})

const redirectToPokemonDetails = (id: number) => {
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

    if (!filterStore.selectedTypes.length && !filterStore.filterQuery) {
      totalPages.value = Math.ceil(MAX_LIMIT / DEFAULT_LIMIT);
    } else {
      totalPages.value = 1;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Erro ao carregar dados da API';
    notify({ type: 'error', text: errorMessage });
  }
};

const fetchPokemonList = async (): Promise<PokemonRequestListResult[]> => {
  const activeLimit = paginationLimit; 
  const response = await axios.get(`${pokeApiUrl}/pokemon?limit=${activeLimit}&offset=${(currentPage.value - 1) * DEFAULT_LIMIT}`);
  return response.data.results;
};

const fetchPokemonDetails = async (pokemonList: PokemonRequestListResult[]): Promise<PokemonRequestDetail[]> => {
  const detailsPromises = pokemonList.map((pokemon) => axios.get<PokemonRequestDetail>(pokemon.url));
  const detailsResponses = await Promise.all(detailsPromises);
  return detailsResponses.map((res) => res.data);
};

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon => {
    const isQueryANumber = !isNaN(Number(filterStore.filterQuery));
    const matchesName = !isQueryANumber && filterStore.filterQuery
      ? pokemon.name.toLowerCase().includes(filterStore.filterQuery.toLowerCase())
      : true;

    const matchesId = isQueryANumber && filterStore.filterQuery
      ? pokemon.id === Number(filterStore.filterQuery)
      : true;

    const matchesType = filterStore.selectedTypes.length
      ? pokemon.types.some(item => filterStore.selectedTypes.includes(item.type.name.toLowerCase()))
      : true;
      console.log(filterStore.selectedTypes)

    return matchesName && matchesId && matchesType;
  });
});

const updateCurrentPage = (newPage: number) => {
  currentPage.value = newPage;
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

<style scoped></style>
