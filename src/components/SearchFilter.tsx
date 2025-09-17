import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search holidays..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-canada-red focus:border-canada-red"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-canada-red focus:border-canada-red"
          >
            <option value="all">All Holidays</option>
            <option value="federal">Federal Only</option>
            <option value="provincial">Provincial Only</option>
            <option value="statutory">Statutory Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};