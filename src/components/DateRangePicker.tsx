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
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm font-medium text-slate-700">
            Start Date
          </Label>
          <Input
            type="date"
            id="startDate"
            value={format(startDate, 'yyyy-MM-dd')}
            min={minDate}
            max={maxDate}
            onChange={(e) => onStartDateChange(new Date(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm font-medium text-slate-700">
            End Date
          </Label>
          <Input
            type="date"
            id="endDate"
            value={format(endDate, 'yyyy-MM-dd')}
            min={format(startDate, 'yyyy-MM-dd')}
            max={maxDate}
            onChange={(e) => onEndDateChange(new Date(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};