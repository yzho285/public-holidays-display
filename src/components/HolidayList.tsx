import React from 'react';
import { Holiday } from '../types/holiday';
import { HolidayCard } from './HolidayCard';

interface HolidayListProps {
  holidays: Holiday[];
  loading: boolean;
  error: string | null;
}

export const HolidayList: React.FC<HolidayListProps> = ({ holidays, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-canada-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">Error loading holidays: {error}</p>
        <p className="text-sm text-red-600 mt-2">Using cached data if available.</p>
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No holidays found</h3>
        <p className="mt-1 text-sm text-gray-500">Try expanding your date range or selecting a different province.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {holidays.map((holiday) => (
        <HolidayCard key={holiday.id} holiday={holiday} />
      ))}
    </div>
  );
};