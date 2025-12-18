-- =============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================
-- Note: users table RLS already enabled from users migration

-- Enable RLS on all tables
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vision_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logo_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizational_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elected_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barangays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eservices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disclosure_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizens_charter ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourism ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourism_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PUBLIC READ POLICIES (Frontend can view)
-- =============================================

-- Hero slides - public can view active slides
CREATE POLICY "Public can view active hero slides"
    ON public.hero_slides FOR SELECT
    USING (is_active = true);

-- Vision/Mission - public can view
CREATE POLICY "Public can view vision mission"
    ON public.vision_mission FOR SELECT
    USING (true);

-- Logo section - public can view active
CREATE POLICY "Public can view active logos"
    ON public.logo_section FOR SELECT
    USING (is_active = true);

-- Footer - public can view active
CREATE POLICY "Public can view active footer"
    ON public.footer_config FOR SELECT
    USING (is_active = true);

-- FAQs - public can view active
CREATE POLICY "Public can view active faqs"
    ON public.faqs FOR SELECT
    USING (is_active = true);

-- History - public can view published
CREATE POLICY "Public can view published history"
    ON public.history FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view history images"
    ON public.history_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.history h
        WHERE h.id = history_images.history_id
        AND h.status = 'published'
    ));

-- Org Structure - public can view active
CREATE POLICY "Public can view active org structure"
    ON public.organizational_structure FOR SELECT
    USING (is_active = true);

-- Elected Officials - public can view active
CREATE POLICY "Public can view active officials"
    ON public.elected_officials FOR SELECT
    USING (is_active = true);

-- Committees - public can view active
CREATE POLICY "Public can view active committees"
    ON public.committees FOR SELECT
    USING (is_active = true);

-- Departments - public can view active
CREATE POLICY "Public can view active departments"
    ON public.departments FOR SELECT
    USING (is_active = true);

-- Barangays - public can view active
CREATE POLICY "Public can view active barangays"
    ON public.barangays FOR SELECT
    USING (is_active = true);

-- e-Services - public can view published
CREATE POLICY "Public can view published eservices"
    ON public.eservices FOR SELECT
    USING (status = 'published');

-- Disclosure - public can view published
CREATE POLICY "Public can view published disclosure"
    ON public.disclosure_documents FOR SELECT
    USING (status = 'published');

-- Citizens Charter - public can view published
CREATE POLICY "Public can view published charter"
    ON public.citizens_charter FOR SELECT
    USING (status = 'published');

-- News - public can view published
CREATE POLICY "Public can view published news"
    ON public.news FOR SELECT
    USING (status = 'published');

-- Homepage News - public can view active
CREATE POLICY "Public can view active homepage news"
    ON public.homepage_news FOR SELECT
    USING (is_active = true);

-- Tourism - public can view published
CREATE POLICY "Public can view published tourism"
    ON public.tourism FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view tourism images"
    ON public.tourism_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.tourism t
        WHERE t.id = tourism_images.tourism_id
        AND t.status = 'published'
    ));

-- Documents - public can view published
CREATE POLICY "Public can view published documents"
    ON public.documents FOR SELECT
    USING (status = 'published');

-- Job Vacancies - public can view published and open
CREATE POLICY "Public can view open jobs"
    ON public.job_vacancies FOR SELECT
    USING (status = 'published' AND is_open = true);

-- Contact Info - public can view active
CREATE POLICY "Public can view active contact"
    ON public.contact_info FOR SELECT
    USING (is_active = true);

-- Contact Submissions - public can insert
CREATE POLICY "Public can submit contact form"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (true);

-- Site Settings - public can view
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

-- Menus - public can view active menus
CREATE POLICY "Public can view active menus"
    ON public.menus FOR SELECT
    USING (is_active = true);

-- Menu Items - public can view active items
CREATE POLICY "Public can view active menu items"
    ON public.menu_items FOR SELECT
    USING (is_active = true);

-- =============================================
-- ADMIN POLICIES (Dashboard access)
-- =============================================

-- Admin full access policies for all content tables
CREATE POLICY "Admins can manage hero slides"
    ON public.hero_slides FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage vision mission"
    ON public.vision_mission FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage logo section"
    ON public.logo_section FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage footer"
    ON public.footer_config FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage faqs"
    ON public.faqs FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage history"
    ON public.history FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage history images"
    ON public.history_images FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage org structure"
    ON public.organizational_structure FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage officials"
    ON public.elected_officials FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage committees"
    ON public.committees FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage departments"
    ON public.departments FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage barangays"
    ON public.barangays FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage eservices"
    ON public.eservices FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage disclosure"
    ON public.disclosure_documents FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage charter"
    ON public.citizens_charter FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage news"
    ON public.news FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage homepage news"
    ON public.homepage_news FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage tourism"
    ON public.tourism FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage tourism images"
    ON public.tourism_images FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage documents"
    ON public.documents FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage jobs"
    ON public.job_vacancies FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage contact info"
    ON public.contact_info FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can view contact submissions"
    ON public.contact_submissions FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can update contact submissions"
    ON public.contact_submissions FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can manage media"
    ON public.media FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage site settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage menus"
    ON public.menus FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can manage menu items"
    ON public.menu_items FOR ALL
    USING (public.is_admin());

CREATE POLICY "Admins can view audit logs"
    ON public.audit_logs FOR SELECT
    USING (public.is_admin());

CREATE POLICY "System can insert audit logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (true);

-- Users table - special policies (admin can manage all users, other policies exist from users migration)
CREATE POLICY "Admins can manage all users"
    ON public.users FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    ));
