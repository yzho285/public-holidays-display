import React from 'react';
import { format } from 'date-fns';

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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={format(startDate, 'yyyy-MM-dd')}
          min={minDate}
          max={maxDate}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-canada-red focus:border-canada-red"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={format(endDate, 'yyyy-MM-dd')}
          min={format(startDate, 'yyyy-MM-dd')}
          max={maxDate}
          onChange={(e) => onEndDateChange(new Date(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-canada-red focus:border-canada-red"
        />
      </div>
    </div>
  );
};