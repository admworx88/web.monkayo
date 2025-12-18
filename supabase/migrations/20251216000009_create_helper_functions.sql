-- =============================================
-- CREATE HELPER FUNCTIONS
-- =============================================

-- Function to update 'updated_at' timestamp
-- Note: handle_updated_at() already exists from users migration
-- This is an alternative implementation with same functionality
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(table_name TEXT, record_id UUID)
RETURNS VOID AS $$
BEGIN
    IF table_name = 'documents' THEN
        UPDATE public.documents SET download_count = download_count + 1 WHERE id = record_id;
    ELSIF table_name = 'disclosure_documents' THEN
        UPDATE public.disclosure_documents SET download_count = download_count + 1 WHERE id = record_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get menu with nested items
CREATE OR REPLACE FUNCTION public.get_menu_with_items(menu_slug TEXT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH RECURSIVE menu_tree AS (
        -- Get top-level items (no parent)
        SELECT
            mi.id,
            mi.menu_id,
            mi.parent_id,
            mi.title,
            mi.url,
            mi.target,
            mi.icon,
            mi.item_type,
            mi.sort_order,
            1 as level
        FROM public.menu_items mi
        JOIN public.menus m ON m.id = mi.menu_id
        WHERE m.slug = menu_slug
            AND mi.parent_id IS NULL
            AND mi.is_active = true
            AND m.is_active = true

        UNION ALL

        -- Get child items
        SELECT
            mi.id,
            mi.menu_id,
            mi.parent_id,
            mi.title,
            mi.url,
            mi.target,
            mi.icon,
            mi.item_type,
            mi.sort_order,
            mt.level + 1
        FROM public.menu_items mi
        JOIN menu_tree mt ON mi.parent_id = mt.id
        WHERE mi.is_active = true
    )
    SELECT json_agg(
        json_build_object(
            'id', mt.id,
            'title', mt.title,
            'url', mt.url,
            'target', mt.target,
            'icon', mt.icon,
            'item_type', mt.item_type,
            'sort_order', mt.sort_order,
            'children', (
                SELECT json_agg(
                    json_build_object(
                        'id', child.id,
                        'title', child.title,
                        'url', child.url,
                        'target', child.target,
                        'icon', child.icon,
                        'sort_order', child.sort_order
                    ) ORDER BY child.sort_order
                )
                FROM menu_tree child
                WHERE child.parent_id = mt.id
            )
        ) ORDER BY mt.sort_order
    ) INTO result
    FROM menu_tree mt
    WHERE mt.parent_id IS NULL;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
