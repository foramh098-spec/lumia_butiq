import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { mockCategories } from '@/data/products';

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-[#0D0D10] border-y border-[#26262F]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
            Curated Indian Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Exhibition Categories
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Explore master-woven sarees, hand-embroidered kurta sets, and modern Indo-Western creations.
          </p>
        </div>

        {/* 4 Large Editorial Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {mockCategories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#18181E] border border-[#26262F] block shadow-lg hover:border-[#FF3B8A]/50 transition-colors"
            >
              {/* Large Fashion Image */}
              <Image
                src={category.image}
                alt={`LUMÉA ${category.name} Collection`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
              />

              {/* Subtle Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

              {/* Minimal Text Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white space-y-2">
                <span className="text-[10px] tracking-widest uppercase text-[#FF5DA2] font-semibold">
                  {category.count} Curated Pieces
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-[#FF5DA2] transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF3B8A] group-hover:text-white text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-neutral-300 font-light opacity-90 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
