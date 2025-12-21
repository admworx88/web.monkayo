export interface BrandingColors {
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

export interface BrandingLogos {
  header: string | null;
  footer: string | null;
  favicon: string | null;
}

export interface BrandingSettings {
  colors: BrandingColors;
  logos: BrandingLogos;
}

// Philippine-inspired default colors (amber/gold scheme)
export const DEFAULT_BRANDING: BrandingSettings = {
  colors: {
    primary: '#d97706', // amber-600
    secondary: '#0ea5e9', // sky-500
    accent: '#fcd116', // Philippine flag yellow
    textPrimary: '#1f2937', // gray-800
    textSecondary: '#6b7280', // gray-500
  },
  logos: {
    header: null,
    footer: null,
    favicon: '/favicon.ico',
  },
};
