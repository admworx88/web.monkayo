-- =============================================
-- CREATE STORAGE BUCKETS FOR IMAGE UPLOADS
-- =============================================

-- Insert hero-slides bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero-slides',
  'hero-slides',
  true,  -- Public bucket for web access
  10485760,  -- 10MB limit (10 * 1024 * 1024 bytes)
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Insert logos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,  -- Public bucket for web access
  5242880,  -- 5MB limit (5 * 1024 * 1024 bytes)
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ROW LEVEL SECURITY POLICIES FOR STORAGE
-- =============================================

-- Public read access to hero-slides bucket
CREATE POLICY "Public can view hero slide images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-slides');

-- Authenticated admins can upload to hero-slides
CREATE POLICY "Admins can upload hero slide images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hero-slides'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can update hero-slides
CREATE POLICY "Admins can update hero slide images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'hero-slides'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can delete hero-slides
CREATE POLICY "Admins can delete hero slide images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'hero-slides'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Public read access to logos bucket
CREATE POLICY "Public can view logo images"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

-- Authenticated admins can upload to logos
CREATE POLICY "Admins can upload logo images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'logos'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can update logos
CREATE POLICY "Admins can update logo images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'logos'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can delete logos
CREATE POLICY "Admins can delete logo images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'logos'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);
