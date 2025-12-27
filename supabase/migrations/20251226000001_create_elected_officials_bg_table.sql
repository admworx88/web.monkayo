-- =============================================
-- Create elected_officials_bg table
-- Stores background history/biography for elected officials
-- (education, career, achievements, etc. as designed images/infographics)
-- =============================================

CREATE TABLE public.elected_officials_bg (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_id UUID NOT NULL REFERENCES public.elected_officials(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    caption TEXT,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE public.elected_officials_bg IS 'Background history/biography for elected officials (education, career, achievements as images)';

-- Create index on official_id for faster queries
CREATE INDEX idx_elected_officials_bg_official_id ON public.elected_officials_bg(official_id);

-- Create index on is_featured for faster queries
CREATE INDEX idx_elected_officials_bg_featured ON public.elected_officials_bg(is_featured) WHERE is_featured = true;

-- Enable RLS
ALTER TABLE public.elected_officials_bg ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public can view backgrounds for active officials
CREATE POLICY "Public can view official backgrounds"
    ON public.elected_officials_bg FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.elected_officials eo
        WHERE eo.id = elected_officials_bg.official_id
        AND eo.is_active = true
    ));

-- RLS Policy: Admins can manage all backgrounds
CREATE POLICY "Admins can manage official backgrounds"
    ON public.elected_officials_bg FOR ALL
    USING (public.is_admin());

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at_elected_officials_bg
    BEFORE UPDATE ON public.elected_officials_bg
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
