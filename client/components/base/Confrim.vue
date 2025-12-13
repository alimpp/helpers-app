<template>
  <div class="base-modal-content fade-animation-1s" v-if="isOpen">
    <div
      :class="{
        'bg-app-dark': appTheme == 'dark',
        'bg-app-light': appTheme == 'light',
      }"
      class="content flex flex-column px-15 py-10"
      :style="{ width: width, height: height, borderRadius: borderRadius }"
    >
      <div class="w-100 flex justify-center py-15">
        <BaseIconContent :name="icon.name" :bgClass="icon.bg" />
      </div>
      <div class="w-100 flex flex-column justify-center align-center">
        <BaseTitle>{{ title }}</BaseTitle>
        <BaseSubTitle class="color-gray-1">{{ text }}</BaseSubTitle>
      </div>
      <div class="w-100 flex justify-center align-center py-20">
        <BaseButton
          :bg="buttonStyle.bg"
          :name="confrimText"
          class="mx-5"
          @click="emit('confrim')"
          padding="12px 12px"
        />
        <BaseButton
          bg="bg-gray-1"
          color="color-dark-1"
          :name="cancelText"
          class="mx-5"
          @click="emit('cancel')"
          padding="12px 12px"
        />
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
  type: {
    type: String,
    default: 'danger',
  },
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
  confrimText: {
    type: String,
    default: 'Yes',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  icon: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['cancel', 'confrim']);

const icon = computed(() => {
  switch (props.type) {
    case 'danger':
      return {
        name: props.icon ? props.icon : 'solar:trash-bin-trash-linear',
        bg: 'bg-danger-3',
      };

    case 'success':
      return {
        name: props.icon ? props.icon : 'line-md:confirm-circle',
        bg: 'bg-primary-1',
      };

    default:
      break;
  }
});

const buttonStyle = computed(() => {
  switch (props.type) {
    case 'danger':
      return { bg: 'bg-danger-3' };
    case 'success':
      return {
        bg: 'bg-primary-1',
      };

    default:
      break;
  }
});
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
