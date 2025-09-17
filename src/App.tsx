import React, { useState, useEffect, useMemo } from 'react';
import { startOfYear, endOfYear } from 'date-fns';
import { ProvinceSelector } from './components/ProvinceSelector';
import { DateRangePicker } from './components/DateRangePicker';
import { SearchFilter } from './components/SearchFilter';
import { HolidayList } from './components/HolidayList';
import { ExportButtons } from './components/ExportButtons';
import { HolidayService } from './services/holidayService';
import { Holiday, PROVINCES } from './types/holiday';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
            Canadian Public Holidays
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover public holidays across Canada by province and date range
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Search & Filter</CardTitle>
              <CardDescription>
                Select your province and date range to find relevant holidays
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="mt-6">
                <SearchFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filterType={filterType}
                  onFilterChange={setFilterType}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-slate-900">
                    Holidays in {selectedProvinceName}
                  </CardTitle>
                  <CardDescription>
                    {filteredHolidays.length} holiday{filteredHolidays.length !== 1 ? 's' : ''} found
                  </CardDescription>
                </div>
                <ExportButtons holidays={filteredHolidays} province={selectedProvince} />
              </div>
            </CardHeader>
            <CardContent>
              <HolidayList holidays={filteredHolidays} loading={loading} error={error} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;