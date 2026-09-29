'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Star, Check, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Button from './Button';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      const defaultSize = quickViewProduct.sizes.find((s) => s.inStock)?.size || quickViewProduct.sizes[0]?.size || '';
      setSelectedSize(defaultSize);
      setQuantity(1);
      setSizeError(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen px-4 flex items-center justify-center py-8">
        <div className="relative w-full max-w-4xl bg-[#121216] text-white shadow-2xl border border-[#26262F] overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-[#18181E]/80 backdrop-blur-xs text-neutral-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="bg-[#18181E] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#26262F]">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#121216] mb-4 border border-[#26262F]">
                <Image
                  src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2 justify-center overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 aspect-[3/4] overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#FF3B8A] opacity-100 ring-1 ring-[#FF3B8A]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Ratings */}
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="tracking-widest uppercase font-medium text-[#FF5DA2]">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="w-3.5 h-3.5 fill-[#FF3B8A] text-[#FF3B8A]" />
                    <span className="font-medium text-xs">{quickViewProduct.rating}</span>
                    <span className="text-neutral-500">({quickViewProduct.reviewCount})</span>
                  </div>
                </div>

                {/* Title & Price */}
                <div>
                  <h3 className="font-serif text-2xl text-white leading-tight">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-3 mt-1.5">
                    <span className="text-lg font-medium text-white">
                      ${quickViewProduct.price.toFixed(2)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        ${quickViewProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tagline / Description */}
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">
                      Color: <span className="font-light text-neutral-400">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                          selectedColor === c.name
                            ? 'ring-2 ring-[#FF3B8A] ring-offset-2 ring-offset-[#121216] scale-105'
                            : 'border-white/20 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-3.5 h-3.5 ${['#181716', '#232323', '#111111', '#191919'].includes(c.hex) ? 'text-white' : 'text-black'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">
                      Size: <span className="font-light text-neutral-400">{selectedSize || 'Select a size'}</span>
                    </span>
                    <Link
                      href={`/shop/${quickViewProduct.slug}#size-guide`}
                      onClick={() => setQuickViewProduct(null)}
                      className="text-[11px] text-[#FF5DA2] hover:text-white underline"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => {
                          setSelectedSize(s.size);
                          setSizeError(false);
                        }}
                        className={`min-w-[42px] px-3 py-2 text-xs uppercase font-medium border transition-all ${
                          selectedSize === s.size
                            ? 'bg-[#FF3B8A] text-white border-[#FF3B8A]'
                            : s.inStock
                            ? 'bg-[#18181E] border-[#2D2D38] text-white hover:border-[#FF3B8A]'
                            : 'bg-[#121216] border-[#22222B] text-neutral-600 line-through cursor-not-allowed'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-xs text-[#FF5DA2] font-light">Please select your size.</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-medium text-white">Quantity:</span>
                  <div className="flex items-center border border-[#2D2D38] bg-[#18181E]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-neutral-300 hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 text-xs font-medium text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-neutral-300 hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#26262F]">
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleAddToCart}
                  >
                    <span>Add to Inquiry Dossier</span>
                  </Button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3.5 border transition-colors ${
                      isFavorite
                        ? 'border-[#FF3B8A]/60 bg-[#26131F] text-[#FF3B8A]'
                        : 'border-[#2D2D38] hover:border-[#FF3B8A] text-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF3B8A]' : ''}`} />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/shop/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#FF5DA2] tracking-wider uppercase font-medium hover:underline transition-colors"
                  >
                    <span>View full craft details & provenance →</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
