-- =============================================
-- CREATE FLAGSHIP PROGRAMS TABLE AND STORAGE
-- =============================================

-- Table: Flagship Programs
CREATE TABLE public.flagship_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,                       -- Optional program name
    description TEXT,                 -- Optional short caption
    image_url TEXT NOT NULL,          -- Required image
    link_url TEXT,                    -- Optional link to program details
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.flagship_programs IS 'Flagship government programs/initiatives displayed on homepage';

-- =============================================
-- CREATE STORAGE BUCKET
-- =============================================

-- Insert flagship-programs bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'flagship-programs',
  'flagship-programs',
  true,  -- Public bucket for web access
  10485760,  -- 10MB limit (10 * 1024 * 1024 bytes)
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Table Policies
-- Public can view active flagship programs
CREATE POLICY "Public can view active flagship programs"
    ON public.flagship_programs FOR SELECT
    USING (is_active = true);

-- Admins can manage all flagship programs
CREATE POLICY "Admins can manage flagship programs"
    ON public.flagship_programs FOR ALL
    USING (public.is_admin());

-- Storage Policies
-- Public read access to flagship-programs bucket
CREATE POLICY "Public can view flagship program images"
ON storage.objects FOR SELECT
USING (bucket_id = 'flagship-programs');

-- Authenticated admins can upload to flagship-programs
CREATE POLICY "Admins can upload flagship program images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'flagship-programs'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can update flagship-programs
CREATE POLICY "Admins can update flagship program images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'flagship-programs'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- Authenticated admins can delete flagship-programs
CREATE POLICY "Admins can delete flagship program images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'flagship-programs'
  AND auth.uid() IN (
    SELECT id FROM public.users
    WHERE role IN ('admin', 'staff')
    AND is_active = true
  )
);

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp
CREATE TRIGGER update_flagship_programs_updated_at
    BEFORE UPDATE ON public.flagship_programs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
