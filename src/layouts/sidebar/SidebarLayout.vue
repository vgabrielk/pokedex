
<template>
    <div class="flex">
        <div :class="isOpen ? 'block' : 'hidden'"
            class="fixed inset-0 z-20 transition-opacity  opacity-50 lg:hidden" @click="isOpen = false" />

        <div :class="isOpen ?  ['translate-x-0 ease-out', currentTheme.bg] : ['-translate-x-full ease-in', currentTheme.bg]"
            class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform  lg:translate-x-0 lg:static lg:inset-0">
            <div class="flex items-center justify-center mt-8">
                <div class="flex items-center">
                   <img src="/images/bluepoke.png" width="44"/>

                    <span class="mx-2 text-2xl font-semibold " :class="currentTheme.text">Pokedex</span>
                </div>
            </div>

            <nav class="mt-10">
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[route.name === 'Home' ? activeClass : inactiveClass]" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        class="w-5 h-5" :stroke="isDarkMode ? '#ffffff' : '#111111'" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>

                    <span class="mx-4" :class="currentTheme.text">Homepage</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[route.name === 'pokedex' ? activeClass : inactiveClass]" to="/pokedex">
                    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                            :fill="isDarkMode ? '#ffffff' : '#111111'" />
                        <path
                            d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                            :fill="isDarkMode ? '#ffffff' : '#111111'" />
                        <path
                            d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                            :fill="isDarkMode ? '#ffffff' : '#111111'" />
                        <path
                            d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                            :fill="isDarkMode ? '#ffffff' : '#111111'" />
                    </svg>

                    <span class="mx-4" :class="currentTheme.text">Pokedex</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[route.name === 'favorites-pokemon' ? activeClass : inactiveClass]" to="/favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" :stroke="isDarkMode ? '#ffffff' : '#111111'"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                        </polygon>
                    </svg>

                    <span class="mx-4" :class="currentTheme.text">Favoritos</span>
                </router-link>

            </nav>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';
import { useDarkMode } from '@/stores/darkModeStore';
import { ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router';


const { isOpen } = useSidebar()

const {currentTheme, isDarkMode} = toRefs(useDarkMode());

const route = useRoute()
const activeClass = ref(
[
    'text-gray-900 border-gray-900', currentTheme
],
)
const inactiveClass = ref(
    [
    'border-gray-300 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',currentTheme
]
)

watch(
  () => route.name,
  (newName, oldName) => {
    isOpen.value = false
}
);
</script>
