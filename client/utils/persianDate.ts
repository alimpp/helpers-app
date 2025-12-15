// تبدیل اعداد انگلیسی به فارسی - برای مواقعی که نیاز به فارسی دارید
export const toPersianDigits = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// تبدیل اعداد فارسی به انگلیسی
export const toEnglishDigits = (num: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  return num.replace(/[۰-۹٠-٩]/g, (d) => {
    let index = persianDigits.indexOf(d);
    if (index >= 0) return index.toString();
    index = arabicDigits.indexOf(d);
    return index >= 0 ? index.toString() : d;
  });
};

// تبدیل تاریخ میلادی به شمسی
export const gregorianToJalali = (gy: number, gm: number, gd: number) => {
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd;

  for (let i = 0; i < gm - 1; i++) days += g_days_in_month[i];

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm, jd;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return { year: jy, month: jm, day: jd };
};

// تبدیل تاریخ شمسی به میلادی
export const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  jy += 1595;
  let days =
    -355668 +
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    jd;

  if (jm < 7) {
    days += (jm - 1) * 31;
  } else {
    days += (jm - 7) * 30 + 186;
  }

  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;
  const gmDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (isLeapYear(gy)) gmDays[1] = 29;

  let gm;
  for (gm = 0; gm < 12; gm++) {
    let v = gmDays[gm];
    if (gd <= v) break;
    gd -= v;
  }

  return { year: gy, month: gm + 1, day: gd };
};

// گرفتن نام ماه فارسی
export const getPersianMonthName = (month: number): string => {
  const months = [
    'Farvardin',
    'Ordibehesht',
    'Khordad',
    'Tir',
    'Mordad',
    'Shahrivar',
    'Mehr',
    'Aban',
    'Azar',
    'Dey',
    'Bahman',
    'Esfand',
  ];
  return months[month - 1] || '';
};

// گرفتن نام ماه فارسی (کوتاه)
export const getPersianMonthNameShort = (month: number): string => {
  const months = [
    'Far',
    'Ord',
    'Khor',
    'Tir',
    'Mor',
    'Shah',
    'Mehr',
    'Aban',
    'Azar',
    'Dey',
    'Bah',
    'Esf',
  ];
  return months[month - 1] || '';
};

// گرفتن نام روز هفته انگلیسی
export const getEnglishDayName = (date: Date): string => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return dayNames[date.getDay()];
};

// گرفتن نام روز هفته فارسی (انگلیسی)
export const getPersianDayNameEnglish = (date: Date): string => {
  const dayNames = [
    'Yekshanbe',
    'Doshanbe',
    'Seshanbe',
    'Chaharshanbe',
    'Panjshanbe',
    'Jome',
    'Shanbe',
  ];
  return dayNames[date.getDay()];
};

// فرمت‌دهی تاریخ به انگلیسی
export const formatPersianDateEnglish = (
  date: Date,
  format: string = 'YYYY/MM/DD'
): string => {
  const { year, month, day } = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  const dayName = getPersianDayNameEnglish(date);
  const monthName = getPersianMonthName(month);
  const monthNameShort = getPersianMonthNameShort(month);

  let formatted = format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('M', month.toString())
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('D', day.toString())
    .replace('dddd', dayName)
    .replace('ddd', dayName.substring(0, 3))
    .replace('MMMM', monthName)
    .replace('MMM', monthNameShort);

  return formatted;
};

// تعداد روزهای یک ماه شمسی
export const getDaysInPersianMonth = (year: number, month: number): number => {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  // Esfand
  return isLeapPersianYear(year) ? 30 : 29;
};

// بررسی سال کبیسه شمسی
export const isLeapPersianYear = (year: number): boolean => {
  // الگوریتم تشخیص سال کبیسه شمسی
  const remainder = (year + 2346) % 2820;
  const leapYears = [
    21, 53, 85, 117, 149, 181, 213, 245, 277, 309, 341, 373, 405, 437, 469, 501,
    533, 565, 597, 629, 661, 693, 725, 757, 789, 821, 853, 885, 917, 949, 981,
    1013, 1045, 1077, 1109, 1141, 1173, 1205, 1237, 1269, 1301, 1333, 1365,
    1397, 1429, 1461, 1493, 1525, 1557, 1589, 1621, 1653, 1685, 1717, 1749,
    1781, 1813, 1845, 1877, 1909, 1941, 1973, 2005, 2037, 2069, 2101, 2133,
    2165, 2197, 2229, 2261, 2293, 2325, 2357, 2389, 2421, 2453, 2485, 2517,
    2549, 2581, 2613, 2645, 2677, 2709, 2741, 2773,
  ];
  return leapYears.includes(remainder);
};

// کلاس مدیریت تاریخ فارسی (انگلیسی)
export class PersianDate {
  private date: Date;

  constructor(date?: Date | string | number) {
    if (!date) {
      this.date = new Date();
    } else if (date instanceof Date) {
      this.date = new Date(date);
    } else if (typeof date === 'string' && date.includes('/')) {
      const [year, month, day] = date.split('/').map(Number);
      const gregorian = jalaliToGregorian(year, month, day);
      this.date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    } else {
      this.date = new Date(date);
    }
  }

  toGregorian(): Date {
    return new Date(this.date);
  }

  toJalali() {
    return gregorianToJalali(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.date.getDate()
    );
  }

