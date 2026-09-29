import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Shield, Heart, Sparkles, Compass } from 'lucide-react';
import Button from '@/components/common/Button';

export default function AboutPage() {
  const philosophyItems = [
    {
      icon: Sparkles,
      title: 'Timeless Design',
      description: 'We ignore fast fashion seasons in favor of enduring forms that hold their relevance across decades.',
    },
    {
      icon: Shield,
      title: 'Heritage Looms & Noble Silks',
      description: 'Only certified Pure Katan Silk, Chanderi Tissue, 80s count handspun Bengal Linen, and Bhagalpur Wild Tussar touch our cutting tables.',
    },
    {
      icon: Leaf,
      title: 'Slow Handloom Artistry',
      description: 'We believe true luxury is born from generational weaver guilds in Varanasi, Chanderi, and Maheshwar taking weeks to weave each heirloom piece.',
    },
    {
      icon: Compass,
      title: 'Versatile Indian Silhouettes',
      description: 'From pre-draped saree gowns to regal Anarkalis and modern bandhgala blazers, our pieces transition effortlessly across celebrations.',
    },
    {
      icon: Heart,
      title: 'Bespoke Karigar Tailoring',
      description: 'Custom made-to-measure blouses, fall & pico finishing, and personal metallic Zari monograms crafted in our boutique studio.',
    },
  ];

  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-20">
      
      {/* 1. Hero Brand Narrative */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
            Our Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.08] tracking-tight">
            Indian Couture & Sacred Looms.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            LUMÉA was founded to bridge the timeless majesty of Indian handloom weaving with the sleek, dramatic discipline of modern haute couture.
          </p>
        </div>
      </section>

      {/* 2. Large Lifestyle Editorial Image */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#121216] border border-[#26262F]">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="LUMÉA Indian Couture Atelier Studio"
            fill
            priority
            className="object-cover object-center brightness-85"
          />
          <div className="absolute bottom-6 left-6 bg-[#121216]/90 backdrop-blur-md px-4 py-2 text-xs text-zinc-200 border border-[#26262F] font-light">
            Atelier LUMÉA • Bodakdev, Ahmedabad, India
          </div>
        </div>
      </section>

      {/* 3. Brand Story & Origins */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
              The Atelier Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              An unhurried devotion to the handloom shuttle.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                In a world dominated by mass synthesis and synthetic fabrics, LUMÉA operates as a sanctum of authentic Indian artisanal couture. Headquartered in Ahmedabad, our direct master weaver cooperatives span the sacred ghats of Varanasi, the historic looms of Chanderi, the hand-embroidery clusters of Lucknow, and the organic linen looms of Bengal.
              </p>
              <p>
                Each saree, suit, and Indo-Western silhouette is sculpted with architectural precision. Master karigars spend 40 to 120 hours meticulously embroidering real zardozi wires, dabka, and silver mukaish, ensuring each heirloom piece is cherished for generations.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-[#121216] border border-[#26262F] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                alt="Handloom Chanderi and Katan Silk weaving"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] bg-[#121216] border border-[#26262F] overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
                alt="Zardozi hand-embroidery needlework"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Design Philosophy Pillars */}
      <section className="bg-[#121216]/60 py-20 sm:py-28 border-y border-[#26262F]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Our Design Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Every garment we release adheres strictly to these tenets of modern Indian boutique luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-[#18181E] border border-[#26262F] space-y-4 hover:border-[#FF3B8A] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF3B8A]/10 flex items-center justify-center text-[#FF3B8A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Sustainability & Conscious Purchasing */}
      <section id="sustainability" className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#121216] border border-[#26262F] overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
              alt="Ethical handloom weaving and slow fashion"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
              Conscious Responsibility
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Direct Weaver Fair Trade & Pure Natural Fibers.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                We work directly with certified weaver co-operatives and karigar guilds, cutting out intermediary agents to guarantee fair wages, safe artisan workshops, and preservation of endangered loom craft.
              </p>
              <ul className="space-y-2 text-zinc-200 font-normal">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A]" />
                  <span>Silk Mark certified pure mulberry, tussar, and katan handloom silks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A]" />
                  <span>Azo-free natural dyeing processes protecting artisan soil and water</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A]" />
                  <span>Plastic-free luxury unbleached muslin garment bags with neem cedar keepsakes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A]" />
                  <span>Complimentary lifelong saree fall/pico and seam alteration support</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Button variant="primary" href="/shop">
                Explore The Collection
              </Button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
