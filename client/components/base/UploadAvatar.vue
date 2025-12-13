<template>
  <div class="flex w-100">
    <input
      ref="input"
      style="display: none"
      type="file"
      @change="updateAvatar"
    />
    <BaseButton
      :loading="loading"
      icon="line-md:upload-outline-loop"
      @click="openFiles"
      class="bg-primary-1"
      width="100%"
      name="Upload Avatar"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['updateAvatar']);
const input = ref(null);

const openFiles = () => {
  input.value.click();
};

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const updateAvatar = (event) => {
  emit('updateAvatar', event);
};
</script>
