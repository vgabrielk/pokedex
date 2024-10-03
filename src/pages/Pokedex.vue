<template>
  <div class="mt-5">
    <div v-if="isLoading">
      <loading-component/>
    </div>
    <div v-if="filterNotResults && !isLoading">
      <div class="flex items-center justify-center relative flex-col h-[80vh]">
        <img src="/images/poke-ball.png" alt="Not found" class=" w-[40px]"/>
        <h3 :class="currentTheme.text">No Pokémon found with the given filter.</h3>

      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" @click="() => redirectToPokemonDetails(pokemon.id)" :class="[
        'p-1 md:p-4 flex relative rounded cursor-pointer',
        currentTheme.bg
      ]">
        <div class="flex-col min-w-[100px]">
          <img :src="pokemon.sprites.other.showdown.front_default" alt="" class="w-14 h-14 mb-2" />
          <div class="mt-4 flex w-full ml-[-6px]">
            <span v-for="(type, index) in pokemon.types" :key="index" class="rounded-sm capitalize ">
              <img :src="getPokemonTypeImage(type.type.name)" alt="pokemon type" class="w-14" />
            </span>
          </div>
        </div>

        <div class="flex flex-col">
          <h1 :class="[currentTheme.text]" class="font-semibold flex items-center justify-start mx-0 px-0">{{ pokemon.id }}</h1>
          <h2 :class="currentTheme.text" class="text-lg font-semibold capitalize">{{ pokemon.name }}</h2>
        </div>
      </div>
    </div>

    <pagination-component
      v-if="!isLoading && totalPages > 0"
      :total-pages="totalPages"
      :current-page="currentPage"
      @update:currentPage="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import LoadingComponent from '@/components/loading/LoadingComponent.vue';
import router from '@/router/routes';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { pokeApiUrl } from '@/services/api';
import { PokemonRequestDetail, PokemonRequestListResult } from '@/types/pokemon-request-types';
import { getPokemonTypeImage } from '@/utils/pokemon-get-type-image';
import { notify } from '@kyvg/vue3-notification';
import { useFilterStore } from '@/stores/filterStore';
import { useDarkMode } from '@/stores/darkModeStore';

const { currentTheme } = toRefs(useDarkMode());

const filterStore = useFilterStore();
const currentPage = ref(1);
const totalPages = ref(0);
const pokemons = ref<PokemonRequestDetail[]>([]);
const MAX_LIMIT = 1302; 
const DEFAULT_LIMIT = 20; 
const isLoading = ref(false); 


const filterNotResults = computed(() => {
  return filteredPokemons.value.length === 0;
});
const paginationLimit = computed(() => {
  return useFilterStore().paginationLimit;
});

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

    return matchesName && matchesId && matchesType;
  });
});


const redirectToPokemonDetails = (id: number) => {
  router.push({
    name: 'pokemon-details',
    params: { id }
  });
};

const fetchPokemons = async (): Promise<void> => {
  isLoading.value = true; 
  try {
    const response = await axios.get(`${pokeApiUrl}/pokemon?limit=${DEFAULT_LIMIT}&offset=${(currentPage.value - 1) * DEFAULT_LIMIT}`);
    const pokemonList = response.data.results;
    
    const pokemonDetails = await fetchPokemonDetails(pokemonList);
    pokemons.value = pokemonDetails;

    totalPages.value = Math.ceil(pokemonDetails.length / paginationLimit.value);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Erro ao carregar dados da API';
    notify({ type: 'error', text: errorMessage });
  } finally {
    isLoading.value = false; 
  }
};

const fetchPokemonDetails = async (pokemonList: PokemonRequestListResult[]): Promise<PokemonRequestDetail[]> => {
  const requests = pokemonList.map(pokemon => axios.get<PokemonRequestDetail>(pokemon.url).then(response => response.data));

  const results = await Promise.all(requests);
  
  return results;
};

const updateCurrentPage = (newPage: number) => {
  currentPage.value = newPage;
  fetchPokemons();
};

watch([() => filterStore.filterQuery, () => filterStore.selectedTypes], async () => {
  isLoading.value = true; 
  if (filterStore.filterQuery || filterStore.selectedTypes.length) {
    const response = await axios.get(`${pokeApiUrl}/pokemon?limit=${MAX_LIMIT}`);
    const pokemonList = response.data.results;
    const pokemonDetails = await fetchPokemonDetails(pokemonList);
    pokemons.value = pokemonDetails;

    totalPages.value = Math.ceil(filteredPokemons.value.length / paginationLimit.value);
    currentPage.value = 1; 
  } else {
    fetchPokemons();
  }
  isLoading.value = false; 
});

onMounted(fetchPokemons);
</script>

<style scoped></style>
