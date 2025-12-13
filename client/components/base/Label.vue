<template>
  <span
    :class="{
      'f-s-10': getLabelSize == 'standard',
      'f-s-12': getLabelSize == 'semiBold',
      'f-s-14': getLabelSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getLabelSize = computed(() => {
  return applicationStore._state.label;
});
</script>
