import React from 'react';
import { pressQuotes } from '@/data/products';

export default function PressQuotesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#0D0D10] text-[#FAF9F6] border-y border-[#26262F]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#26262F]">
          {pressQuotes.map((item, idx) => (
            <div key={idx} className="pt-6 lg:pt-0 lg:px-6 space-y-4 text-center sm:text-left">
              <p className="font-serif italic text-base sm:text-lg text-neutral-200 font-light leading-snug">
                {item.quote}
              </p>
              <span className="block text-[10px] tracking-widest uppercase text-[#FF5DA2] font-semibold">
                {item.publication}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
