'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', us: '0 - 2', uk: '4 - 6', bustIn: '31 - 32', bustCm: '78 - 82', waistIn: '24 - 25', waistCm: '60 - 64', hipIn: '34 - 35', hipCm: '86 - 90' },
    { size: 'S', us: '4 - 6', uk: '8 - 10', bustIn: '33 - 34', bustCm: '84 - 88', waistIn: '26 - 27', waistCm: '66 - 70', hipIn: '36 - 37', hipCm: '92 - 96' },
    { size: 'M', us: '8 - 10', uk: '12 - 14', bustIn: '35 - 36', bustCm: '90 - 94', waistIn: '28 - 29', waistCm: '72 - 76', hipIn: '38 - 39', hipCm: '98 - 102' },
    { size: 'L', us: '12 - 14', uk: '16', bustIn: '37 - 39', bustCm: '96 - 100', waistIn: '30 - 32', waistCm: '78 - 82', hipIn: '40 - 42', hipCm: '104 - 108' },
    { size: 'XL', us: '16', uk: '18', bustIn: '40 - 42', bustCm: '102 - 108', waistIn: '33 - 35', waistCm: '84 - 90', hipIn: '43 - 45', hipCm: '110 - 116' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-center justify-center py-8">
        <div className="relative w-full max-w-2xl bg-[#121216] text-[#FAF9F6] p-6 sm:p-10 shadow-2xl shadow-black/80 border border-[#26262F] animate-in zoom-in-95 duration-200">
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-[#FF3B8A] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#FF3B8A]">
              <Ruler className="w-4 h-4" />
              <span className="text-[10px] tracking-widest-luxury uppercase font-medium">
                Atelier Sizing Guide
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-white">Garment Measurements</h3>
                <p className="text-xs text-zinc-400 font-light">
                  LUMÉA pieces are tailored true to European luxury standards.
                </p>
              </div>

              {/* Units toggle */}
              <div className="flex items-center border border-[#26262F] p-0.5 bg-[#09090B] shrink-0 self-start">
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 text-xs uppercase font-medium transition-colors ${
                    unit === 'inches' ? 'bg-[#FF3B8A] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 text-xs uppercase font-medium transition-colors ${
                    unit === 'cm' ? 'bg-[#FF3B8A] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#26262F] bg-[#18181E]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#09090B] border-b border-[#26262F] text-zinc-300 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">US / Int</th>
                    <th className="p-3">UK / AU</th>
                    <th className="p-3">Bust ({unit})</th>
                    <th className="p-3">Waist ({unit})</th>
                    <th className="p-3">Hips ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26262F] text-zinc-400">
                  {measurements.map((m) => (
                    <tr key={m.size} className="hover:bg-[#FF3B8A]/5 transition-colors">
                      <td className="p-3 font-semibold text-white">{m.size}</td>
                      <td className="p-3">{m.us}</td>
                      <td className="p-3">{m.uk}</td>
                      <td className="p-3">{unit === 'inches' ? m.bustIn : m.bustCm}</td>
                      <td className="p-3">{unit === 'inches' ? m.waistIn : m.waistCm}</td>
                      <td className="p-3">{unit === 'inches' ? m.hipIn : m.hipCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to measure tips */}
            <div className="bg-[#18181E] p-4 border border-[#26262F] text-xs space-y-2 text-zinc-400">
              <h4 className="font-medium text-[#FF3B8A] uppercase text-[10px] tracking-wider">
                How to Measure & Saree Sizing
              </h4>
              <ul className="space-y-1 font-light text-[11px] list-disc list-inside">
                <li><strong className="text-zinc-200">Sarees:</strong> Standard 5.5m - 6.3m drape with running blouse fabric. Free size.</li>
                <li><strong className="text-zinc-200">Blouses & Kurta Sets:</strong> Measure around the fullest part of bust and natural waist.</li>
                <li><strong className="text-zinc-200">Custom Fit:</strong> All pieces include complimentary 2-inch alteration margins inside seams.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
