<template>
  <header
    class="sticky top-0 text-c-second bg-c-primary border-b border-gray-800"
  >
    <nav class="flex p-4">
      <Router-link to="/" class="flex">
        <IconHome />
        <div class="pl-2">Home</div> </Router-link
      ><br />
    </nav>
  </header>
</template>

<script setup lang="ts">
import IconHome from "/src/components/icon/IconHome.vue";
</script>
