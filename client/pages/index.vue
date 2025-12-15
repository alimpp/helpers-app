<template>
  <div class="flex flex-column">
    <PersianCalendar v-model="selectedDate" />
    {{ selectedDate }}
    <div class="container">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
      laudantium minima, fugit impedit ea id molestiae inventore? Asperiores
      quas, rem debitis possimus ratione harum esse neque, natus ab, voluptas
      tempora.
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});

const selectedDate = ref(null);
</script>
