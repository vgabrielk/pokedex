<template>
      <div class="px-12 mt-5">

  <router-view />
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './index.css'

export default defineComponent({
  name: 'App',
});
</script>
