-- Add Flagship Programs menu item to admin sidebar
-- This adds the menu link under Homepage section

DO $$
DECLARE
    v_menu_id UUID := '22222222-2222-2222-2222-222222222222'; -- Admin sidebar menu ID
    v_homepage_parent_id UUID;
BEGIN
    -- Get the Homepage parent menu item ID
    SELECT id INTO v_homepage_parent_id
    FROM public.menu_items
    WHERE menu_id = v_menu_id
      AND title = 'Homepage'
      AND item_type = 'dropdown';

    -- Insert Flagship Programs menu item
    -- Inserting after Partner Logos (sort_order 6)
    INSERT INTO public.menu_items (menu_id, parent_id, title, url, icon, item_type, sort_order, is_active)
    VALUES (
        v_menu_id,
        v_homepage_parent_id,
        'Flagship Programs',
        '/content/homepage/flagship',
        'flag',                    -- Icon for flagship programs
        'link',
        6,                         -- After Partner Logos (which is 5)
        true
    );

END $$;
