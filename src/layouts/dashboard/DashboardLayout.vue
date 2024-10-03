<script setup lang="ts">
import HeaderLayout from '../header/HeaderLayout.vue';
import SidebarLayout from '../sidebar/SidebarLayout.vue';
import { toRefs } from 'vue';
import { useDarkMode } from '@/stores/darkModeStore';
const {currentTheme} = toRefs(useDarkMode());

</script>

<template>
  <div :class="currentTheme.bg" class="flex h-screen font-roboto">
    <sidebar-layout />

    <div class="flex-1 flex flex-col overflow-hidden">
      <header-layout />

      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="mx-auto  py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
