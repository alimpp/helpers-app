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
        :items="items"
        :sideMenuState="sideMenuState"
        @chnageSideMenuState="chnageSideMenuState"
      />
      <div
        class="router-content overflow-hidden"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <NuxtPage />
      </div>
      <LayoutsAdminMobileNav :items="items" v-if="width < 800" />
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

const items = ref([
  {
    id: 0,
    name: 'Home',
    path: '/',
    icon: 'solar:home-outline',
  },
  {
    id: 1,
    name: 'Entry',
    path: '/dashboard/entry',
    icon: 'solar:clipboard-linear',
  },
  {
    id: 2,
    name: 'Tasks',
    path: '/dashboard/tasks',
    icon: 'solar:clipboard-list-outline',
  },
  {
    id: 3,
    name: 'Notes',
    path: '/dashboard/notes',
    icon: 'solar:notebook-broken',
  },
]);

import { useRoute } from 'vue-router';
const route = useRoute();

const startX = ref(0);
const endX = ref(0);

const onTouchStart = (e) => {
  startX.value = e.touches[0].clientX;
};

const onTouchMove = (e) => {
  endX.value = e.touches[0].clientX;
};

const onTouchEnd = () => {
  const delta = endX.value - startX.value;
  const currentPath = items.value.find((item) => {
    return item.path == route.path;
  });

  if (delta > 300) {
    const target = items.value[currentPath.id - 1];
    if (target) {
      navigateTo(target.path);
    } else {
      navigateTo(items.value[items.value.length - 1].path);
    }
  } else if (delta < -300) {
    const target = items.value[currentPath.id + 1];
    if (target) {
      navigateTo(target.path);
    } else {
      navigateTo(items.value[0].path);
    }
  }
};

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
