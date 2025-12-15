<template>
  <div
    class="container-sidebar flex flex-column custom-style sidebar-header-bg"
    v-if="isOpen"
  >
    <div class="w-100 flex justify-end py-10 close-container">
      <BaseIcon
        class="cursor-pointer mx-20 mt-10"
        @click="chnageSideMenuState"
        name="line-md:menu-to-close-alt-transition"
      />
    </div>
    <div class="flex flex-column px-10 pt-10">
      <div class="flex">
        <div class="flex w-50">
          <BaseAvatar
            width="55px"
            height="55px"
            :character="user.fristname[0] + user.lastname[0]"
            :bg="user.bgColor"
          />
          <div class="flex flex-column justify-center px-5">
            <BaseTitle>{{ user.email }}</BaseTitle>
            <BaseSubTitle class="color-gray-1"
              >{{ user.fristname }} {{ user.lastname }}</BaseSubTitle
            >
          </div>
        </div>
        <div class="flex justify-end w-50 align-center">
          <NotificationCount :sideMenuState="!isOpen" :count="unReadCount" />
        </div>
      </div>
      <BaseDivider class="mt-10" />
      <div
        class="h-35-px flex align-center color-gray cursor-pointer mt-10"
        v-for="item in items"
        :key="item.id"
        @click="navigate(`${item.path}`)"
        :class="{ 'active-path': route.path == item.path }"
      >
        <BaseIcon :name="item.icon" size="25" />
        <span
          :class="{
            'f-s-11': getSidebarItemsSize == 'standard',
            'f-s-13': getSidebarItemsSize == 'semiBold',
            'f-s-15': getSidebarItemsSize == 'bold',
          }"
          class="px-5 pt-5"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const user = computed(() => {
  return userStore.getUser;
});

const applicationStore = useApplicationStore();

const getSidebarItemsSize = computed(() => {
  return applicationStore._state.sidebarItems;
});

import { useRouter } from 'vue-router';
const router = useRouter();

import { useRoute } from 'vue-router';
const route = useRoute();

const emit = defineEmits(['chnageSideMenuState']);

const props = defineProps({
  isOpen: {
    default: 'true',
    type: Boolean,
  },
});

const unReadCount = computed(() => {
  return 0;
});

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};

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

const navigate = (path) => {
  const osWidth = window.screen.width;
  router.push(path);
  if (osWidth < 900) {
    emit('chnageSideMenuState');
  }
};
</script>

<style scoped lang="scss">
@import url('@/assets/scss/theme_colors.scss');
.custom-style {
  box-shadow: 1px 0px 0px 0px #ffffff2d;
}
.container-sidebar {
  width: 350px;
  height: 100dvh;
  border-radius: 0 30px 30px 0;
}
.close-container {
  display: none;
}
.active-path {
  background: var(--secondary3-);
  color: var(--secondary1-);
  border-radius: 5px;
  padding: 0 10px;
  transition: 1s;
}
@media (max-width: 800px) {
  .container-sidebar {
    position: fixed;
    z-index: 100;
    width: 95%;
  }
  .close-container {
    display: flex;
  }
}
</style>
