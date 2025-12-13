<template>
  <div
    class="skelton-style"
    :style="{ width: width, height: height, borderRadius: radius }"
  ></div>
</template>

<script setup>
const props = defineProps({
  width: {
    default: "100%",
    type: String,
  },
  height: {
    default: "60px",
    type: String,
  },
  radius: {
    default: "5px",
    type: String,
  },
});
</script>

<style scoped lang="scss">
.skelton-style {
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 25%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
