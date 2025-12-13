<template>
  <div class="flex flex-column w-100">
    <BaseLabel :class="{ 'color-danger': errorMessage }">
      {{ label }}
    </BaseLabel>
    <input
      :style="{
        height: `${height}`,
        width: `${width}`,
      }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :class="{
        error: errorMessage,
        disabled: disabled,
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      class="mt-2"
    />
    <span v-if="errorMessage" class="color-danger-3 f-s-12 f-w-500 pt-5">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { useValidations } from '~/composables/useValidations';

const errorMessage = ref('');
const emit = defineEmits(['update:access']);

const access = defineModel('access');

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: '',
    required: false,
  },
  type: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
  height: {
    type: String,
    default: '40px',
  },
  width: {
    type: String,
    default: '',
  },
  validate: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: String,
    default: '',
  },
  minLength: {
    type: Number,
    default: 0,
  },
  maxLength: {
    type: Number,
    default: 0,
  },
});

watch(
  () => props.modelValue,
  (nVal, oval) => {
    if (props.validate) {
      switch (props.rules) {
        case 'email':
          if (props.modelValue != '') {
            const { validEmail } = useValidations();
            if (validEmail(props.modelValue)) {
              access.value = true;
              errorMessage.value = '';
            } else {
              access.value = false;
              errorMessage.value = 'email not valid';
            }
          } else {
            errorMessage.value = '';
          }
          break;

        case 'required':
          const { validEmpty } = useValidations();
          if (validEmpty(props.modelValue)) {
            access.value = true;
            errorMessage.value = '';
          } else {
            access.value = false;
            errorMessage.value = 'Field is required';
          }
          break;

        case 'length':
          const { validLength } = useValidations();
          const result = validLength(
            props.modelValue,
            props.minLength,
            props.maxLength
          );
          if (result.isValid) {
            access.value = true;
            errorMessage.value = result.message;
          } else {
            access.value = false;
            errorMessage.value = result.message;
          }
          break;
        case 'phone':
          const { ValidationIranianPhoneNumber } = useValidations();
          if (ValidationIranianPhoneNumber(props.modelValue)) {
            access.value = true;
            errorMessage.value = '';
          } else {
            access.value = false;
            errorMessage.value = 'Phone number is not valid';
          }
          break;
      }
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
input {
  padding: 0 7px;
  outline: none;
  border: 1px solid #8481812f;
  border-radius: 6px;
  color: #303030;
}

.disabled {
  cursor: not-allowed;
}

.error {
  border: 2px solid #f50000;
  color: #f50000;
}
</style>
