export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size';
  inStock: boolean;
  stockLeft?: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  verified: boolean;
  title: string;
  comment: string;
  fit: 'True to size' | 'Runs slightly small' | 'Runs slightly large';
  sizePurchased: string;
  colorPurchased: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'Sarees' | 'Kurta Sets' | 'Indo-Western' | 'Handloom & Linen' | 'Chanderi & Silk' | 'Lehengas & Anarkalis';
  collection: 'Varanasi Heritage' | 'Chanderi & Royal Tissue' | 'Modern Indo-Western' | 'Artisanal Handloom Linen';
  images: string[];
  description: string;
  details: string[];
  materials: string;
  care: string;
  origin: string; // e.g., 'Varanasi, Uttar Pradesh', 'Chanderi, Madhya Pradesh', 'Jaipur, Rajasthan', 'Bhagalpur, Bihar'
  craft?: string; // e.g., 'Handwoven Katan Zari', 'Aari Hand Embroidery', 'Hand-block Kalamkari', 'Zardozi Threadwork'
  colors: ProductColor[];
  sizes: ProductSize[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  sku: string;
}

export interface CustomGarmentSpecs {
  isCustom: boolean;
  garmentType: string;
  fabric: string;
  fabricOrigin?: string;
  craftStyle?: string; // e.g. 'Zardozi Hand Embroidery', 'Gotta Patti Borders', 'Chikankari Delicate Threadwork'
  colorName: string;
  colorHex: string;
  blouseNeckline?: string;
  blouseSleeve?: string;
  bottomType?: 'Palazzo' | 'Sharara Pants' | 'Straight Trouser' | 'Dhoti Drape' | 'Churidar';
  dupattaBorder?: string;
  collarStyle?: string;
  sleeveStyle?: string;
  hemLength?: string;
  buttonFinish?: string;
  monogramInitials?: string;
  monogramColor?: string;
  monogramPlacement?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  height?: string;
  fitPreference?: 'Tailored' | 'Relaxed' | 'Oversized';
  sareeFallPico?: boolean;
  tailorNotes?: string;
}

export interface CartItem {
  id: string; // unique combo of productId-color-size-custom
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
  customSpecs?: CustomGarmentSpecs;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  season: string;
  description: string;
  heroImage: string;
  quote: string;
  accentColor?: string;
  productIds: string[];
}

export interface FilterState {
  category: string;
  size: string;
  color: string;
  priceRange: string;
  sort: string;
  availability: string;
  search: string;
}
