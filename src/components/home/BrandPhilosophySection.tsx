import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brandPillars } from '@/data/products';

export default function BrandPhilosophySection() {
  return (
    <section className="py-20 sm:py-28 bg-[#09090B] border-t border-[#26262F]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
              About The Boutique
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
              Crafted with restraint. <br className="hidden sm:block" />
              Worn with quiet confidence.
            </h2>
          </div>
          <div className="shrink-0">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs tracking-widest-luxury uppercase font-medium text-neutral-200 hover:text-[#FF5DA2] transition-colors"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Brand Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
          {brandPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="space-y-4 p-6 bg-[#121216] border border-[#26262F] hover:border-[#FF3B8A]/50 transition-all duration-300 group shadow-md"
            >
              <span className="font-serif text-3xl text-[#FF5DA2] group-hover:text-white transition-colors">
                {pillar.number}
              </span>
              <h3 className="font-serif text-xl text-white font-normal group-hover:text-[#FF5DA2] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
