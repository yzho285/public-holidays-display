import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Holiday } from '../types/holiday';
import { exportToCSV, exportToICS } from '../utils/exportUtils';
import { Button } from '@/components/ui/button';

interface ExportButtonsProps {
  holidays: Holiday[];
  province: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ holidays, province }) => {
  const handleCSVExport = () => {
    exportToCSV(holidays, province);
  };

  const handleICSExport = () => {
    exportToICS(holidays, province);
  };

  if (holidays.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCSVExport}
        className="bg-white hover:bg-light-gray border-medium-green text-dark-green hover:text-dark-green"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleICSExport}
        className="bg-white hover:bg-light-gray border-medium-green text-dark-green hover:text-dark-green"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Export Calendar
      </Button>
    </div>
  );
};