-- =============================================
-- CREATE DIRECTORY SECTION TABLES
-- =============================================

-- Departments
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    head_name TEXT,
    head_title TEXT,
    facebook_link TEXT,
    email TEXT,
    contact_numbers TEXT[],           -- Array for multiple numbers
    office_location TEXT,
    office_hours TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.departments IS 'Municipal departments directory';

-- Barangays
CREATE TABLE public.barangays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    captain_name TEXT,
    facebook_link TEXT,
    email TEXT,
    contact_numbers TEXT[],           -- Array for multiple numbers
    address TEXT,
    population INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.barangays IS 'Barangays directory';
