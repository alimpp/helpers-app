<template>
  <div
    class="base-chip"
    :style="{ height: height }"
    :class="[bg, color, border]"
  >
    <div class="flex align-center justify-center px-20">
      <BaseIcon
        class="cursor-pointer"
        @click="emit('handleClick')"
        :name="icon"
        v-if="icon && iconLocation == 'left'"
      />
      <span :class="[fontSize, fontWight, color]"> {{ name }}</span>
      <BaseIcon
        class="cursor-pointer"
        @click="emit('handleClick')"
        :name="icon"
        v-if="icon && iconLocation == 'right'"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['handleClick']);

const props = defineProps({
  bg: {
    type: String,
    default: 'bg-primary-1',
  },
  color: {
    type: String,
    default: 'color-primary-white',
  },
  fontSize: {
    type: String,
    default: 'f-s-12',
  },
  fontWight: {
    type: String,
    default: 'f-w-500',
  },
  name: {
    type: String,
    default: '',
  },
  border: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '70px',
  },
  height: {
    type: String,
    default: '30px',
  },
  icon: {
    type: String,
    default: '',
  },
  iconLocation: {
    type: String,
    default: 'right',
  },
});
</script>

<style scoped>
.base-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: none;
}
</style>
