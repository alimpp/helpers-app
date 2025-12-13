<template>
  <div class="flex flex-column">
    <span
      v-if="title"
      class="color-primary-4"
      :class="{
        'f-s-10': getDividerSize == 'standard',
        'f-s-12': getDividerSize == 'semiBold',
        'f-s-13': getDividerSize == 'bold',
      }"
      >{{ title }}</span
    >
    <div
      class="style"
      :class="{ 'mt-5': title }"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();

const getDividerSize = computed(() => {
  return applicationStore._state.divider;
});

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '1px',
  },
});
</script>

<style scoped>
.style {
  background: #c9b9b944;
}
</style>
