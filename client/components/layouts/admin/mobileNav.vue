<template>
  <div
    class="mobile-nav-content w-100 h-70-px flex align-center justify-center"
  >
    <div
      class="flex align-center justify-center w-97 h-70-px custom-border"
      :class="{
        'sidebar-header-bg': appTheme == 'dark',
        'bg-white': appTheme == 'light',
      }"
    >
      <div
        class="flex flex-column justify-center align-center w-80-px"
        v-for="item in items"
      >
        <div
          class="flex flex-column justify-center align-center w-40-px"
          :class="{ 'active-path': route.path == item.path }"
          @click="navigateTo(`${item.path}`)"
        >
          <BaseIcon class="pt-4" :name="item.icon" size="30" />
          <span class="px-5 pt-5 f-s-12">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const props = defineProps({
  items: { default: [] },
});
</script>

<style scoped lang="scss">
@import url('@/assets/scss/theme_colors.scss');
.active-path {
  background: var(--secondary3-);
  color: var(--secondary1-);
  border-radius: 15px;
  padding: 0 10px;
  transition: 1s;
}

.mobile-nav-content {
  position: fixed;
  z-index: 10;
  bottom: 10px;
}

.custom-border {
  border: 1px solid #aca5a542;
  border-radius: 10px;
}
</style>
