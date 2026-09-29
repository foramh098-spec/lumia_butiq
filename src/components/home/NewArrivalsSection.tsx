'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockProducts } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';

export default function NewArrivalsSection() {
  // First 4 new arrival products
  const newArrivals = mockProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 border-b border-[#26262F] pb-6">
        <div className="space-y-2">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
            Fresh From The Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            Master-woven Banarasi brocades, sheer Chanderi tissue, and hand-zardozi embroidered ensembles fresh from artisan looms.
          </p>
        </div>

        <div>
          <Link
            href="/shop?filter=new"
            className="group inline-flex items-center gap-2 text-xs tracking-widest-luxury uppercase font-medium text-neutral-200 hover:text-[#FF5DA2] transition-colors"
          >
            <span>Explore All New Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 4 Product Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {newArrivals.map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx < 2} />
        ))}
      </div>
    </section>
  );
}
