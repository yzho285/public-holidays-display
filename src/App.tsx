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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

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
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#144215] to-[#46D448] bg-clip-text text-transparent">
            Canadian Public Holidays
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#1F691B' }}>
            Discover public holidays across Canada by province and date range
          </p>
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
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <ProvinceSelector
                    selectedProvince={selectedProvince}
                    onProvinceChange={setSelectedProvince}
                  />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-dark-green">
                      Filter by Type
                    </Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full h-10 bg-white border-medium-green focus:border-bright-green">
                        <SelectValue placeholder="Select filter type" />
                      </SelectTrigger>
                      <SelectContent className="!bg-white !bg-opacity-100">
                        <SelectItem value="all">All Holidays</SelectItem>
                        <SelectItem value="federal">Federal Only</SelectItem>
                        <SelectItem value="provincial">Provincial Only</SelectItem>
                        <SelectItem value="statutory">Statutory Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium text-dark-green">
                    Search Holidays
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-medium-green" />
                    </div>
                    <Input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search holidays..."
                      className="w-full h-10 bg-white border-medium-green focus:border-bright-green pl-10 pr-10"
                    />
                    {searchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 px-3 h-auto text-medium-green hover:text-dark-green"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
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