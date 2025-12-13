<template>
  <div class="base-modal-content fade-animation-1s" v-if="isOpen">
    <div
      :class="{
        'bg-app-dark': appTheme == 'dark',
        'bg-app-light': appTheme == 'light',
      }"
      class="content bg-primary-white flex flex-column px-15 py-10"
      :style="{ width: width, height: height, borderRadius: borderRadius }"
    >
      <div
        class="flex w-100"
        v-if="hasHeader"
        :class="{
          'bg-app-dark': appTheme == 'dark',
          'bg-light': appTheme == 'light',
        }"
      >
        <div class="w-100 flex align-center">
          <div
            class="w-50-px h-50-px border-circle bg-primary-gr flex align-center justify-center"
          >
            <slot name="icon"></slot>
          </div>
          <div class="flex flex-column justify-center px-5">
            <span class="f-s-15 f-w-600 color-primary">{{ title }}</span>
            <span class="f-s-12 f-w-400 color-gray">{{ text }}</span>
          </div>
        </div>
        <div class="flex align-center">
          <BaseIcon
            name="line-md:menu-to-close-alt-transition"
            class="cursor-pointer"
            @click="emit('close')"
          />
        </div>
      </div>

      <div class="flex justify-end w-100 py-8" v-else>
        <div class="flex align-center px-4">
          <BaseIcon
            name="line-md:menu-to-close-alt-transition"
            class="cursor-pointer"
            @click="emit('close')"
          />
        </div>
      </div>

      <BaseDivider class="mt-8" />

      <div class="solt-content-style">
        <slot name="content"></slot>
      </div>

      <div class="flex w-100 py-5 border-top" v-if="hasFooter">
        <div class="w-100 flex align-center">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '380px',
  },
  height: {
    type: String,
    default: 'auto',
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
  hasHeader: {
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000098;
}

.content {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  max-height: 95dvh;
}

.solt-content-style {
  max-height: 95dvh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
}

.solt-content-style::-webkit-scrollbar {
  display: none;
}

.border-top {
  border-top: 1px solid #d1cdcd53;
}

.border-bottom {
  border-bottom: 1px solid #d1cdcd53;
}

@keyframes slid-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 650px) {
  .base-modal-content {
    align-items: end;
  }
  .content {
    width: 100% !important;
    animation: 0.5s slid-up;
    border-radius: 20px 20px 0 0 !important;
  }
}
</style>
