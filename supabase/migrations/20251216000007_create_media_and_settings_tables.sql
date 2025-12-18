-- =============================================
-- CREATE MEDIA LIBRARY AND SETTINGS TABLES
-- =============================================

-- =============================================
-- MEDIA LIBRARY (For all uploads)
-- =============================================

CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,          -- image, document, video
    mime_type TEXT,
    file_size INTEGER,
    width INTEGER,                    -- For images
    height INTEGER,                   -- For images
    alt_text TEXT,
    folder TEXT DEFAULT 'general',    -- For organization
    uploaded_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.media IS 'Central media library for all uploaded files';

-- =============================================
-- SITE SETTINGS (Global Configuration)
-- =============================================

CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES public.users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.site_settings IS 'Global site settings and configuration';

-- =============================================
-- AUDIT LOGS (Track all changes)
-- =============================================

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    user_email TEXT,
    action TEXT NOT NULL,             -- create, update, delete, login
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.audit_logs IS 'Audit trail for all CMS actions';
