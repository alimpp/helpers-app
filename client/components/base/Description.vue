<template>
  <span
    :class="{
      'f-s-8': getDescrptionSize == 'standard',
      'f-s-11': getDescrptionSize == 'semiBold',
      'f-s-13': getDescrptionSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getDescrptionSize = computed(() => {
  return applicationStore._state.descrption;
});
</script>
