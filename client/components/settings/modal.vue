<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Settings"
    text="Application Settings"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="solar:settings-outline" />
    </template>

    <template #content>
      <SettingsForm />
    </template>
  </BaseModal>
</template>

<script setup>
const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  emit('close');
};
</script>
