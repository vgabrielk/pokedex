<template>
  <div class="flex items-center px-3">
<input 
  type="checkbox" 
  id="toggle" 
  :checked="isDarkMode"  
  @change="toggleDarkMode"
  class="toggle-checkbox" 
/>
    <svg class="ml-2" v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <svg class="ml-2" v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/stores/darkModeStore'; 
import { toRefs } from 'vue';

const { isDarkMode, toggleDarkMode } = toRefs(useDarkMode()); 


</script>

<style>
.toggle-checkbox {
  width: 40px;
  height: 20px;
  border-radius: 50px;
  appearance: none;
  background-color: #ccc;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-checkbox:checked {
  background-color: #4a90e2;
}

.toggle-checkbox:checked::before {
  transform: translateX(20px);
}

.toggle-checkbox::before {
  content: '';
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}
</style>
