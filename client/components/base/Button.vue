<template>
  <button
    class="base-button"
    :class="[bg, color, border]"
    :disabled="disabled || loading"
    :style="buttonStyles"
  >
    <BaseIcon
      v-if="loading"
      name="line-md:loading-loop"
      :size="iconSize"
      class="base-button__icon"
    />

    <BaseIcon
      v-else-if="icon"
      :name="icon"
      :size="iconSize"
      class="base-button__icon mx-5"
    />

    <span v-if="showText" class="base-button__text pt-2" :class="textClasses">
      {{ name }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  responsive: { type: Boolean, default: false },
  bg: {
    type: String,
    default: 'bg-primary-gr',
  },
  color: {
    type: String,
    default: 'color-primary-white',
  },
  fontSize: {
    type: String,
    default: 'f-s-14',
  },
  fontWeight: {
    type: String,
    default: 'f-w-500',
  },
  name: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  border: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '18px',
  },
  padding: {
    type: String,
    default: '10px 12px',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const showText = computed(() => props.name && !props.responsive);

const textClasses = computed(() => [
  props.fontSize,
  props.fontWeight,
  props.color,
]);

const buttonStyles = computed(() => ({
  padding: props.padding,
}));
</script>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  position: relative;
  outline: none;
}

.base-button--full-width {
  width: 100%;
}

.base-button__text {
  line-height: 1;
  text-align: center;
}

.base-button__icon {
  flex-shrink: 0;
}

.base-button:disabled,
.base-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
}

.base-button:not(.base-button--disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.base-button--loading {
  cursor: wait;
}

@media (max-width: 768px) {
  .base-button {
    min-height: 36px;
    gap: 6px;
  }
}
</style>
