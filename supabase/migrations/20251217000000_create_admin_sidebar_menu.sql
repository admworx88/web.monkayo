-- Create Admin Sidebar Navigation Menu
-- This migration creates the admin CMS navigation structure

-- Insert the admin sidebar menu
INSERT INTO public.menus (id, name, slug, location, description, is_active)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    'Admin Sidebar',
    'admin-sidebar',
    'sidebar',
    'Admin CMS navigation menu',
    true
);

-- Insert admin menu items with hierarchical structure
-- Using DO block for cleaner variable handling
DO $$
DECLARE
    menu_id UUID := '22222222-2222-2222-2222-222222222222';
    dashboard_id UUID := uuid_generate_v4();
    content_id UUID := uuid_generate_v4();
    homepage_id UUID := uuid_generate_v4();
    about_id UUID := uuid_generate_v4();
    directory_id UUID := uuid_generate_v4();
    news_id UUID := uuid_generate_v4();
    tourism_id UUID := uuid_generate_v4();
    documents_id UUID := uuid_generate_v4();
    services_id UUID := uuid_generate_v4();
    opportunities_id UUID := uuid_generate_v4();
    system_id UUID := uuid_generate_v4();
BEGIN
    -- ==========================================
    -- DASHBOARD (Top Level)
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (dashboard_id, menu_id, NULL, 'Dashboard', '/dashboard', 'layout-dashboard', 'link', 1, true);

    -- ==========================================
    -- CONTENT MANAGEMENT (Section Header)
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (content_id, menu_id, NULL, 'Content Management', NULL, NULL, 'heading', 2, true);

    -- ==========================================
    -- HOMEPAGE
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (homepage_id, menu_id, NULL, 'Homepage', NULL, 'home', 'dropdown', 3, true);

    -- Homepage children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, homepage_id, 'Hero Slides', '/content/homepage/hero', 'photo', 'link', 1, true),
        (menu_id, homepage_id, 'Vision & Mission', '/content/homepage/vision-mission', 'target', 'link', 2, true),
        (menu_id, homepage_id, 'News Feed', '/content/homepage/news-feed', 'rss', 'link', 3, true),
        (menu_id, homepage_id, 'FAQs', '/content/homepage/faqs', 'help-circle', 'link', 4, true),
        (menu_id, homepage_id, 'Partner Logos', '/content/homepage/logos', 'award', 'link', 5, true);

    -- ==========================================
    -- ABOUT MONKAYO
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (about_id, menu_id, NULL, 'About Monkayo', NULL, 'info', 'dropdown', 4, true);

    -- About children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, about_id, 'History', '/content/about/history', 'book', 'link', 1, true),
        (menu_id, about_id, 'Org Structure', '/content/about/org-structure', 'sitemap', 'link', 2, true),
        (menu_id, about_id, 'Elected Officials', '/content/about/officials', 'users', 'link', 3, true),
        (menu_id, about_id, 'Committees', '/content/about/committees', 'users-group', 'link', 4, true);

    -- ==========================================
    -- DIRECTORY
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (directory_id, menu_id, NULL, 'Directory', NULL, 'address-book', 'dropdown', 5, true);

    -- Directory children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, directory_id, 'Departments', '/content/directory/departments', 'building', 'link', 1, true),
        (menu_id, directory_id, 'Barangays', '/content/directory/barangays', 'map-pin', 'link', 2, true);

    -- ==========================================
    -- NEWS
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (news_id, menu_id, NULL, 'News', NULL, 'newspaper', 'dropdown', 6, true);

    -- News children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, news_id, 'Press Releases', '/content/news/press-releases', 'megaphone', 'link', 1, true),
        (menu_id, news_id, 'Advisories', '/content/news/advisories', 'alert-circle', 'link', 2, true);

    -- ==========================================
    -- TOURISM
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (tourism_id, menu_id, NULL, 'Tourism', NULL, 'plane', 'dropdown', 7, true);

    -- Tourism children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, tourism_id, 'Places to Visit', '/content/tourism/places', 'map', 'link', 1, true),
        (menu_id, tourism_id, 'Events & Festivals', '/content/tourism/events', 'calendar-event', 'link', 2, true);

    -- ==========================================
    -- DOCUMENTS
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (documents_id, menu_id, NULL, 'Documents', NULL, 'file-text', 'dropdown', 8, true);

    -- Documents children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, documents_id, 'Executive Orders', '/content/documents/executive-orders', 'file-certificate', 'link', 1, true),
        (menu_id, documents_id, 'Memorandum Orders', '/content/documents/memorandum-orders', 'file-description', 'link', 2, true),
        (menu_id, documents_id, 'Ordinances', '/content/documents/ordinances', 'gavel', 'link', 3, true),
        (menu_id, documents_id, 'Other Forms', '/content/documents/other-forms', 'forms', 'link', 4, true);

    -- ==========================================
    -- SERVICES
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (services_id, menu_id, NULL, 'Services', NULL, 'briefcase', 'dropdown', 9, true);

    -- Services children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, services_id, 'e-Services', '/content/services/e-services', 'device-laptop', 'link', 1, true),
        (menu_id, services_id, 'Full Disclosure', '/content/services/disclosure', 'eye', 'link', 2, true),
        (menu_id, services_id, 'Citizens Charter', '/content/services/citizens-charter', 'clipboard-list', 'link', 3, true);

    -- ==========================================
    -- OPPORTUNITIES
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (opportunities_id, menu_id, NULL, 'Opportunities', NULL, 'briefcase-2', 'dropdown', 10, true);

    -- Opportunities children
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, opportunities_id, 'Job Vacancies', '/content/opportunities/jobs', 'user-search', 'link', 1, true);

    -- ==========================================
    -- SYSTEM (Section Header)
    -- ==========================================
    INSERT INTO public.menu_items (id, menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (system_id, menu_id, NULL, 'System', NULL, NULL, 'heading', 11, true);

    -- System items (no children - direct links)
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES
        (menu_id, NULL, 'Media Library', '/media', 'photo-library', 'link', 12, true),
        (menu_id, NULL, 'Users', '/users', 'users-cog', 'link', 13, true),
        (menu_id, NULL, 'Settings', '/settings', 'settings', 'link', 14, true),
        (menu_id, NULL, 'Audit Logs', '/audit', 'history', 'link', 15, true);

END $$;
