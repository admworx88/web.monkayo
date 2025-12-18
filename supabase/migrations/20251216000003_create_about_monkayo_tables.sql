-- =============================================
-- CREATE ABOUT MONKAYO SECTION TABLES
-- =============================================

-- History Page
CREATE TABLE public.history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    narrative TEXT NOT NULL,          -- Rich text content
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.history IS 'History of Monkayo municipality';

-- History Images (Multiple images per history entry)
CREATE TABLE public.history_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    history_id UUID REFERENCES public.history(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.history_images IS 'Images associated with history entries';

-- Organizational Structure
CREATE TABLE public.organizational_structure (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,              -- Position/Title
    picture_url TEXT,
    parent_id UUID REFERENCES public.organizational_structure(id), -- For hierarchy
    department TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.organizational_structure IS 'Municipal organizational structure chart';

-- Elected Officials
CREATE TABLE public.elected_officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,              -- Mayor, Vice Mayor, Councilor, etc.
    picture_url TEXT,
    term_start DATE,
    term_end DATE,
    sort_order INTEGER DEFAULT 0,     -- For display order
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.elected_officials IS 'Elected officials of Monkayo';

-- Committees
CREATE TABLE public.committees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,               -- Committee name
    title TEXT,                       -- Committee description/purpose
    picture_url TEXT,                 -- Committee photo or chairman photo
    members TEXT[],                   -- Array of member names
    chairman TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.committees IS 'Municipal committees';
