'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails list (vertical on desktop, horizontal on mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] shrink-0 pb-2 md:pb-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-[#18181E] border transition-all ${
              activeIndex === idx
                ? 'ring-1 ring-[#FF3B8A] border-[#FF3B8A] opacity-100 shadow-[0_0_8px_rgba(255,59,138,0.4)]'
                : 'border-[#26262F] opacity-60 hover:opacity-100'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Feature Image Container */}
      <div className="relative flex-1 aspect-[3/4] max-h-[740px] bg-[#18181E] border border-[#26262F] overflow-hidden group shadow-xl">
        <Image
          src={images[activeIndex]}
          alt={`${productName} view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in brightness-95"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Lightbox trigger button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 bg-[#121216]/80 hover:bg-[#FF3B8A] text-white backdrop-blur-xs transition-colors shadow-sm opacity-90 group-hover:opacity-100 border border-[#26262F]"
          aria-label="Enlarge photography"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Mobile Navigation Arrows */}
        {images.length > 1 && (
          <div className="md:hidden">
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#FF3B8A] backdrop-blur-xs text-white rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#FF3B8A] backdrop-blur-xs text-white rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors z-50"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-4xl h-[85vh] flex items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`${productName} enlarged`}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
