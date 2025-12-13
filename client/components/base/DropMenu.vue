<template>
  <div class="drop-menu-content">
    <BaseIcon
      name="ant-design:more-outlined"
      class="cursor-pointer"
      size="20"
      @click="changeMenuState"
    />
    <div
      :class="{
        'base-drop-menu-dark': appTheme == 'dark',
        'base-drop-menu-light': appTheme == 'light',
      }"
      v-if="dropMenu"
      :style="{ width: width }"
      class="fade-animation-1s custom-style flex flex-column border-rounded px-10 py-10"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const dropMenu = defineModel('dropMenu');

const props = defineProps({
  width: { type: String, default: '150px' },
});

const changeMenuState = () => {
  dropMenu.value = !dropMenu.value;
};
</script>

<style scoped>
.drop-menu-content {
  position: relative;
  display: flex;
}
.custom-style {
  position: absolute;
  z-index: 100;
  left: 20px;
  border: 1px solid #87858a0e;
}
</style>
