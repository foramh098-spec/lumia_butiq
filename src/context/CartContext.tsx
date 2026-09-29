'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, CustomGarmentSpecs } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  promoCode: string | null;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  quickViewProduct: Product | null;
  addItem: (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity?: number,
    customSpecs?: CustomGarmentSpecs,
    customPrice?: number
  ) => void;
  addCustomGarment: (
    customSpecs: CustomGarmentSpecs,
    price: number,
    previewImage?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING_COST = 20;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumea_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem('lumea_promo');
      if (savedPromo) {
        const promo = JSON.parse(savedPromo);
        setPromoCode(promo.code);
        setDiscountPercent(promo.discountPercent);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('lumea_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to persist cart', e);
      }
    }
  }, [items, isHydrated]);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const discount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_COST;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const addItem = useCallback(
    (
      product: Product,
      selectedColor: string,
      selectedSize: string,
      quantity = 1,
      customSpecs?: CustomGarmentSpecs,
      customPrice?: number
    ) => {
      const isCustom = !!customSpecs;
      const itemId = isCustom
        ? `${product.id}-${selectedColor}-${selectedSize}-custom-${Date.now()}`
        : `${product.id}-${selectedColor}-${selectedSize}`;

      const price = customPrice || product.price;

      setItems((prevItems) => {
        if (!isCustom) {
          const existingIndex = prevItems.findIndex((item) => item.id === itemId);
          if (existingIndex > -1) {
            const updated = [...prevItems];
            updated[existingIndex].quantity += quantity;
            return updated;
          }
        }
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedColor,
            selectedSize,
            quantity,
            unitPrice: price,
            customSpecs,
          },
        ];
      });

      showToast(
        isCustom ? 'Bespoke Garment Added' : 'Added to Inquiry Dossier',
        'success',
        `${product.name} (${selectedColor} / ${selectedSize})`
      );
      setIsCartOpen(true);
    },
    [showToast]
  );

  const addCustomGarment = useCallback(
    (customSpecs: CustomGarmentSpecs, price: number, previewImage?: string) => {
      const pseudoProduct: Product = {
        id: `bespoke-${Date.now()}`,
        slug: `bespoke-${customSpecs.garmentType.toLowerCase().replace(/\s+/g, '-')}`,
        name: `Bespoke ${customSpecs.garmentType}`,
        tagline: `Hand-tailored from ${customSpecs.fabric} in ${customSpecs.colorName}.`,
        price: price,
        category: customSpecs.garmentType.includes('Saree')
          ? 'Sarees'
          : customSpecs.garmentType.includes('Kurta') || customSpecs.garmentType.includes('Suit')
          ? 'Kurta Sets'
          : customSpecs.garmentType.includes('Lehenga') || customSpecs.garmentType.includes('Anarkali')
          ? 'Lehengas & Anarkalis'
          : customSpecs.garmentType.includes('Linen')
          ? 'Handloom & Linen'
          : 'Indo-Western',
        collection: 'Varanasi Heritage',
        images: [
          previewImage ||
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
        ],
        description: `Bespoke Indian Couture ${customSpecs.garmentType} personalized to client measurements. Handloom Textile: ${customSpecs.fabric}. Zari Monogram: ${customSpecs.monogramInitials || 'None'}.`,
        details: [
          `Custom Boutique Made-to-Measure`,
          `Textile: ${customSpecs.fabric} (${customSpecs.fabricOrigin || 'Artisan Handloom Guild'})`,
          `Craft: ${customSpecs.craftStyle || 'Artisanal Handwork'}`,
          `Blouse/Neckline: ${customSpecs.blouseNeckline || customSpecs.collarStyle || 'Classic Cut'}`,
          `Sleeve/Finish: ${customSpecs.blouseSleeve || customSpecs.sleeveStyle || 'Tailored'}`,
          customSpecs.monogramInitials ? `Zari Monogram: "${customSpecs.monogramInitials}" (${customSpecs.monogramColor})` : 'No monogram',
          customSpecs.fitPreference ? `Fit preference: ${customSpecs.fitPreference}` : 'Royal Tailored Fit',
        ],
        materials: `100% Bespoke ${customSpecs.fabric}.`,
        care: 'Specialist Atelier care / Luxury Dry Clean recommended.',
        origin: 'Atelier LUMÉA, Ahmedabad & Handloom Guilds',
        colors: [{ name: customSpecs.colorName, hex: customSpecs.colorHex, inStock: true }],
        sizes: [{ size: 'One Size', inStock: true }],
        sku: `LUM-BSPK-${Date.now().toString().slice(-4)}`,
        rating: 5.0,
        reviewCount: 1,
        reviews: [],
      };

      const itemId = `bespoke-item-${Date.now()}`;

      setItems((prev) => [
        ...prev,
        {
          id: itemId,
          productId: pseudoProduct.id,
          product: pseudoProduct,
          selectedColor: customSpecs.colorName,
          selectedSize: 'Made-to-Measure',
          quantity: 1,
          unitPrice: price,
          customSpecs,
        },
      ]);

      showToast(
        'Bespoke Piece Added',
        'success',
        `Custom ${customSpecs.garmentType} (${customSpecs.fabric} / ${customSpecs.colorName})`
      );
      setIsCartOpen(true);
    },
    [showToast]
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem('lumea_cart');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const applyPromoCode = useCallback(
    (code: string) => {
      const cleanCode = code.trim().toUpperCase();
      if (cleanCode === 'LUMEA10' || cleanCode === 'WELCOME10') {
        setPromoCode(cleanCode);
        setDiscountPercent(10);
        localStorage.setItem(
          'lumea_promo',
          JSON.stringify({ code: cleanCode, discountPercent: 10 })
        );
        showToast('Promo code applied', 'success', '10% private client discount applied to your bag.');
        return { success: true, message: '10% discount applied.' };
      } else if (cleanCode === 'VIP15') {
        setPromoCode(cleanCode);
        setDiscountPercent(15);
        localStorage.setItem(
          'lumea_promo',
          JSON.stringify({ code: cleanCode, discountPercent: 15 })
        );
        showToast('VIP code applied', 'success', '15% boutique atelier discount applied.');
        return { success: true, message: '15% VIP discount applied.' };
      }
      return { success: false, message: 'Invalid promo code. Try LUMEA10 for 10% off.' };
    },
    [showToast]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem('lumea_promo');
    } catch (e) {
      console.error(e);
    }
    showToast('Promo code removed', 'info');
  }, [showToast]);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        discount,
        promoCode,
        shippingFee,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        isCartOpen,
        isCheckoutOpen,
        quickViewProduct,
        addItem,
        addCustomGarment,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        openCheckout,
        closeCheckout,
        setQuickViewProduct,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
