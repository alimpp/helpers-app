<template>
  <div class="iranian-calendar">
    <div class="calendar-header">
      <BaseIcon
        name="solar:map-arrow-left-bold-duotone"
        @click="prevMonth"
        class="cursor-pointer"
      />

      <div class="month-year-display">
        <h2>{{ currentMonthName }} {{ currentYear }}</h2>
        <div class="month-year-subtitle">
          {{ getGregorianMonthYear() }}
        </div>
      </div>

      <BaseIcon
        name="solar:map-arrow-right-bold-duotone"
        @click="nextMonth"
        class="cursor-pointer"
      />
    </div>

    <div class="calendar-grid">
      <div class="weekdays">
        <div v-for="day in englishWeekdays" :key="day" class="f-s-10">
          {{ day }}
        </div>
      </div>

      <div class="days">
        <div
          v-for="(dayInfo, index) in calendarDays"
          :key="index"
          class="bg-primary-2"
          :class="[
            'day',
            {
              today: dayInfo.isToday,
              holiday: dayInfo.isHoliday,
              selected: isSelected(dayInfo),
              'other-month': !dayInfo.isCurrentMonth,
              weekend: dayInfo.isWeekend,
              'has-event': hasEvent(dayInfo),
              'bg-primary-4': dayInfo.isToday,
            },
          ]"
          @click="selectDate(dayInfo)"
          :title="getDayTooltip(dayInfo)"
        >
          <div class="day-content">
            <span class="day-number">{{ dayInfo.day }}</span>
            <div class="day-indicators">
              <span
                v-if="dayInfo.isHoliday"
                class="holiday-indicator"
                title="Holiday"
              ></span>
              <span
                v-if="hasEvent(dayInfo)"
                class="event-indicator"
                title="Has Event"
                >★</span
              >
            </div>
          </div>
          <div v-if="dayInfo.isHoliday" class="holiday-label">
            {{ getHolidayName(dayInfo) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import {
  PersianDate,
  getDaysInPersianMonth,
  getPersianHolidays,
  getPersianMonthName,
  jalaliToGregorian,
} from '../../utils/persianDate';

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  showGregorian: {
    type: Boolean,
    default: false,
  },
  showEvents: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'dateSelected']);

const currentDate = ref(new PersianDate());
const selectedDate = ref<PersianDate | null>(null);
const holidays = ref<Array<{ date: string; description: string }>>([]);

const englishWeekdays = [
  'Shanbe',
  'Ye Sha',
  'Do Sha',
  'Se Sha',
  'Cha Sha',
  'Pa Sha',
  'Jome',
];

const calendarDays = computed(() => {
  const days = [];
  const today = new PersianDate();
  const currentYear = currentDate.value.getFullYear();
  const currentMonth = currentDate.value.getMonth();

  const daysInCurrentMonth = getDaysInPersianMonth(currentYear, currentMonth);

  const firstDayOfMonth = jalaliToGregorian(currentYear, currentMonth, 1);
  const firstDayDate = new Date(
    firstDayOfMonth.year,
    firstDayOfMonth.month - 1,
    firstDayOfMonth.day
  );
  let firstDayWeekday = firstDayDate.getDay(); // 0 = Sunday

  if (firstDayWeekday === 6) firstDayWeekday = 0;
  else firstDayWeekday += 1;

  const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const daysInPrevMonth = getDaysInPersianMonth(prevMonthYear, prevMonth);

  for (let i = 0; i < firstDayWeekday; i++) {
    const day = daysInPrevMonth - i;
    const gregorian = jalaliToGregorian(prevMonthYear, prevMonth, day);
    const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    const persianDate = new PersianDate(date);
    const dateStr = `${prevMonthYear}/${prevMonth}/${day}`;
    const holidayDesc = getHolidayDescription(dateStr);

    days.unshift({
      year: prevMonthYear,
      month: prevMonth,
      day: day,
      isCurrentMonth: false,
      isToday: false,
      isHoliday: holidayDesc !== '' || date.getDay() === 5,
      isWeekend: date.getDay() === 5,
      holidayDescription: holidayDesc,
      persianDate: persianDate,
    });
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const gregorian = jalaliToGregorian(currentYear, currentMonth, i);
    const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    const persianDate = new PersianDate(date);
    const dateStr = `${currentYear}/${currentMonth}/${i}`;
    const holidayDesc = getHolidayDescription(dateStr);

    days.push({
      year: currentYear,
      month: currentMonth,
      day: i,
      isCurrentMonth: true,
      isToday:
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === i,
      isHoliday: holidayDesc !== '' || date.getDay() === 5,
      isWeekend: date.getDay() === 5,
      holidayDescription: holidayDesc,
      persianDate: persianDate,
    });
  }

  const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const daysNeeded = 42 - days.length;

  for (let i = 1; i <= daysNeeded; i++) {
    const gregorian = jalaliToGregorian(nextMonthYear, nextMonth, i);
    const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    const persianDate = new PersianDate(date);
    const dateStr = `${nextMonthYear}/${nextMonth}/${i}`;
    const holidayDesc = getHolidayDescription(dateStr);

    days.push({
      year: nextMonthYear,
      month: nextMonth,
      day: i,
      isCurrentMonth: false,
      isToday: false,
      isHoliday: holidayDesc !== '' || date.getDay() === 5,
      isWeekend: date.getDay() === 5,
      holidayDescription: holidayDesc,
      persianDate: persianDate,
    });
  }

  return days;
});

