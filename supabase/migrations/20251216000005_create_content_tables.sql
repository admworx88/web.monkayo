-- =============================================
-- CREATE CONTENT SECTION TABLES
-- =============================================

-- =============================================
-- E-SERVICES SECTION
-- =============================================

-- e-Services (New Business, Renewal, Civil Registry)
CREATE TABLE public.eservices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category eservice_category NOT NULL,
    file_url TEXT,                    -- Uploaded document
    file_name TEXT,                   -- Original filename
    file_size INTEGER,                -- File size in bytes
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.eservices IS 'e-Services documents (requirements, forms, guides)';

-- =============================================
-- FULL DISCLOSURE POLICY SECTION
-- =============================================

-- Full Disclosure Documents
CREATE TABLE public.disclosure_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category disclosure_category NOT NULL,
    fiscal_year INTEGER,              -- For annual budget
    quarter INTEGER,                  -- 1, 2, 3, 4 or NULL
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size INTEGER,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    download_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.disclosure_documents IS 'Full Disclosure Policy documents (Budget, Procurement)';

-- =============================================
-- CITIZENS CHARTER SECTION
-- =============================================

-- Frontline Services (with documents)
CREATE TABLE public.citizens_charter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category charter_category NOT NULL,
    file_url TEXT,                    -- For frontline services documents
    file_name TEXT,
    file_size INTEGER,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.citizens_charter IS 'Citizens Charter - Frontline Services and Process Flows';

-- =============================================
-- NEWS SECTION
-- =============================================

-- News (Press Releases & Advisories)
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    narrative TEXT,                   -- Description/summary
    category news_category NOT NULL,
    facebook_link TEXT NOT NULL,      -- Facebook post link
    featured_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.news IS 'News - Press Releases and Public Advisories with Facebook links';

-- =============================================
-- TOURISM SECTION
-- =============================================

-- Tourism (Places to Visit & Festivals/Events)
CREATE TABLE public.tourism (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    narrative TEXT,                   -- Description
    category tourism_category NOT NULL,
    facebook_link TEXT,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    event_date DATE,                  -- For festivals/events
    event_end_date DATE,
    location TEXT,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.tourism IS 'Tourism - Places to Visit and Local Festivals/Events';

-- Tourism Images (Multiple images per tourism entry)
CREATE TABLE public.tourism_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tourism_id UUID REFERENCES public.tourism(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_featured BOOLEAN DEFAULT false, -- Main/cover image
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.tourism_images IS 'Images for tourism entries';

-- =============================================
-- DOWNLOADS SECTION
-- =============================================

-- Documents (EO, MO, Ordinances, Forms)
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category document_category NOT NULL,
    document_number TEXT,             -- E.O. No. XX, M.O. No. XX, etc.
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size INTEGER,
    year INTEGER,
    date_signed DATE,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    download_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.documents IS 'Downloadable documents (EO, MO, Ordinances, Forms)';

-- =============================================
-- OPPORTUNITIES SECTION
-- =============================================

-- Job Vacancies
CREATE TABLE public.job_vacancies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,              -- Position title
    description TEXT,
    department_id UUID REFERENCES public.departments(id),
    file_url TEXT,                    -- Job posting document
    file_name TEXT,
    file_size INTEGER,
    facebook_link TEXT,
    salary_grade TEXT,
    employment_type TEXT,             -- Permanent, Casual, Job Order
    deadline DATE,
    is_open BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.job_vacancies IS 'Job vacancies/opportunities';

-- =============================================
-- CONTACT US SECTION
-- =============================================

-- Contact Information
CREATE TABLE public.contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,              -- "Mayor's Office", "General Inquiry", etc.
    email TEXT,
    contact_numbers TEXT[],
    address TEXT,
    office_hours TEXT,
    map_embed_url TEXT,               -- Google Maps embed
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES public.users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.contact_info IS 'Contact information for Contact Us page';

-- Contact Form Submissions (Optional - for receiving inquiries)
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',        -- new, read, replied, archived
    replied_at TIMESTAMPTZ,
    replied_by UUID REFERENCES public.users(id),
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions from website visitors';
