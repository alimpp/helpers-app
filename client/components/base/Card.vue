<template>
  <div
    class="border-rounded base-card"
    :class="[
      {
        'base-card-dark': appTheme == 'dark',
        'base-card-light': appTheme == 'light',
      },
      px,
      py,
    ]"
    :style="{ 'min-height': minHeight }"
  >
    <slot></slot>
    <div class="loader" v-if="loading"></div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  bgClass: {
    type: String,
    default: '',
  },
  px: {
    type: String,
    default: 'px-5',
  },
  py: {
    type: String,
    default: 'py-5',
  },
  minHeight: { type: String, default: 'auto' },
});
</script>

<style scoped>
.base-card {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  transition: 1s;
}

.loader {
  height: 4px;
  width: 100%;
  --c: no-repeat linear-gradient(#3c8cf59f 0 0);
  background: var(--c), var(--c), #d7b8fc41;
  background-size: 60% 100%;
  animation: loader 1.5s infinite;
  border-radius: 10px;
}
@keyframes loader {
  0% {
    background-position:
      -150% 0,
      -150% 0;
  }
  66% {
    background-position:
      250% 0,
      -150% 0;
  }
  100% {
    background-position:
      250% 0,
      250% 0;
  }
}
</style>
