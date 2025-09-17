import { Holiday } from '../types/holiday';
import { format, getDay, addDays, lastDayOfMonth, startOfMonth } from 'date-fns';

export function getStaticHolidays(year: number): Holiday[] {
  const holidays: Holiday[] = [
    // Federal holidays
    {
      id: `${year}-01-01-new-year`,
      name: "New Year's Day",
      date: `${year}-01-01`,
      observedDate: getObservedDate(`${year}-01-01`),
      type: 'federal',
      provinces: ['ALL'],
      description: "Celebrates the beginning of the new year",
      isStatutory: true
    },
    {
      id: `${year}-good-friday`,
      name: 'Good Friday',
      date: getGoodFriday(year),
      type: 'federal',
      provinces: ['ALL'],
      description: "Christian holiday commemorating the crucifixion of Jesus",
      isStatutory: true
    },
    {
      id: `${year}-victoria-day`,
      name: 'Victoria Day',
      date: getVictoriaDay(year),
      type: 'federal',
      provinces: ['ALL'],
      description: "Celebrates Queen Victoria's birthday",
      isStatutory: true
    },
    {
      id: `${year}-07-01-canada-day`,
      name: 'Canada Day',
      date: `${year}-07-01`,
      observedDate: getObservedDate(`${year}-07-01`),
      type: 'federal',
      provinces: ['ALL'],
      description: "Celebrates the anniversary of Canadian confederation",
      isStatutory: true
    },
    {
      id: `${year}-labour-day`,
      name: 'Labour Day',
      date: getLabourDay(year),
      type: 'federal',
      provinces: ['ALL'],
      description: "Celebrates the achievements of workers",
      isStatutory: true
    },
    {
      id: `${year}-thanksgiving`,
      name: 'Thanksgiving Day',
      date: getThanksgiving(year),
      type: 'federal',
      provinces: ['ALL'],
      description: "Day of giving thanks for the harvest",
      isStatutory: true
    },
    {
      id: `${year}-11-11-remembrance`,
      name: 'Remembrance Day',
      date: `${year}-11-11`,
      type: 'federal',
      provinces: ['AB', 'BC', 'NB', 'NL', 'NT', 'NU', 'PE', 'SK', 'YT'],
      description: "Honours armed forces members who died in the line of duty",
      isStatutory: true
    },
    {
      id: `${year}-12-25-christmas`,
      name: 'Christmas Day',
      date: `${year}-12-25`,
      observedDate: getObservedDate(`${year}-12-25`),
      type: 'federal',
      provinces: ['ALL'],
      description: "Christian celebration of the birth of Jesus Christ",
      isStatutory: true
    },
    {
      id: `${year}-12-26-boxing`,
      name: 'Boxing Day',
      date: `${year}-12-26`,
      observedDate: getBoxingDayObserved(`${year}-12-26`),
      type: 'federal',
      provinces: ['ALL'],
      description: "Day after Christmas traditionally for giving gifts to the poor",
      isStatutory: true
    },

    // Provincial holidays
    {
      id: `${year}-family-day-on`,
      name: 'Family Day',
      date: getFamilyDay(year, 'ON'),
      type: 'provincial',
      provinces: ['ON', 'AB', 'BC', 'NB', 'SK'],
      description: "Provincial holiday for spending time with family",
      isStatutory: true
    },
    {
      id: `${year}-civic-holiday`,
      name: 'Civic Holiday',
      date: getCivicHoliday(year),
      type: 'provincial',
      provinces: ['ON', 'AB', 'BC', 'MB', 'NB', 'NT', 'NU', 'SK'],
      description: "Provincial summer holiday",
      isStatutory: false
    },
    {
      id: `${year}-st-jean-baptiste`,
      name: 'Saint-Jean-Baptiste Day',
      date: `${year}-06-24`,
      type: 'provincial',
      provinces: ['QC'],
      description: "Quebec's National Holiday",
      isStatutory: true
    }
  ];

  return holidays;
}

function getObservedDate(dateStr: string): string {
  const date = new Date(dateStr);
  const dayOfWeek = getDay(date);

  if (dayOfWeek === 0) { // Sunday
    return format(addDays(date, 1), 'yyyy-MM-dd');
  } else if (dayOfWeek === 6) { // Saturday
    return format(addDays(date, 2), 'yyyy-MM-dd');
  }
  return dateStr;
}

function getBoxingDayObserved(dateStr: string): string {
  const date = new Date(dateStr);
  const dayOfWeek = getDay(date);

  if (dayOfWeek === 0) { // Sunday
    return format(addDays(date, 2), 'yyyy-MM-dd');
  } else if (dayOfWeek === 6) { // Saturday
    return format(addDays(date, 2), 'yyyy-MM-dd');
  } else if (dayOfWeek === 1) { // Monday (Christmas was Sunday)
    return format(addDays(date, 1), 'yyyy-MM-dd');
  }
  return dateStr;
}

function getGoodFriday(year: number): string {
  // Easter calculation (simplified - would need more complex algorithm for accuracy)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  const easter = new Date(year, month - 1, day);
  const goodFriday = addDays(easter, -2);
  return format(goodFriday, 'yyyy-MM-dd');
}

function getVictoriaDay(year: number): string {
  // Monday on or before May 24
  const may24 = new Date(year, 4, 24);
  const dayOfWeek = getDay(may24);

  if (dayOfWeek === 0) {
    return format(addDays(may24, -6), 'yyyy-MM-dd');
  } else if (dayOfWeek === 1) {
    return format(may24, 'yyyy-MM-dd');
  } else {
    return format(addDays(may24, -(dayOfWeek - 1)), 'yyyy-MM-dd');
  }
}

function getLabourDay(year: number): string {
  // First Monday in September
  const september1 = new Date(year, 8, 1);
  const dayOfWeek = getDay(september1);
  const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  return format(addDays(september1, daysToAdd), 'yyyy-MM-dd');
}

function getThanksgiving(year: number): string {
  // Second Monday in October
  const october1 = new Date(year, 9, 1);
  const dayOfWeek = getDay(october1);
  const firstMonday = dayOfWeek === 0 ? 2 : dayOfWeek === 1 ? 1 : 9 - dayOfWeek;
  return format(addDays(october1, firstMonday + 6), 'yyyy-MM-dd');
}

function getFamilyDay(year: number, province: string): string {
  // Third Monday in February for most provinces
  const february1 = new Date(year, 1, 1);
  const dayOfWeek = getDay(february1);
  const firstMonday = dayOfWeek === 0 ? 2 : dayOfWeek === 1 ? 1 : 9 - dayOfWeek;
  return format(addDays(february1, firstMonday + 13), 'yyyy-MM-dd');
}

function getCivicHoliday(year: number): string {
  // First Monday in August
  const august1 = new Date(year, 7, 1);
  const dayOfWeek = getDay(august1);
  const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  return format(addDays(august1, daysToAdd), 'yyyy-MM-dd');
}