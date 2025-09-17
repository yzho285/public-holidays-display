import React from 'react';
import { PROVINCES } from '../types/holiday';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProvinceSelectorProps {
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
}

export const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  selectedProvince,
  onProvinceChange
}) => {
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="province" className="text-sm font-medium text-slate-700">
        Province/Territory
      </Label>
      <Select value={selectedProvince} onValueChange={onProvinceChange}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a province or territory" />
        </SelectTrigger>
        <SelectContent className="!bg-white !bg-opacity-100">
          {PROVINCES.map((province) => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};