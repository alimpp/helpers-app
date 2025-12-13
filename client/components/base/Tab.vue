<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
  initialTab: {
    type: String,
    default: '',
  },
  animationDuration: {
    type: Number,
    default: 300,
  },
  showScrollbar: {
    type: Boolean,
    default: false,
  },
});

const activeTab = ref(props.initialTab || props.tabs[0]?.id || '');
const direction = ref('right');
const tabsHeaderRef = ref(null);
const tabsContainerRef = ref(null);
const isHovering = ref(false);

const setActiveTab = (tabId) => {
  if (activeTab.value === tabId) return;

  const currentIndex = props.tabs.findIndex(
    (tab) => tab.id === activeTab.value
  );
  const newIndex = props.tabs.findIndex((tab) => tab.id === tabId);
  direction.value = newIndex > currentIndex ? 'right' : 'left';

  activeTab.value = tabId;

  nextTick(() => {
    const activeButton = tabsHeaderRef.value?.querySelector(
      `.tab-button[data-tab="${tabId}"]`
    );
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  });
};

const updateIndicator = () => {
  if (!tabsHeaderRef.value) return;

  const activeButton = tabsHeaderRef.value.querySelector(
    `.tab-button[data-tab="${activeTab.value}"]`
  );
  if (!activeButton) return;

  const indicator = tabsHeaderRef.value.querySelector('.tab-indicator');
  if (indicator) {
    indicator.style.width = `${activeButton.offsetWidth}px`;
    indicator.style.left = `${activeButton.offsetLeft}px`;
  }
};

watch(activeTab, updateIndicator);

onMounted(() => {
  updateIndicator();
  window.addEventListener('resize', updateIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator);
});
</script>

<template>
  <div class="tabs-container" ref="tabsContainerRef">
    <div
      class="tabs-header-wrapper"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      :class="{ 'show-scrollbar': showScrollbar || isHovering }"
    >
      <div class="tabs-header" ref="tabsHeaderRef">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :data-tab="tab.id"
          @click="setActiveTab(tab.id)"
          :class="{ active: activeTab === tab.id }"
          class="tab-button"
        >
          <BaseIcon v-if="tab.icon" :name="tab.icon" />
          <span class="tab-label">{{ tab.label }}</span>
        </div>
        <div
          class="tab-indicator"
          :style="{
            transition: `all ${animationDuration}ms ease-in-out`,
          }"
        />
      </div>
    </div>

    <Transition :name="`slide-${direction}`" mode="out-in">
      <div class="tabs-content" :key="activeTab">
        <slot :name="activeTab" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tabs-container {
  width: 100%;
  overflow: hidden;
}

.tabs-header-wrapper {
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.tabs-header-wrapper:hover,
.tabs-header-wrapper.show-scrollbar {
  overflow-x: auto;
}

.tabs-header-wrapper::-webkit-scrollbar {
  height: 4px;
  display: none;
}

.tabs-header-wrapper.show-scrollbar::-webkit-scrollbar,
.tabs-header-wrapper:hover::-webkit-scrollbar {
  display: block;
}

.tabs-header {
  display: inline-flex;
  position: relative;
  min-width: 100%;
  white-space: nowrap;
  padding-bottom: 2px; /* Space for scrollbar */
}

.tab-button {
  padding: 12px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.tab-button.active {
  font-weight: 600;
  color: var(--primary1-);
  border-radius: 10px;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: var(--primary1-);
  will-change: width, left;
}

.tab-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.tab-label {
  white-space: nowrap;
}

.tabs-content {
  padding: 24px 0;
  position: relative;
}

/* Slide animations */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all v-bind('animationDuration + "ms"') ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
