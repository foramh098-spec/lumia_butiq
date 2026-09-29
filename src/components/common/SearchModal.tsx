'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedTags = [
    'Banarasi Saree',
    'Chanderi Kurta Set',
    'Indo-Western Blazer',
    'Handloom Linen',
    'Zardozi Anarkali',
    'Chikankari Silk',
    'Maheshwari Saree',
  ];

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const clean = query.toLowerCase().trim();
    const filtered = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.collection.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        p.materials.toLowerCase().includes(clean)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-start justify-center pt-16 sm:pt-24 pb-12">
        <div className="relative w-full max-w-3xl bg-[#121216] p-6 sm:p-10 shadow-2xl border border-[#26262F] animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Bar Input */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#FF5DA2] font-semibold">
              Search Atelier Wardrobe
            </span>
            <div className="flex items-center gap-3 border-b-2 border-[#FF3B8A] pb-3">
              <Search className="w-5 h-5 text-[#FF5DA2]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search pieces, fabrics, or collections..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-white placeholder:text-neutral-500 focus:outline-none placeholder:font-sans placeholder:text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-neutral-400 hover:text-[#FF5DA2] uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Suggested Quick Queries */}
          {!query && (
            <div className="mt-8 space-y-3">
              <p className="text-[11px] tracking-wider uppercase text-neutral-400 font-medium">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#18181E] hover:bg-[#252530] text-xs text-neutral-200 hover:text-[#FF5DA2] border border-[#26262F] hover:border-[#FF3B8A]/50 transition-colors rounded-none"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {query && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>
                  {results.length} {results.length === 1 ? 'piece' : 'pieces'} found for &quot;{query}&quot;
                </span>
                {results.length > 0 && (
                  <Link
                    href={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-[#FF5DA2] hover:text-white font-medium inline-flex items-center gap-1"
                  >
                    <span>View all in shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="font-serif text-lg text-white">No matching pieces found</p>
                  <p className="text-xs text-neutral-400">
                    Try searching for &quot;Dress&quot;, &quot;Blazer&quot;, &quot;Linen&quot;, or &quot;Silk&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      onClick={onClose}
                      className="group flex gap-3 p-2.5 bg-[#18181E] hover:bg-[#202028] transition-colors border border-[#26262F] hover:border-[#FF3B8A]/40"
                    >
                      <div className="relative w-16 aspect-[3/4] bg-[#121216] shrink-0 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-1">
                        <span className="text-[9px] tracking-widest uppercase text-neutral-400">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-medium text-white group-hover:text-[#FF5DA2] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="text-xs font-medium text-[#FF5DA2]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
