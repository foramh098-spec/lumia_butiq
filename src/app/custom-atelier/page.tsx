'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Scissors,
  Check,
  Ruler,
  ShieldCheck,
  Clock,
  ArrowRight,
  Palette,
  Edit3,
  Layers,
  Sparkle
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CustomGarmentSpecs } from '@/types';
import Button from '@/components/common/Button';

interface GarmentOption {
  id: string;
  name: string;
  basePrice: number;
  category: string;
  description: string;
  image: string;
  defaultFabric: string;
  availableNecklines: string[];
  availableSleeves: string[];
  availableBottoms: string[];
}

interface FabricOption {
  id: string;
  name: string;
  origin: string;
  weight: string;
  priceModifier: number;
  description: string;
}

const GARMENTS: GarmentOption[] = [
  {
    id: 'saree-blouse',
    name: 'Bespoke Handloom Saree & Custom Blouse',
    basePrice: 480,
    category: 'Sarees',
    description: 'Handwoven pure silk saree with unstitched piece tailored into a designer couture blouse.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Pure Handloom Katan Silk (Varanasi)',
    availableNecklines: ['Sweetheart Royal Cut', 'Deep Back with Dori Tassels', 'High Neck Sabyasachi Cut', 'Square Neck with Zari Border', 'Boat Neckline'],
    availableSleeves: ['Elbow-Length with Zardozi Border', 'Sleeveless with Micro-Straps', 'Full Length Silk Sleeves', 'Cap Sleeves'],
    availableBottoms: ['Classic Fall & Pico (Included)', 'Pre-Stitched 1-Minute Pleats (+$25)', 'Custom Satin Inskirt Included'],
  },
  {
    id: 'chanderi-kurta',
    name: 'Custom Chanderi Tissue Suit & Sharara',
    basePrice: 380,
    category: 'Kurta Sets',
    description: 'Sheer golden Chanderi tissue kurta with matching bottom and scalloped organza dupatta.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Handwoven Chanderi Tissue Silk',
    availableNecklines: ['Embroidered Keyhole Yoke', 'Jewel Neck with Micro-Pearls', 'V-Plunge with Resham Work', 'Angrakha Wrap Over'],
    availableSleeves: ['Sheer Organza 3/4 Sleeves', 'Full Straight Sleeve with Cuff', 'Fluted Tiered Sleeves'],
    availableBottoms: ['Cascading Flared Sharara', 'Straight Cigarette Trousers', 'Flared Palazzo Pants', 'Cowl Draped Dhoti'],
  },
  {
    id: 'indowestern-blazer',
    name: 'Indo-Western Bandhgala & Dhoti Ensemble',
    basePrice: 440,
    category: 'Indo-Western',
    description: 'Structured raw silk tailored jacket with Mandarin collar over fluid modern draped trousers.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Bhagalpur Wild Raw Silk',
    availableNecklines: ['Mandarin Bandhgala Collar', 'Architectural Peak Lapel', 'Asymmetric Angrakha Flap'],
    availableSleeves: ['Tailored Cuff with Brass Buttons', 'Clean Seamless Slit', 'French Turnback Cuff'],
    availableBottoms: ['Pleated Cowl Dhoti', 'Tiered Georgette Sharara', 'High-Waist Wide-Leg Trouser'],
  },
  {
    id: 'zardozi-anarkali',
    name: 'Hand-Embroidered Zardozi Anarkali Gown',
    basePrice: 650,
    category: 'Lehengas & Anarkalis',
    description: '32-kali expansive floor-length silhouette with 80+ hours of hand-done Zardozi and dabka wirework.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Heavyweight Pure Mulberry Silk',
    availableNecklines: ['Sweetheart Neck with Padded Bustier', 'Deep V-Neck with Antique Wire Border', 'High Victorian Net Collar'],
    availableSleeves: ['Fitted Full Churidar Sleeves', 'Elbow-Length with Kalis', 'Sleeveless with Draped Dupatta'],
    availableBottoms: ['32-Kali Floor Maxi Flare', 'Floor-Skimming with Can-Can (+$40)', 'Front Slit Anarkali with Skirt'],
  },
  {
    id: 'handloom-linen',
    name: 'Artisanal Bengal Linen Tunic & Culotte Set',
    basePrice: 260,
    category: 'Handloom & Linen',
    description: 'Pure 80s count organic handspun linen featuring subtle handwoven Jamdani floral motifs.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Pure Handspun Bengal Linen (80s Count)',
    availableNecklines: ['Grandad Mandarin Collar', 'Notched V-Neck', 'Minimalist Scoop Neck'],
    availableSleeves: ['Roll-Up Button Tab Sleeve', 'Cropped Kimono Sleeve', 'Full Length with Slit'],
    availableBottoms: ['Cropped Wide-Leg Culottes', 'Straight Ankle Pants with Pockets', 'Relaxed Lounge Trousers'],
  },
  {
    id: 'bridal-lehenga',
    name: 'Bespoke Zardozi Bridal Lehenga Ensemble',
    basePrice: 890,
    category: 'Lehengas & Anarkalis',
    description: '16-kali raw silk bridal lehenga skirt with hand-embroidered peacocks, custom padded blouse & tulle dupatta.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    defaultFabric: 'Heavyweight Pure Mulberry Silk',
    availableNecklines: ['Bridal Sweetheart with Dori Tie-Back', 'Scoop Backless with Latkan Tassels', 'V-Neck with Gotta Patti'],
    availableSleeves: ['Elbow-Length Heavy Zardozi', 'Full Illusion Net Sleeves', 'Cap Sleeves with Fringe'],
    availableBottoms: ['16-Kali Double Can-Can Flare', 'Panelled Volume Flare', 'Pleated Satin Base'],
  },
];

