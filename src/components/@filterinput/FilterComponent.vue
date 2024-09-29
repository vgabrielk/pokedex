<template>
  <div class="relative">
    <button
      class="rounded-full bg-red-500 text-white p-2 hover:bg-red-200"
      @click="toggleDropdown"
    >
      <icon-component name="filter" color="light" extension="svg" />
    </button>

    <div
      v-if="isDropdownOpen"
      class="absolute mt-2 w-full bg-red-500 border z-10 p-4 rounded"
    >
      <div class="filter-input mb-4">
        <input
          v-model="filterQuery"
          type="text"
          placeholder="Pesquisar pokémon por nome ou número..."
          class="border-none outline-none p-2 rounded w-full shadow-md bg-transparent placeholder-white text-white"
        />
      </div>

      <h3 class="font-bold mb-2 text-white">Tipos de Pokémon</h3>
      <div
        class="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-8 gap-2"
      >
        <div
          class="transition-opacity duration-200 hover:opacity-50 hover:cursor-pointer"
          v-for="poke in pokemonTypeData"
          :key="poke.id"
          :title="poke.name"
          @click="toggleTypeSelection(poke.name)"
          :class="{ selected: selectedTypes.includes(poke.name) }"
        >
          <img
            :src="poke.image"
            alt="poke.id"
            class="w-24"
            :class="{ 'border-white': selectedTypes.includes(poke.name) }"
          />
        </div>
      </div>

      <button
        class="mt-4 bg-white text-red-500 font-medium p-2 rounded"
        @click="confirmSelection"
      >
        Confirmar Seleção
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { pokemonTypeData } from "@/utils/pokemon-type-data";
import IconComponent from "@/components/icons/IconComponent.vue";

const isDropdownOpen = ref(false);
const selectedTypes = ref<string[]>([]);
const emit = defineEmits<{
  (e: "update:typeFilter", type: string[]): void;
  (e: "update:filter", query: string): void;
}>();

const filterQuery = ref<string>("");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleTypeSelection = (type: string) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
    selectedTypes.value.push(type);
  }
};

const confirmSelection = () => {
  emit("update:typeFilter", selectedTypes.value);
  emit("update:filter", filterQuery.value);
  console.log(selectedTypes.value);
  toggleDropdown();
};
</script>

<style scoped>
.filter-input {
  width: 100%;
}
.selected {
  border-width: 2px;
  border-color: white;
  border-radius: 50%;
  transition: border-color 0.3s, opacity 0.3s;
}
</style>
