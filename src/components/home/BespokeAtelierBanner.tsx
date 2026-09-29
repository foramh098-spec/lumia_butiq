import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Scissors, Ruler, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '@/components/common/Button';

export default function BespokeAtelierBanner() {
  return (
    <section className="py-20 sm:py-28 bg-[#0D0D11] border-y border-[#26262F]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#FF3B8A]/40 bg-[#121216] text-[10px] sm:text-[11px] tracking-widest-luxury uppercase font-medium text-white shadow-[0_0_12px_rgba(255,59,138,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3B8A]" />
              <span>Bespoke Indian Couture Atelier</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.12]">
              Handloom couture customized to your exact silhouette.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Step into our digital Bespoke Atelier. Customize artisanal blouses with bespoke necklines and dori ties, order pre-stitched saree pleats with handcrafted fall & pico, or tailor pure Chanderi suits, Anarkalis, and Indo-Western coordinates with personalized Zari initials.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#121216] border border-[#26262F] space-y-1.5">
                <div className="flex items-center gap-2 text-white text-xs uppercase font-medium tracking-wider">
                  <Scissors className="w-4 h-4 text-[#FF3B8A]" />
                  <span>Custom Blouse & Suit Cut</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">
                  Tailored to your exact bust, waist, hips, and preferred neckline or bottom flare.
                </p>
              </div>

              <div className="p-4 bg-[#121216] border border-[#26262F] space-y-1.5">
                <div className="flex items-center gap-2 text-white text-xs uppercase font-medium tracking-wider">
                  <Ruler className="w-4 h-4 text-[#FF3B8A]" />
                  <span>Zari Monogram & Pico</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">
                  Personalized metallic zari embroidery on pallus, cuffs, or inner jacket labels.
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/custom-atelier"
                className="flex items-center gap-2"
              >
                <span>Enter Custom Atelier Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Link
                href="/about#sustainability"
                className="text-xs uppercase tracking-wider text-zinc-400 hover:text-[#FF3B8A] transition-colors underline font-medium"
              >
                Master Karigar Guarantee
              </Link>
            </div>
          </div>

          {/* Right Image Composition (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-[#18181E] border border-[#26262F] overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                alt="Banarasi silk loom weaving in atelier"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-[#09090B]/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-[#FF5DA2] border border-[#FF3B8A]/30">
                Heritage Loom Weaving
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-[#18181E] border border-[#26262F] overflow-hidden mt-8 group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                alt="Hand-zardozi embroidery and tailoring"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-[#09090B]/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-[#FF5DA2] border border-[#FF3B8A]/30">
                Zardozi Needlework
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
