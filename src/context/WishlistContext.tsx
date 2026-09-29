'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '@/types';
import { mockProducts } from '@/data/products';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumea_wishlist');
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('lumea_wishlist', JSON.stringify(wishlistIds));
      } catch (e) {
        console.error('Failed to save wishlist', e);
      }
    }
  }, [wishlistIds, isHydrated]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          showToast('Removed from Wishlist', 'info', product.name);
          return prev.filter((id) => id !== product.id);
        } else {
          showToast('Saved to Wishlist', 'success', product.name);
          return [...prev, product.id];
        }
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', 'info');
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const wishlistProducts = mockProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
