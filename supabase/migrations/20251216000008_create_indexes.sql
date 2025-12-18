-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================

-- Users (excluding users_email_idx which exists in users migration)
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_active ON public.users(is_active);

-- Content tables
CREATE INDEX idx_news_category ON public.news(category);
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_published ON public.news(published_at DESC);

CREATE INDEX idx_documents_category ON public.documents(category);
CREATE INDEX idx_documents_year ON public.documents(year);
CREATE INDEX idx_documents_status ON public.documents(status);

CREATE INDEX idx_eservices_category ON public.eservices(category);
CREATE INDEX idx_disclosure_category ON public.disclosure_documents(category);
CREATE INDEX idx_disclosure_year ON public.disclosure_documents(fiscal_year);

CREATE INDEX idx_charter_category ON public.citizens_charter(category);
CREATE INDEX idx_tourism_category ON public.tourism(category);

CREATE INDEX idx_jobs_open ON public.job_vacancies(is_open);
CREATE INDEX idx_jobs_deadline ON public.job_vacancies(deadline);

-- Audit logs
CREATE INDEX idx_audit_table ON public.audit_logs(table_name);
CREATE INDEX idx_audit_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_date ON public.audit_logs(created_at DESC);
