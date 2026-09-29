'use client';

import React, { useState, ReactNode } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CartDrawer from '@/components/common/CartDrawer';
import QuickViewModal from '@/components/common/QuickViewModal';
import SearchModal from '@/components/common/SearchModal';
import CheckoutModal from '@/components/common/CheckoutModal';

export default function AppShell({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#FAF9F6]">
      {/* Sticky Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CheckoutModal />
    </div>
  );
}