const FABRICS: FabricOption[] = [
  {
    id: 'katan-silk',
    name: 'Pure Handloom Katan Silk (Varanasi)',
    origin: 'Varanasi, Uttar Pradesh',
    weight: 'Certified Pure Silk • Lustrous royal drape',
    priceModifier: 70,
    description: 'Spun from grade-A Mulberry silk on traditional handlooms with natural sheen and enduring structure.',
  },
  {
    id: 'chanderi-tissue',
    name: 'Handwoven Chanderi Tissue Silk',
    origin: 'Chanderi, Madhya Pradesh',
    weight: 'Silk & Metallic Zari Weft • Translucent glow',
    priceModifier: 50,
    description: 'Weightless handloom tissue combining fine silk with gold warp for an ethereal, royal evening sheen.',
  },
  {
    id: 'bengal-linen',
    name: 'Pure Handspun Bengal Linen (80s Count)',
    origin: 'Phulia, West Bengal',
    weight: '80s Count Organic Linen • Breathable crisp drape',
    priceModifier: 0,
    description: 'Spun from high-grade natural flax on wooden looms, softened with eco-friendly natural bio-washing.',
  },
  {
    id: 'tussar-silk',
    name: 'Bhagalpur Wild Raw Tussar Silk',
    origin: 'Bhagalpur, Bihar',
    weight: 'Rich Textured Raw Silk • Earthy golden lustre',
    priceModifier: 40,
    description: 'Harvested wild silk with natural textured slubs, exceptionally rich handfeel and thermo-regulating comfort.',
  },
  {
    id: 'mulberry-silk',
    name: 'Heavyweight Pure Mulberry Silk',
    origin: 'Kashmir & Como Guilds',
    weight: '24 Momme Heavy Satin • Fluid cascades',
    priceModifier: 60,
    description: 'Ultra-luxurious heavyweight silk base engineered specifically to support heavy zardozi handwork.',
  },
];

