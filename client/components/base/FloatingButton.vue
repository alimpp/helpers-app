<template>
  <div class="float-button bg-primary-2" @click="emit('eventHandler')">
    <BaseIcon color="#fff" name="line-md:plus" />
  </div>
</template>

<script setup>
const emit = defineEmits(['eventHandler']);
const props = defineProps({
  icon: {
    type: String,
    default: 'line-md:plus',
  },
});
</script>

<style scoped>
.float-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 12px;
  margin-right: 12px;
  cursor: pointer;
}
</style>
