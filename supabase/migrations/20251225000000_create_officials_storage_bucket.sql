-- =============================================
-- CREATE OFFICIALS STORAGE BUCKET
-- =============================================

-- Insert officials bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'officials',
  'officials',
  true,  -- Public bucket for web access
  5242880,  -- 5MB limit (5 * 1024 * 1024 bytes)
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Public read access to officials bucket
CREATE POLICY "Public can view official images"
ON storage.objects FOR SELECT
USING (bucket_id = 'officials');

-- Authenticated admins can upload to officials
CREATE POLICY "Admins can upload official images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'officials'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can update officials
CREATE POLICY "Admins can update official images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'officials'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can delete officials
CREATE POLICY "Admins can delete official images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'officials'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);
