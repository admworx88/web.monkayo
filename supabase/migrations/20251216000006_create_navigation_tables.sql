-- =============================================
-- CREATE NAVIGATION MENUS TABLES
-- =============================================

-- Main menu configuration
CREATE TABLE public.menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,               -- 'Main Navigation', 'Footer Menu', etc.
    slug TEXT UNIQUE NOT NULL,        -- 'main-nav', 'footer-menu'
    location TEXT NOT NULL,           -- 'header', 'footer', 'sidebar'
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.menus IS 'Navigation menu containers';

-- Menu items (supports nested/hierarchical menus)
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID REFERENCES public.menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE, -- For dropdown/nested items
    title TEXT NOT NULL,              -- Display text
    url TEXT,                         -- Link URL (internal or external)
    target TEXT DEFAULT '_self',      -- '_self' or '_blank'
    icon TEXT,                        -- Optional icon name
    item_type TEXT DEFAULT 'link',    -- 'link', 'dropdown', 'divider', 'heading'
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.menu_items IS 'Individual menu items with hierarchy support';

-- Create indexes for faster menu queries
CREATE INDEX idx_menu_items_menu_id ON public.menu_items(menu_id);
CREATE INDEX idx_menu_items_parent_id ON public.menu_items(parent_id);
CREATE INDEX idx_menu_items_sort ON public.menu_items(menu_id, parent_id, sort_order);
