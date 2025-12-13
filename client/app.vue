<template>
  <NuxtLayout>
    <div :class="{ 'back-navigation': isBack }">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const isBack = ref(false);
let history = [];

watch(route, (to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  isBack.value = toDepth < fromDepth;
});
</script>

<style>
.page-enter-active {
  transition: transform 0.3s ease;
}
.page-leave-active {
  transition: transform 0.3s ease;
}

.page-enter-from {
  transform: translateX(100%);
}
.page-leave-to {
  transform: translateX(-30%);
}

.back-navigation .page-enter-from {
  transform: translateX(-100%);
}
.back-navigation .page-leave-to {
  transform: translateX(100%);
}
</style>
