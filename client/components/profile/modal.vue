<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Profile"
    text="Update your profile"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="solar:user-broken" />
    </template>

    <template #content>
      <ProfileForm />
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
