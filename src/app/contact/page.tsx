'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Calendar, Check, ChevronDown } from 'lucide-react';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message Dispatched', 'success', 'Our client concierge will respond within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 900);
  };

  const faqs = [
    {
      q: 'How does sizing run at LUMÉA?',
      a: 'Our garments are tailored strictly according to classic European sizing. If you find yourself between sizes, we recommend consulting our detailed Size Guide or contacting our styling team for personalized fit recommendations.',
    },
    {
      q: 'What is your shipping timeframe and return policy?',
      a: 'We offer complimentary express shipping worldwide on orders over $250. Orders are dispatched within 24 hours. We gladly accept returns of unwashed, unworn items with original tags within 30 days of delivery.',
    },
    {
      q: 'Can I book a private appointment at your Ahmedabad atelier?',
      a: 'Yes, we welcome private styling consultations and bespoke fitting sessions at our Bodakdev boutique. Please submit the contact form selecting "Private Appointment" or phone our atelier directly.',
    },
    {
      q: 'Are your fabrics sustainably and ethically certified?',
      a: 'Yes, 100% of our linen is Normandy European Flax® certified, our silk is OEKO-TEX Standard 100 / GOTS certified Mulberry silk, and all wool is RWS (Responsible Wool Standard) certified.',
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
          Client Concierge & Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed">
          We are here to assist with garment styling, size advice, order inquiries, and private appointments.
        </p>
      </div>

      {/* Main Two-Column Layout: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct Contacts & Boutique Location (5 cols) */}
        <div className="lg:col-span-5 space-y-10">
          
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-white">Atelier LUMÉA</h3>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-400 font-light">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF3B8A] shrink-0 mt-1" />
                <div>
                  <strong className="block text-white font-medium">Boutique Address:</strong>
                  <p>Atelier LUMÉA, Ambli Road, Bodakdev</p>
                  <p>Ahmedabad, Gujarat 380054, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF3B8A] shrink-0 mt-1" />
                <div>
                  <strong className="block text-white font-medium">Email Inquiries:</strong>
                  <a href="mailto:hello@lumea.com" className="hover:text-[#FF3B8A] underline transition-colors">
                    hello@lumea.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF3B8A] shrink-0 mt-1" />
                <div>
                  <strong className="block text-white font-medium">Telephone & WhatsApp:</strong>
                  <a href="tel:+919876543210" className="hover:text-[#FF3B8A] underline transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FF3B8A] shrink-0 mt-1" />
                <div>
                  <strong className="block text-white font-medium">Opening Hours:</strong>
                  <p>Monday – Saturday: 10:00 AM – 8:00 PM IST</p>
                  <p>Sunday: 11:00 AM – 6:00 PM IST</p>
                </div>
              </div>

            </div>
          </div>

          {/* Private Appointment Card */}
          <div className="p-6 bg-[#18181E] border border-[#26262F] space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-4 h-4 text-[#FF3B8A]" />
              <h4 className="text-xs tracking-widest-luxury uppercase font-medium">
                Private Styling Consultations
              </h4>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Experience the entire collection in privacy with our master tailors and stylists. Enjoy dedicated fitting rooms and champagne service.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#121216] p-8 sm:p-12 border border-[#26262F] shadow-xl space-y-6">
          
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
              Send a Message
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              How may we assist you?
            </h3>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-[#18181E] border border-[#FF3B8A] text-center space-y-3 animate-in fade-in">
              <Check className="w-8 h-8 text-[#FF3B8A] mx-auto" />
              <h4 className="font-serif text-xl text-white">Thank you for writing to LUMÉA.</h4>
              <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                Your message has been received by our atelier team. We look forward to connecting with you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-wider text-[#FF3B8A] hover:text-[#FF5DA2] underline font-medium pt-2 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Eleanor Vance"
                    className="w-full bg-[#09090B] border border-[#26262F] px-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="eleanor@example.com"
                    className="w-full bg-[#09090B] border border-[#26262F] px-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-[#FF3B8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#09090B] border border-[#26262F] px-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                    Inquiry Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#09090B] border border-[#26262F] px-4 py-3 text-xs text-white focus:outline-hidden focus:border-[#FF3B8A]"
                  >
                    <option value="General Inquiry" className="bg-[#121216] text-white">General Inquiry</option>
                    <option value="Private Appointment" className="bg-[#121216] text-white">Private Boutique Appointment</option>
                    <option value="Order & Delivery Support" className="bg-[#121216] text-white">Order & Delivery Support</option>
                    <option value="Size & Styling Advice" className="bg-[#121216] text-white">Size & Styling Advice</option>
                    <option value="Press & Wholesale" className="bg-[#121216] text-white">Press & Wholesale</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="How can our concierge assist you today?"
                  className="w-full bg-[#09090B] border border-[#26262F] px-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-[#FF3B8A]"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <section id="faq" className="pt-12 border-t border-[#26262F] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] tracking-widest-luxury uppercase text-[#FF3B8A] font-medium">
            Help & Guidance
          </span>
          <h2 className="font-serif text-3xl text-white">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#26262F] border-y border-[#26262F]">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 flex items-center justify-between text-left group"
              >
                <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-[#FF3B8A] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform group-hover:text-[#FF3B8A] ${
                    openFaq === idx ? 'rotate-180 text-[#FF3B8A]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-5 text-xs text-zinc-400 font-light leading-relaxed animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
