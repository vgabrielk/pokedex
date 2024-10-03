import { defineStore } from 'pinia';
import { ref, onMounted, computed } from 'vue';

export const useDarkMode = defineStore('darkMode', () => {
  const isDarkMode = ref<boolean>(false);


  console.log(isDarkMode.value)
  const currentTheme = computed(() => {
    return {
      bg: isDarkMode.value ? 'bg-gray-900 custom-shadow' : 'bg-white shadow-md',
      text: isDarkMode.value ? 'text-white' : 'text-gray-800',
      textTitle: isDarkMode.value ? 'text-white' : 'text-blue-600',
      borderBottom: isDarkMode.value ? 'border-b border-white' : 'border-b border-black',
    };
  });

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    console.log('Dark mode toggled:', isDarkMode.value);
    updateTheme();
  };

  const updateTheme = () => {
    if (isDarkMode.value) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode.value = savedTheme === 'dark';
    updateTheme();
  });

  return { isDarkMode, toggleDarkMode, currentTheme };
});
