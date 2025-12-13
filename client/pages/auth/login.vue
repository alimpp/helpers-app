<template>
  <div class="w-100 flex flex-column">
    <div class="w-100 flex flex-column justify-center align-center">
     <span class="f-s-16 f-w-500">Welcome Back To Helpers App</span>
     <span class="f-s-12 f-w-100 pt-5">Please authentication with username and password</span>
    </div>
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
    <span class="f-s-12 f-w-500 pt-20 pb-20 cursor-pointer" @click="navigateTo('/auth/register')">Don't have a user account?</span>
    <BaseButton
      width="100%"
      padding="12px 8px"
      name="Login"
      :loading="loading"
      :disabled="disabled"
      @click="login"
    />
  </div>
</template>

<script setup>
import { userController } from '@/controllers/User';

definePageMeta({
  layout: 'auth-admin',
});

const access = ref(false);
const loading = ref(false);

const form = ref([
  {
    key: 'email',
    validate: true,
    model: '',
    rules: 'email',
    label: 'Email',
    placeholder: 'Please Enter Email'
  },
  {
    key: 'password',
    validate: true,
    model: '',
    rules: 'length',
    minlength: 8,
    maxlength: 16,
    label: 'Password',
    placeholder: 'Please Enter Password'
  },
])

const disabled = computed(() => {
  return !access.value || !form.value[0].model || !form.value[1].model
    ? true
    : false;
});

const login = async () => {
  loading.value = !loading.value;
  const transformData = transformToKeyModel(form.value)
  await userController.login(transformData)
  loading.value = !loading.value;
};
</script>
