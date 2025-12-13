<template>
  <div class="flex flex-column justify-center align-center w-100 h-75-dvh">
    <img src="/public/image/empty-state-vector.png" alt="image" width="300" />
    <span class="f-s-16 f-w-600 color-primary-1">{{ title }}</span>
    <span class="f-s-14 f-w-500 color-gray-1 pt-5">{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
});
</script>
