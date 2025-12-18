-- =============================================
-- CREATE HOMEPAGE SECTION TABLES
-- =============================================

-- Hero Section (Carousel Images)
CREATE TABLE public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,                    -- Optional link when clicked
    link_text TEXT,                   -- Button text
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.hero_slides IS 'Hero section carousel images for homepage';

-- Vision, Mission & Goals
CREATE TABLE public.vision_mission (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vision TEXT,
    mission TEXT,
    goals TEXT,                       -- Can be rich text or markdown
    updated_by UUID REFERENCES public.users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.vision_mission IS 'Vision, Mission and Goals content - single row table';

-- Logo Section (Partner logos, government seals, etc.)
CREATE TABLE public.logo_section (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,               -- Logo name/description
    image_url TEXT NOT NULL,
    link_url TEXT,                    -- Optional link
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.logo_section IS 'Logos displayed on homepage (government seals, partner logos)';

-- Footer Configuration
CREATE TABLE public.footer_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_name TEXT NOT NULL,       -- 'logo', 'quick_links', 'contact', 'social'
    content JSONB NOT NULL,           -- Flexible JSON for different section types
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.footer_config IS 'Footer section configuration - logos, links, contact info';

-- FAQs
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.faqs IS 'Frequently Asked Questions for homepage';

-- Homepage News (Facebook Embeds)
CREATE TABLE public.homepage_news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    facebook_embed_url TEXT NOT NULL, -- Facebook embed link
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.homepage_news IS 'Homepage news section with Facebook embed links';
