'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/common/ProductCard';
import Button from '@/components/common/Button';

export default function WishlistPage() {
  const { wishlistProducts, wishlistCount, clearWishlist } = useWishlist();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#26262F] pb-6">
        <div className="space-y-2">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
            Saved Atelier Items
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-tight">
            My Wishlist ({wishlistCount})
          </h1>
        </div>

        {wishlistCount > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs uppercase tracking-wider text-zinc-500 hover:text-[#FF3B8A] font-medium flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved</span>
          </button>
        )}
      </div>

      {wishlistCount === 0 ? (
        <div className="py-20 text-center space-y-6 max-w-md mx-auto bg-[#121216] border border-[#26262F] p-8 sm:p-12 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#FF3B8A]/10 flex items-center justify-center mx-auto text-[#FF3B8A]">
            <Heart className="w-7 h-7 stroke-[1.2] fill-[#FF3B8A]/20" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-white">Your wishlist is empty</h3>
            <p className="text-xs text-zinc-400 font-light">
              Save your favorite pieces by clicking the heart icon on any product to revisit them anytime.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/shop">
            Discover The Collection
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
