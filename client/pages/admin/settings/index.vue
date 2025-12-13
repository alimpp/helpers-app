<template>
  <div>
    <BaseBreadCrumbs></BaseBreadCrumbs>
    <SettingsForm />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});
</script>
