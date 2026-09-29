'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    'Exclusive Indian Couture & Handloom Exhibition',
    'Private Atelier Consultations by Appointment in Bodakdev, Ahmedabad',
    'Bespoke Made-to-Measure Saree & Custom Blouse Studio',
  ];

  // Rotate announcement bar every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Exhibition Lookbook', href: '/shop' },
    { name: 'Custom Atelier', href: '/custom-atelier', isCustom: true },
    { name: 'Sarees', href: '/shop?category=Sarees' },
    { name: 'Kurta Sets', href: '/shop?category=Kurta+Sets' },
    { name: 'Indo-Western', href: '/shop?category=Indo-Western' },
    { name: 'Collections', href: '/collections' },
    { name: 'About Atelier', href: '/about' },
    { name: 'Book Appointment', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#050507] text-[#FAF9F6] text-[10px] sm:text-[11px] tracking-widest-luxury uppercase py-2 px-4 text-center transition-all duration-500 overflow-hidden border-b border-[#1E1E26]">
        <div className="flex items-center justify-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_8px_#FF3B8A]" />
          <span className="transition-opacity duration-500 font-light tracking-widest">
            {announcements[announcementIndex]}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_8px_#FF3B8A]" />
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-header border-b border-[#26262F] py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-[#09090B] border-b border-[#26262F]/60 py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-300 hover:text-[#FF3B8A] transition-colors -ml-2"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Brand Logo on Left */}
            <Link href="/" className="group flex flex-col items-start select-none">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-normal text-white uppercase group-hover:text-[#FF5DA2] transition-colors">
                  LUMÉA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A] group-hover:scale-125 transition-transform" />
              </div>
              <span className="hidden sm:block text-[8px] tracking-[0.28em] uppercase text-zinc-400 font-light -mt-0.5 group-hover:text-zinc-200 transition-colors">
                Haute Couture & Handloom Exhibition
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.includes('?') && pathname.startsWith(link.href.split('?')[0]));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-widest-luxury uppercase font-medium transition-colors hover-underline-luxury py-1 whitespace-nowrap flex items-center gap-1.5 ${
                    link.isCustom
                      ? 'text-[#FF5DA2] font-semibold hover:text-white'
                      : isActive
                      ? 'text-[#FF5DA2] font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.isCustom && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A] animate-pulse" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Dossier Inquiries) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs tracking-wider uppercase text-zinc-300 hover:text-[#FF5DA2] transition-colors p-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden xl:inline-block text-[11px] font-medium">Search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 text-zinc-300 hover:text-[#FF3B8A] transition-colors"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF3B8A] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(255,59,138,0.5)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Dossier Inquiries Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-zinc-300 hover:text-[#FF3B8A] transition-colors flex items-center gap-1.5"
              aria-label={`Inquiry Dossier (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden sm:inline-block text-[11px] tracking-wider uppercase font-medium">
                Inquiries
              </span>
              {cartCount > 0 && (
                <span className="w-4 h-4 bg-[#FF3B8A] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(255,59,138,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#121216] border-r border-[#26262F] p-6 shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#26262F]">
                <span className="font-serif text-xl tracking-[0.2em] uppercase text-white">
                  LUMÉA
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col py-6 gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between text-sm tracking-widest-luxury uppercase font-medium text-neutral-200 hover:text-[#FF5DA2] transition-colors py-1"
                  >
                    <div className="flex items-center gap-2">
                      {link.isCustom && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B8A] shadow-[0_0_6px_#FF3B8A]" />
                      )}
                      <span className={link.isCustom ? 'text-[#FF5DA2]' : ''}>{link.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-[#26262F] space-y-4">
              <div className="text-xs text-neutral-400 space-y-1">
                <p className="font-medium text-white">Atelier Ahmedabad</p>
                <p>Bodakdev, Ahmedabad, India</p>
                <p>hello@lumea.com</p>
                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-4 text-xs tracking-wider uppercase text-neutral-200 pt-2">
                <Link href="/wishlist" className="flex items-center gap-1.5 hover:text-[#FF5DA2]">
                  <Heart className="w-3.5 h-3.5 text-[#FF3B8A]" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
