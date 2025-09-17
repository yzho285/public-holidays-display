import React from 'react';
import { PROVINCES } from '../types/holiday';

interface ProvinceSelectorProps {
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
}

export const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  selectedProvince,
  onProvinceChange
}) => {
  return (
    <div className="w-full">
      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
        Select Province/Territory
      </label>
      <select
        id="province"
        value={selectedProvince}
        onChange={(e) => onProvinceChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-canada-red focus:border-canada-red"
      >
        {PROVINCES.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  );
};