<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-c-primary">
    <Navigation />
    <div class="container mt-6">
      <Router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import Navigation from "/src/components/Navigation.vue";
</script>
