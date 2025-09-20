import axios from 'axios';
import { Holiday } from '../types/holiday';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { getStaticHolidays } from '../data/staticHolidays';

const API_BASE_URL = 'https://canada-holidays.ca/api/v1';

export class HolidayService {
  private static cache: Map<string, { data: Holiday[], timestamp: number }> = new Map();
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static async getHolidays(
    provinceCode: string,
    startDate: Date,
    endDate: Date
  ): Promise<Holiday[]> {
    const cacheKey = `${provinceCode}-${format(startDate, 'yyyy-MM-dd')}-${format(endDate, 'yyyy-MM-dd')}`;

    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const holidays = await this.fetchFromAPI(provinceCode, startDate, endDate);
      this.cache.set(cacheKey, { data: holidays, timestamp: Date.now() });
      return holidays;
    } catch (error) {
      console.error('API fetch failed, falling back to static data:', error);
      return this.getStaticHolidaysForRange(provinceCode, startDate, endDate);
    }
  }

  private static async fetchFromAPI(
    provinceCode: string,
    startDate: Date,
    endDate: Date
  ): Promise<Holiday[]> {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const allHolidays: Holiday[] = [];

    try {
      // Fetch holidays for each year in the range
      for (let year = startYear; year <= endYear; year++) {
        const response = await axios.get(`${API_BASE_URL}/provinces/${provinceCode}`, {
          params: { year },
          timeout: 5000
        });

        const yearHolidays: Holiday[] = response.data.province.holidays.map((h: any) => ({
          id: h.id || `${h.date}-${h.nameEn}`,
          name: h.nameEn,
          date: h.date,
          observedDate: h.observedDate,
          type: h.federal ? 'federal' : 'provincial',
          provinces: h.provinces || [provinceCode],
          description: h.nameEn,
          isStatutory: h.federal === 1
        }));

        allHolidays.push(...yearHolidays);
      }

      return allHolidays.filter(h => {
        const holidayDate = parseISO(h.date);
        return isWithinInterval(holidayDate, { start: startDate, end: endDate });
      });
    } catch (error) {
      throw error;
    }
  }

  private static getStaticHolidaysForRange(
    provinceCode: string,
    startDate: Date,
    endDate: Date
  ): Holiday[] {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const allHolidays: Holiday[] = [];

    // Get static holidays for each year in the range
    for (let year = startYear; year <= endYear; year++) {
      const yearHolidays = getStaticHolidays(year);
      allHolidays.push(...yearHolidays);
    }

    return allHolidays
      .filter(h => {
        const holidayDate = parseISO(h.date);
        const isInRange = isWithinInterval(holidayDate, { start: startDate, end: endDate });
        const isInProvince = h.provinces.includes(provinceCode) || h.provinces.includes('ALL');
        return isInRange && isInProvince;
      })
      .map(h => ({
        ...h,
        provinces: h.provinces.includes('ALL')
          ? h.provinces.filter(p => p !== 'ALL').concat(provinceCode)
          : h.provinces
      }));
  }
}