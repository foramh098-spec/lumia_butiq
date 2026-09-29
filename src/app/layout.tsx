import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/layout/Providers';
import AppShell from '@/components/layout/AppShell';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMÉA | Timeless pieces. Modern expression.',
  description:
    'LUMÉA is an independent luxury fashion boutique curated for effortless, everyday elegance. Discover timeless silhouettes crafted from pure European flax linen, noble Mulberry silks, and bespoke virgin wool.',
  keywords: [
    'luxury fashion boutique',
    'LUMÉA',
    'linen dress',
    'tailored blazer',
    'silk evening wear',
    'minimalist luxury',
    'Ahmedabad boutique',
    'sustainable luxury fashion',
  ],
  authors: [{ name: 'LUMÉA Boutique Atelier' }],
  openGraph: {
    title: 'LUMÉA | Timeless pieces. Modern expression.',
    description: 'Curated fashion for effortless, everyday elegance. Designed for the way you live.',
    url: 'https://lumea.com',
    siteName: 'LUMÉA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 900,
        alt: 'LUMÉA Luxury Fashion Editorial',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#09090B] text-[#FAF9F6] selection:bg-[#FF3B8A] selection:text-white">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
