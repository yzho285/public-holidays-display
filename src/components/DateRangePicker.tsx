import React from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  const minDate = '2020-01-01';
  const maxDate = format(new Date(new Date().getFullYear() + 3, 11, 31), 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-2 gap-6 col-span-2">
      <div className="space-y-2">
        <Label htmlFor="startDate" className="text-sm font-medium text-dark-green">
          Start Date
        </Label>
        <Input
          type="date"
          id="startDate"
          value={format(startDate, 'yyyy-MM-dd')}
          min={minDate}
          max={maxDate}
          onChange={(e) => {
            if (e.target.value) {
              const date = new Date(e.target.value + 'T00:00:00');
              onStartDateChange(date);
            }
          }}
          className="w-full h-10 bg-white border-medium-green focus:border-bright-green"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate" className="text-sm font-medium text-dark-green">
          End Date
        </Label>
        <Input
          type="date"
          id="endDate"
          value={format(endDate, 'yyyy-MM-dd')}
          min={format(startDate, 'yyyy-MM-dd')}
          max={maxDate}
          onChange={(e) => {
            if (e.target.value) {
              const date = new Date(e.target.value + 'T00:00:00');
              onEndDateChange(date);
            }
          }}
          className="w-full h-10 bg-white border-medium-green focus:border-bright-green"
        />
      </div>
    </div>
  );
};