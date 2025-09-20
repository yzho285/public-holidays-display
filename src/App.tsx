import { useState, useEffect, useMemo } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#EEEFF1] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#144215] to-[#46D448] bg-clip-text text-transparent">
            Canadian Public Holidays
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#1F691B' }}>
            Discover public holidays across Canada by province and date range
          </p>
          {/* Test div to verify colors are working */}
          <div className="mt-4 p-4 border rounded-lg" style={{ backgroundColor: '#EEEFF1', borderColor: '#1F691B' }}>
            <p className="font-semibold" style={{ color: '#144215' }}>Color Test:</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 text-white rounded text-sm" style={{ backgroundColor: '#144215' }}>Dark Green</span>
              <span className="px-2 py-1 text-white rounded text-sm" style={{ backgroundColor: '#1F691B' }}>Medium Green</span>
              <span className="px-2 py-1 text-white rounded text-sm" style={{ backgroundColor: '#46D448' }}>Bright Green</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg border-0 bg-white backdrop-blur-sm" style={{ borderColor: '#1F691B' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#144215' }}>Search & Filter</CardTitle>
              <CardDescription style={{ color: '#1F691B' }}>
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

          <Card className="shadow-lg border-0 bg-white backdrop-blur-sm" style={{ borderColor: '#1F691B' }}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl" style={{ color: '#144215' }}>
                    Holidays in {selectedProvinceName}
                  </CardTitle>
                  <CardDescription style={{ color: '#1F691B' }}>
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