const PALETTES = [
  { name: 'Royal Rani Pink', hex: '#FF3B8A', class: 'bg-[#FF3B8A]' },
  { name: 'Rose Gold Gilt', hex: '#FF5DA2', class: 'bg-[#FF5DA2]' },
  { name: 'Midnight Obsidian', hex: '#161616', class: 'bg-[#161616]' },
  { name: 'Champagne Tissue Gold', hex: '#D8CEBA', class: 'bg-[#D8CEBA]' },
  { name: 'Lotus Magenta', hex: '#E0115F', class: 'bg-[#E0115F]' },
  { name: 'Kora Ecru', hex: '#E6E0D2', class: 'bg-[#E6E0D2]' },
  { name: 'Natural Tussar', hex: '#C69C6D', class: 'bg-[#C69C6D]' },
  { name: 'Royal Emerald', hex: '#1C3B2B', class: 'bg-[#1C3B2B]' },
];

const CRAFTS = [
  { name: 'Antique Gold Zardozi & Dabka', price: 45, desc: 'Master artisans hand-stitch metallic bullion wire, dabka, and pearls (80+ hours)' },
  { name: 'Delicate Gota Patti & Resham', price: 30, desc: 'Geometric ribbon appliqué with vibrant floral silk thread accents' },
  { name: 'Awadhi Mukaish & Chikankari Dots', price: 35, desc: 'Fine hand-twisted silver wires embedded into delicate shadow needlework' },
  { name: 'Minimalist Real Zari Handloom Border', price: 0, desc: 'Woven directly on loom with electroplated gold zari thread' },
];

