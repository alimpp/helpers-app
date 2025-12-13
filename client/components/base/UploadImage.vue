<template>
  <div class="flex flex-column w-100">
    <input
      ref="input"
      style="display: none"
      type="file"
      @change="uploadImage"
    />
    <div
      class="flex flex-column align-center justify-center w-98 h-200-px"
      v-if="loading"
    >
      <BaseIcon name="svg-spinners:blocks-shuffle-3" />
      <span class="f-s-12 f-w-600 color-primary">Uploading...</span>
    </div>
    <div class="flex flex-column" @click="openFiles" v-else>
      <img
        :src="previewImage"
        alt="image"
        v-if="previewImage"
        class="fade-animation w-98 border-rounded"
        height="200"
      />
      <div class="image-content" v-else>
        <BaseIcon name="solar:cloud-upload-broken" size="40" />
        <span class="f-s-13 f-w-600 py-10">{{ title }}</span>
        <span class="f-s-10 f-w-500 color-gray">{{ subTitle }}</span>
      </div>
    </div>
    <BaseButton
      name="Updload New File"
      class="mt-10"
      bg="bg-secondary-1"
      icon="solar:upload-square-outline"
      v-if="previewImage"
      @click="openFiles"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['uploadImage']);
const input = ref(null);

const props = defineProps({
  title: { default: 'Choose Image' },
  subTitle: { default: 'JPG , JPEG , and PNG formats , up to 10MB' },
  previewImage: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const openFiles = () => {
  input.value.click();
};

const uploadImage = (event) => {
  emit('uploadImage', event);
};
</script>

<style scoped>
.image-content {
  width: 98%;
  height: 200px;
  border: 1px solid #8481812f;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
