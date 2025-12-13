<template>
  <span
    :class="{
      'f-s-9': getDateSize == 'standard',
      'f-s-13': getDateSize == 'semiBold',
      'f-s-15': getDateSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getDateSize = computed(() => {
  return applicationStore._state.date;
});
</script>
