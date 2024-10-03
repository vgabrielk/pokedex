<template>
  <div class="p-4">
    <button
      class="btn-default rounded-tl-md rounded-bl-md border-r-[#e6e6e627] border-r cursor-pointer"
      @click="goToPrevious"
      :disabled="currentPage === 1"
    >
      Prev
    </button>

    <button
      class="btn-default rounded-tr-md rounded-br-md cursor-pointer"
      @click="goToNext"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();


const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
}>();

const goToPrevious = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const goToNext = () => {
  console.log('asdas')
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>

<style scoped>
</style>
