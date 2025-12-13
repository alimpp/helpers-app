<template>
  <div class="base-modal-content fade-animation" v-if="isOpen">
    <div
      class="content bg-primary-white flex flex-column slid-left-animation-8"
      :style="{ width: width, height: height, borderRadius: borderRadius }"
    >
      <div class="flex w-100 h-5-dvh py-8 border-bottom">
        <div class="w-100 flex align-center px-5">
          <slot name="icon"></slot>
          <div class="flex flex-column justify-center px-8">
            <span class="f-s-13 f-w-500 color-primary">{{ title }}</span>
            <span class="f-s-12 f-w-400 color-gray">{{ text }}</span>
          </div>
        </div>
        <div class="flex align-center px-4">
          <IconsClose class="cursor-pointer" @click="emit('close')" />
        </div>
      </div>
      <div class="w-100 px-10 h-90-dvh py-10">
        <slot name="content"></slot>
      </div>
      <div class="w-100 px-10 py-5 h-5-dvh border-top" v-if="hasFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '100dvh',
  },
  borderRadius: {
    type: String,
    default: '10px',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  hasFooter: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);
</script>

<style scoped>
.base-modal-content {
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 1000;
  background: #00000098;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
}

.border-top {
  border-top: 1px solid #d1cdcd53;
}

.border-bottom {
  border-bottom: 1px solid #d1cdcd53;
}
</style>
