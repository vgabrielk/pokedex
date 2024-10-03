import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu', () => {
  const menuState = ref<'opened' | 'closed'>('opened');

  const toggleMenu = () => {
    menuState.value = menuState.value === 'opened' ? 'closed' : 'opened';
  };

  return {
    menuState,
    toggleMenu,
  };
});
