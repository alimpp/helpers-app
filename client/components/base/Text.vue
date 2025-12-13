<template>
  <span
    :class="{
      'f-s-9': getTextSize == 'standard',
      'f-s-11': getTextSize == 'semiBold',
      'f-s-13': getTextSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getTextSize = computed(() => {
  return applicationStore._state.text;
});
</script>
