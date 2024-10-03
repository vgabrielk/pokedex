<template>
  <header :class="[currentTheme.bg, currentTheme.borderBottom]" class="flex items-center justify-between px-6 py-4" >
    <div class="flex items-center ">
      <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>

      <div class="relative mx-4 lg:mx-0" v-if="route.name == 'pokedex'">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>

        <input v-model="filterStore.filterQuery"
          class="w-32 pl-10 pr-4 text-white-600 p-[6px] border-gray-200 rounded-md sm:w-64"
          type="text" placeholder="Search">
      </div>
      <div class="ml-4" v-if="route.name == 'pokedex'">
        <multi-select v-model="selectedTypes" @select="handleTypeChange"
          class="w-32 sm:w-64 pl-2 pr-4 text-gray-900"
          multiple
           :options="pokemonTypeData"
            label="name"
            :taggable="true"
             :hide-placeholder="true"
              track-by="name"            >
        <template #placeholder>

        </template>
        </multi-select>
      </div>
      <div class="ml-4" v-if="route.name == 'pokedex'" >
        <button @click="onClearFilters">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"/></svg>
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button class="relative z-10 block w-8 h-8 overflow-hidden rounded-full  focus:outline-none"
          @click="dropdownOpen = !dropdownOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>

        <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false"></div>

        <transition enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0">
          <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 rounded-md" :class="[currentTheme.bg]">
            <div class="block px-4 py-2 text-sm text-gray-700 hover:text-white">
              <toogle-dark-mode-component/>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ToogleDarkModeComponent from "@/components/toogle-dark-mode/ToogleDarkModeComponent.vue";

import { ref, toRefs } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import { useFilterStore } from "@/stores/filterStore";
import { pokemonTypeData } from "@/utils/pokemon-type-data";
import { useDarkMode } from "@/stores/darkModeStore";
import { useRoute } from "vue-router";
const {currentTheme, isDarkMode} = toRefs(useDarkMode());
const { isOpen } = useSidebar();

const route = useRoute();
const filterStore = useFilterStore();
const dropdownOpen = ref(false);

const onClearFilters = () => {
  selectedTypes.value = []
  filterStore.clearFilters();
}

const selectedTypes = ref<string[]>([]);

const handleTypeChange = () => {
  console.log('chamou', selectedTypes.value)
  filterStore.applyTypeFilter(selectedTypes.value);
};
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.min.css';

.multiselect__tags{
  background-color: transparent;
}

</style>