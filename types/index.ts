import type { Database } from './supabase';

// User types
export type UserRole = Database['public']['Enums']['user_role'];
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

// Content Status
export type ContentStatus = Database['public']['Enums']['content_status'];

// Homepage types
export type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
export type VisionMission = Database['public']['Tables']['vision_mission']['Row'];
export type HomepageNews = Database['public']['Tables']['homepage_news']['Row'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type LogoSection = Database['public']['Tables']['logo_section']['Row'];

// News types
export type News = Database['public']['Tables']['news']['Row'];
export type NewsCategory = Database['public']['Enums']['news_category'];

// Tourism types
export type Tourism = Database['public']['Tables']['tourism']['Row'];
export type TourismImage = Database['public']['Tables']['tourism_images']['Row'];
export type TourismCategory = Database['public']['Enums']['tourism_category'];

// Directory types
export type Department = Database['public']['Tables']['departments']['Row'];
export type Barangay = Database['public']['Tables']['barangays']['Row'];

// Document types
export type Document = Database['public']['Tables']['documents']['Row'];
export type DocumentCategory = Database['public']['Enums']['document_category'];

// e-Services types
export type EService = Database['public']['Tables']['eservices']['Row'];
export type EServiceCategory = Database['public']['Enums']['eservice_category'];

// Disclosure types
export type DisclosureDocument = Database['public']['Tables']['disclosure_documents']['Row'];
export type DisclosureCategory = Database['public']['Enums']['disclosure_category'];

// Citizens Charter types
export type CitizensCharter = Database['public']['Tables']['citizens_charter']['Row'];
export type CharterCategory = Database['public']['Enums']['charter_category'];

// About Monkayo types
export type History = Database['public']['Tables']['history']['Row'];
export type HistoryImage = Database['public']['Tables']['history_images']['Row'];
export type OrganizationalStructure = Database['public']['Tables']['organizational_structure']['Row'];
export type ElectedOfficial = Database['public']['Tables']['elected_officials']['Row'];
export type Committee = Database['public']['Tables']['committees']['Row'];

// Job Vacancies
export type JobVacancy = Database['public']['Tables']['job_vacancies']['Row'];

// Contact types
export type ContactInfo = Database['public']['Tables']['contact_info']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];

// Media & Settings
export type Media = Database['public']['Tables']['media']['Row'];
export type SiteSetting = Database['public']['Tables']['site_settings']['Row'];

// Audit
export type AuditLog = Database['public']['Tables']['audit_logs']['Row'];

// Menu & Navigation types
export type Menu = Database['public']['Tables']['menus']['Row'];
export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type MenuInsert = Database['public']['Tables']['menus']['Insert'];
export type MenuItemInsert = Database['public']['Tables']['menu_items']['Insert'];

// Admin Navigation Interface (for sidebar)
export interface AdminNavItem {
  id: string;
  title: string;
  url: string | null;
  icon?: string | null;
  badge?: string;
  item_type: string | null;
  children?: AdminNavItem[];
  roles?: UserRole[];
}
