<template>
  <div class="w-100 flex flex-column">
    <div class="w-100 flex flex-column justify-center align-center">
     <span class="f-s-16 f-w-500">Welcome Back To Helpers App</span>
     <span class="f-s-12 f-w-100">Please register in helpers</span>
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
    <BaseButton
      padding="12px 8px"
      class="mt-20"
      name="Register"
      :loading="loading"
      :disabled="disabled"
      @click="register"
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
    key: 'fristname',
    validate: true,
    model: '',
    rules: 'length',
    minlength: 3,
    maxlength: 30,
    label: 'Fristname',
    placeholder: 'Please Enter Fristname'
  },
  {
    key: 'lastname',
    validate: true,
    model: '',
    rules: 'length',
    minlength: 3,
    maxlength: 30,
    label: 'Lastname',
    placeholder: 'Please Enter Lastname'
  },
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
  return !access.value || !form.value[0].model || !form.value[1].model || !form.value[2].model|| !form.value[3].model
    ? true
    : false;
});

const register = async () => {
  loading.value = !loading.value;
  const transformData = transformToKeyModel(form.value)
  await userController.register({...transformData, bgColor: ''})
  loading.value = !loading.value;
};
</script>
