<template>
  <div
    class="style"
    :class="[bgClass]"
    :style="{ padding: padding, borderRadius: borderRadius }"
  >
    <Icon :icon="name" :width="size" :height="size" :color="color" />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  bgClass: {
    type: String,
    default: 'bg-primary-1',
  },
  padding: {
    type: String,
    default: '16px 16px',
  },
  name: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  color: { type: String, default: 'currentColor' },
  borderRadius: { type: String, default: '50%' },
});
</script>

<style scoped>
.style {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
