<template>
  <div class="flex align-center">
    <div
      class="base-avatar"
      :class="[bgClass]"
      :style="{ 'min-width': width, 'min-height': height, background: bg }"
    >
      <img
        :src="avatar"
        alt="PROFILE"
        v-if="avatar"
        :style="{ width: width, height: height }"
      />
      <span v-else class="color-primary-white" :class="[characterSize]">{{
        character
      }}</span>
    </div>

    <div class="flex flex-column justify-center px-5" v-if="name">
      <BaseSubTitle>{{ name }}</BaseSubTitle>
      <BaseText>{{ text }}</BaseText>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '35px',
  },
  height: {
    type: String,
    default: '35px',
  },
  character: {
    type: String,
    default: 'A',
  },
  name: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  bgClass: {
    type: String,
    default: 'bg-primary-1',
  },
  bg: {
    type: String,
    default: '',
  },
  characterSize: {
    type: String,
    default: 'f-s-20',
  },
});
</script>

<style scoped>
.base-avatar {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
