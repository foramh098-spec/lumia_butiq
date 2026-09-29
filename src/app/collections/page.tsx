import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { mockCollections, mockProducts } from '@/data/products';
import Button from '@/components/common/Button';
import ProductCard from '@/components/common/ProductCard';

export default function CollectionsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-24 sm:space-y-32">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
          The Seasonal Lookbooks
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight">
          Curated Collections
        </h1>
        <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
          Stories told through texture, light, and architectural drape. Discover our curated capsules designed for purposeful living.
        </p>
      </div>

      {/* Collection Sections */}
      <div className="space-y-28 sm:space-y-36">
        {mockCollections.map((collection, idx) => {
          const isReversed = idx % 2 !== 0;
          const collectionProducts = mockProducts.filter((p) =>
            collection.productIds.includes(p.id)
          );

          return (
            <section
              key={collection.id}
              id={collection.slug}
              className="space-y-12 border-b border-[#26262F] pb-20 last:border-b-0"
            >
              {/* Split Editorial Showcase */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Large Editorial Image (7 cols) */}
                <div
                  className={`lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-[#121216] border border-[#26262F] group ${
                    isReversed ? 'lg:col-start-6' : ''
                  }`}
                >
                  <Image
                    src={collection.heroImage}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-95"
                  />
                  <div className="absolute top-4 left-4 bg-[#121216]/90 border border-[#26262F] backdrop-blur-md px-3.5 py-1 text-[10px] tracking-widest uppercase font-medium text-[#FF3B8A]">
                    {collection.season}
                  </div>
                </div>

                {/* Text Narrative (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
                      {collection.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                      {collection.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                    {collection.description}
                  </p>

                  <blockquote className="border-l-2 border-[#FF3B8A] pl-4 py-1 text-xs sm:text-sm italic font-serif text-zinc-200">
                    {collection.quote}
                  </blockquote>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      href="/shop"
                    >
                      <span>Explore Collection</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lookbook Product Preview Row */}
              {collectionProducts.length > 0 && (
                <div className="space-y-6 pt-6">
                  <div className="flex items-center justify-between border-t border-[#26262F] pt-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF3B8A]" />
                      <h3 className="text-xs tracking-widest-luxury uppercase font-medium text-white">
                        Curated Looks From This Edit
                      </h3>
                    </div>
                    <Link
                      href="/shop"
                      className="text-xs text-zinc-400 hover:text-[#FF3B8A] tracking-wider uppercase inline-flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>View All in Shop</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {collectionProducts.slice(0, 4).map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

    </div>
  );
}
