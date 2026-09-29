import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function EverydayEditSection() {
  return (
    <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Large Editorial Image on one side (7 cols) */}
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#18181E] border border-[#26262F] group shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85"
            alt="The Chanderi & Royal Tissue Edit by LUMÉA"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90"
          />
          {/* Subtle badge on photo */}
          <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 text-[10px] tracking-widest uppercase font-medium text-[#FF5DA2] border border-[#FF3B8A]/30">
            Heritage Look 02 • Pure Chanderi Tissue & Zardozi
          </div>
        </div>

        {/* Text on the other side (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
              Featured Handloom Capsule
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.15]">
              Chanderi & Royal Tissue
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            A luminous collection rooted in ancient royal looms of Madhya Pradesh. Woven with pure silk warps, lightweight golden tissue, and delicate Zardozi needlework created for modern celebrations.
          </p>

          {/* Editorial quote callout */}
          <blockquote className="border-l-2 border-[#FF3B8A] pl-4 py-1 text-xs sm:text-sm italic font-serif text-neutral-200">
            &quot;Chanderi is where moonlight meets the master weaver’s shuttle — translucent, poetic, and utterly unforgettable.&quot;
          </blockquote>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              href="/collections"
            >
              Explore Collection
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
