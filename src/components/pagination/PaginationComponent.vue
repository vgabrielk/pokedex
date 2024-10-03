<template>
    <div
      class="p-4"
    >   
      <button
      class="btn-default rounded-tl-md rounded-bl-md border-r-[#e6e6e627] border-r"
      @click="goToNext"
        :disabled="currentPage === totalPages"
      >
        Prev
      </button>
      <button
        class="btn-default rounded-tr-md rounded-br-md"
        @click="goToPrevious"
        :disabled="currentPage === 1"
      >
        Next
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
  