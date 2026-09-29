'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, Star, Check, Plus, Minus, Ruler, Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductGallery from '@/components/shop/ProductGallery';
import SizeGuideModal from '@/components/shop/SizeGuideModal';
import ProductAccordion from '@/components/shop/ProductAccordion';
import ReviewSection from '@/components/shop/ReviewSection';
import ProductCard from '@/components/common/ProductCard';
import Button from '@/components/common/Button';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);

  const [isCustomTailoringActive, setIsCustomTailoringActive] = useState(false);
  const [customMonogram, setCustomMonogram] = useState('');
  const [customBust, setCustomBust] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customHips, setCustomHips] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customFit, setCustomFit] = useState<'Tailored' | 'Relaxed' | 'Oversized'>('Tailored');

  const handleAddToBag = () => {
    if (!selectedSize && !isCustomTailoringActive) {
      setSizeError(true);
      return;
    }

    const customSpecs = isCustomTailoringActive
      ? {
          isCustom: true,
          garmentType: product.name,
          fabric: product.materials.split('.')[0] || 'Premium Atelier Fabric',
          colorName: selectedColor,
          colorHex: product.colors.find((c) => c.name === selectedColor)?.hex || '#000000',
          monogramInitials: customMonogram ? customMonogram.toUpperCase().trim() : undefined,
          bust: customBust ? `${customBust} in` : undefined,
          waist: customWaist ? `${customWaist} in` : undefined,
          hips: customHips ? `${customHips} in` : undefined,
          height: customHeight ? `${customHeight} in` : undefined,
          fitPreference: customFit,
        }
      : undefined;

    const unitPrice = isCustomTailoringActive ? product.price + 35 : product.price;

    addItem(
      product,
      selectedColor,
      isCustomTailoringActive ? 'Made-to-Measure' : selectedSize,
      quantity,
      customSpecs,
      unitPrice
    );
  };

  // Recommendations: Other products from same collection or category, excluding current
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 font-light mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#FF3B8A] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
        <Link href="/shop" className="hover:text-[#FF3B8A] transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#FF3B8A] transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
        <span className="text-white font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16">
        
        {/* Left: Product Image Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Buy Box & Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          {/* Header & Price */}
          <div className="space-y-2 border-b border-[#26262F] pb-6">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="tracking-widest uppercase font-medium text-[#FF3B8A]">
                {product.collection}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FF3B8A] text-[#FF3B8A]" />
                <span className="font-medium text-white">{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-medium text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-500 line-through font-light">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Exhibition note */}
            <p className="text-[11px] text-[#FF5DA2] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
              <span>Exclusive Handloom Showcase • Made to Measure by Private Appointment</span>
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Selector */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">
                Color: <strong className="font-normal text-zinc-400">{selectedColor}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-[#FF3B8A] ring-offset-2 ring-offset-[#09090B] scale-105'
                      : 'border-[#26262F] hover:border-zinc-500'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        ['#232323', '#111111', '#181716', '#191919', '#09090B'].includes(c.hex)
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">
                Size: <strong className="font-normal text-zinc-400">{selectedSize || 'Choose size'}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[11px] text-zinc-400 hover:text-[#FF3B8A] underline flex items-center gap-1 transition-colors"
              >
                <Ruler className="w-3 h-3" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={() => {
                    setSelectedSize(s.size);
                    setSizeError(false);
                  }}
                  className={`py-3 text-xs uppercase font-medium border transition-all flex flex-col items-center justify-center ${
                    selectedSize === s.size
                      ? 'bg-[#FF3B8A] text-white border-[#FF3B8A] shadow-xs shadow-[#FF3B8A]/20'
                      : s.inStock
                      ? 'bg-[#18181E] text-zinc-200 border-[#26262F] hover:border-[#FF3B8A]'
                      : 'bg-[#09090B] text-zinc-600 border-[#26262F] line-through cursor-not-allowed'
                  }`}
                >
                  <span>{s.size}</span>
                </button>
              ))}
            </div>

            {/* Stock Left Warning */}
            {currentSizeObj?.stockLeft && currentSizeObj.stockLeft <= 3 && (
              <p className="text-[11px] text-[#FF5DA2] font-medium">
                Low stock: Only {currentSizeObj.stockLeft} left in size {selectedSize}
              </p>
            )}

            {sizeError && (
              <p className="text-xs text-[#FF3B8A] font-light">
                Please choose your size before adding to bag.
              </p>
            )}
          </div>

          {/* Bespoke Made-to-Measure Customization Toggle */}
          <div className="p-4 bg-[#18181E] border border-[#26262F] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
                <span className="text-xs uppercase tracking-wider text-white font-medium">
                  {product.category === 'Sarees' ? 'Custom Blouse Stitching & Fall/Pico (+$35)' : 'Custom Made-to-Measure Tailoring (+$35)'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCustomTailoringActive}
                  onChange={(e) => setIsCustomTailoringActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-4.5 bg-[#26262F] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#FF3B8A]" />
              </label>
            </div>
            
            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
              {product.category === 'Sarees'
                ? 'Have the unstitched blouse piece tailored to your exact measurements, neckline, dori ties, with complimentary hand-done saree fall & pico.'
                : 'Have our master karigars tailor this garment specifically to your custom body measurements with optional personalized Zari monogram.'}
            </p>

            {isCustomTailoringActive && (
              <div className="space-y-3 pt-2 border-t border-[#26262F] animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Bust (in)</label>
                    <input
                      type="number"
                      placeholder="34"
                      value={customBust}
                      onChange={(e) => setCustomBust(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white focus:border-[#FF3B8A]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Waist (in)</label>
                    <input
                      type="number"
                      placeholder="28"
                      value={customWaist}
                      onChange={(e) => setCustomWaist(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white focus:border-[#FF3B8A]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Hips (in)</label>
                    <input
                      type="number"
                      placeholder="38"
                      value={customHips}
                      onChange={(e) => setCustomHips(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white focus:border-[#FF3B8A]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Height (in)</label>
                    <input
                      type="number"
                      placeholder="66"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white focus:border-[#FF3B8A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Zari Monogram (Optional)</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="S.R."
                      value={customMonogram}
                      onChange={(e) => setCustomMonogram(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white uppercase tracking-widest focus:border-[#FF3B8A]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-zinc-400 tracking-wider">Fit / Cut Preference</label>
                    <select
                      value={customFit}
                      onChange={(e) => setCustomFit(e.target.value as any)}
                      className="w-full bg-[#09090B] border border-[#26262F] px-2.5 py-1.5 text-xs text-white focus:border-[#FF3B8A]"
                    >
                      <option value="Tailored">Sculpted Royal Fit</option>
                      <option value="Relaxed">Fluid Classic Fit</option>
                      <option value="Oversized">Relaxed Contemporary</option>
                    </select>
                  </div>
                </div>

                <div className="text-[10px] text-zinc-400 flex items-center gap-2 pt-1">
                  <Check className="w-3.5 h-3.5 text-[#FF3B8A]" />
                  <span>Complimentary Fall & Pico, breathable lining & 2-inch alteration margins included.</span>
                </div>

                <Link
                  href="/custom-atelier"
                  className="inline-flex items-center gap-1 text-[10px] text-[#FF5DA2] hover:underline uppercase tracking-wider pt-1"
                >
                  <span>Or design a complete bespoke saree/suit from scratch in our Custom Atelier Studio →</span>
                </Link>
              </div>
            )}
          </div>

          {/* Quantity Selector & Add to Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#26262F] bg-[#18181E]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-white hover:bg-[#26262F] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-medium text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-white hover:bg-[#26262F] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inquire CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToBag}
              >
                <span>Inquire / Add to Dossier</span>
              </Button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border transition-colors flex items-center justify-center ${
                  isFavorite
                    ? 'border-[#FF3B8A] bg-[#FF3B8A]/10 text-[#FF3B8A]'
                    : 'border-[#26262F] hover:border-[#FF3B8A] text-zinc-300 hover:text-[#FF3B8A] bg-[#18181E]'
                }`}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF3B8A] text-[#FF3B8A]' : 'stroke-[1.5]'}`} />
              </button>
            </div>
          </div>

          {/* Boutique Assurances */}
          <div className="pt-4 border-t border-[#26262F] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-zinc-400 font-light">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#FF3B8A] shrink-0" />
              <span>Private Appointments (Ahmedabad)</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#FF3B8A] shrink-0" />
              <span>Direct Master Handloom Weavers</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF3B8A] shrink-0" />
              <span>Bespoke Made-to-Measure Guarantee</span>
            </div>
          </div>

          {/* Collapsible Accordion Sections */}
          <ProductAccordion product={product} />

        </div>
      </div>

      {/* Customer Reviews Section */}
      <ReviewSection
        reviews={product.reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
        productName={product.name}
      />

      {/* "You May Also Like" Product Recommendations */}
      <div className="pt-20 sm:pt-28 border-t border-[#26262F] mt-16 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
            Curated Pairings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            You May Also Like
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Complementary silhouettes designed to complete your modern wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

    </div>
  );
}
