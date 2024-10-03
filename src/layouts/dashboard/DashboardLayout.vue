<script setup lang="ts">
import HeaderLayout from '../header/HeaderLayout.vue';
import SidebarLayout from '../sidebar/SidebarLayout.vue';

</script>

<template>
  <div class="flex h-screen font-roboto">
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
