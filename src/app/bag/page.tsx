'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Calendar, Scissors, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/common/Button';

export default function BagPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    openCheckout,
  } = useCart();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12">
      
      {/* Page Title & Exhibition Context Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#FF3B8A]/40 bg-[#121216] text-[10px] sm:text-[11px] tracking-widest-luxury uppercase font-medium text-white shadow-[0_0_12px_rgba(255,59,138,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF3B8A]" />
          <span>Exclusive Handloom Exhibition & Atelier</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-tight">
          Atelier Inquiry Dossier
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
          Curated creations selected for private salon viewing, handloom provenance review, and made-to-measure bespoke consultation. Garments are crafted on private commission.
        </p>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center space-y-6 max-w-md mx-auto bg-[#121216] border border-[#26262F] p-8 sm:p-12 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#FF3B8A]/10 flex items-center justify-center mx-auto text-[#FF3B8A]">
            <Sparkles className="w-8 h-8 stroke-[1.2]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-white">Your Inquiry Dossier is Empty</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Browse our master-woven Banarasi Katan silks, ethereal Chanderi tissue, Bengal handspun linen, and bespoke Indo-Western silhouettes to curate your private consultation list.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/shop">
            Explore Exhibition Lookbook
          </Button>
        </div>
      ) : (
        /* Dossier Table & Consultation Request Summary */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Atelier Consultation Notice */}
            <div className="bg-[#18181E] p-4 border border-[#FF3B8A]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-200">
                <Calendar className="w-4 h-4 text-[#FF3B8A] shrink-0" />
                <span className="font-medium text-white">
                  Private Boutique Exhibition • Made-to-Measure Commission
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                Submit this dossier to reserve an in-person viewing at our Ahmedabad Salon or schedule a virtual 1-on-1 HD video styling consultation with our master karigars.
              </p>
            </div>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 text-[10px] tracking-widest uppercase font-medium text-zinc-400 pb-3 border-b border-[#26262F]">
              <span className="col-span-6">Creation & Provenance</span>
              <span className="col-span-2 text-center">Fit / Craft Specs</span>
              <span className="col-span-2 text-center">Units</span>
              <span className="col-span-2 text-right">Bespoke Estimate</span>
            </div>

            {/* Item Rows */}
            <div className="divide-y divide-[#26262F]">
              {items.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Product Info (6 cols) */}
                  <div className="sm:col-span-6 flex gap-4">
                    <div className="relative w-20 sm:w-24 aspect-[3/4] bg-[#18181E] border border-[#26262F] shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-1">
                      <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                        {item.product.category} • {item.product.origin || 'Varanasi Looms'}
                      </span>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-serif text-base sm:text-lg text-white hover:text-[#FF3B8A] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-xs font-medium text-white sm:hidden">
                        Est. ${item.unitPrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-zinc-500 hover:text-[#FF3B8A] transition-colors flex items-center gap-1 pt-1 w-fit"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove from Dossier</span>
                      </button>
                    </div>
                  </div>

                  {/* Size & Color (2 cols) */}
                  <div className="sm:col-span-2 text-xs text-zinc-400 sm:text-center space-y-1">
                    <p className="font-medium text-zinc-200">
                      {item.customSpecs ? 'Custom Fit' : `Size: ${item.selectedSize}`}
                    </p>
                    <p className="text-[11px] font-light">{item.selectedColor}</p>
                    {item.customSpecs && (
                      <div className="text-[10px] space-y-0.5 pt-1 text-left sm:text-center">
                        <span className="inline-block bg-[#FF3B8A]/15 text-[#FF5DA2] px-1.5 py-0.5 font-medium uppercase tracking-wider">
                          Bespoke Atelier
                        </span>
                        {item.customSpecs.monogramInitials && (
                          <p className="text-[#FF5DA2] font-serif">
                            Zari Initials: &quot;{item.customSpecs.monogramInitials}&quot;
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity (2 cols) */}
                  <div className="sm:col-span-2 flex sm:justify-center">
                    <div className="flex items-center border border-[#26262F] bg-[#18181E]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-white hover:bg-[#26262F] transition-colors"
                        aria-label="Decrease pieces"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-white hover:bg-[#26262F] transition-colors"
                        aria-label="Increase pieces"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total (2 cols) */}
                  <div className="sm:col-span-2 text-right">
                    <span className="text-sm font-semibold text-white">
                      Est. ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-light">
                      Made-to-order
                    </span>
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href="/shop"
                className="text-xs text-zinc-400 hover:text-[#FF3B8A] tracking-wider uppercase font-medium underline transition-colors"
              >
                ← Continue Viewing Exhibition
              </Link>
            </div>

          </div>

          {/* Right: Consultation Request Summary (4 cols) */}
          <div className="lg:col-span-4 bg-[#121216] p-6 sm:p-8 border border-[#26262F] shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
                Atelier Consultation
              </span>
              <h3 className="font-serif text-2xl text-white">Dossier Summary</h3>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-zinc-400 pt-2 border-t border-[#26262F]">
              <div className="flex justify-between">
                <span>Selected Creations</span>
                <span className="text-white font-medium">{items.length} {items.length === 1 ? 'Piece' : 'Pieces'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tailoring & Finishing</span>
                <span className="text-[#FF5DA2] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Private Styling Session</span>
                <span className="text-[#FF5DA2] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-white pt-3 border-t border-[#26262F]">
                <span>Estimated Bespoke Value</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-light pt-1">
                * Prices are made-to-order artisanal estimates. No payment is processed online. Final quotes are confirmed during your private consultation.
              </p>
            </div>

            {/* Request Consultation CTA */}
            <div className="pt-2 space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={openCheckout}
                className="flex items-center justify-center gap-2"
              >
                <span>Request Atelier Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <Button
                variant="outline"
                size="md"
                fullWidth
                href="/contact"
                className="border-[#26262F] text-zinc-300 hover:text-white hover:border-[#FF3B8A]"
              >
                <span>Book In-Person Salon Viewing</span>
              </Button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 border-t border-[#26262F] space-y-2.5 text-[11px] text-zinc-400 font-light">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#FF3B8A] shrink-0" />
                <span>1-on-1 Master Weaver & Stylist Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF3B8A] shrink-0" />
                <span>Bespoke Made-to-Measure & Saree Pico/Fall Finishing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF3B8A] shrink-0" />
                <span>Silk Mark Certified Pure Heritage Looms</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
