<template>
  <span
    :class="{
      'f-s-10': getSubTitleSize == 'standard',
      'f-s-12': getSubTitleSize == 'semiBold',
      'f-s-13': getSubTitleSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getSubTitleSize = computed(() => {
  return applicationStore._state.subTitle;
});
</script>
