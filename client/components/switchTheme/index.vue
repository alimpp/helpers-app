<template>
  <div class="flex flex-column">
    <div class="flex mt-15">
      <span
        :class="{ 'bg-primary-2': appTheme == 'dark' }"
        class="flex align-center f-s-12 f-w-600 px-15 py-5 border-rounded cursor-pointer"
        @click="setTheme('dark')"
      >
        <BaseIcon width="18px" name="line-md:moon-loop" class="mx-5" />
        Dark
      </span>
      <span
        :class="{ 'bg-primary-2': appTheme == 'light' }"
        class="flex align-center f-s-12 f-w-600 px-15 py-5 border-rounded cursor-pointer mx-10"
        @click="setTheme('light')"
      >
        <BaseIcon width="18px" name="line-md:sun-rising-loop" class="mx-5" />
        Light
      </span>
    </div>
  </div>
</template>

<script setup>
import { applicationController } from '../../controllers/Application';

const applicationStore = useApplicationStore();

const setTheme = async (theme) => {
  applicationStore.setTheme(theme);
  await applicationController.updateStyle({ theme: theme });
};

const appTheme = computed(() => {
  return applicationStore._state.theme;
});
</script>
