-- =============================================
-- Add updated_at column to logo_section table
-- =============================================

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'logo_section'
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE public.logo_section
        ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Update existing rows to have updated_at = created_at
        UPDATE public.logo_section
        SET updated_at = created_at
        WHERE updated_at IS NULL;
    END IF;
END $$;

COMMENT ON COLUMN public.logo_section.updated_at IS 'Timestamp of last update';