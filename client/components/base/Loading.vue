<template>
  <div class="w-100 h-90-dvh flex flex-column align-center justify-center">
    <BaseIcon name="svg-spinners:bars-scale-middle" size="30" />
    <span class="f-s-14 f-w-500 pt-10">{{ text }}</span>
    <span class="f-s-11 f-w-500 color-gray">{{ sub }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Waiting . . .',
  },
  sub: {
    type: String,
    default: '',
  },
});
</script>
