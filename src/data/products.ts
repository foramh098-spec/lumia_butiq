import { Product, CollectionItem } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-01',
    slug: 'banarasi-katan-silk-saree',
    name: 'Banarasi Katan Silk Saree',
    tagline: 'Handwoven in Varanasi with antique gold zari jaal on pure Mulberry silk.',
    price: 520,
    category: 'Sarees',
    collection: 'Varanasi Heritage',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An heirloom Banarasi masterpiece handwoven on traditional pit looms in Varanasi. Features intricate Kadwa floral motifs in electroplated antique gold zari over lustrous pure Katan silk. Comes with matching unstitched blouse fabric and complimentary bespoke tailoring option.',
    details: [
      'Pure Katan Mulberry Silk with certified Silk Mark',
      'Intricate Kadwa hand-weaving technique (takes 28 days to loom)',
      'Rich pallu with intricate floral meenakari border',
      'Includes 1 meter unstitched matching pure silk blouse piece',
      'Complimentary fall, edging (pico), and tassels finished by hand'
    ],
    materials: '100% Pure Katan Silk. Tested 24K Electroplated Gold & Silver Zari.',
    care: 'Dry clean only by luxury silk specialists. Store wrapped in pure unbleached muslin cloth with neem leaves.',
    origin: 'Master Weaver Guild, Varanasi, Uttar Pradesh',
    craft: 'Handloom Kadwa Weave & Real Zari',
    colors: [
      { name: 'Royal Rani Pink', hex: '#FF3B8A', inStock: true },
      { name: 'Midnight Obsidian', hex: '#161616', inStock: true },
      { name: 'Vedic Crimson', hex: '#9E1B32', inStock: true },
    ],
    sizes: [
      { size: 'One Size', inStock: true },
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 38,
    sku: 'LUM-SAR-001',
    reviews: [
      {
        id: 'rev-01',
        author: 'Gayatri Singhania',
        location: 'Mumbai, India',
        date: 'September 12, 2026',
        rating: 5,
        verified: true,
        title: 'An authentic heirloom piece',
        comment: 'The drape and weight of the Katan silk are regal. The gold zari does not scratch at all and has that rare subtle vintage glow rather than synthetic shine. Truly museum quality.',
        fit: 'True to size',
        sizePurchased: 'One Size',
        colorPurchased: 'Royal Rani Pink'
      },
      {
        id: 'rev-02',
        author: 'Ananya Roy',
        location: 'New Delhi, India',
        date: 'August 28, 2026',
        rating: 5,
        verified: true,
        title: 'Masterful craftsmanship',
        comment: 'Wore this for my sister’s sangeet in Jaipur. The fall and pico were immaculately done by the LUMÉA atelier. Highly recommend getting the bespoke blouse stitched as well.',
        fit: 'True to size',
        sizePurchased: 'One Size',
        colorPurchased: 'Midnight Obsidian'
      }
    ]
  },
  {
    id: 'prod-02',
    slug: 'chanderi-tissue-kurta-set',
    name: 'Chanderi Tissue Kurta Set',
    tagline: 'Sheer metallic Chanderi tissue silk with hand-embroidered Zardozi yoke.',
    price: 360,
    originalPrice: 410,
    category: 'Kurta Sets',
    collection: 'Chanderi & Royal Tissue',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Sculpted in ethereal handwoven Chanderi tissue with gold warp and silk weft. Accented with handcrafted zardozi, dabka, and pearl embroidery around a jewel neckline. Paired with tailored modal silk trousers and a scalloped organza dupatta.',
    details: [
      '3-Piece Set: Kurta, Tailored Pants & Organza Dupatta',
      'Hand-embroidered Zardozi and micro-pearl neckline',
      'Full breathable mulmul cotton slip lining included',
      'Pants feature elasticated back waistband with clean front waistband',
      'Model is 5’9” (175cm) and wears a size S'
    ],
    materials: 'Kurta: Handwoven Chanderi Tissue Silk. Pants: Modal Silk. Dupatta: Silk Organza.',
    care: 'Dry clean only. Low heat steam iron on reverse.',
    origin: 'Weaving Clusters in Chanderi, Madhya Pradesh',
    craft: 'Chanderi Handloom & Zardozi Needlework',
    colors: [
      { name: 'Rose Gold Gilt', hex: '#FF5DA2', inStock: true },
      { name: 'Champagne Tissue', hex: '#D8CEBA', inStock: true },
      { name: 'Noir Gold', hex: '#1C1B1A', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true, stockLeft: 2 },
    ],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 42,
    sku: 'LUM-KS-002',
    reviews: [
      {
        id: 'rev-03',
        author: 'Meera Kapoor',
        location: 'Bengaluru, India',
        date: 'September 18, 2026',
        rating: 5,
        verified: true,
        title: 'Pure luminescence',
        comment: 'The Chanderi tissue has a dreamy sheen in evening lights. It is lightweight yet holds its royal drape impeccably.',
        fit: 'True to size',
        sizePurchased: 'S',
        colorPurchased: 'Rose Gold Gilt'
      }
    ]
  },
  {
    id: 'prod-03',
    slug: 'indo-western-bandhgala-blazer-sharara',
    name: 'Nehru Collar Blazer & Sharara',
    tagline: 'Architectural raw silk tailored blazer over cascading tiered sharara.',
    price: 440,
    category: 'Indo-Western',
    collection: 'Modern Indo-Western',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A striking synthesis of classic Indian royalty and sharp modern tailoring. Features a tailored pure raw silk jacket with Mandarin collar and antiqued brass buttons, styled over a fluid multi-tiered georgette sharara trouser.',
    details: [
      '2-Piece Ensemble: Tailored Bandhgala Jacket & Flared Sharara Pants',
      'Structured shoulders with hand-carved heritage buttons',
      'Concealed side zipper on sharara with comfortable lining',
      'Interior pocket for luxury essentials',
      'Model is 5’10” (178cm) and wears a size S'
    ],
    materials: 'Blazer: 100% Bhagalpur Raw Silk. Sharara: Pure Viscose Georgette. Lining: 100% Silk Habotai.',
    care: 'Specialist dry clean only.',
    origin: 'Couture Atelier, Jaipur, Rajasthan',
    craft: 'Bespoke Tailoring & Hand-Cast Brass Hardware',
    colors: [
      { name: 'Onyx Black', hex: '#111111', inStock: true },
      { name: 'Haute Magenta', hex: '#FF3B8A', inStock: true },
      { name: 'Sand Khaki', hex: '#C2B8A3', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 29,
    sku: 'LUM-IW-003',
    reviews: []
  },
  {
    id: 'prod-04',
    slug: 'zardozi-silk-anarkali-gown',
    name: 'Zardozi Silk Anarkali Gown',
    tagline: 'Floor-length flared silhouette with 80+ hours of hand-embroidery.',
    price: 680,
    originalPrice: 750,
    category: 'Lehengas & Anarkalis',
    collection: 'Varanasi Heritage',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An opulent 32-kali floor-length Anarkali crafted from heavyweight Mulberry silk. Hand-embroidered along the hemlines and bodice with antique French wire zardozi, sequins, and nakshi needlework. Paired with a featherlight silk chiffon dupatta.',
    details: [
      '32 Kalis creating an expansive 6-meter flare',
      'Elaborate hand-zardozi hem border with gold bullion cord',
      'Padded bustier with sweetheart neckline and dori back closure',
      'Includes matching churidar and scalloped chiffon dupatta',
      'Model is 5’10” (178cm) and wears a size S'
    ],
    materials: '100% Pure Mulberry Silk. Dupatta: 100% Silk Chiffon. Hand-embroidery: Metallic Zardozi Wire.',
    care: 'Specialist dry clean only. Store in provided breathable muslin garment bag.',
    origin: 'Couture Handcraft Karigars, Lucknow & Varanasi',
    craft: 'Zardozi, Dabka & Nakshi Handwork',
    colors: [
      { name: 'Noir Gold', hex: '#141414', inStock: true },
      { name: 'Lotus Pink', hex: '#FF5DA2', inStock: true },
      { name: 'Ruby Vermillion', hex: '#8B0000', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true, stockLeft: 2 },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: false },
      { size: 'XL', inStock: true, stockLeft: 1 },
    ],
    isNew: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 21,
    sku: 'LUM-AN-004',
    reviews: []
  },
  {
    id: 'prod-05',
    slug: 'handspun-linen-tunic-culottes',
    name: 'Handspun Linen Tunic Set',
    tagline: 'Artisanal handwoven Bengal linen with subtle Jamdani threadwork.',
    price: 260,
    category: 'Handloom & Linen',
    collection: 'Artisanal Handloom Linen',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Spun from high-count 80s organic Bengal linen on wooden handlooms. Features a contemporary relaxed silhouette with subtle hand-woven Jamdani floral motifs, side slits, and cropped wide-leg linen trousers.',
    details: [
      '2-Piece Set: Handloom Linen Tunic & Cropped Culottes',
      'Authentic Jamdani discontinuous weft technique',
      'Deep functional side pockets on tunic and trousers',
      'Pre-washed for extraordinary softness against the skin',
      'Model is 5’9” (175cm) and wears a size S'
    ],
    materials: '100% Handspun & Handwoven Bengal Linen (Natural Azo-Free Dyes).',
    care: 'Gentle hand wash cold with mild detergent. Line dry in shade. Warm iron.',
    origin: 'Artisan Loom Guild, Phulia, West Bengal',
    craft: 'Handloom Jamdani Weaving',
    colors: [
      { name: 'Kora Beige', hex: '#E6E0D2', inStock: true },
      { name: 'Blush Ochre', hex: '#F2D6DC', inStock: true },
      { name: 'Charcoal Noir', hex: '#232323', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 33,
    sku: 'LUM-LN-005',
    reviews: []
  },
  {
    id: 'prod-06',
    slug: 'pure-chanderi-silk-saree',
    name: 'Pure Chanderi Silk Saree',
    tagline: 'Featherlight Chanderi silk with hand-woven gold Meenakari bootis.',
    price: 340,
    category: 'Sarees',
    collection: 'Chanderi & Royal Tissue',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Woven with extra-fine degummed silk warp and cotton weft in Chanderi. Adorned with delicate handcrafted floral Meenakari ashrafi motifs and finished with a striking gold zari border.',
    details: [
      'Genuine handloom Chanderi with Silk Mark certification',
      'Lightweight and breezy drape ideal for day weddings and soirees',
      'Includes 1 meter unstitched contrast silk blouse fabric',
      'Hand-twisted silk pallu tassels',
      'Length: 5.5 meters saree + 0.8 meter blouse piece'
    ],
    materials: '60% Pure Degummed Silk, 40% Fine Cotton with Zari.',
    care: 'Dry clean only. Roll in muslin cloth to preserve the crisp handloom texture.',
    origin: 'Chanderi Heritage Weavers, Madhya Pradesh',
    craft: 'Handloom Eknaliya Weave',
    colors: [
      { name: 'Blush Pink', hex: '#FF3B8A', inStock: true },
      { name: 'Ivory Gilt', hex: '#FAF7F0', inStock: true },
      { name: 'Noir Smoke', hex: '#18181E', inStock: true },
    ],
    sizes: [
      { size: 'One Size', inStock: true },
    ],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 45,
    sku: 'LUM-SAR-006',
    reviews: []
  },
  {
    id: 'prod-07',
    slug: 'chikankari-mukaish-silk-kurta',
    name: 'Chikankari & Mukaish Kurta Set',
    tagline: 'Hand-embroidered Lucknowi shadow-work with fine silver Mukaish dots.',
    price: 380,
    category: 'Kurta Sets',
    collection: 'Varanasi Heritage',
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An ode to Awadhi royal courts, featuring 32 distinct hand-embroidery stitches including Bakhiya, Phanda, and Keel Kangan on pure modal georgette silk. Dotted with hand-embedded sterling silver mukaish wires.',
    details: [
      'Authentic hand-done Chikankari by master women artisans',
      'Hand-twisted pure silver Mukaish embellishment',
      'Paired with straight-cut modal silk cigarette pants and sheer dupatta',
      'Semi-sheer sleeves with matching slip included',
      'Model is 5’9” (175cm) and wears a size S'
    ],
    materials: 'Kurta & Pants: 100% Pure Viscose Modal Silk. Embroidery: Cotton Thread & Silver Mukaish.',
    care: 'Dry clean only.',
    origin: 'Artisan Women Collective, Lucknow, Uttar Pradesh',
    craft: 'Awadhi Hand Chikankari & Mukaish',
    colors: [
      { name: 'Pristine Ecru', hex: '#FAF9F6', inStock: true },
      { name: 'Rose Petal', hex: '#FF5DA2', inStock: true },
      { name: 'Night Raven', hex: '#121216', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 36,
    sku: 'LUM-CK-007',
    reviews: []
  },
  {
    id: 'prod-08',
    slug: 'pre-draped-organza-saree-gown',
    name: 'Pre-Draped Saree Gown',
    tagline: 'Contemporary fusion gown with sculpted bodice and fluid pleated drape.',
    price: 490,
    originalPrice: 550,
    category: 'Indo-Western',
    collection: 'Modern Indo-Western',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'The grandeur of a saree reimagined into a ready-to-wear evening gown. Features pre-stitched structured pleats, a corset bodice with hand-cut sequin detailing, and a sweeping organza pallu that drapes effortlessly over one shoulder.',
    details: [
      'Ready-to-wear 1-minute zip closure (no draping skills required)',
      'Sculpted internal boned corset with cups',
      'Pre-stitched pleats for flawless movement and stride',
      'Thigh-high side slit for modern drama',
      'Model is 5’10” (178cm) and wears a size S'
    ],
    materials: 'Body: Silk Satin & Silk Organza. Lining: 100% Cupro.',
    care: 'Specialist dry clean only. Steam press with protective cloth.',
    origin: 'LUMÉA Atelier, Mumbai, India',
    craft: 'Indo-Western Haute Couture',
    colors: [
      { name: 'Noir Intemporel', hex: '#111111', inStock: true },
      { name: 'Electric Fuchsia', hex: '#FF3B8A', inStock: true },
      { name: 'Metallic Platinum', hex: '#D8CEBA', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 28,
    sku: 'LUM-SG-008',
    reviews: []
  },
  {
    id: 'prod-09',
    slug: 'tussar-silk-handloom-cape',
    name: 'Tussar Silk Handloom Cape',
    tagline: 'Bhagalpur wild tussar silk overlay with Kantha embroidery and belt.',
    price: 320,
    category: 'Indo-Western',
    collection: 'Artisanal Handloom Linen',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Woven from unbleached wild Tussar silk in Bhagalpur. Hand-stitched with geometric Kantha running embroidery along the lapels and sleeves. Features a tailored sash belt to cinch over kurtas or western coordinates.',
    details: [
      'Organic raw Tussar silk with rich textured handfeel',
      'Traditional hand-run Kantha needlework',
      'Open front design with detachable sash belt',
      'Generous side pockets and clean French seams',
      'Model is 5’11” (180cm) and wears a size S'
    ],
    materials: '100% Certified Bhagalpur Wild Tussar Silk.',
    care: 'Dry clean only. Air in shade after wear.',
    origin: 'Silk Weaver Guild, Bhagalpur, Bihar',
    craft: 'Tussar Handloom & Kantha Needlework',
    colors: [
      { name: 'Natural Tussar Gold', hex: '#C69C6D', inStock: true },
      { name: 'Ebony Charcoal', hex: '#1C1B1A', inStock: true },
      { name: 'Dusty Rose', hex: '#F2D6DC', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
    ],
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 18,
    sku: 'LUM-CP-009',
    reviews: []
  },
  {
    id: 'prod-10',
    slug: 'maheshwari-silk-cotton-saree',
    name: 'Maheshwari Handloom Saree',
    tagline: 'Signature reversible zari border woven in the historic fort town of Maheshwar.',
    price: 280,
    category: 'Handloom & Linen',
    collection: 'Artisanal Handloom Linen',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Crafted under the patronage of Ahilyabai Holkar’s historic legacy, this Maheshwari saree combines fine mulberry silk in the warp with cotton in the weft. Characterized by its signature reversible Bugdi border and five-stripe pallu.',
    details: [
      'Authentic Maheshwari Handloom Silk-Cotton',
      'Reversible Bugdi geometric border in pure zari',
      'Lightweight, breathable, and holds neat pleats all day',
      'Includes unstitched blouse piece (80 cm)',
      'Total Length: 6.3 meters with blouse piece'
    ],
    materials: '50% Pure Silk, 50% Fine Handspun Cotton, Metallic Zari.',
    care: 'Dry clean recommended for initial washes; gentle cold wash thereafter.',
    origin: 'Maheshwar Fort Handloom Society, Madhya Pradesh',
    craft: 'Maheshwari Reversible Zari Handloom',
    colors: [
      { name: 'Onyx & Gold', hex: '#161616', inStock: true },
      { name: 'Gulaab Pink', hex: '#FF3B8A', inStock: true },
      { name: 'Olive Haldi', hex: '#8A9A86', inStock: true },
    ],
    sizes: [
      { size: 'One Size', inStock: true },
    ],
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 39,
    sku: 'LUM-MAH-010',
    reviews: []
  },
  {
    id: 'prod-11',
    slug: 'peplum-top-dhoti-pants-set',
    name: 'Mirrorwork Peplum & Dhoti Set',
    tagline: 'Sculptural raw silk peplum top with hand-set mirrors and draped dhoti.',
    price: 370,
    category: 'Indo-Western',
    collection: 'Modern Indo-Western',
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A vibrant celebration of festive silhouette design. Features an architectural flared peplum top in raw silk with real glass mirrorwork and resham thread embroidery, paired with modern cowl-draped modal satin dhoti trousers.',
    details: [
      '2-Piece Ensemble: Embroidered Peplum Top & Draped Dhoti Trousers',
      'Authentic hand-set Abhla (glass mirror) embroidery',
      'Flattering cinched waist with back zipper',
      'Pre-stitched pleated dhoti for breezy ease of movement',
      'Model is 5’9” (175cm) and wears a size S'
    ],
    materials: 'Top: 100% Raw Silk. Dhoti: Heavy Modal Satin. Lining: Cotton Voile.',
    care: 'Dry clean only.',
    origin: 'Craft Guild, Kutch & Jaipur',
    craft: 'Abhla Mirrorwork & Draped Tailoring',
    colors: [
      { name: 'Haute Pink', hex: '#FF3B8A', inStock: true },
      { name: 'Obsidian Noir', hex: '#191919', inStock: true },
      { name: 'Champagne Gilt', hex: '#D8CEBA', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 22,
    sku: 'LUM-DH-011',
    reviews: []
  },
  {
    id: 'prod-12',
    slug: 'hand-embroidered-silk-lehenga-set',
    name: 'Zardozi Bridal Silk Lehenga Set',
    tagline: 'Heavy raw silk 16-kali lehenga with antique zardozi borders and organza dupatta.',
    price: 890,
    originalPrice: 980,
    category: 'Lehengas & Anarkalis',
    collection: 'Varanasi Heritage',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An exceptional bridal and festive couture masterpiece. Featuring a 16-kali flared raw silk skirt adorned with traditional peacock and floral zardozi motifs, a sweetheart padded blouse with dori tassels, and a scalloped border organza dupatta.',
    details: [
      '3-Piece Bridal Set: Blouse, Flared Lehenga Skirt & Dupatta',
      'Handcrafted with French metal wire, dabka, and micro-pearls',
      'Double can-can netting inner layer for royal volume and flare',
      'Custom blouse stitching and size alteration included complimentary',
      'Model is 5’10” (178cm) and wears a size S'
    ],
    materials: 'Lehenga & Blouse: 100% Pure Raw Silk. Dupatta: Silk Organza with Zardozi Scallop.',
    care: 'Specialist dry clean only. Store in provided luxury bridal keepsake box.',
    origin: 'Couture Handcraft Guild, Varanasi & Jaipur',
    craft: 'Heritage Zardozi & Gotta Patti',
    colors: [
      { name: 'Royal Rani Fuchsia', hex: '#FF3B8A', inStock: true },
      { name: 'Midnight Jet Noir', hex: '#111111', inStock: true },
      { name: 'Vintage Gold', hex: '#D8CEBA', inStock: true },
    ],
    sizes: [
      { size: 'XS', inStock: true },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 31,
    sku: 'LUM-LH-012',
    reviews: []
  }
];

export const mockCollections: CollectionItem[] = [
  {
    id: 'col-chanderi',
    slug: 'chanderi-royal-tissue',
    title: 'Chanderi & Royal Tissue',
    subtitle: 'The Luminous Weaves',
    season: 'Permanent Heritage Edition',
    description: 'Weightless sheer textures, pure silk warps, and luminous gold tissue handlooms from the historic heart of Madhya Pradesh. Conceived for intimate celebrations and regal evenings.',
    heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    quote: '"Chanderi is where moonlight meets the weaver’s shuttle — translucent, poetic, and utterly timeless."',
    accentColor: '#FF5DA2',
    productIds: ['prod-02', 'prod-06', 'prod-08']
  },
  {
    id: 'col-varanasi',
    slug: 'varanasi-heritage',
    title: 'Varanasi Heritage & Zardozi',
    subtitle: 'Imperial Katan Silks',
    season: 'High Couture',
    description: 'Immortal Katan silks, pure gold Kadwa weaves, and master Zardozi hand-embroidery created by generational karigars along the ghats of Kashi.',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    quote: '"A true Banarasi saree is not merely worn; it is inherited as a work of living art."',
    accentColor: '#FF3B8A',
    productIds: ['prod-01', 'prod-04', 'prod-07', 'prod-12']
  },
  {
    id: 'col-indowestern',
    slug: 'modern-indo-western',
    title: 'Modern Indo-Western Fusion',
    subtitle: 'Sculptural Modernity',
    season: 'Festive & Runway',
    description: 'Pre-draped saree gowns, tailored raw silk bandhgalas over tiered shararas, and dhoti coordinates for the progressive global connoisseur.',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    quote: '"Reinterpreting Indian royal silhouettes with the sharp discipline of modern haute couture."',
    accentColor: '#D8CEBA',
    productIds: ['prod-03', 'prod-08', 'prod-09', 'prod-11']
  },
  {
    id: 'col-handloom',
    slug: 'artisanal-handloom-linen',
    title: 'Artisanal Handloom & Linen',
    subtitle: 'Earth, Loom & Weft',
    season: 'Everyday Luxury',
    description: 'Pure organic Bengal handspun linen, Jamdani weaves, Maheshwari borders, and Bhagalpur wild Tussar silks made for effortless understated elegance.',
    heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85',
    quote: '"Handloom breathes with the soul of the artisan — honest, textured, and deeply comforting."',
    accentColor: '#8A9A86',
    productIds: ['prod-05', 'prod-09', 'prod-10']
  }
];

export const mockCategories = [
  {
    name: 'Sarees',
    slug: 'sarees',
    count: 4,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    description: 'Handwoven Banarasi Katan, Chanderi Tissue, and Maheshwari handloom sarees.'
  },
  {
    name: 'Kurta Sets',
    slug: 'kurta-sets',
    count: 3,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    description: 'Zardozi Chanderi suits, Chikankari Mukaish tunics, and royal organza dupattas.'
  },
  {
    name: 'Indo-Western',
    slug: 'indo-western',
    count: 3,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    description: 'Pre-draped saree gowns, structured bandhgala blazers, shararas, and dhoti sets.'
  },
  {
    name: 'Handloom & Linen',
    slug: 'handloom-linen',
    count: 3,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
    description: 'Organic Bengal linen Jamdani sets, Bhagalpur Tussar capes, and Maheshwari weaves.'
  }
];

export const brandPillars = [
  {
    number: '01',
    title: 'Heritage Master Weaves',
    description: 'Sourced directly from authentic weaver clusters in Varanasi, Chanderi, Maheshwar, and Bengal to preserve centuries-old handloom techniques.'
  },
  {
    number: '02',
    title: 'Noble Silks & Pure Linens',
    description: 'We use exclusively certified Pure Katan Silk, Chanderi Tissue, Wild Tussar, and 80s count handspun organic linen without synthetic blends.'
  },
  {
    number: '03',
    title: 'Artisanal Zardozi & Aari',
    description: 'Each couture piece is hand-embroidered by master karigars with genuine antique metallic wires, dabka, gota patti, and mukaish.'
  },
  {
    number: '04',
    title: 'Bespoke Atelier Tailoring',
    description: 'Every saree, suit, and Indo-Western outfit can be custom tailored to your exact measurements, neckline preferences, and monogram in our studio.'
  }
];

export const pressQuotes = [
  {
    quote: '“LUMÉA bridges the sacred heritage of Indian handlooms with the sleek, unapologetic drama of modern couture.”',
    publication: 'VOGUE INDIA',
  },
  {
    quote: '“Their Banarasi Katan silks and Chanderi tissue suits represent the pinnacle of artisanal Indian luxury.”',
    publication: 'HARPER’S BAZAAR BRIDE',
  },
  {
    quote: '“From pre-draped saree gowns to handspun Jamdani linen, LUMÉA sets the benchmark for modern Indian elegance.”',
    publication: 'ELLE LUXURY EDITORIAL',
  },
  {
    quote: '“An extraordinary boutique preserving master weaver legacies through contemporary, wearable art.”',
    publication: 'ARCHITECTURAL DIGEST LIVING',
  }
];
