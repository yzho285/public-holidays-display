import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  sortType?: string;
  onSortChange?: (type: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 col-span-2">
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-dark-green">
          Search Holidays
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-medium-green" />
          </div>
          <Input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search holidays..."
            className="w-full h-10 bg-white border-medium-green focus:border-bright-green pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 px-3 h-auto text-medium-green hover:text-dark-green"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-dark-green">
          Filter by Type
        </Label>
        <Select value={filterType} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full h-10 bg-white border-medium-green focus:border-bright-green">
            <SelectValue placeholder="Select filter type" />
          </SelectTrigger>
          <SelectContent className="!bg-white !bg-opacity-100">
            <SelectItem value="all">All Holidays</SelectItem>
            <SelectItem value="federal">Federal Only</SelectItem>
            <SelectItem value="provincial">Provincial Only</SelectItem>
            <SelectItem value="statutory">Statutory Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};