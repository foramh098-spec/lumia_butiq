'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, Calendar, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from './Button';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    cartCount,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full flex pl-10">
        <div className="w-full bg-[#121216] border-l border-[#26262F] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#26262F] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#FF5DA2]" />
              <h2 className="text-xs tracking-widest-luxury uppercase font-medium text-white">
                Atelier Inquiry Dossier ({cartCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Boutique Exhibition Sub-banner */}
          <div className="bg-[#18181E] px-6 py-3 border-b border-[#26262F] flex items-center gap-2 text-xs text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A] shrink-0" />
            <span className="font-light text-[11px]">
              Private Viewing & Bespoke Tailoring Consultation
            </span>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#26262F]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#18181E] border border-[#26262F] flex items-center justify-center text-[#FF5DA2]">
                  <Sparkles className="w-7 h-7 stroke-[1.2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-white">Your inquiry dossier is empty</h3>
                  <p className="text-xs text-neutral-400 font-light max-w-xs">
                    Explore our curated Indian handlooms, Katan sarees, and bespoke couture pieces to save them for consultation.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  href="/shop"
                  onClick={closeCart}
                >
                  Explore Exhibition
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 aspect-[3/4] bg-[#18181E] border border-[#26262F] shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-xs font-medium text-white hover:text-[#FF5DA2] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-[#FF3B8A] transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-400 font-light">
                        {item.selectedColor} • {item.selectedSize}
                      </p>

                      {item.customSpecs && (
                        <div className="text-[10px] space-y-0.5 pt-1 text-zinc-400">
                          <span className="inline-block bg-[#FF3B8A]/15 text-[#FF5DA2] px-1.5 py-0.5 font-medium uppercase tracking-wider">
                            Bespoke Custom Tailoring
                          </span>
                          {item.customSpecs.monogramInitials && (
                            <p className="text-[#FF5DA2]">
                              Zari Monogram: &quot;{item.customSpecs.monogramInitials}&quot;
                            </p>
                          )}
                          {item.customSpecs.fabric && (
                            <p className="truncate text-zinc-400">
                              Textile: {item.customSpecs.fabric}
                            </p>
                          )}
                          {item.customSpecs.bust && (
                            <p className="text-zinc-400">
                              Bust: {item.customSpecs.bust} | Waist: {item.customSpecs.waist}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                        Atelier Display Piece
                      </span>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-[11px] text-[#FF5DA2] hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Inquiry Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#26262F] bg-[#121216] space-y-4">
              
              <div className="space-y-1 text-xs text-zinc-400">
                <p className="text-white font-medium">Ready to Inquire or Visit?</p>
                <p className="text-[11px] font-light">
                  Submit this dossier to schedule a private fitting salon with our couturier in Ahmedabad or request virtual video assistance.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={openCheckout}
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Atelier Consultation</span>
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  href="/contact"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book In-Person Boutique Salon</span>
                </Button>
              </div>

              {/* Boutique reassurance */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-light pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5DA2]" />
                <span>Private & Confidential Bespoke Service • Bodakdev, Ahmedabad</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
