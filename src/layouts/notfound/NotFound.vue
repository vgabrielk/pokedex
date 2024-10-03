<template>
     <div class="flex items-center justify-center relative flex-col h-[80vh]">
        <img src="/images/poke-ball.png" alt="Not found" class=" w-[40px]"/>
        <h3 :class="currentTheme.text">404 Not found.</h3>

      </div>
  </template>
  
  <script lang="ts" setup>
import { useDarkMode } from '@/stores/darkModeStore';

    const {currentTheme}= useDarkMode()
  </script>
  