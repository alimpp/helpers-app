<template>
  <div class="flex flex-column w-100" @click="openList">
    <BaseLabel :class="{ 'color-danger': errorMessage }">
      {{ label }}
    </BaseLabel>
    <input
      :style="{
        height: `${height}`,
        width: `${width}`,
      }"
      :value="displayValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :class="{
        error: errorMessage,
        disabled: disabled,
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      class="mt-2 cursor-pointer"
      readonly
    />
    <span v-if="errorMessage" class="color-danger f-s-12 f-w-500 pt-5">
      {{ errorMessage }}
    </span>
  </div>

  <BaseModal
    :isOpen="listState"
    :hasFooter="false"
    title="Select"
    :text="text"
    @close="listState = false"
  >
    <template #icon>
      <BaseIcon name="fluent:multiselect-24-regular" />
    </template>

    <template #content>
      <input
        :class="{
          'color-white': appTheme == 'dark',
          'color-dark-1': appTheme == 'light',
        }"
        class="search-input"
        placeholder="Search"
        v-model="searchValue"
      />
      <BaseDivider />
      <div class="list">
        <!-- تغییر در اینجا: ارسال کل شیء به handleSelect -->
        <div
          class="fade-animation-1s select-item-style cursor-pointer flex align-center py-10 px-8 mt-5 border-rounded"
          v-for="(item, index) in itemsDataSource"
          :key="index"
          @click="handleSelect(item)"
          :class="{ 'selected-style': isSelected(item) }"
        >
          <BaseIcon
            name="solar:check-square-linear"
            size="20"
            v-if="isSelected(item)"
          />
          <BaseSubTitle class="px-5 pt-4">
            {{ item.name }}
          </BaseSubTitle>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const errorMessage = ref('');
const emit = defineEmits(['update:access']);

const access = defineModel('access');

const listState = ref(false);
const searchValue = ref('');

const openList = () => {
  searchValue.value = '';
  listState.value = !listState.value;
};

const props = defineProps({
  title: {
    type: String,
    default: 'Select item',
  },
  text: {
    type: String,
    default: 'Please select item',
  },
  mutli: {
    type: Boolean,
    default: false,
  },
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
    type: [String, Object],
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
  items: {
    type: Array,
    default: [],
    required: true,
  },
});

const displayValue = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue;
  } else if (props.modelValue && typeof props.modelValue === 'object') {
    return props.modelValue.name || '';
  }
  return '';
});

const isSelected = (item) => {
  if (typeof props.modelValue === 'string') {
    return item.name === props.modelValue;
  } else if (props.modelValue && typeof props.modelValue === 'object') {
    return item.name === props.modelValue.name;
  }
  return false;
};

watch(
  () => props.modelValue,
  (nVal, oval) => {
    if (props.validate) {
      if (props.rules == 'required') {
        const hasValue =
          typeof nVal === 'string' ? !!nVal : nVal && !!nVal.name;
        if (!hasValue) {
          access.value = false;
          errorMessage.value = 'Field is required';
        } else {
          access.value = true;
          errorMessage.value = '';
        }
      }
    }
  },
  { deep: true }
);

const handleSelect = (item) => {
  emit('update:modelValue', item);
  if (!props.mutli) listState.value = !listState.value;
};

const itemsDataSource = computed(() => {
  const searchTerm = searchValue.value.toLowerCase();
  return props.items.filter((item) => {
    return item?.name?.toLowerCase().includes(searchTerm);
  });
});
</script>

<style scoped lang="scss">
.search-input {
  height: 35px;
  background: none;
  outline: none;
  border: none;
  margin-top: 10px;
}
input {
  padding: 0 7px;
  outline: none;
  border: 1px solid #8481812f;
  border-radius: 6px;
}

.disabled {
  cursor: not-allowed;
}

.error {
  border: 2px solid #f50000;
  color: #f50000;
}

.glass {
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 2000;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: #0000005d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-content {
  width: 350px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.list {
  max-height: 350px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}
.list::-webkit-scrollbar {
  display: none;
}
.select-item-style {
  border: 1px solid #8481812f;
}
.selected-style {
  background: #b3a9a92c;
  border: none;
}
.color-light {
  color: #fff;
}
</style>
