import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { Holiday } from '../types/holiday';
import { exportToCSV, exportToICS } from '../utils/exportUtils';

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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleCSVExport}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-canada-red"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export CSV
      </button>
      <button
        onClick={handleICSExport}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-canada-red"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Export Calendar
      </button>
    </div>
  );
};