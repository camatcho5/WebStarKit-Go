
export type Category = 'AI Tools' | 'Web Hosting' | 'VPN Services' | 'Email Providers' | 'Productivity' | 'Digital Services' | 'Deals' | 'All';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Exclude<Category, 'All'>;
  rating: number;
  price: string;
  affiliateUrl: string;
  logoUrl: string;
  features: string[];
  pros?: string[];
  cons?: string[];
  isEditorPick?: boolean;
  isFree?: boolean;
  isSponsored?: boolean;
  relatedBlogIds?: string[];
}

export interface Recommendation {
  productId: string;
  reason: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  relatedProductIds?: string[];
}