'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types';

interface ProductAccordionProps {
  product: Product;
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
  const [openSections, setOpenSections] = useState<string[]>(['details']);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="border-t border-[#26262F] divide-y divide-[#26262F]">
      
      {/* 1. Product Details */}
      <div>
        <button
          onClick={() => toggleSection('details')}
          className="w-full py-5 flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#FF5DA2]" />
            <span className="text-xs tracking-widest-luxury uppercase font-medium text-white group-hover:text-[#FF5DA2] transition-colors">
              Product Details & Fit
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
              openSections.includes('details') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.includes('details') && (
          <div className="pb-6 text-xs text-neutral-400 space-y-3 font-light leading-relaxed animate-in fade-in">
            <p>{product.description}</p>
            <ul className="list-disc list-inside space-y-1.5 pt-1 text-neutral-300">
              {product.details.map((item, idx) => (
                <li key={idx}>
                  <span className="text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-2 text-[11px] text-neutral-500">
              SKU: <strong className="font-mono text-[#FF5DA2]">{product.sku}</strong> • Designed in Atelier LUMÉA
            </p>
          </div>
        )}
      </div>

      {/* 2. Materials & Care */}
      <div>
        <button
          onClick={() => toggleSection('materials')}
          className="w-full py-5 flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#FF5DA2]" />
            <span className="text-xs tracking-widest-luxury uppercase font-medium text-white group-hover:text-[#FF5DA2] transition-colors">
              Materials, Provenance & Care
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
              openSections.includes('materials') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.includes('materials') && (
          <div className="pb-6 text-xs text-neutral-400 space-y-4 font-light leading-relaxed animate-in fade-in">
            <div>
              <strong className="block text-white font-medium mb-1">Fabric Composition:</strong>
              <p>{product.materials}</p>
            </div>
            <div>
              <strong className="block text-white font-medium mb-1">Garment Care Instructions:</strong>
              <p>{product.care}</p>
            </div>
            <div>
              <strong className="block text-white font-medium mb-1">Atelier Provenance:</strong>
              <p>{product.origin}</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Shipping & Returns */}
      <div>
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full py-5 flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#FF5DA2]" />
            <span className="text-xs tracking-widest-luxury uppercase font-medium text-white group-hover:text-[#FF5DA2] transition-colors">
              Complimentary Shipping & Returns
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
              openSections.includes('shipping') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.includes('shipping') && (
          <div className="pb-6 text-xs text-neutral-400 space-y-3 font-light leading-relaxed animate-in fade-in">
            <p>
              We offer <strong className="text-[#FF5DA2]">complimentary standard worldwide delivery</strong> on all orders over $250. Orders are dispatched within 24 hours in signature LUMÉA biodegradable bespoke gift packaging.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#18181E] border border-[#26262F]">
                <strong className="block text-white font-medium text-[11px] uppercase tracking-wider mb-0.5">
                  Domestic Delivery (India)
                </strong>
                <p className="text-[11px] text-neutral-400">2-4 business days via Express Courier.</p>
              </div>
              <div className="p-3 bg-[#18181E] border border-[#26262F]">
                <strong className="block text-white font-medium text-[11px] uppercase tracking-wider mb-0.5">
                  30-Day Effortless Returns
                </strong>
                <p className="text-[11px] text-neutral-400">Complimentary return labels included inside every parcel.</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
