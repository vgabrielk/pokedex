<template>
  <div class="px-2 mt-5 grid grid-cols-12 gap-4 h-[97vh]">
    <notifications />

    <!-- Exibir Pokedex em desktop e na rota / em mobile -->
    <div class="col-span-12 lg:col-span-3 overflow-y-scroll custom-scrollbar" v-if="isDesktop || (isMobile && isOnHomePage)">
      <pokedex />
    </div>

    <!-- Exibir Router View -->
    <div class="col-span-12 lg:col-span-9">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Notifications } from '@kyvg/vue3-notification';
import Pokedex from './layouts/pokedex/Pokedex.vue'; 
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';


export default defineComponent({
  name: 'App',
  components: {
    Pokedex,
  },
  setup() {
    const route = useRoute();

    const isMobile = computed(() => {
      return window.innerWidth < 1070; 
    });

    const isDesktop = computed(() => {
      return window.innerWidth >= 1070; 
    });

    const isOnHomePage = computed(() => {
      return route.path === '/';
    });

    return {
      route,
      isMobile,
      isDesktop,
      isOnHomePage,
    };
  },
});
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ff0000; 
  border-radius: 20px; 
  border: 3px solid #f1f1f1; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #fbb034; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background-color: #000000; 
}
</style>
