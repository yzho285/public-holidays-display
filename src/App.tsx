import React, { useState, useEffect, useMemo } from 'react';
import { startOfYear, endOfYear } from 'date-fns';
import { ProvinceSelector } from './components/ProvinceSelector';
import { DateRangePicker } from './components/DateRangePicker';
import { SearchFilter } from './components/SearchFilter';
import { HolidayList } from './components/HolidayList';
import { ExportButtons } from './components/ExportButtons';
import { HolidayService } from './services/holidayService';
import { Holiday, PROVINCES } from './types/holiday';

function App() {
  const [selectedProvince, setSelectedProvince] = useState('ON');
  const [startDate, setStartDate] = useState(startOfYear(new Date()));
  const [endDate, setEndDate] = useState(endOfYear(new Date()));
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(null);

      try {
        const holidayData = await HolidayService.getHolidays(
          selectedProvince,
          startDate,
          endDate
        );
        setHolidays(holidayData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch holidays');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [selectedProvince, startDate, endDate]);

  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (holiday.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchesFilter = (() => {
        switch (filterType) {
          case 'federal':
            return holiday.type === 'federal';
          case 'provincial':
            return holiday.type === 'provincial';
          case 'statutory':
            return holiday.isStatutory;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesFilter;
    });
  }, [holidays, searchTerm, filterType]);

  const selectedProvinceName = PROVINCES.find(p => p.code === selectedProvince)?.name || selectedProvince;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Canadian Public Holidays
          </h1>
          <p className="text-gray-600">
            Discover public holidays across Canada by province and date range
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProvinceSelector
                selectedProvince={selectedProvince}
                onProvinceChange={setSelectedProvince}
              />
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </div>
          </div>

          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
          />

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Holidays in {selectedProvinceName}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredHolidays.length} holiday{filteredHolidays.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <ExportButtons holidays={filteredHolidays} province={selectedProvince} />
          </div>

          <HolidayList holidays={filteredHolidays} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;