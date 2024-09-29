<template>
  <img 
    :src="`/icons/${name}.${extension}`" 
    :class="{'filter invert': color === 'light'}" 
    class="transition duration-200"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  name: string;
  color?: 'light' | 'dark';
  extension: 'png' | 'svg'
}>();
</script>

<style scoped>
.filter {
  filter: invert(100%);
}
</style>
