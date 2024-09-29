<template>
    <div
      class="fixed bottom-5 right-5  shadow-lg p-4 rounded-lg z-50"
    >
      <button
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        @click="goToPrevious"
        :disabled="currentPage === 1"
      >
        Anterior
      </button>
      
      <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>
  
      <button
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        @click="goToNext"
        :disabled="currentPage === totalPages"
      >
        Próximo
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  
  const props = defineProps<{
    totalPages: number;
    currentPage: number;
  }>();

  const emit = defineEmits();

  
  const goToPrevious = () => {
    if (props.currentPage > 1) {
      emit('update:currentPage', props.currentPage - 1);
    }
  };
  
  const goToNext = () => {
    if (props.currentPage < props.totalPages) {
      emit('update:currentPage', props.currentPage + 1);
    }
  };

  
  </script>
  
  <style scoped>
  </style>
  