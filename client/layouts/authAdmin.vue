<template>
  <div 
   class="auth-layout"
   :class="{
      'bg-app-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
  >
  <div class="image-content">
    <div class="glass">
     <div class="flex flex-column justify-center align-center w-380-px">
       <img src="/public/logo/logo-app.svg" alt="logo" width="150" height="150" />
       <NuxtPage />
     </div>
    </div>
  </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});
</script>

<style scoped>
.auth-layout {
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-content{
  width: 100%;
  height: 100dvh;
  background-image: url('/public/gifs/algo.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glass {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 0px 0px rgba(255, 255, 255, 0);
}

.glass::before {
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

.glass::after {
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}

.router-content{
  width: 30%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
}
</style>
