'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const { addItem, setQuickViewProduct } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const primaryColor = product.colors[0]?.name || 'Standard';
    addItem(product, primaryColor, size, 1);
    setShowQuickSizes(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181E] mb-3.5 border border-[#26262F]">
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          {/* Main Product Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && hasMultipleImages ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'
            }`}
          />

          {/* Secondary Editorial Image on Hover */}
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.name} editorial view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Top Badges: New / Bestseller */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#FF3B8A] text-white text-[9px] tracking-widest uppercase px-2 py-0.5 font-semibold shadow-[0_0_10px_rgba(255,59,138,0.5)]">
              New
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-[#18181E] text-[#FF5DA2] border border-[#FF3B8A]/40 text-[9px] tracking-widest uppercase px-2 py-0.5 font-medium">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-[#18181E] text-[#FF3B8A] shadow-sm border border-[#FF3B8A]/50'
              : 'bg-black/60 backdrop-blur-xs text-white/90 opacity-90 hover:opacity-100 hover:text-[#FF3B8A] hover:bg-black/80'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF3B8A]' : 'stroke-[1.5]'}`} />
        </button>

        {/* Quick Actions (Desktop only on hover) */}
        <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex gap-1.5">
          <Link
            href={`/shop/${product.slug}`}
            className="flex-1 bg-[#FF3B8A] hover:bg-[#FF1A75] text-white py-2.5 px-3 text-[10px] tracking-widest uppercase font-semibold backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,59,138,0.3)]"
          >
            <span>View Creation</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="bg-[#18181E]/95 hover:bg-[#252530] text-white p-2.5 border border-[#2E2E3A] backdrop-blur-xs transition-colors"
            aria-label="Quick preview product"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Meta Info */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-light">
          <span className="tracking-widest uppercase">{product.category}</span>
          {/* Color swatch dots preview */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="text-sm font-normal text-white group-hover:text-[#FF5DA2] transition-colors leading-snug line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-xs font-medium text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-500 line-through font-light">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
