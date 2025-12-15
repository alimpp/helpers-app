<template>
  <div class="w-100 h-80-px flex align-center justify-center">
    <div
      class="flex align-center w-97 h-55-px custom-border"
      :class="{
        'sidebar-header-bg': appTheme == 'dark',
        'bg-white': appTheme == 'light',
      }"
    >
      <div class="w-50 flex px-10 align-center">
        <img
          src="/public/logo/logo-app.svg"
          alt="logo"
          width="45"
          height="45"
        />
        <BaseIcon
          class="cursor-pointer"
          width="30"
          name="gg:menu-right"
          @click="chnageSideMenuState"
          v-if="width > 800"
        />
      </div>
      <div class="w-50 flex justify-end px-10 align-center">
        <NotificationCount
          :sideMenuState="sideMenuState"
          :count="unReadCount"
        />
        <BaseIcon
          name="solar:user-broken"
          class="cursor-pointer"
          @click="profileModal = true"
        />
        <BaseIcon
          @click="settingModal = true"
          class="cursor-pointer mx-5"
          name="solar:settings-outline"
          width="25"
          height="25"
          v-if="route.path != '/admin/settings'"
        />
        <BaseAvatar
          @click="profileModal = true"
          v-if="!sideMenuState"
          width="45px"
          height="45px"
          :character="user.fristname[0] + user.lastname[0]"
          :bg="user.bgColor"
        />
      </div>
    </div>

    <SettingsModal :isOpen="settingModal" @close="settingModal = false" />
    <ProfileModal :isOpen="profileModal" @close="profileModal = false" />
  </div>
</template>

<script setup>
const { width } = useScreenSize();

import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({ sideMenuState: { default: false } });

const settingModal = ref(false);
const profileModal = ref(false);

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const unReadCount = computed(() => {
  return 0;
});

const userStore = useUserStore();

const user = computed(() => {
  return userStore.getUser;
});

const emit = defineEmits(['chnageSideMenuState']);

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};
</script>

<style scoped>
.custom-border {
  border: 1px solid #aca5a542;
  border-radius: 10px;
}
</style>