export default function CustomAtelierPage() {
  const { addCustomGarment } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedGarment, setSelectedGarment] = useState<GarmentOption>(GARMENTS[0]);
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(FABRICS[0]);
  const [selectedColor, setSelectedColor] = useState(PALETTES[0]);

  const [selectedNeckline, setSelectedNeckline] = useState(GARMENTS[0].availableNecklines[0]);
  const [selectedSleeve, setSelectedSleeve] = useState(GARMENTS[0].availableSleeves[0]);
  const [selectedBottom, setSelectedBottom] = useState(GARMENTS[0].availableBottoms[0]);
  const [selectedCraft, setSelectedCraft] = useState(CRAFTS[0]);

  // Monogramming & Fall/Pico
  const [hasMonogram, setHasMonogram] = useState(false);
  const [monogramText, setMonogramText] = useState('');
  const [monogramColor, setMonogramColor] = useState('Antique Gold Zari');
  const [monogramPlacement, setMonogramPlacement] = useState('Saree Pallu Corner / Blouse Back');
  const [sareeFallPico, setSareeFallPico] = useState(true);

  // Measurements
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
    blouseLength: '',
    kurtaLength: '',
    fitPreference: 'Tailored' as 'Tailored' | 'Relaxed' | 'Oversized',
    notes: '',
  });

  // Calculate live price
  const totalPrice = useMemo(() => {
    let price = selectedGarment.basePrice + selectedFabric.priceModifier + selectedCraft.price;
    if (hasMonogram && monogramText.trim()) price += 20;
    if (selectedBottom.includes('(+$25)')) price += 25;
    if (selectedBottom.includes('(+$40)')) price += 40;
    return price;
  }, [selectedGarment, selectedFabric, selectedCraft, hasMonogram, monogramText, selectedBottom]);

  const handleGarmentChange = (g: GarmentOption) => {
    setSelectedGarment(g);
    setSelectedNeckline(g.availableNecklines[0]);
    setSelectedSleeve(g.availableSleeves[0]);
    setSelectedBottom(g.availableBottoms[0]);
  };

  const handleAddToBag = () => {
    const specs: CustomGarmentSpecs = {
      isCustom: true,
      garmentType: selectedGarment.name,
      fabric: selectedFabric.name,
      fabricOrigin: selectedFabric.origin,
      craftStyle: selectedCraft.name,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      blouseNeckline: selectedNeckline,
      blouseSleeve: selectedSleeve,
      bottomType: selectedBottom.includes('Sharara')
        ? 'Sharara Pants'
        : selectedBottom.includes('Dhoti')
        ? 'Dhoti Drape'
        : selectedBottom.includes('Palazzo')
        ? 'Palazzo'
        : 'Straight Trouser',
      monogramInitials: hasMonogram ? monogramText.toUpperCase().trim() : undefined,
      monogramColor: hasMonogram ? monogramColor : undefined,
      monogramPlacement: hasMonogram ? monogramPlacement : undefined,
      bust: measurements.bust ? `${measurements.bust} ${unit}` : undefined,
      waist: measurements.waist ? `${measurements.waist} ${unit}` : undefined,
      hips: measurements.hips ? `${measurements.hips} ${unit}` : undefined,
      height: measurements.height ? `${measurements.height} ${unit}` : undefined,
      fitPreference: measurements.fitPreference,
      sareeFallPico: sareeFallPico,
      tailorNotes: measurements.notes,
    };

    addCustomGarment(specs, totalPrice, selectedGarment.image);
  };

  const steps = [
    { num: 1, name: 'Silhouettes' },
    { num: 2, name: 'Noble Textiles' },
    { num: 3, name: 'Dye & Zari' },
    { num: 4, name: 'Craft & Blouse Cut' },
    { num: 5, name: 'Client Measurements' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Atelier Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#FF3B8A]/40 bg-[#121216] text-[10px] sm:text-[11px] tracking-widest-luxury uppercase font-medium text-white shadow-[0_0_12px_rgba(255,59,138,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF3B8A]" />
          <span>LUMÉA Bespoke Indian Couture Atelier</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.08]">
          Custom Couture & Handloom Studio
        </h1>
        <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
          Design your bespoke saree blouse, custom tailored Chanderi suit, or Indo-Western fusion coordinate. Crafted to your exact dimensions by our master karigars.
        </p>
      </div>

      {/* Step Indicator Tabs */}
      <div className="flex items-center justify-between border-b border-[#26262F] overflow-x-auto pb-4 gap-4 no-scrollbar">
        {steps.map((step) => {
          const isDone = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num as 1 | 2 | 3 | 4 | 5)}
              className={`flex items-center gap-2.5 pb-2 text-xs tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'text-[#FF3B8A] font-semibold border-b-2 border-[#FF3B8A] -mb-[18px]'
                  : isDone
                  ? 'text-zinc-300 hover:text-white'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                  isCurrent
                    ? 'bg-[#FF3B8A] text-white shadow-[0_0_8px_#FF3B8A]'
                    : isDone
                    ? 'bg-[#FF3B8A]/20 text-[#FF5DA2]'
                    : 'bg-[#18181E] text-zinc-600 border border-[#26262F]'
                }`}
              >
                {isDone ? '✓' : step.num}
              </span>
              <span>{step.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Atelier Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Interactive Customizer (7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-[#121216] border border-[#26262F] p-6 sm:p-10 shadow-2xl">
          
          {/* STEP 1: SILHOUETTES */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                  Step 1 of 5
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">Select Base Couture Silhouette</h2>
                <p className="text-xs text-zinc-400 font-light">
                  Choose the ensemble architecture to be custom tailored to your measurements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GARMENTS.map((g) => {
                  const isSelected = selectedGarment.id === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => handleGarmentChange(g)}
                      className={`relative p-4 border transition-all cursor-pointer rounded-xs space-y-3 ${
                        isSelected
                          ? 'bg-[#18181E] border-[#FF3B8A] shadow-[0_0_15px_rgba(255,59,138,0.25)]'
                          : 'bg-[#09090B] border-[#26262F] hover:border-zinc-500'
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                        <Image
                          src={g.image}
                          alt={g.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FF3B8A] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base text-white font-medium">{g.name}</h3>
                          <span className="text-xs font-semibold text-[#FF5DA2]">${g.basePrice}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-light mt-1 line-clamp-2">
                          {g.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" onClick={() => setCurrentStep(2)}>
                  <span>Continue to Textile Selection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: NOBLE TEXTILES */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                  Step 2 of 5
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">Choose Handloom & Silk Textile</h2>
                <p className="text-xs text-zinc-400 font-light">
                  Sourced directly from certified master weaver clusters in Varanasi, Chanderi, Bengal & Bhagalpur.
                </p>
              </div>

              <div className="space-y-3.5">
                {FABRICS.map((f) => {
                  const isSelected = selectedFabric.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFabric(f)}
                      className={`p-4 sm:p-5 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#18181E] border-[#FF3B8A] shadow-[0_0_15px_rgba(255,59,138,0.2)]'
                          : 'bg-[#09090B] border-[#26262F] hover:border-zinc-500'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-base text-white font-medium">{f.name}</h3>
                          {f.priceModifier > 0 && (
                            <span className="text-[10px] bg-[#FF3B8A]/20 text-[#FF5DA2] px-2 py-0.5 font-bold uppercase tracking-wider">
                              +${f.priceModifier}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 font-light">{f.description}</p>
                        <div className="flex items-center gap-4 text-[10px] text-zinc-500 pt-1">
                          <span>📍 {f.origin}</span>
                          <span>⚖️ {f.weight}</span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center justify-end">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-[#FF3B8A] border-[#FF3B8A] text-white'
                              : 'border-[#26262F] text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to Silhouettes
                </button>
                <Button variant="primary" onClick={() => setCurrentStep(3)}>
                  <span>Continue to Dye & Zari</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: COLOR & ZARI PALETTE */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                  Step 3 of 5
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">Select Dye Palette & Zari Glow</h2>
                <p className="text-xs text-zinc-400 font-light">
                  Hand-dipped artisanal dyes and pure metallic electroplated gold/silver zari threads.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PALETTES.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col items-center text-center space-y-3 ${
                        isSelected
                          ? 'bg-[#18181E] border-[#FF3B8A] shadow-[0_0_15px_rgba(255,59,138,0.25)]'
                          : 'bg-[#09090B] border-[#26262F] hover:border-zinc-500'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          isSelected
                            ? 'ring-4 ring-[#FF3B8A] ring-offset-2 ring-offset-[#121216] scale-110'
                            : 'border-zinc-700'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className="text-xs font-medium text-white">{color.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{color.hex}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to Textiles
                </button>
                <Button variant="primary" onClick={() => setCurrentStep(4)}>
                  <span>Continue to Craft & Cut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: CRAFT, BLOUSE CUT & MONOGRAM */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                  Step 4 of 5
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">Refine Blouse Cut, Craft & Monogram</h2>
                <p className="text-xs text-zinc-400 font-light">
                  Tailor necklines, sleeve flares, zardozi needlework, and add custom metallic zari initials.
                </p>
              </div>

              {/* Neckline / Blouse Style */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Blouse Neckline & Cut Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedGarment.availableNecklines.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSelectedNeckline(n)}
                      className={`p-3 text-xs border text-left transition-all ${
                        selectedNeckline === n
                          ? 'bg-[#FF3B8A]/15 border-[#FF3B8A] text-white font-medium'
                          : 'bg-[#09090B] border-[#26262F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleeve Style */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Sleeve Style & Embroidery Finish
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedGarment.availableSleeves.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSleeve(s)}
                      className={`p-3 text-xs border text-left transition-all ${
                        selectedSleeve === s
                          ? 'bg-[#FF3B8A]/15 border-[#FF3B8A] text-white font-medium'
                          : 'bg-[#09090B] border-[#26262F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom / Saree Drape */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Bottom Silhouette / Saree Edging
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedGarment.availableBottoms.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBottom(b)}
                      className={`p-3 text-xs border text-left transition-all ${
                        selectedBottom === b
                          ? 'bg-[#FF3B8A]/15 border-[#FF3B8A] text-white font-medium'
                          : 'bg-[#09090B] border-[#26262F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hand Embroidery Craft */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Artisanal Handcraft & Embellishment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CRAFTS.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => setSelectedCraft(c)}
                      className={`p-3.5 border transition-all cursor-pointer ${
                        selectedCraft.name === c.name
                          ? 'bg-[#FF3B8A]/15 border-[#FF3B8A] text-white'
                          : 'bg-[#09090B] border-[#26262F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span>{c.name}</span>
                        {c.price > 0 && <span className="text-[#FF5DA2]">+${c.price}</span>}
                      </div>
                      <p className="text-[10px] text-zinc-500 font-light mt-1">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monogram Section */}
              <div className="pt-4 border-t border-[#26262F] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#FF3B8A]" />
                    <span className="text-xs tracking-wider uppercase font-medium text-white">
                      Bespoke Hand-Embroidered Zari Monogram (+$20)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasMonogram}
                      onChange={(e) => setHasMonogram(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#26262F] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF3B8A]" />
                  </label>
                </div>

                {hasMonogram && (
                  <div className="p-4 bg-[#18181E] border border-[#FF3B8A]/40 space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                          Initials (Max 4 letters)
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          value={monogramText}
                          onChange={(e) => setMonogramText(e.target.value)}
                          placeholder="S.R."
                          className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white uppercase font-serif tracking-widest focus:border-[#FF3B8A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                          Zari Thread Tone
                        </label>
                        <select
                          value={monogramColor}
                          onChange={(e) => setMonogramColor(e.target.value)}
                          className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                        >
                          <option value="Antique Gold Zari">Antique Gold Zari</option>
                          <option value="Royal Rani Pink Resham">Royal Rani Pink Resham</option>
                          <option value="Silver Mukaish Wire">Silver Mukaish Wire</option>
                          <option value="Champagne Gilt">Champagne Gilt</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                          Placement
                        </label>
                        <select
                          value={monogramPlacement}
                          onChange={(e) => setMonogramPlacement(e.target.value)}
                          className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                        >
                          <option value="Saree Pallu Corner">Saree Pallu Corner</option>
                          <option value="Blouse Inner Lapel">Blouse Inner Lapel</option>
                          <option value="Kurta Cuff / Hem">Kurta Cuff / Hem</option>
                          <option value="Inner Keepsake Label">Inner Keepsake Label</option>
                        </select>
                      </div>
                    </div>

                    {monogramText && (
                      <div className="flex items-center gap-3 pt-2 text-xs text-zinc-300">
                        <span>Zari Embroidery Preview:</span>
                        <span className="font-serif tracking-[0.3em] font-semibold text-[#FF5DA2] border border-[#FF3B8A]/40 px-3 py-1 bg-black">
                          {monogramText.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to Dye & Zari
                </button>
                <Button variant="primary" onClick={() => setCurrentStep(5)}>
                  <span>Continue to Measurements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: MEASUREMENTS */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-medium">
                    Step 5 of 5
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">Client Body Measurements</h2>
                  <p className="text-xs text-zinc-400 font-light">
                    Enter your dimensions for an exact, master-tailored fit by our boutique karigars.
                  </p>
                </div>

                {/* Unit toggle */}
                <div className="flex items-center border border-[#26262F] p-0.5 bg-[#09090B] shrink-0">
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 text-xs uppercase font-medium transition-colors ${
                      unit === 'in' ? 'bg-[#FF3B8A] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 text-xs uppercase font-medium transition-colors ${
                      unit === 'cm' ? 'bg-[#FF3B8A] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Bust / Chest ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.bust}
                    onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                    placeholder={unit === 'in' ? '34' : '86'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Natural Waist ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                    placeholder={unit === 'in' ? '28' : '71'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Full Hips ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.hips}
                    onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                    placeholder={unit === 'in' ? '38' : '96'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Total Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.height}
                    onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                    placeholder={unit === 'in' ? '66' : '168'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Blouse Length ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.blouseLength}
                    onChange={(e) => setMeasurements({ ...measurements, blouseLength: e.target.value })}
                    placeholder={unit === 'in' ? '14.5' : '37'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                    Kurta / Dress Length ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.kurtaLength}
                    onChange={(e) => setMeasurements({ ...measurements, kurtaLength: e.target.value })}
                    placeholder={unit === 'in' ? '46' : '117'}
                    className="w-full bg-[#09090B] border border-[#26262F] px-3 py-2 text-xs text-white focus:border-[#FF3B8A]"
                  />
                </div>
              </div>

              {/* Fit Preference */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Fit Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Tailored', 'Relaxed', 'Oversized'] as const).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setMeasurements({ ...measurements, fitPreference: pref })}
                      className={`p-3 text-xs border transition-all ${
                        measurements.fitPreference === pref
                          ? 'bg-[#FF3B8A]/15 border-[#FF3B8A] text-white font-semibold'
                          : 'bg-[#09090B] border-[#26262F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Tailor Notes */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 tracking-wider">
                  Special Karigar Instructions / Dori Preference
                </label>
                <textarea
                  rows={3}
                  value={measurements.notes}
                  onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                  placeholder="e.g. Please add extra 2-inch inner seam margins for future alterations, attach handmade latkan tassels to blouse dori."
                  className="w-full bg-[#09090B] border border-[#26262F] p-3 text-xs text-white focus:border-[#FF3B8A]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to Craft & Details
                </button>
                <Button variant="primary" size="lg" onClick={handleAddToBag}>
                  <span>Add Bespoke Creation to Inquiry Dossier</span>
                  <Sparkles className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Right Live Atelier Preview & Summary (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-[#121216] border border-[#26262F] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#26262F] pb-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#FF3B8A] font-semibold">
                  Live Atelier Preview
                </span>
                <h3 className="font-serif text-xl text-white mt-0.5">{selectedGarment.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block uppercase">Bespoke Estimate</span>
                <span className="font-serif text-2xl text-[#FF5DA2] font-semibold">${totalPrice}</span>
              </div>
            </div>

            {/* Garment Visual */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black border border-[#26262F]">
              <Image
                src={selectedGarment.image}
                alt={selectedGarment.name}
                fill
                className="object-cover"
              />
              {/* Color swatch pill */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 border border-white/20">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-[10px] uppercase font-medium text-white tracking-wider">
                  {selectedColor.name}
                </span>
              </div>

              {hasMonogram && monogramText && (
                <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-md px-3 py-1 border border-[#FF3B8A]/40 text-[#FF5DA2] font-serif text-xs tracking-widest">
                  Monogram: {monogramText.toUpperCase()}
                </div>
              )}
            </div>

            {/* Selected Specs Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-[#26262F] pt-4">
              <div className="flex justify-between">
                <span className="text-zinc-400">Noble Textile:</span>
                <span className="text-white text-right max-w-[200px] truncate">{selectedFabric.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Handcraft:</span>
                <span className="text-white text-right">{selectedCraft.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Blouse / Neckline:</span>
                <span className="text-white text-right">{selectedNeckline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Sleeve Finish:</span>
                <span className="text-white text-right">{selectedSleeve}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Bottom / Drape:</span>
                <span className="text-white text-right">{selectedBottom}</span>
              </div>
              {hasMonogram && monogramText && (
                <div className="flex justify-between text-[#FF5DA2]">
                  <span>Zari Monogram:</span>
                  <span>{monogramText.toUpperCase()} ({monogramPlacement})</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleAddToBag}
            >
              <span>Add Creation to Inquiry Dossier</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="space-y-2 pt-2 text-[11px] text-zinc-400 font-light border-t border-[#26262F]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF3B8A]" />
                <span>Crafted & customized to order in 14-21 days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B8A]" />
                <span>Complimentary lifelong alterations & fitting support</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
