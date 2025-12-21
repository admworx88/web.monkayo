-- Add default branding settings to site_settings table
-- This migration inserts branding configuration with Philippine-inspired colors

-- Insert default branding settings
INSERT INTO public.site_settings (key, value, description)
VALUES (
  'branding',
  jsonb_build_object(
    'colors', jsonb_build_object(
      'primary', '#d97706',
      'secondary', '#0ea5e9',
      'accent', '#fcd116',
      'textPrimary', '#1f2937',
      'textSecondary', '#6b7280'
    ),
    'logos', jsonb_build_object(
      'header', null,
      'footer', null,
      'favicon', '/favicon.ico'
    )
  ),
  'Branding settings for the public website (colors and logos)'
)
ON CONFLICT (key) DO NOTHING;

-- Add comment
COMMENT ON COLUMN public.site_settings.value IS 'JSONB value storing various site configuration. For branding: { colors: { primary, secondary, accent, textPrimary, textSecondary }, logos: { header, footer, favicon } }';
