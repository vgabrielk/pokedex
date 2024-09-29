<!-- src/pages/NotFound.vue -->
<template>
    <div class="text-center fixed w-[100%] bg-[#e6e6e6] left-0 h-[100vh] flex flex-col justify-center scale-[2]">
      <h1 class="text-4xl text-red-500 font-bold">404</h1>
      <div class="mt-5">
          <router-link class="bg-red-500 text-white rounded p-4" to="/">Voltar para a página inicial</router-link>
        </div>
      <p class="mt-5 font-bold">Página não encontrada.</p>
    </div>
  </template>
  
  <script lang="ts" setup>
    
  </script>
  