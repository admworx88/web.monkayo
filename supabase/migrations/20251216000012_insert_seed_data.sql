-- =============================================
-- INSERT SEED DATA
-- =============================================

-- =============================================
-- SITE SETTINGS
-- =============================================

INSERT INTO public.site_settings (key, value, description) VALUES
('site_name', '"LGU Monkayo"', 'Website name'),
('site_tagline', '"Municipality of Monkayo, Davao de Oro"', 'Website tagline'),
('site_logo', '""', 'Main site logo URL'),
('site_favicon', '""', 'Favicon URL'),
('contact_email', '"info@monkayo.gov.ph"', 'Primary contact email'),
('contact_phone', '""', 'Primary contact phone'),
('facebook_page', '""', 'Official Facebook page URL'),
('address', '"Municipal Hall, Monkayo, Davao de Oro"', 'Municipal address');

-- =============================================
-- VISION, MISSION & GOALS
-- =============================================

-- Insert initial Vision/Mission (single row)
INSERT INTO public.vision_mission (vision, mission, goals) VALUES (
    'A progressive, peaceful, and resilient municipality.',
    'To deliver quality public services through good governance, community participation, and sustainable development.',
    'Promote economic growth, ensure peace and order, protect the environment, and improve quality of life for all residents.'
);

-- =============================================
-- BARANGAYS
-- =============================================

-- Insert sample barangays of Monkayo
INSERT INTO public.barangays (name, sort_order) VALUES
('Awao', 1),
('Babag', 2),
('Banlag', 3),
('Baylo', 4),
('Casoon', 5),
('Hagan', 6),
('Inambatan', 7),
('Ising', 8),
('Katipunan', 9),
('Macopa', 10),
('Mamunga', 11),
('Mount Diwata', 12),
('Naboc', 13),
('Oliva', 14),
('Pasian', 15),
('Poblacion', 16),
('Rizal', 17),
('Salvacion', 18),
('San Isidro', 19),
('San Jose', 20),
('Tubo-tubo', 21),
('Upper Ulip', 22);

-- =============================================
-- NAVIGATION MENUS
-- =============================================

-- Create main navigation menu
INSERT INTO public.menus (id, name, slug, location, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Main Navigation', 'main-nav', 'header', 'Primary website navigation');

-- Insert main menu items with hierarchy
DO $$
DECLARE
    main_menu_id UUID := '11111111-1111-1111-1111-111111111111';
    about_id UUID;
    directory_id UUID;
    eservices_id UUID;
    disclosure_id UUID;
    charter_id UUID;
    news_id UUID;
    tourism_id UUID;
    downloads_id UUID;
    opportunities_id UUID;
BEGIN
    -- Home (no children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Home', '/', 1, 'link');

    -- About Monkayo (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'About Monkayo', '/about', 2, 'dropdown')
    RETURNING id INTO about_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, about_id, 'History', '/about/history', 1),
    (main_menu_id, about_id, 'Organizational Structure', '/about/organizational-structure', 2),
    (main_menu_id, about_id, 'Elected Officials', '/about/elected-officials', 3),
    (main_menu_id, about_id, 'Committees', '/about/committees', 4);

    -- Directory (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Directory', '/directory', 3, 'dropdown')
    RETURNING id INTO directory_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, directory_id, 'Departments', '/directory/departments', 1),
    (main_menu_id, directory_id, 'Barangays', '/directory/barangays', 2);

    -- e-Services (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'e-Services', '/e-services', 4, 'dropdown')
    RETURNING id INTO eservices_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, eservices_id, 'New Business Application', '/e-services/new-business-application', 1),
    (main_menu_id, eservices_id, 'Renewal', '/e-services/renewal', 2),
    (main_menu_id, eservices_id, 'Civil Registry Services', '/e-services/civil-registry', 3);

    -- Full Disclosure Policy (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Full Disclosure Policy', '/full-disclosure', 5, 'dropdown')
    RETURNING id INTO disclosure_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, disclosure_id, 'Annual Budget', '/full-disclosure/annual-budget', 1),
    (main_menu_id, disclosure_id, 'Procurement/Bid Notices', '/full-disclosure/procurement-bid-notices', 2);

    -- Citizen's Charter (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Citizen''s Charter', '/citizens-charter', 6, 'dropdown')
    RETURNING id INTO charter_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, charter_id, 'Frontline Services', '/citizens-charter/frontline-services', 1),
    (main_menu_id, charter_id, 'Process Flow', '/citizens-charter/process-flow', 2);

    -- News (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'News', '/news', 7, 'dropdown')
    RETURNING id INTO news_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, news_id, 'Press Releases', '/news/press-releases', 1),
    (main_menu_id, news_id, 'Public Advisories/Announcements', '/news/advisories', 2);

    -- Tourism (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Tourism', '/tourism', 8, 'dropdown')
    RETURNING id INTO tourism_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, tourism_id, 'Places to Visit', '/tourism/places-to-visit', 1),
    (main_menu_id, tourism_id, 'Local Festivals/Events', '/tourism/festivals-events', 2);

    -- Downloads (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Downloads', '/downloads', 9, 'dropdown')
    RETURNING id INTO downloads_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, downloads_id, 'Executive Orders', '/downloads/executive-orders', 1),
    (main_menu_id, downloads_id, 'Memorandum Orders', '/downloads/memorandum-orders', 2),
    (main_menu_id, downloads_id, 'Municipal Ordinances', '/downloads/municipal-ordinances', 3),
    (main_menu_id, downloads_id, 'Other Forms', '/downloads/other-forms', 4);

    -- Opportunities (with children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Opportunities', '/opportunities', 10, 'dropdown')
    RETURNING id INTO opportunities_id;

    INSERT INTO public.menu_items (menu_id, parent_id, title, url, sort_order) VALUES
    (main_menu_id, opportunities_id, 'Job Vacancies', '/opportunities/job-vacancies', 1);

    -- Contact Us (no children)
    INSERT INTO public.menu_items (menu_id, title, url, sort_order, item_type)
    VALUES (main_menu_id, 'Contact Us', '/contact', 11, 'link');

END $$;
