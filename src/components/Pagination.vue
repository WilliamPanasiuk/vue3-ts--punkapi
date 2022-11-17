<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["calculatePage"]);
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  page: {
    type: Number,
    default: 1,
    required: true,
  },
  isPrev: {
    type: Boolean,
    default: true,
    required: false,
  },
  isNext: {
    type: Boolean,
    default: true,
    required: false,
  },
});
</script>
<template>
  <div class="flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8">
    <button
      class="bg-c-primary hover:bg-c-second text-white font-bold py-2 px-4 rounded disabled:opacity-25"
      :disabled="isPrev"
      @click="$emit('calculatePage', -1)"
    >
      prev
    </button>
    <span class="font-bold leading-10">{{ page }}</span>
    <button
      class="bg-c-primary hover:bg-c-second text-white font-bold py-2 px-4 rounded disabled:opacity-25"
      :disabled="!isNext"
      @click="$emit('calculatePage', 1)"
    >
      next
    </button>
  </div>
</template>