const currentMonthName = computed(() => currentDate.value.getMonthName());
const currentYear = computed(() => currentDate.value.getFullYear());

const getHolidayDescription = (dateStr: string): string => {
  const holiday = holidays.value.find((h) => h.date === dateStr);
  return holiday ? holiday.description : '';
};

const getHolidayName = (dayInfo: any): string => {
  if (dayInfo.isWeekend) return 'Friday';
  return dayInfo.holidayDescription.split('(')[0].trim() || 'Holiday';
};

const getDayTooltip = (dayInfo: any): string => {
  const parts = [];

  if (dayInfo.isToday) parts.push('Today');
  if (dayInfo.isHoliday) {
    if (dayInfo.isWeekend) {
      parts.push('Friday (Weekend)');
    } else {
      parts.push(dayInfo.holidayDescription || 'Holiday');
    }
  }
  if (!dayInfo.isCurrentMonth) {
    parts.push(`${getPersianMonthName(dayInfo.month)} ${dayInfo.year}`);
  }

  return (
    parts.join(' • ') ||
    `${dayInfo.day} ${getPersianMonthName(dayInfo.month)} ${dayInfo.year}`
  );
};

const isSelected = (dayInfo: any): boolean => {
  if (!selectedDate.value) return false;
  const selected = selectedDate.value.toObject();
  return (
    selected.year === dayInfo.year &&
    selected.month === dayInfo.month &&
    selected.day === dayInfo.day
  );
};

const hasEvent = (dayInfo: any): boolean => {
  return false;
};

const selectDate = (dayInfo: any) => {
  if (!dayInfo.isCurrentMonth) {
    currentDate.value = dayInfo.persianDate;
    updateHolidays();
  }

  selectedDate.value = dayInfo.persianDate;
  emit('update:modelValue', selectedDate.value);
  emit('dateSelected', selectedDate.value);
};

const prevMonth = () => {
  currentDate.value = currentDate.value.addMonths(-1);
  updateHolidays();
};

const nextMonth = () => {
  currentDate.value = currentDate.value.addMonths(1);
  updateHolidays();
};

const goToToday = () => {
  selectedDate.value = new PersianDate();
  currentDate.value = selectedDate.value;
  updateHolidays();
  emit('update:modelValue', selectedDate.value);
};

const clearSelection = () => {
  selectedDate.value = null;
  emit('update:modelValue', null);
};

const updateHolidays = () => {
  holidays.value = getPersianHolidays(currentDate.value.getFullYear());
};

const formatGregorianDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getGregorianMonthYear = (): string => {
  const date = currentDate.value.toGregorian();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

onMounted(() => {
  updateHolidays();
  if (props.modelValue) {
    selectedDate.value = new PersianDate(props.modelValue.toGregorian());
    currentDate.value = selectedDate.value;
    updateHolidays();
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedDate.value = new PersianDate(newValue.toGregorian());
      currentDate.value = selectedDate.value;
      updateHolidays();
    } else {
      selectedDate.value = null;
    }
  }
);
</script>

<style scoped>
.iranian-calendar {
  font-family:
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
  width: 350px;
  margin: 0 auto;
  background: #000;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  direction: ltr;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.month-year-display {
  text-align: center;
  flex-grow: 1;
}

.month-year-display h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.month-year-subtitle {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 4px;
}

.nav-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.nav-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.nav-button.prev span {
  margin-right: 2px;
}

.nav-button.next span {
  margin-left: 2px;
}

.calendar-grid {
  margin-bottom: 24px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #667eea;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day {
  aspect-ratio: 1;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  position: relative;
  border: 2px solid transparent;
  overflow: hidden;
}

.day:hover {
  background: #e3e8ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #0046ff;
}

.day-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.day-number {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2f62ee;
}

.day-indicators {
  display: flex;
  gap: 2px;
  font-size: 0.7rem;
}

.today-indicator {
  color: #4caf50;
}

.holiday-indicator {
  color: #ff6b6b;
}

.event-indicator {
  color: #ffd93d;
}

.holiday-label {
  font-size: 0.65rem;
  color: #ff6b6b;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}
</style>
