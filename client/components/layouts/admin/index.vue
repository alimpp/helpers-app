<template>
  <div
    :class="{
      'bg-app-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
    class="flex w-100 h-100-dvh overflow-hidden"
  >
    <div class="flex">
      <LayoutsAdminSidebar
        @chnageSideMenuState="chnageSideMenuState"
        class="slid-right-animation-5"
        :isOpen="sideMenuState"
      />
    </div>
    <div class="w-100 flex flex-column">
      <LayoutsAdminHeader
        :sideMenuState="sideMenuState"
        @chnageSideMenuState="chnageSideMenuState"
      />
      <div class="router-content overflow-hidden">
        <NuxtPage />
      </div>
      <LayoutsAdminMobileNav v-if="width < 800" />
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const { width } = useScreenSize();

const sideMenuState = ref(false);
const chnageSideMenuState = () => {
  sideMenuState.value = !sideMenuState.value;
};

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

watch(
  () => width.value,
  (oldVal, newVal) => {
    if (width.value < 800) sideMenuState.value = false;
  },
  { deep: true }
);

onMounted(() => {
  if (width.value > 800) sideMenuState.value = true;
});
</script>

<style scoped>
.router-content {
  height: 90dvh;
  overflow-y: scroll;
  padding: 10px 30px;
}
.router-content::-webkit-scrollbar {
  width: 0px;
  border: 0px solid #fff;
  border-radius: 5px;
}

.router-content::-webkit-scrollbar-track {
  border-radius: 5px;
  background: #eeeeee;
}

.router-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #cac8c8;
}

@media (max-width: 800px) {
  .router-content {
    padding: 10px 10px;
  }
}
</style>
