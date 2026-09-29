'use client';

import React from 'react';
import { FilterState } from '@/types';
import { X, Check } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  activeFilterCount: number;
  totalProducts: number;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  activeFilterCount,
}: ProductFiltersProps) {
  const categories = [
    { name: 'All Indian Couture', value: '' },
    { name: 'Sarees (Banarasi & Chanderi)', value: 'Sarees' },
    { name: 'Kurta Sets & Anarkalis', value: 'Kurta Sets' },
    { name: 'Indo-Western & Fusion', value: 'Indo-Western' },
    { name: 'Handloom & Pure Linen', value: 'Handloom & Linen' },
    { name: 'Lehengas & Bridal', value: 'Lehengas & Anarkalis' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];

  const colors = [
    { name: 'Royal Rani Pink', hex: '#FF3B8A' },
    { name: 'Rose Gold Gilt', hex: '#FF5DA2' },
    { name: 'Midnight Obsidian', hex: '#161616' },
    { name: 'Champagne Tissue', hex: '#D8CEBA' },
    { name: 'Kora Beige / Ecru', hex: '#E6E0D2' },
    { name: 'Natural Tussar Gold', hex: '#C69C6D' },
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $200', value: 'under-200' },
    { label: '$200 - $350', value: '200-350' },
    { label: '$350 - $500', value: '350-500' },
    { label: '$500 & Above', value: 'above-500' },
  ];

  return (
    <div className="space-y-8 pr-4">
      {/* Active Filter Chips & Reset */}
      {activeFilterCount > 0 && (
        <div className="p-3.5 bg-[#18181E] border border-[#FF3B8A]/40 flex items-center justify-between">
          <span className="text-xs text-white font-medium">
            {activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}
          </span>
          <button
            onClick={onReset}
            className="text-[11px] uppercase tracking-wider text-[#FF5DA2] hover:text-white font-medium underline flex items-center gap-1 transition-colors"
          >
            <span>Reset All</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white pb-1 border-b border-[#26262F]">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onFilterChange('category', cat.value)}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                filters.category === cat.value
                  ? 'text-[#FF5DA2] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Size Filter */}
      <div className="space-y-3">
        <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white pb-1 border-b border-[#26262F]">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange('size', filters.size === s ? '' : s)}
              className={`min-w-[38px] px-2.5 py-1.5 text-xs uppercase font-medium border transition-all ${
                filters.size === s
                  ? 'bg-[#FF3B8A] text-white border-[#FF3B8A] shadow-[0_0_8px_rgba(255,59,138,0.4)]'
                  : 'bg-[#18181E] text-neutral-300 border-[#2D2D38] hover:border-[#FF3B8A]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Color Filter */}
      <div className="space-y-3">
        <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white pb-1 border-b border-[#26262F]">
          Color Palette
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((c) => {
            const isSelected = filters.color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onFilterChange('color', isSelected ? '' : c.name)}
                className={`flex items-center gap-2 p-1.5 text-left text-xs transition-colors border ${
                  isSelected ? 'border-[#FF3B8A] bg-[#26131F]' : 'border-transparent hover:bg-[#18181E]'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check className={`w-2 h-2 ${['#232323', '#181716'].includes(c.hex) ? 'text-[#FF5DA2]' : 'text-black'}`} />
                  )}
                </span>
                <span className="text-[11px] text-neutral-300 truncate">{c.name.split('/')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Range */}
      <div className="space-y-3">
        <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white pb-1 border-b border-[#26262F]">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => onFilterChange('priceRange', range.value)}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                filters.priceRange === range.value
                  ? 'text-[#FF5DA2] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{range.label}</span>
              {filters.priceRange === range.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Availability */}
      <div className="space-y-3">
        <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white pb-1 border-b border-[#26262F]">
          Availability
        </h4>
        <div className="space-y-1.5">
          {[
            { label: 'All Pieces', value: '' },
            { label: 'In Stock Only', value: 'in-stock' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onFilterChange('availability', item.value)}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                filters.availability === item.value
                  ? 'text-[#FF5DA2] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {filters.availability === item.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
