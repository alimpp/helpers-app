<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  color: { type: String, default: 'currentColor' },
});
</script>

<template>
  <Icon :icon="name" :width="size" :height="size" :color="color" />
</template>
