/**
 * LGU Monkayo CMS Constants
 *
 * This file contains site-wide constants for the LGU Monkayo website.
 * For dynamic content (news, departments, barangays, etc.), use the database.
 */

// Site Information
export const SITE_NAME = 'LGU Monkayo';
export const SITE_FULL_NAME = 'Local Government Unit of Monkayo';
export const SITE_DESCRIPTION =
  'Official website of the Local Government Unit of Monkayo, Davao de Oro, Philippines';
export const SITE_LOCATION = 'Monkayo, Davao de Oro, Philippines';

// Contact Information (Fallback - use database contact_info table for actual data)
export const DEFAULT_PHONE = '+63 (84) 123-4567';
export const DEFAULT_EMAIL = 'info@monkayo.gov.ph';
export const DEFAULT_ADDRESS =
  'Municipal Hall, Monkayo, Davao de Oro, Philippines';

// Social Media (Fallback - use database site_settings table for actual data)
export const FACEBOOK_PAGE = 'https://facebook.com/MonkayoLGU';
export const TWITTER_HANDLE = '@MonkayoLGU';

// Philippine Flag Colors
export const COLORS = {
  PRIMARY_BLUE: '#0038a8', // Official Philippine Flag Blue
  SECONDARY_RED: '#ce1126', // Official Philippine Flag Red
  ACCENT_YELLOW: '#fcd116', // Official Philippine Flag Yellow
};

// API & Database
export const ITEMS_PER_PAGE = 10;
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  STATIC_PAGES: 60 * 60, // 1 hour
  NEWS: 5 * 60, // 5 minutes
  DOCUMENTS: 30 * 60, // 30 minutes
};

// SEO Defaults
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
export const TWITTER_CARD_TYPE = 'summary_large_image';

/**
 * Note: Most content (departments, barangays, officials, news, etc.)
 * is managed via the database. Use Server Actions to fetch this data
 * from Supabase rather than hardcoding it here.
 */
