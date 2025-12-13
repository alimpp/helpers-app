<template>
  <div
    class="content color-primary bg-primary-2 border-rounded py-5 px-5 fade-animation-2s"
  >
    <BaseIcon name="svg-spinners:blocks-shuffle-3" class="" />
    <div class="typing-text px-5">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.content {
  position: relative;
  display: flex;
  align-items: center;
}

.typing-text {
  color: #7d7be5;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid #7d7be5;
  width: 0;
  animation:
    typing 4s steps(40, end) infinite,
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  0% {
    width: 0;
  }
  50% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #7d7be5;
  }
}

.typing-text::after {
  content: '';
}
</style>
