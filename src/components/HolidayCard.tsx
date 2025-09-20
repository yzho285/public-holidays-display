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


  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'federal':
        return { backgroundColor: '#fecaca', color: '#991b1b', borderColor: '#fca5a5' };
      case 'provincial':
        return { backgroundColor: '#46D448', color: 'white', borderColor: '#46D448' };
      default:
        return { backgroundColor: '#1F691B', color: 'white', borderColor: '#1F691B' };
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 bg-white hover:bg-opacity-80" style={{ borderLeftColor: '#46D448' }}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl" style={{ color: '#144215' }}>{holiday.name}</CardTitle>
            <div className="flex items-center" style={{ color: '#1F691B' }}>
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {format(holidayDate, 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            {observedDate && holiday.date !== holiday.observedDate && (
              <CardDescription className="text-muted-foreground">
                Observed on {format(observedDate, 'EEEE, MMMM d, yyyy')}
              </CardDescription>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge style={getTypeStyle(holiday.type)}>
              {holiday.type === 'federal' ? 'Federal' : holiday.type === 'provincial' ? 'Provincial' : 'Optional'}
            </Badge>
            {holiday.isStatutory && (
              <Badge style={{ backgroundColor: '#144215', color: 'white', borderColor: '#144215' }}>
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
            className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <Info className="w-4 h-4 mr-2" />
            {isExpanded ? 'Hide' : 'Show'} Details
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>
        )}

        {isExpanded && holiday.description && (
          <div className="p-4 bg-light-gray rounded-lg border border-medium-green">
            <p className="text-sm text-dark-green mb-3 leading-relaxed">{holiday.description}</p>
            {holiday.provinces.length > 0 && !holiday.provinces.includes('ALL') && (
              <div className="border-t border-medium-green pt-3">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-medium-green" />
                  <div>
                    <span className="text-sm font-medium text-medium-green">Observed in: </span>
                    <span className="text-sm text-dark-green">
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