import React, { useState } from 'react';
import { Holiday } from '../types/holiday';
import { format, parseISO } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, MapPin, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HolidayCardProps {
  holiday: Holiday;
}

export const HolidayCard: React.FC<HolidayCardProps> = ({ holiday }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const holidayDate = parseISO(holiday.date);
  const observedDate = holiday.observedDate ? parseISO(holiday.observedDate) : null;

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'federal':
        return 'destructive';
      case 'provincial':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-slate-900">{holiday.name}</CardTitle>
            <div className="flex items-center text-slate-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {format(holidayDate, 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            {observedDate && holiday.date !== holiday.observedDate && (
              <CardDescription className="text-slate-500">
                Observed on {format(observedDate, 'EEEE, MMMM d, yyyy')}
              </CardDescription>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={getTypeVariant(holiday.type)}>
              {holiday.type === 'federal' ? 'Federal' : holiday.type === 'provincial' ? 'Provincial' : 'Optional'}
            </Badge>
            {holiday.isStatutory && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Statutory
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {holiday.description && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-4 p-0 h-auto text-slate-600 hover:text-slate-900"
          >
            <Info className="w-4 h-4 mr-2" />
            {isExpanded ? 'Hide' : 'Show'} Details
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>
        )}

        {isExpanded && holiday.description && (
          <div className="p-4 bg-slate-50 rounded-lg border">
            <p className="text-sm text-slate-700 mb-3 leading-relaxed">{holiday.description}</p>
            {holiday.provinces.length > 0 && !holiday.provinces.includes('ALL') && (
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-slate-500" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Observed in: </span>
                    <span className="text-sm text-slate-600">
                      {holiday.provinces.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};