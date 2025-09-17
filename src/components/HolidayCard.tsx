import React, { useState } from 'react';
import { Holiday } from '../types/holiday';
import { format, parseISO } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, MapPin, Info } from 'lucide-react';

interface HolidayCardProps {
  holiday: Holiday;
}

export const HolidayCard: React.FC<HolidayCardProps> = ({ holiday }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const holidayDate = parseISO(holiday.date);
  const observedDate = holiday.observedDate ? parseISO(holiday.observedDate) : null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'federal':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'provincial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{holiday.name}</h3>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {format(holidayDate, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
            </div>
            {observedDate && holiday.date !== holiday.observedDate && (
              <div className="mt-1 text-sm text-gray-500">
                Observed on {format(observedDate, 'EEEE, MMMM d, yyyy')}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(holiday.type)}`}>
              {holiday.type === 'federal' ? 'Federal' : holiday.type === 'provincial' ? 'Provincial' : 'Optional'}
            </span>
            {holiday.isStatutory && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                Statutory
              </span>
            )}
          </div>
        </div>

        {holiday.description && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Info className="w-4 h-4 mr-1" />
            {isExpanded ? 'Hide' : 'Show'} Details
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        )}

        {isExpanded && holiday.description && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700 mb-2">{holiday.description}</p>
            {holiday.provinces.length > 0 && !holiday.provinces.includes('ALL') && (
              <div className="mt-3">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Observed in: </span>
                    <span className="text-sm text-gray-600">
                      {holiday.provinces.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};