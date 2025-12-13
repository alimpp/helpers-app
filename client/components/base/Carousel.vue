<template>
  <div
    class="carousel-container"
    @mouseenter="pauseAutoSlide"
    @mouseleave="resumeAutoSlide"
  >
    <div class="carousel-wrapper" :style="{ height: height }">
      <div
        class="carousel-slides"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
        >
          <slot name="slide" :slide="slide" :index="index">
            <img
              :src="slide.image"
              :alt="slide.alt || `Slide ${index + 1}`"
              class="slide-image"
            />
            <div v-if="slide.title" class="slide-content">
              <h3>{{ slide.title }}</h3>
              <p v-if="slide.description">{{ slide.description }}</p>
            </div>
          </slot>
        </div>
      </div>

      <button
        class="carousel-btn carousel-prev"
        @click="goToPrev"
        aria-label="Previous slide"
      >
        <BaseIcon name="lsicon:left-filled" />
      </button>

      <button
        class="carousel-btn carousel-next"
        @click="goToNext"
        aria-label="Next slide"
      >
        <BaseIcon name="lsicon:right-filled" />
      </button>

      <div class="carousel-indicators">
        <button
          v-for="(_, index) in slides"
          :key="index"
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const { width } = useScreenSize();

watch(
  () => width,
  (oldVal, newVal) => {
    if (newVal.value > 900) {
      emit('updateHeight', props.height);
    }
    if (newVal.value < 900) {
      emit('updateHeight', '500px');
    }
    if (newVal.value < 750) {
      emit('updateHeight', '400px');
    }
    if (newVal.value < 650) {
      emit('updateHeight', '350px');
    }
    if (newVal.value < 550) {
      emit('updateHeight', '300px');
    }
    if (newVal.value < 450) {
      emit('updateHeight', '200px');
    }
  },
  { deep: true }
);

const emit = defineEmits(['updateHeight']);

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  autoSlide: {
    type: Boolean,
    default: true,
  },
  slideInterval: {
    type: Number,
    default: 5000,
  },
  showIndicators: {
    type: Boolean,
    default: true,
  },
  showNavigation: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: '600px',
  },
});

const currentIndex = ref(0);
const autoSlideTimer = ref(null);
const isAutoSlidePaused = ref(false);
const touchStartX = ref(0);
const touchEndX = ref(0);

const goToNext = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
};

const goToPrev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  if (props.autoSlide && !isAutoSlidePaused.value) {
    autoSlideTimer.value = setInterval(goToNext, props.slideInterval);
  }
};

const stopAutoSlide = () => {
  if (autoSlideTimer.value) {
    clearInterval(autoSlideTimer.value);
    autoSlideTimer.value = null;
  }
};

const pauseAutoSlide = () => {
  isAutoSlidePaused.value = true;
  stopAutoSlide();
};

const resumeAutoSlide = () => {
  isAutoSlidePaused.value = false;
  startAutoSlide();
};

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  pauseAutoSlide();
};

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeThreshold = 50;
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      goToNext(); // swipe به چپ
    } else {
      goToPrev(); // swipe به راست
    }
  }

  resumeAutoSlide();
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

watch(
  () => props.autoSlide,
  (newVal) => {
    if (newVal) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  }
);

watch(
  () => props.slideInterval,
  () => {
    stopAutoSlide();
    startAutoSlide();
  }
);
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 2rem;
  text-align: center;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .carousel-wrapper {
    height: 300px;
  }

  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }

  .slide-content {
    padding: 1rem;
  }

  .slide-content h3 {
    font-size: 1.2rem;
  }

  .slide-content p {
    font-size: 0.9rem;
  }
}
</style>
