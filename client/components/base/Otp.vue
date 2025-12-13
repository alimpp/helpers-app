<template>
  <div class="otp-input-container">
    <div
      v-for="(digit, index) in digits"
      :key="index"
      class="otp-digit"
      :class="{ 'has-value': digit !== '', 'active': activeIndex === index }"
      @click="focusInput(index)"
    >
      <input
        ref="inputs"
        v-model="digits[index]"
        type="text"
        maxlength="1"
        pattern="[0-9]*"
        inputmode="numeric"
        @input="handleInput($event, index)"
        @keydown="handleKeyDown($event, index)"
        @paste="handlePaste"
        @focus="activeIndex = index"
      />
    </div>
  </div>
  <div v-if="loading" class="w-100 flex justify-center mt-15">
    <BaseIcon name="svg-spinners:bars-scale" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  length: {
    type: Number,
    default: 6
  },
  modelValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'complete'])

const digits = ref<string[]>(Array(props.length).fill(''))
const inputs = ref<HTMLInputElement[]>([])
const activeIndex = ref(0)

// Initialize with modelValue if provided
onMounted(() => {
  if (props.modelValue) {
    digits.value = props.modelValue.split('').slice(0, props.length)
    if (digits.value.length < props.length) {
      digits.value = [...digits.value, ...Array(props.length - digits.value.length).fill('')]
    }
  }
})

// Watch for changes in digits and emit events
watch(digits, (newDigits) => {
  const otp = newDigits.join('')
  emit('update:modelValue', otp)
  
  if (otp.length === props.length) {
    emit('complete', otp)
  }
}, { deep: true })

// Focus the first input on mount
onMounted(() => {
  if (inputs.value[0]) {
    inputs.value[0].focus()
  }
})

const focusInput = (index: number) => {
  activeIndex.value = index
  if (inputs.value[index]) {
    inputs.value[index].focus()
  }
}

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // Only allow numeric values
  if (!/^\d*$/.test(value)) {
    digits.value[index] = ''
    return
  }
  
  // Move to next input if a digit was entered
  if (value && index < props.length - 1) {
    nextTick(() => {
      focusInput(index + 1)
    })
  }
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  // Handle backspace
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    digits.value[index - 1] = ''
    nextTick(() => {
      focusInput(index - 1)
    })
  }
  
  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    focusInput(index - 1)
  }
  if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    focusInput(index + 1)
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text/plain').trim() || ''
  const pasteDigits = pasteData.replace(/\D/g, '').split('').slice(0, props.length)
  
  if (pasteDigits.length) {
    // Fill the digits starting from current active index
    for (let i = 0; i < pasteDigits.length && activeIndex.value + i < props.length; i++) {
      digits.value[activeIndex.value + i] = pasteDigits[i]
    }
    
    // Focus the last filled input
    const lastFilledIndex = Math.min(activeIndex.value + pasteDigits.length - 1, props.length - 1)
    nextTick(() => {
      focusInput(lastFilledIndex)
    })
  }
}

// Expose a method to clear the OTP
const clear = () => {
  digits.value = Array(props.length).fill('')
  activeIndex.value = 0
  nextTick(() => {
    if (inputs.value[0]) {
      inputs.value[0].focus()
    }
  })
}

// Expose the clear method
defineExpose({
  clear
})
</script>

<style scoped>
.otp-input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.otp-digit {
  width: 40px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.otp-digit.has-value {
  border-color: #4a90e2;
}

.otp-digit.active {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

.otp-digit input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 20px;
  outline: none;
  background: transparent;
}
</style>