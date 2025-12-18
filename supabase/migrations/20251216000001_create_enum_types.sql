-- =============================================
-- CREATE ENUM TYPES
-- =============================================
-- Note: user_role enum already exists from previous migration

-- Content publication status
CREATE TYPE content_status AS ENUM (
    'draft',          -- Not yet published
    'published',      -- Live on website
    'archived'        -- Hidden but not deleted
);

-- Document categories for Downloads section
CREATE TYPE document_category AS ENUM (
    'executive_order',
    'memorandum_order',
    'municipal_ordinance',
    'other_form'
);

-- e-Services categories
CREATE TYPE eservice_category AS ENUM (
    'new_business_application',
    'renewal',
    'civil_registry'
);

-- Full Disclosure categories
CREATE TYPE disclosure_category AS ENUM (
    'annual_budget',
    'procurement_bid'
);

-- Citizens Charter categories
CREATE TYPE charter_category AS ENUM (
    'frontline_services',
    'process_flow'
);

-- News categories
CREATE TYPE news_category AS ENUM (
    'press_release',
    'advisory_announcement'
);

-- Tourism categories
CREATE TYPE tourism_category AS ENUM (
    'places_to_visit',
    'festivals_events'
);
