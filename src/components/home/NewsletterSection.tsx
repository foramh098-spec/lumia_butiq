'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Subscribed to Newsletter', 'success', 'You have been registered for private boutique updates.');
    setEmail('');
  };

  return (
    <section className="py-24 sm:py-32 bg-[#121216] border-t border-[#26262F] text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 space-y-6">
        
        <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF5DA2] font-semibold">
          The Private Client Register
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
          Stay in the know.
        </h2>

        <p className="text-xs sm:text-base text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
          New collections, curated edits and exclusive offers — delivered occasionally.
        </p>

        {isSubmitted ? (
          <div className="p-4 bg-[#18181E] border border-[#FF3B8A]/50 max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-white animate-in fade-in">
            <Check className="w-4 h-4 text-[#FF3B8A]" />
            <span>Thank you for subscribing to LUMÉA.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 pt-2">
            <div className="flex bg-[#18181E] border border-[#2D2D38] p-1 focus-within:ring-1 focus-within:ring-[#FF3B8A] transition-all">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 text-xs text-white placeholder:text-neutral-500 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FF3B8A] text-white text-xs tracking-widest uppercase font-semibold px-6 hover:bg-[#FF1A75] transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,59,138,0.3)]"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 font-light">
              By subscribing, you agree to receive editorial newsletters from LUMÉA. Unsubscribe anytime.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
