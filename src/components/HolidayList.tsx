import React from 'react';
import { Holiday } from '../types/holiday';
import { HolidayCard } from './HolidayCard';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';

interface HolidayListProps {
  holidays: Holiday[];
  loading: boolean;
  error: string | null;
}

export const HolidayList: React.FC<HolidayListProps> = ({ holidays, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        <p className="text-slate-600 text-sm">Loading holidays...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-red-800 font-medium">Error loading holidays</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <p className="text-red-600 text-sm mt-2">Using cached data if available.</p>
        </div>
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
        <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No holidays found</h3>
        <p className="text-sm text-slate-500">Try expanding your date range or selecting a different province.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {holidays.map((holiday) => (
        <HolidayCard key={holiday.id} holiday={holiday} />
      ))}
    </div>
  );
};