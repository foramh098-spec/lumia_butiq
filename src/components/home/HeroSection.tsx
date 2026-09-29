import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[88vh] min-h-[580px] max-h-[920px] flex items-center justify-center overflow-hidden bg-[#09090B]">
      {/* Background Editorial Image with subtle zoom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
          alt="LUMÉA Indian Couture & Handloom Collection Hero"
          fill
          priority
          className="object-cover object-center brightness-75 contrast-[1.05] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle dark gradient overlay with pink ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/55 to-black/70" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center text-[#FAF9F6] space-y-6 animate-fade-in">
        
        {/* Edition Subtitle Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#FF3B8A]/40 backdrop-blur-md bg-black/50 text-[10px] sm:text-[11px] tracking-widest-luxury uppercase font-light text-neutral-200 shadow-[0_0_12px_rgba(255,59,138,0.2)]">
          <span>Handloom Heritage</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_8px_#FF3B8A]" />
          <span className="text-[#FF5DA2] font-medium">Bespoke Couture 2026</span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08] max-w-3xl mx-auto">
          Sacred Heritage. Modern Expression.
        </h1>

        {/* Short Description */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
          Master-woven Banarasi Katan silks, ethereal Chanderi tissue, organic handspun linen, and sculpted Indo-Western couture made to measure.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Button
            variant="primary"
            size="lg"
            href="/shop"
            className="w-full sm:w-auto"
          >
            Explore Indian Couture
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="/custom-atelier"
            className="w-full sm:w-auto border-[#FF3B8A]/60 text-white hover:bg-[#FF3B8A] hover:border-[#FF3B8A] hover:text-white"
          >
            Custom Atelier Studio ✨
          </Button>
        </div>
      </div>

      {/* Bottom Floating Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[9px] tracking-widest uppercase text-white/60 font-light">
        <span>Scroll to Explore</span>
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#FF3B8A] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