  // فرمت انگلیسی
  format(format: string = 'YYYY/MM/DD'): string {
    return formatPersianDateEnglish(this.date, format);
  }

  addDays(days: number): PersianDate {
    const newDate = new Date(this.date);
    newDate.setDate(newDate.getDate() + days);
    return new PersianDate(newDate);
  }

  addMonths(months: number): PersianDate {
    const { year, month, day } = this.toJalali();
    let newYear = year;
    let newMonth = month + months;

    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }

    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }

    const gregorian = jalaliToGregorian(newYear, newMonth, Math.min(day, 31));
    return new PersianDate(
      new Date(gregorian.year, gregorian.month - 1, gregorian.day)
    );
  }

  addYears(years: number): PersianDate {
    const { year, month, day } = this.toJalali();
    const gregorian = jalaliToGregorian(year + years, month, Math.min(day, 31));
    return new PersianDate(
      new Date(gregorian.year, gregorian.month - 1, gregorian.day)
    );
  }

  getDayName(): string {
    return getPersianDayNameEnglish(this.date);
  }

  getMonthName(): string {
    const { month } = this.toJalali();
    return getPersianMonthName(month);
  }

  getMonthNameShort(): string {
    const { month } = this.toJalali();
    return getPersianMonthNameShort(month);
  }

  isHoliday(): boolean {
    const holidays = getPersianHolidays(this.date.getFullYear());
    const { year, month, day } = this.toJalali();
    const persianDateStr = `${year}/${month}/${day}`;

    if (this.date.getDay() === 5) return true; // Friday (Jome)

    return holidays.some((h) => h.date === persianDateStr);
  }

  getDate(): number {
    const { day } = this.toJalali();
    return day;
  }

  getMonth(): number {
    const { month } = this.toJalali();
    return month;
  }

  getFullYear(): number {
    const { year } = this.toJalali();
    return year;
  }

  toObject() {
    return this.toJalali();
  }

  isEqual(other: PersianDate): boolean {
    return this.date.getTime() === other.toGregorian().getTime();
  }

  // توابع کمکی
  getHolidayDescription(): string {
    const holidays = getPersianHolidays(this.date.getFullYear());
    const { year, month, day } = this.toJalali();
    const persianDateStr = `${year}/${month}/${day}`;

    const holiday = holidays.find((h) => h.date === persianDateStr);
    return holiday ? holiday.description : '';
  }
}

// تعطیلات رسمی ایران (انگلیسی)
export const getPersianHolidays = (
  year: number
): Array<{ date: string; description: string }> => {
  const holidays = [];

  const fixedHolidays = [
    { month: 1, day: 1, desc: 'Nowruz (Persian New Year)' },
    { month: 1, day: 2, desc: 'Nowruz Holiday' },
    { month: 1, day: 3, desc: 'Nowruz Holiday' },
    { month: 1, day: 4, desc: 'Nowruz Holiday' },
    { month: 1, day: 12, desc: 'Islamic Republic Day' },
    { month: 1, day: 13, desc: 'Nature Day (Sizdah Bedar)' },
    { month: 3, day: 14, desc: 'Demise of Imam Khomeini' },
    { month: 3, day: 15, desc: 'Khordad 15 Uprising' },
    { month: 10, day: 22, desc: 'Victory of Islamic Revolution' },
    { month: 11, day: 29, desc: 'Nationalization of Oil Industry' },
    { month: 12, day: 9, desc: 'Islamic Republic Day' },
    { month: 12, day: 29, desc: 'Nationalization of Oil Industry Day' },
  ];

  fixedHolidays.forEach((holiday) => {
    holidays.push({
      date: `${year}/${holiday.month}/${holiday.day}`,
      description: holiday.desc,
    });
  });

  const religiousHolidays = getReligiousHolidays(year);
  holidays.push(...religiousHolidays);

  return holidays;
};

const getReligiousHolidays = (
  year: number
): Array<{ date: string; description: string }> => {
  const holidays = [];

  const religiousHolidaysTable: Record<
    number,
    Array<{ month: number; day: number; desc: string }>
  > = {
    1400: [
      { month: 10, day: 8, desc: 'Tasua' },
      { month: 10, day: 9, desc: 'Ashura' },
      { month: 12, day: 20, desc: 'Arbaeen' },
    ],
    1401: [
      { month: 10, day: 29, desc: 'Tasua' },
      { month: 10, day: 30, desc: 'Ashura' },
      { month: 12, day: 9, desc: 'Arbaeen' },
    ],
    1402: [
      { month: 10, day: 18, desc: 'Tasua' },
      { month: 10, day: 19, desc: 'Ashura' },
      { month: 11, day: 27, desc: 'Arbaeen' },
    ],
    1403: [
      { month: 9, day: 8, desc: 'Tasua' },
      { month: 9, day: 9, desc: 'Ashura' },
      { month: 11, day: 17, desc: 'Arbaeen' },
    ],
    1404: [
      { month: 8, day: 28, desc: 'Tasua' },
      { month: 8, day: 29, desc: 'Ashura' },
      { month: 11, day: 6, desc: 'Arbaeen' },
    ],
  };

  const yearHolidays = religiousHolidaysTable[year] || [];
  yearHolidays.forEach((holiday) => {
    holidays.push({
      date: `${year}/${holiday.month}/${holiday.day}`,
      description: holiday.desc,
    });
  });

  return holidays;
};
