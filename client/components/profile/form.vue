<template>
  <div class="flex flex-column w-100">
    <BaseTitle>Select Background Color</BaseTitle>
    <ProfileColorPallete
      :color="user?.bgColor"
      @selectColor="selectColor"
      class="mt-10"
    />
    <BaseInput
      v-for="item in form"
      :validate="item.validate"
      v-model:access="access"
      v-model="item.model"
      :rules="item.rules"
      :min-length="item.minlength"
      :max-length="item.maxlength"
      class="mt-15"
      :label="item.label"
      :placeholder="item.placeholder"
    />
    <BaseButton
      padding="12px 8px"
      class="mt-20"
      name="Update Profile"
      :loading="loading"
      :disabled="disabled"
      @click="update"
    />
  </div>
</template>

<script setup>
import { userController } from '../../controllers/User';

const userStore = useUserStore();

const user = computed(() => {
  return userStore.getUser;
});

const loading = ref(false);

const selectColor = async (hex) => {
  await userController.updateProfile({ bgColor: hex });
};

const form = ref([
  {
    key: 'fristname',
    validate: true,
    model: user.value.fristname,
    rules: 'length',
    minlength: 3,
    maxlength: 30,
    label: 'Fristname',
    placeholder: 'Please Enter Fristname',
  },
  {
    key: 'lastname',
    validate: true,
    model: user.value.lastname,
    rules: 'length',
    minlength: 3,
    maxlength: 30,
    label: 'Lastname',
    placeholder: 'Please Enter Lastname',
  },
  {
    key: 'email',
    validate: true,
    model: user.value.email,
    rules: 'email',
    label: 'Email',
    placeholder: 'Please Enter Email',
  },
]);

const access = ref(false);
const disabled = computed(() => {
  return !access.value ||
    !form.value[0].model ||
    !form.value[1].model ||
    !form.value[2].model
    ? true
    : false;
});

const update = async () => {
  loading.value = true;
  const transformData = transformToKeyModel(form.value);
  await userController.updateProfile(transformData);
  loading.value = false;
};
</script>
