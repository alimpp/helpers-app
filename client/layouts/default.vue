<template>
  <LayoutsAdmin />
</template>

<script setup>
import { userController } from '@/controllers/User';
import { applicationController } from '../controllers/Application';

onMounted(async () => {
  await userController.profile();
  // await applicationController.getStyles('admin');
});
</script>
