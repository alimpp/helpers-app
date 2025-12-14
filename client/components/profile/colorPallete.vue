<template>
  <div class="flex flex-wrap justify-center align-center w-100">
    <div
      class="flex flex-column mx-5 mt-5 mb-5"
      v-for="(data, index) in dataSource"
      :key="data.id"
    >
      <div
        class="flex justify-center align-center w-80-px h-80-px border-rounded"
        :style="{ background: data.hex }"
        @click="emit('selectColor', data.hex)"
      >
        <BaseIcon
          name="solar:check-circle-broken"
          size="35"
          v-if="color == data.hex"
        />
      </div>
      <span class="f-s-14 f-w-500 pt-5"
        >{{ index + 1 }}: {{ data.hex.split('#')[1] }}</span
      >
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['selectColor']);
const props = defineProps({
  color: { default: '' },
  loading: { default: false },
});

const dataSource = ref([
  {
    id: 0,
    hex: '#213448',
  },
  {
    id: 1,
    hex: '#001F3D',
  },
  {
    id: 2,
    hex: '#5A9CB5',
  },
  {
    id: 3,
    hex: '#8A8635',
  },
  {
    id: 4,
    hex: '#AA2B1D',
  },
  {
    id: 5,
    hex: '#BBCB64',
  },
  {
    id: 6,
    hex: '#234C6A',
  },
  {
    id: 6,
    hex: '#1581BF',
  },
  {
    id: 7,
    hex: '#452829',
  },
  {
    id: 8,
    hex: '#FF6C0C',
  },
  {
    id: 9,
    hex: '#8CA9FF',
  },
  {
    id: 10,
    hex: '#B87C4C',
  },
]);
</script>
