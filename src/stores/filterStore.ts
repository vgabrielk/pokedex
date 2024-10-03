import { pokemonTypeMap } from '@/types/pokemon-type-map.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  const filterQuery = ref<string>('');
  const selectedTypes = ref<string[]>([]);
  const paginationLimit = ref<number>(20); // Limite inicial para a paginação padrão
  const MAX_LIMIT = 1302; // Defina o número máximo de Pokémons

  const applyFilter = (query: string) => {
    filterQuery.value = query;
    adjustPaginationLimit();
  };

  const applyTypeFilter = (types: string[]) => {
    if (!types || types.length === 0) {
      selectedTypes.value = [];
    } else {
      selectedTypes.value = types.map((type) => {
        const normalizedType = type.trim().toLowerCase();
        return pokemonTypeMap[normalizedType] || normalizedType;
      });
    }
    adjustPaginationLimit();
  };

  const adjustPaginationLimit = () => {
    // Se houver filtros ativos (por nome ou tipo), defina o limite como "infinito" (MAX_LIMIT)
    if (filterQuery.value || selectedTypes.value.length > 0) {
      paginationLimit.value = MAX_LIMIT;
    } else {
      paginationLimit.value = 20; // Volte ao limite padrão se não houver filtros
    }
  };

  return {
    filterQuery,
    selectedTypes,
    paginationLimit,
    applyFilter,
    applyTypeFilter,
  };
});
