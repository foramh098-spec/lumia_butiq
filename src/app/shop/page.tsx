'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, X, Grid, Columns } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { FilterState, Product } from '@/types';
import ProductCard from '@/components/common/ProductCard';
import ProductFilters from '@/components/shop/ProductFilters';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    size: '',
    color: '',
    priceRange: '',
    sort: 'featured',
    availability: '',
    search: initialSearch,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      size: '',
      color: '',
      priceRange: '',
      sort: 'featured',
      availability: '',
      search: '',
    });
  };

  // Count active filters (excluding sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.size) count++;
    if (filters.color) count++;
    if (filters.priceRange) count++;
    if (filters.availability) count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // 1. Initial filter URL param (e.g. filter=new)
      if (initialFilter === 'new' && !product.isNew) {
        return false;
      }

      // 2. Category
      if (filters.category) {
        if (filters.category === 'Women') {
          // All apparel belongs to Women
        } else if (product.category !== filters.category) {
          return false;
        }
      }

      // 3. Size
      if (filters.size) {
        const hasSize = product.sizes.some(
          (s) => s.size === filters.size && s.inStock
        );
        if (!hasSize) return false;
      }

      // 4. Color
      if (filters.color) {
        const colorName = filters.color.toLowerCase();
        const hasColor = product.colors.some(
          (c) =>
            colorName.includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(colorName.split('/')[0].trim().toLowerCase())
        );
        if (!hasColor) return false;
      }

      // 5. Price Range
      if (filters.priceRange) {
        if (filters.priceRange === 'under-200' && product.price >= 200) return false;
        if (filters.priceRange === '200-350' && (product.price < 200 || product.price > 350)) return false;
        if (filters.priceRange === '350-500' && (product.price < 350 || product.price > 500)) return false;
        if (filters.priceRange === 'above-500' && product.price < 500) return false;
      }

      // 6. Availability
      if (filters.availability === 'in-stock') {
        const hasInStock = product.sizes.some((s) => s.inStock);
        if (!hasInStock) return false;
      }

      // 7. Search query
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price;
      if (filters.sort === 'price-desc') return b.price - a.price;
      if (filters.sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sort === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });
  }, [filters, initialFilter]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
      
      {/* Exhibition Lookbook Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
        <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
          Haute Couture & Handloom Exhibition
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
          Exhibition Lookbook
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
          Explore master-woven Banarasi Katan silks, ethereal Chanderi tissue, Phulia handspun linens, and bespoke Indo-Western silhouettes. Inquire directly or add creations to your dossier for private salon viewing and made-to-measure tailoring.
        </p>
      </div>

      {/* Control Bar: Filter Toggle, Count, Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#26262F] mb-8 sm:mb-12">
        {/* Left: Mobile filter button & item count */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FF3B8A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#FF5DA2] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <span className="text-xs text-zinc-400 font-light">
            Showing <strong className="text-white font-medium">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Right: Grid Column Selector & Sort Dropdown */}
        <div className="flex items-center gap-4">
          {/* Desktop Grid Columns Toggle */}
          <div className="hidden lg:flex items-center border border-[#26262F] bg-[#121216]">
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 transition-colors ${
                gridColumns === 3 ? 'bg-[#FF3B8A] text-white' : 'text-zinc-400 hover:text-white'
              }`}
              aria-label="3 columns view"
              title="3 Columns"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 transition-colors ${
                gridColumns === 4 ? 'bg-[#FF3B8A] text-white' : 'text-zinc-400 hover:text-white'
              }`}
              aria-label="4 columns view"
              title="4 Columns"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-select" className="text-zinc-400 font-light hidden sm:inline">Sort by:</label>
            <select
              id="sort-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="bg-[#121216] border border-[#26262F] px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-[#FF3B8A] font-medium"
            >
              <option value="featured" className="bg-[#121216] text-white">Featured</option>
              <option value="newest" className="bg-[#121216] text-white">Newest</option>
              <option value="price-asc" className="bg-[#121216] text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121216] text-white">Price: High to Low</option>
              <option value="rating" className="bg-[#121216] text-white">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Desktop Filters Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            activeFilterCount={activeFilterCount}
            totalProducts={filteredProducts.length}
          />
        </div>

        {/* Product Grid (9 cols on desktop) */}
        <div className="lg:col-span-9 w-full">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-[#121216] border border-[#26262F] p-8">
              <h3 className="font-serif text-2xl text-white">No matching pieces found</h3>
              <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                No items match your active filter criteria. Try adjusting your filters or resetting them.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#FF3B8A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#FF5DA2] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 gap-4 sm:gap-6 ${
                gridColumns === 4
                  ? 'lg:grid-cols-4'
                  : 'lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 4} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filters Bottom Sheet / Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#121216] border-l border-[#26262F] p-6 shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#26262F] mb-6">
                <span className="text-xs tracking-widest-luxury uppercase font-medium text-white">
                  Filters ({activeFilterCount})
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-[#FF3B8A] transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                activeFilterCount={activeFilterCount}
                totalProducts={filteredProducts.length}
              />
            </div>

            <div className="pt-6 border-t border-[#26262F] mt-6">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#FF3B8A] text-white hover:bg-[#FF5DA2] transition-colors py-3 text-xs tracking-widest uppercase font-medium"
              >
                Apply Filters ({filteredProducts.length} Pieces)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-xs tracking-widest uppercase text-zinc-400">
        Loading Atelier Wardrobe...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
