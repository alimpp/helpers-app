<template>
  <span class="f-s-15 f-w-500 color-primary-1">{{ label }}</span>
  <span class="custom-background f-s-12 f-w-500 border-rounded px-8 py-8">{{
    content
  }}</span>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  content: { type: String, default: '' },
});
</script>

<style scoped>
.custom-background {
  background: #ffffff1a;
  border: 1px solid #0000000c;
}
</style>
