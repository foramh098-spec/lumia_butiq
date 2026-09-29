'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscription Confirmed', 'success', 'Welcome to the LUMÉA atelier circle.');
    setEmail('');
  };

  return (
    <footer className="bg-[#050507] text-[#FAF9F6] border-t border-[#26262F] pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#26262F]">
          
          {/* Column 1: Brand & Atelier Narrative (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl tracking-[0.2em] font-normal uppercase text-white group-hover:text-[#FF5DA2] transition-colors">
                LUMÉA
              </span>
            </Link>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              An independent luxury Indian couture boutique dedicated to slow craftsmanship, heritage handlooms (Banarasi, Chanderi, Maheshwari), pure noble silks, artisanal zardozi embroidery, and bespoke tailoring.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5DA2]" />
                <span>Atelier LUMÉA, Bodakdev, Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#FF5DA2]" />
                <a href="mailto:hello@lumea.com" className="hover:text-[#FF5DA2] transition-colors">
                  hello@lumea.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#FF5DA2]" />
                <a href="tel:+919876543210" className="hover:text-[#FF5DA2] transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Wardrobe (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-[#FF5DA2]">
              Artisanal Weaves
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <Link href="/shop" className="hover:text-[#FF5DA2] transition-colors">
                  All Indian Couture
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sarees" className="hover:text-[#FF5DA2] transition-colors">
                  Banarasi & Chanderi Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Kurta+Sets" className="hover:text-[#FF5DA2] transition-colors">
                  Embroidered Kurta Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Indo-Western" className="hover:text-[#FF5DA2] transition-colors">
                  Modern Indo-Western
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Handloom+%26+Linen" className="hover:text-[#FF5DA2] transition-colors">
                  Handloom Linen & Silks
                </Link>
              </li>
              <li>
                <Link href="/custom-atelier" className="hover:text-[#FF5DA2] text-[#FF5DA2] font-medium transition-colors">
                  Custom Atelier Studio ✨
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care & Boutique (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-[#FF5DA2]">
              Boutique Care
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-[#FF5DA2] transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF5DA2] transition-colors">
                  Boutique Appointments
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-[#FF5DA2] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF5DA2] transition-colors">
                  Sizing Guidance
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#FF5DA2] transition-colors">
                  Conscious Purchasing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF5DA2] transition-colors">
                  Contact Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-[#FF5DA2]">
              Stay in the Know
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              New collections, curated edits and exclusive offers — delivered occasionally.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 bg-[#18181E] border border-[#FF3B8A]/50 text-xs text-[#FF5DA2] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF3B8A]" />
                <span>Thank you. You have been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex border-b border-neutral-700 focus-within:border-[#FF3B8A] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent py-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="text-xs tracking-wider uppercase text-[#FF5DA2] hover:text-white font-medium px-3 flex items-center gap-1 transition-colors"
                  >
                    <span>Join</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500 font-light">
                  By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div>
            © {new Date().getFullYear()} LUMÉA Boutique Atelier. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Ahmedabad, India</span>
            <span>•</span>
            <span>Worldwide Carbon-Neutral Delivery</span>
            <span>•</span>
            <span className="text-[#FF5DA2]">USD ($) / INR (₹)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
