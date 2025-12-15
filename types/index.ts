import type { Database } from './supabase';
import type { LucideIcon } from 'lucide-react';

// Database types
export type UserRole = Database['public']['Enums']['user_role'];
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

// Landing page types
export interface PricingTier {
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  href: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Partner {
  name: string;
  logo: string;
}
