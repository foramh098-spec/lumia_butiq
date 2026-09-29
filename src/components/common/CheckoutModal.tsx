'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Check, ShieldCheck, Calendar, MessageSquare, ArrowLeft, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from './Button';

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'details' | 'preferences' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+91 98765 43210',
    city: 'Ahmedabad',
    country: 'India',
    consultationType: 'In-Person Boutique Salon (Ahmedabad)',
    preferredDate: '2026-10-05',
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
    specialNotes: 'Interested in bespoke blouse styling and inspecting the Banarasi Katan silk weave in person.',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('preferences');
    } else if (step === 'preferences') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setInquiryNumber(`LUM-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
        setStep('success');
        clearCart();
      }, 900);
    }
  };

  const handleClose = () => {
    setStep('details');
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={handleClose}
      />

      <div className="relative min-h-screen px-4 flex items-center justify-center py-8">
        <div className="relative w-full max-w-3xl bg-[#121216] text-white shadow-2xl border border-[#26262F] overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-[#26262F] flex items-center justify-between bg-[#0E0E12]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl tracking-[0.2em] uppercase text-white">
                LUMÉA
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-xs tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
                Atelier Consultation Request
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close inquiry modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {step === 'success' ? (
            /* Inquiry Confirmed State */
            <div className="p-8 sm:p-12 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-[#18181E] border border-[#FF3B8A]/40 text-[#FF3B8A] rounded-full flex items-center justify-center mx-auto shadow-[0_0_16px_rgba(255,59,138,0.4)]">
                <Sparkles className="w-8 h-8 stroke-[2]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
                  Inquiry Dossier Received
                </span>
                <h3 className="font-serif text-3xl text-white">
                  Thank you, {formData.firstName}.
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Our master couturier and senior stylist will contact you via WhatsApp / email at <strong className="text-white">{formData.phone}</strong> within 24 hours to confirm your private viewing and custom fittings.
                </p>
              </div>

              <div className="bg-[#18181E] p-4 border border-[#26262F] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Inquiry Dossier ID:</span>
                  <strong className="text-[#FF5DA2] font-mono">{inquiryNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Consultation Format:</span>
                  <span className="text-white">{formData.consultationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Preferred Slot:</span>
                  <span className="text-white">{formData.preferredDate} ({formData.preferredTime.split('(')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Location:</span>
                  <span className="text-white">Atelier Bodakdev, Ahmedabad</span>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleClose}
              >
                Return to Exhibition Lookbook
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Form Column */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                
                {/* Steps indicator */}
                <div className="flex items-center gap-4 text-xs font-medium pb-2 border-b border-[#26262F]">
                  <span className={step === 'details' ? 'text-[#FF5DA2] font-semibold' : 'text-neutral-500'}>
                    1. Patron Details
                  </span>
                  <span className="text-neutral-600">→</span>
                  <span className={step === 'preferences' ? 'text-[#FF5DA2] font-semibold' : 'text-neutral-500'}>
                    2. Appointment Preference
                  </span>
                </div>

                <form onSubmit={handleNextStep} className="space-y-4">
                  {step === 'details' ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">WhatsApp / Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button variant="primary" fullWidth type="submit">
                          <span>Continue to Appointment Preferences</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Consultation Format</label>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between p-3 border border-[#FF3B8A] bg-[#18181E] cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="consultationType"
                                value="In-Person Boutique Salon (Ahmedabad)"
                                checked={formData.consultationType.includes('In-Person')}
                                onChange={handleInputChange}
                                className="accent-[#FF3B8A]"
                              />
                              <MapPin className="w-4 h-4 text-[#FF5DA2]" />
                              <span className="text-xs font-medium text-white">Private In-Person Salon (Bodakdev, Ahmedabad)</span>
                            </div>
                          </label>
                          <label className="flex items-center justify-between p-3 border border-[#2D2D38] bg-[#18181E] cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="consultationType"
                                value="Virtual High-Definition Video Styling"
                                checked={formData.consultationType.includes('Virtual')}
                                onChange={handleInputChange}
                                className="accent-[#FF3B8A]"
                              />
                              <MessageSquare className="w-4 h-4 text-[#FF5DA2]" />
                              <span className="text-xs font-medium text-neutral-200">Virtual HD Video Styling (Worldwide)</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Preferred Date</label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Time Window</label>
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                          >
                            <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                            <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                            <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                          Custom Inquiries / Dori & Measurement Notes
                        </label>
                        <textarea
                          name="specialNotes"
                          rows={2}
                          value={formData.specialNotes}
                          onChange={handleInputChange}
                          placeholder="Mention any custom fabric, blouse cut, or styling preferences..."
                          className="w-full bg-[#18181E] border border-[#2D2D38] p-2.5 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                        />
                      </div>

                      <div className="flex gap-2 pt-3">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setStep('details')}
                        >
                          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                          <span>Back</span>
                        </Button>
                        <Button
                          variant="primary"
                          fullWidth
                          type="submit"
                          isLoading={isSubmitting}
                        >
                          <span>Submit Consultation Request</span>
                        </Button>
                      </div>
                    </>
                  )}
                </form>

                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-light pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5DA2]" />
                  <span>Private and confidential bespoke atelier consultation service.</span>
                </div>
              </div>

              {/* Dossier Curations Column */}
              <div className="md:col-span-5 bg-[#18181E] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#26262F]">
                <div className="space-y-4">
                  <h4 className="text-xs tracking-widest-luxury uppercase font-medium text-white">
                    Inquiry Dossier ({items.length} {items.length === 1 ? 'Piece' : 'Pieces'})
                  </h4>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <p className="text-xs text-neutral-400 font-light">
                        General boutique consultation request.
                      </p>
                    ) : (
                      items.map((item) => (
                        <div key={item.id} className="flex gap-3 text-xs">
                          <div className="relative w-12 aspect-[3/4] bg-[#121216] border border-[#26262F] shrink-0 overflow-hidden">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-neutral-400">{item.selectedColor} • {item.selectedSize}</p>
                            {item.customSpecs && (
                              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                <span className="inline-block text-[9px] px-1.5 py-0.5 uppercase tracking-wider bg-[#FF3B8A]/10 text-[#FF5DA2] border border-[#FF3B8A]/30 font-medium">
                                  Bespoke Tailoring
                                </span>
                                {item.customSpecs.monogramInitials && (
                                  <span className="text-[9px] text-neutral-300 bg-[#18181E] px-1 border border-[#2D2D38]">
                                    Monogram: {item.customSpecs.monogramInitials}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-[#121216] border border-[#26262F] text-[11px] text-neutral-400 space-y-1">
                    <p className="font-medium text-white">Exhibition Guarantee</p>
                    <p className="font-light">
                      All handloom sarees and bespoke garments are customized to order following your personal fitting consultation.
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-500 font-light pt-6">
                  Atelier LUMÉA • Bodakdev, Ahmedabad, India
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
