# CLAUDE.md

# 🏛️ LGU Monkayo CMS Website

> A modern, accessible, and citizen-centric Content Management System for the Local Government Unit of Monkayo, Davao de Oro, Philippines.

---

## 📋 Project Overview

### Vision

Build a transparent, user-friendly, and mobile-responsive government website that serves as the digital gateway for constituents to access public services, information, and engage with their local government.

### Mission

Deliver a modern CMS platform that empowers LGU Monkayo staff to manage content efficiently while providing citizens with seamless access to government services, news, and official documents.

### Target Users

1. **Citizens/Constituents** - Residents of Monkayo seeking information and services
2. **Content Managers** - LGU staff responsible for updating website content
3. **Department Heads** - Officials managing department-specific pages
4. **System Administrators** - IT staff managing the platform
5. **Tourists/Investors** - External visitors exploring opportunities in Monkayo

---

## 🎯 Implementation Status Dashboard

> Last Updated: December 17, 2025

### Phase 1: Foundation ✅ COMPLETE (85%)

- ✅ Next.js 16 + TypeScript setup
- ✅ Tailwind CSS 4 + shadcn/ui (38 components)
- ✅ Supabase integration (client/server/middleware)
- ✅ Database schema (13 migrations, 31 tables, full RLS)
- ✅ Authentication (email/password, magic link, OAuth callback)
- ✅ Environment configuration

### Phase 2: Database & Auth ✅ COMPLETE (100%)

- ✅ Migration files created (13 files, production-ready)
- ✅ RLS policies defined (all 31 tables)
- ✅ Helper functions and triggers
- ✅ Seed data prepared (barangays, settings, menus)
- ✅ Migrations applied to local DB
- ✅ TypeScript types regenerated (all 31 tables)

### Phase 3: Public Website 📋 IN PROGRESS (10%)

- 🚧 Landing page (building LGU homepage to replace SaaS template)
- ❌ Homepage sections (Hero, News, Vision/Mission, FAQs) - DB ready, building UI
- ❌ About Monkayo pages (0/4 pages)
- ❌ Directory pages (0/2 pages)
- ❌ e-Services pages (0/3 pages)
- ❌ Full Disclosure pages (0/2 pages)
- ❌ Citizens Charter pages (0/2 pages)
- ❌ News pages (0/2 pages)
- ❌ Tourism pages (0/2 pages)
- ❌ Downloads pages (0/4 pages)
- ❌ Opportunities page
- ❌ Contact page

### Phase 4: Admin CMS 📋 PLANNED (5%)

- ⚠️ Dashboard exists (generic financial template, needs customization)
- ❌ Content management pages (0/15 sections)
- ❌ Server Actions for CRUD (0/12 action files)
- ❌ Media library UI
- ❌ User management
- ❌ Analytics dashboard

### Phase 5: Advanced Features 📋 NOT STARTED (0%)

- ❌ Search functionality
- ❌ Contact form & submissions UI
- ❌ File upload infrastructure
- ❌ Email notifications (Resend/Nodemailer)
- ❌ SEO optimization
- ❌ Performance monitoring

---

## 📑 Page Functionality Specifications

### 🏠 HOME - Landing Page

| Section                    | Admin Dashboard                                                                       | Frontend                          |
| -------------------------- | ------------------------------------------------------------------------------------- | --------------------------------- |
| **Hero Section**           | Upload multiple images for carousel, set title/subtitle per slide, manage slide order | Displays as auto-sliding carousel |
| **News**                   | Insert title + Facebook embed links                                                   | View embedded Facebook posts      |
| **Vision/Mission & Goals** | Insert/Update content (rich text)                                                     | View formatted content            |
| **Logo Section**           | Upload logos, set order                                                               | Display logo grid                 |
| **Footer Section**         | Upload/select logos, insert names and links                                           | View footer with links            |
| **FAQs**                   | Insert/Update/Delete FAQ items                                                        | View expandable FAQ accordion     |

### 📖 ABOUT MONKAYO

| Page                         | Admin Dashboard                                            | Frontend                         |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------- |
| **History**                  | Input Title, Narrative (rich text), Upload multiple images | View history content with images |
| **Organizational Structure** | Input Name, Title/Position, Upload Picture, Set hierarchy  | View org chart/structure         |
| **Elected Officials**        | Input Name, Title, Upload Picture                          | View officials gallery           |
| **Committees**               | Input Committee Name, Title/Description, Upload Picture    | View committees list             |

### 📁 DIRECTORY

| Page            | Admin Dashboard                                   | Frontend                                    |
| --------------- | ------------------------------------------------- | ------------------------------------------- |
| **Departments** | Input Name, Facebook link, Email, Contact Numbers | View department directory with contact info |
| **Barangays**   | Input Name, Facebook link, Email, Contact Numbers | View barangay directory with contact info   |

### 💼 E-SERVICES

| Page                         | Admin Dashboard                           | Frontend                              |
| ---------------------------- | ----------------------------------------- | ------------------------------------- |
| **New Business Application** | Input Title, Upload Documents (PDF/forms) | View requirements, Download documents |
| **Renewal**                  | Input Title, Upload Documents             | View requirements, Download documents |
| **Civil Registry Services**  | Input Title, Upload Documents             | View requirements, Download documents |

### 📊 FULL DISCLOSURE POLICY

| Page                        | Admin Dashboard                                | Frontend                            |
| --------------------------- | ---------------------------------------------- | ----------------------------------- |
| **Annual Budget**           | Input Title, Upload Documents, Set fiscal year | View/Download budget documents      |
| **Procurement/Bid Notices** | Input Title, Upload Documents                  | View/Download procurement documents |

### 📋 CITIZEN'S CHARTER

| Page                   | Admin Dashboard                         | Frontend                        |
| ---------------------- | --------------------------------------- | ------------------------------- |
| **Frontline Services** | Input Title, Upload Documents           | View/Download service documents |
| **Process Flow**       | Input Title, Description (text content) | View process descriptions       |

### 📰 NEWS

| Page                  | Admin Dashboard                              | Frontend                              |
| --------------------- | -------------------------------------------- | ------------------------------------- |
| **Press Releases**    | Input Title, Narrative, Facebook link        | View headline, Click to open Facebook |
| **Public Advisories** | Input Title, Description, Facebook post link | View advisory, Click to open Facebook |

### 🏝️ TOURISM

| Page                       | Admin Dashboard                                  | Frontend                             |
| -------------------------- | ------------------------------------------------ | ------------------------------------ |
| **Places to Visit**        | Upload Title, Narrative, Pictures, Facebook link | View gallery, Click to open Facebook |
| **Local Festivals/Events** | Upload Title, Narrative, Facebook link, Pictures | View events, Click to open Facebook  |

### 📥 DOWNLOADS

| Page                     | Admin Dashboard              | Frontend                      |
| ------------------------ | ---------------------------- | ----------------------------- |
| **Executive Orders**     | Input Title, Upload Document | View list, Download documents |
| **Memorandum Orders**    | Input Title, Upload Document | View list, Download documents |
| **Municipal Ordinances** | Input Title, Upload Document | View list, Download documents |
| **Other Forms**          | Input Title, Upload Document | View list, Download documents |

### 💼 OPPORTUNITIES

| Page              | Admin Dashboard                              | Frontend                         |
| ----------------- | -------------------------------------------- | -------------------------------- |
| **Job Vacancies** | Input Title, Upload Documents, Facebook link | View listings, Download/Click FB |

### 📞 CONTACT US

| Section          | Admin Dashboard                        | Frontend                 |
| ---------------- | -------------------------------------- | ------------------------ |
| **Contact Info** | Input Emails, Contact Numbers, Address | View contact information |

---

## 🎯 Core Objectives

1. **Transparency** - Publish government documents, budgets, and ordinances
2. **Accessibility** - WCAG 2.1 AA compliant, mobile-first design
3. **Citizen Services** - Online service requests, appointment booking, feedback system
4. **Information Hub** - News, announcements, events, emergency alerts
5. **Tourism Promotion** - Showcase local attractions, culture, and investment opportunities
6. **Bilingual Support** - Filipino and English language options
7. **Performance** - Fast loading even on slow connections (common in rural areas)

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15+ (App Router, TypeScript)
- **Styling**: Tailwind CSS 3.4+ (Mobile-first, responsive)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion 11+
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: Tiptap 2 or BlockNote
- **Date Handling**: date-fns

### Backend & Database

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for documents, images)
- **Real-time**: Supabase Realtime (for notifications)
- **API**: Next.js Server Actions + API Routes

### DevOps & Infrastructure

- **Hosting**: Vercel (Frontend) + Supabase (Backend)
- **CDN**: Vercel Edge Network / Cloudflare
- **Analytics**: Vercel Analytics + Custom Dashboard
- **Monitoring**: Sentry for error tracking
- **CI/CD**: GitHub Actions

### Additional Tools

- **SEO**: Next.js Metadata API, next-sitemap
- **Email**: Resend or Nodemailer (for notifications)
- **PDF Generation**: @react-pdf/renderer (for certificates, permits)
- **Maps**: Leaflet or Google Maps API (for facilities locator)

---

## 🔧 Technology Implementation Status

### Frontend ✅ READY

- **Next.js 16.0.8** - Latest stable, App Router, TypeScript
- **React 19.2.1** - Latest with React Compiler support
- **Tailwind CSS 4** - Configured with PostCSS
- **shadcn/ui** - 38 components installed and themed
- **Radix UI** - Primitives for accessible components
- **Lucide React** - Icon system

### Backend & Database ✅ IMPLEMENTED

- **Supabase** - Local dev environment configured
- **PostgreSQL** - Schema defined (31 tables, 8 enum types, full RLS)
- **Authentication** - Email/password, magic link, OAuth callback
- **Row Level Security** - Policies for all tables
- **Migrations** - 13 migration files applied
- **Seed Data** - Test data inserted for barangays, settings, menus

### DevOps & Infrastructure ⚠️ PARTIAL

- **Local Development** - ✅ Supabase CLI configured (ports 54421-54424)
- **Environment Variables** - ✅ Configured and working
- **Type Generation** - ✅ Regenerated with all 31 tables
- **Hosting** - ❌ Not yet deployed (Vercel planned)
- **CI/CD** - ❌ GitHub Actions not configured
- **Analytics** - ❌ Not configured
- **Monitoring** - ❌ Sentry not integrated

### NOT YET IMPLEMENTED ❌

- Rich Text Editor (Tiptap/BlockNote)
- Email service (Resend/Nodemailer)
- PDF Generation (@react-pdf/renderer)
- Maps integration (Leaflet/Google Maps)
- SEO (next-sitemap)
- PWA features

---

## 🗺️ Navigation Structure

Based on LGU Monkayo's requirements, the website follows this navigation hierarchy:

```
Home
├── About Monkayo
│   ├── History
│   ├── Organizational Structure
│   ├── Elected Officials
│   └── Committees
├── Directory
│   ├── Departments (Facebook link, email, Contact Numbers)
│   └── Barangays (Facebook link, email, Contact Numbers)
├── e-Services
│   ├── New Business Application
│   ├── Renewal
│   └── Civil Registry Services
├── Full Disclosure Policy
│   ├── Annual Budget
│   └── Procurement/Bid Notices
├── Citizen's Charter
│   ├── Frontline Services
│   └── Process Flow
├── News
│   ├── Press Releases (Headline → Facebook post link)
│   └── Public Advisories/Announcements (Headline → Facebook post link)
├── Tourism
│   ├── Places to Visit (Photo teaser → Facebook post link)
│   └── Local Festivals/Events
├── Downloads
│   ├── Executive Orders
│   ├── Memorandum Orders
│   ├── Municipal Ordinances
│   └── Other Forms
├── Opportunities
│   └── Job Vacancies
└── Contact Us
```

---

## 📁 Project Structure

```
lgu-monkayo-cms/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public-facing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # About Monkayo
│   │   │   ├── page.tsx          # About overview
│   │   │   ├── history/
│   │   │   ├── organizational-structure/
│   │   │   ├── elected-officials/
│   │   │   └── committees/
│   │   ├── directory/            # Directory
│   │   │   ├── page.tsx
│   │   │   ├── departments/
│   │   │   └── barangays/
│   │   ├── e-services/           # e-Services
│   │   │   ├── page.tsx
│   │   │   ├── new-business-application/
│   │   │   ├── renewal/
│   │   │   └── civil-registry/
│   │   ├── full-disclosure/      # Full Disclosure Policy
│   │   │   ├── page.tsx
│   │   │   ├── annual-budget/
│   │   │   └── procurement-bid-notices/
│   │   ├── citizens-charter/     # Citizen's Charter
│   │   │   ├── page.tsx
│   │   │   ├── frontline-services/
│   │   │   └── process-flow/
│   │   ├── news/                 # News
│   │   │   ├── page.tsx
│   │   │   ├── press-releases/
│   │   │   └── advisories/
│   │   ├── tourism/              # Tourism
│   │   │   ├── page.tsx
│   │   │   ├── places-to-visit/
│   │   │   └── festivals-events/
│   │   ├── downloads/            # Downloads
│   │   │   ├── page.tsx
│   │   │   ├── executive-orders/
│   │   │   ├── memorandum-orders/
│   │   │   ├── municipal-ordinances/
│   │   │   └── other-forms/
│   │   ├── opportunities/        # Opportunities
│   │   │   ├── page.tsx
│   │   │   └── job-vacancies/
│   │   └── contact/              # Contact Us
│   │       └── page.tsx
│   ├── (auth)/                   # Authentication pages
│   │   ├── signin/
│   │   └── forgot-password/
│   ├── admin/                    # CMS Admin Panel
│   │   ├── dashboard/
│   │   ├── pages/                # Static page management
│   │   ├── news/                 # News/Press releases management
│   │   ├── officials/            # Officials management
│   │   ├── departments/          # Departments management
│   │   ├── barangays/            # Barangays management
│   │   ├── services/             # e-Services management
│   │   ├── documents/            # Downloads/Documents management
│   │   ├── tourism/              # Tourism content management
│   │   ├── jobs/                 # Job vacancies management
│   │   ├── disclosure/           # Full disclosure management
│   │   ├── citizens-charter/     # Citizen's charter management
│   │   ├── media/                # Media library
│   │   ├── menus/                # Navigation menu builder
│   │   ├── users/                # User management
│   │   ├── settings/             # Site settings
│   │   └── analytics/            # Usage analytics
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── upload/
│   │   └── webhooks/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── main-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   └── sidebar.tsx
│   ├── public/                   # Public site components
│   │   ├── hero-section.tsx
│   │   ├── news-card.tsx         # News headline card with FB link
│   │   ├── tourism-card.tsx      # Photo teaser card with FB link
│   │   ├── service-card.tsx
│   │   ├── official-card.tsx
│   │   ├── department-card.tsx
│   │   ├── barangay-card.tsx
│   │   ├── document-card.tsx
│   │   ├── job-card.tsx
│   │   └── announcement-banner.tsx
│   ├── admin/                    # Admin panel components
│   │   ├── content-editor.tsx
│   │   ├── media-picker.tsx
│   │   ├── document-uploader.tsx
│   │   ├── facebook-link-input.tsx
│   │   └── analytics-chart.tsx
│   └── shared/                   # Shared components
│       ├── search-box.tsx
│       ├── breadcrumb.tsx
│       ├── pagination.tsx
│       └── social-links.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   ├── admin.ts              # Admin client
│   │   └── middleware.ts         # Auth middleware
│   ├── actions/                  # Server Actions
│   │   ├── pages.ts
│   │   ├── news.ts
│   │   ├── services.ts
│   │   ├── documents.ts
│   │   ├── officials.ts
│   │   ├── departments.ts
│   │   ├── barangays.ts
│   │   ├── tourism.ts
│   │   ├── jobs.ts
│   │   └── users.ts
│   ├── utils/
│   │   ├── cn.ts                 # Class name utility
│   │   ├── format.ts             # Date/number formatting
│   │   └── validators.ts         # Zod schemas
│   └── constants/
│       ├── navigation.ts         # Navigation menu config
│       ├── departments.ts        # Monkayo departments
│       └── barangays.ts          # Monkayo barangays
├── hooks/                        # Custom React hooks
│   ├── use-user.ts
│   ├── use-search.ts
│   └── use-media-query.ts
├── types/                        # TypeScript types
│   ├── database.types.ts         # Supabase generated types
│   ├── content.ts
│   └── user.ts
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── officials/
│   │   └── tourism/
│   └── documents/                # Static documents
├── supabase/
│   ├── migrations/               # Database migrations
│   ├── seed.sql                  # Seed data
│   └── config.toml
├── .env.local
├── .env.example
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## 🗃️ Database Schema

> **Full SQL Schema**: See `supabase-schema.sql` for complete implementation

### Database Tables Overview

| Category              | Tables                                                                                     | Purpose                     |
| --------------------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| **Homepage**          | `hero_slides`, `vision_mission`, `logo_section`, `footer_config`, `faqs`, `homepage_news`  | Landing page content        |
| **About Monkayo**     | `history`, `history_images`, `organizational_structure`, `elected_officials`, `committees` | Municipal information       |
| **Directory**         | `departments`, `barangays`                                                                 | Contact directories         |
| **e-Services**        | `eservices`                                                                                | Online service documents    |
| **Full Disclosure**   | `disclosure_documents`                                                                     | Budget & procurement        |
| **Citizen's Charter** | `citizens_charter`                                                                         | Services & process flows    |
| **News**              | `news`                                                                                     | Press releases & advisories |
| **Tourism**           | `tourism`, `tourism_images`                                                                | Places & events             |
| **Downloads**         | `documents`                                                                                | EOs, MOs, Ordinances, Forms |
| **Opportunities**     | `job_vacancies`                                                                            | Job listings                |
| **Contact**           | `contact_info`, `contact_submissions`                                                      | Contact page & form         |
| **System**            | `users`, `media`, `site_settings`, `audit_logs`                                            | CMS management              |

### Key Design Decisions

1. **Enum Types** - Used for categories to ensure data consistency
2. **Soft Deletes** - `is_active` flags instead of hard deletes
3. **Content Status** - `draft`, `published`, `archived` workflow
4. **Multiple Images** - Separate tables for history_images and tourism_images
5. **Facebook Integration** - `facebook_link` fields for social media content
6. **File Tracking** - `file_url`, `file_name`, `file_size` for all uploads
7. **Audit Trail** - `created_by`, `created_at`, `updated_at` on all tables
8. **Sort Order** - `sort_order` field for manual content ordering

### Enum Types

```sql
-- User roles
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer');

-- Content status
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Document categories
CREATE TYPE document_category AS ENUM ('executive_order', 'memorandum_order', 'municipal_ordinance', 'other_form');

-- e-Services categories
CREATE TYPE eservice_category AS ENUM ('new_business_application', 'renewal', 'civil_registry');

-- Disclosure categories
CREATE TYPE disclosure_category AS ENUM ('annual_budget', 'procurement_bid');

-- Charter categories
CREATE TYPE charter_category AS ENUM ('frontline_services', 'process_flow');

-- News categories
CREATE TYPE news_category AS ENUM ('press_release', 'advisory_announcement');

-- Tourism categories
CREATE TYPE tourism_category AS ENUM ('places_to_visit', 'festivals_events');
```

### Core Tables Summary

```sql
-- HOMEPAGE
hero_slides          -- Carousel images (title, subtitle, image_url, link_url, sort_order)
vision_mission       -- Single row (vision, mission, goals)
logo_section         -- Partner/government logos
footer_config        -- Footer sections configuration
faqs                 -- FAQ items (question, answer)
homepage_news        -- Facebook embed links for homepage

-- ABOUT MONKAYO
history              -- History entries (title, narrative)
history_images       -- Multiple images per history entry
organizational_structure  -- Org chart (name, title, picture, parent_id for hierarchy)
elected_officials    -- Officials (name, title, picture, term dates)
committees           -- Committees (name, title, picture, members[])

-- DIRECTORY
departments          -- Departments (name, facebook_link, email, contact_numbers[])
barangays            -- Barangays (name, captain_name, facebook_link, email, contact_numbers[])

-- E-SERVICES
eservices            -- Service documents (title, category, file_url)

-- FULL DISCLOSURE
disclosure_documents -- Budget/Procurement docs (title, category, fiscal_year, file_url)

-- CITIZEN'S CHARTER
citizens_charter     -- Services/Process flows (title, description, category, file_url)

-- NEWS
news                 -- Press releases/Advisories (title, narrative, facebook_link, category)

-- TOURISM
tourism              -- Places/Events (title, narrative, facebook_link, category)
tourism_images       -- Multiple images per tourism entry

-- DOWNLOADS
documents            -- All downloadable docs (title, category, document_number, file_url)

-- OPPORTUNITIES
job_vacancies        -- Job listings (title, file_url, facebook_link, deadline)

-- CONTACT
contact_info         -- Contact details (label, email, contact_numbers[], address)
contact_submissions  -- Form submissions (name, email, message, status)

-- SYSTEM
users                -- Admin users (email, full_name, role)
media                -- Media library (file_name, file_url, file_type)
site_settings        -- Global settings (key-value pairs)
audit_logs           -- Activity tracking
```

### Row Level Security (RLS)

```sql
-- Public can view published/active content
-- Admins have full CRUD access
-- Super admins can manage users

-- Helper function
CREATE FUNCTION public.is_admin() RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid()
        AND role IN ('super_admin', 'admin', 'editor')
        AND is_active = true
    );
$$ LANGUAGE sql SECURITY DEFINER;
```

---

## 🎨 Design System

### Color Palette

```css
:root {
  /* Primary - Philippine Flag Blue */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #0038a8; /* Official PH Blue */
  --primary-600: #002d8a;
  --primary-700: #00236d;

  /* Secondary - Philippine Flag Red */
  --secondary-500: #ce1126; /* Official PH Red */
  --secondary-600: #a80d1e;

  /* Accent - Philippine Flag Yellow */
  --accent-500: #fcd116; /* Official PH Yellow */
  --accent-600: #d4a90d;

  /* Neutral */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;

  /* Status */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### Typography

```css
/* Font Stack */
--font-sans: "Inter", "Segoe UI", system-ui, sans-serif;
--font-display: "Plus Jakarta Sans", var(--font-sans);

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
```

### Component Guidelines

- **Buttons**: Rounded corners (8px), clear hover/active states
- **Cards**: Subtle shadow, white background, 16px padding
- **Forms**: Clear labels, helpful error messages, accessible focus states
- **Navigation**: Sticky header, hamburger menu on mobile
- **Tables**: Zebra striping, sortable columns for data tables

---

## 🔐 Security Guidelines

### Authentication

- Supabase Auth with email/password
- Optional: Social login (Google) for admin users
- Session timeout: 24 hours (configurable)
- Password requirements: Min 8 chars, uppercase, lowercase, number

### Authorization (Role-Based Access) - ✅ IMPLEMENTED

| Role     | Capabilities                                                | Status         |
| -------- | ----------------------------------------------------------- | -------------- |
| `admin`  | Full system access, user management, settings, content CRUD | ✅ Implemented |
| `staff`  | Content creation, editing, and publishing                   | ✅ Implemented |
| `client` | Public user (limited/no admin access)                       | ✅ Implemented |

**Note:** The implemented schema uses a simplified 3-role system (client/staff/admin) instead of the originally planned 5-role system (super_admin/admin/editor/contributor/viewer). This was chosen for simplicity and can be expanded in future migrations if more granular permissions are needed.

**Original Design (Not Implemented):**

- `super_admin` - Full system access, user management, settings
- `admin` - Content management, user management (except super_admin)
- `editor` - Create, edit, publish content
- `contributor` - Create, edit own content (requires approval)
- `viewer` - View dashboard, read-only access

### Data Protection

- All forms protected with CSRF tokens
- Rate limiting on API endpoints (100 req/min)
- Input sanitization for all user inputs
- SQL injection prevention (parameterized queries via Supabase)
- XSS prevention (content sanitization)
- File upload validation (type, size limits)

### Compliance

- Data Privacy Act of 2012 (RA 10173) compliance
- FOI (Freedom of Information) compliance
- Government website standards compliance

---

## ⚡ Performance Requirements

### Page Load Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

### Optimization Strategies

- Next.js Image optimization
- Static generation for public pages
- Incremental Static Regeneration (ISR) for dynamic content
- Edge caching via Vercel/Cloudflare
- Lazy loading for below-fold content
- Code splitting and dynamic imports
- Database query optimization with proper indexes

### Mobile Optimization

- Mobile-first responsive design
- Touch-friendly tap targets (min 44x44px)
- Offline support for critical pages (PWA)
- Reduced data usage for slow connections

---

## 📱 Key Features

### Public Website

#### Homepage

- Hero section with LGU Monkayo branding
- Mayor's message or welcome banner
- Quick links to common services (e-Services, Downloads)
- Latest News headlines (3-5 items, linking to Facebook)
- Upcoming events/festivals
- Emergency hotlines
- Weather widget (optional)
- Facebook page feed integration

#### About Monkayo

- **History** - Municipality history and heritage
- **Organizational Structure** - Government structure chart
- **Elected Officials** - Mayor, Vice Mayor, Councilors with photos and info
- **Committees** - Committee assignments and members

#### Directory

- **Departments** - All municipal departments with:
  - Department name and description
  - Contact number
  - Email address
  - Facebook page link
  - Office location/hours
- **Barangays** - All 25 barangays with:
  - Barangay name
  - Captain name
  - Contact number
  - Email address
  - Facebook page link

#### e-Services

- **New Business Application** - Requirements, process flow, fees, online form link
- **Renewal** - Business permit renewal process
- **Civil Registry Services** - Birth, death, marriage certificates

#### Full Disclosure Policy

- **Annual Budget** - Yearly budget documents (downloadable PDF)
- **Procurement/Bid Notices** - Current and past procurement documents

#### Citizen's Charter

- **Frontline Services** - List of all public-facing services with:
  - Service name
  - Requirements checklist
  - Step-by-step process
  - Processing time
  - Fees
- **Process Flow** - Visual flowcharts for common services

#### News

- **Press Releases** - Headline only with direct link to Facebook post
- **Public Advisories/Announcements** - Headline only with direct link to Facebook post
- Filterable by type
- Search functionality

#### Tourism

- **Places to Visit** - Photo teaser cards linking to Facebook posts
- **Local Festivals/Events** - Annual events and celebrations
- Photo gallery integration

#### Downloads

- **Executive Orders** - Numbered and dated, downloadable PDF
- **Memorandum Orders** - Numbered and dated, downloadable PDF
- **Municipal Ordinances** - Numbered and dated, downloadable PDF
- **Other Forms** - Application forms, request forms, etc.
- Search and filter by year, type
- Download counter

#### Opportunities

- **Job Vacancies** - Current openings with:
  - Position title
  - Department
  - Salary grade
  - Qualifications
  - Application deadline
  - How to apply

#### Contact Us

- Contact form (name, email, phone, subject, message)
- Municipal hall address
- Contact numbers per department
- Email addresses
- Interactive map (optional)
- Office hours

### Admin Panel (CMS)

#### Dashboard

- Content statistics (pages, news, documents)
- Recent activity feed
- Quick actions (Add news, Upload document)
- Pending items notification
- Contact submissions overview

#### Content Management

- **Pages** - History, org structure, committees
- **News** - Add headline + Facebook link
- **Officials** - Manage elected officials
- **Departments** - CRUD with Facebook links
- **Barangays** - CRUD with Facebook links
- **Services** - e-Services management
- **Citizen's Charter** - Service process flows
- **Tourism** - Places and events with Facebook links
- **Documents** - Upload and categorize downloads
- **Job Vacancies** - Post and manage openings
- **Disclosure** - Budget and procurement documents

#### Media Library

- Image upload and management
- Organize by folders
- Bulk upload support

#### User Management

- User CRUD operations
- Role assignment
- Activity logs per user

#### Settings

- Site information (name, logo, seal)
- Social media links (especially Facebook)
- Contact information
- SEO defaults

---

## 🔗 Facebook Integration Notes

Since LGU Monkayo heavily uses Facebook for news and updates, the CMS is designed to:

1. **News/Press Releases** - Store headline + Facebook post URL only (no full content duplication)
2. **Tourism Places** - Photo teaser + Facebook post URL for full details
3. **Department/Barangay Profiles** - Include Facebook page links for direct communication
4. **Benefits**:
   - Reduces content management workload (single source of truth on Facebook)
   - Drives traffic to official Facebook page
   - Citizens already familiar with Facebook interface
   - Real-time engagement through Facebook comments/reactions

### Implementation Pattern

```typescript
// Example: News card component
interface NewsItem {
  id: string;
  headline: string;
  excerpt?: string;
  featured_image?: string;
  news_type: "press_release" | "advisory" | "announcement";
  facebook_post_link: string; // Required - opens in new tab
  published_at: string;
}

// On click → window.open(facebook_post_link, '_blank')
```

---

## 🧪 Testing Strategy

### Unit Tests

- Utility functions
- Form validation
- Data transformations

### Integration Tests

- API routes
- Database operations
- Authentication flows

### E2E Tests (Playwright)

- Critical user journeys:
  - Homepage load
  - Service search and view
  - Document download
  - Contact form submission
  - Admin login and content creation

### Accessibility Testing

- Automated (axe-core)
- Manual keyboard navigation
- Screen reader testing

---

## 📅 Development Phases

### Phase 1: Foundation (Weeks 1-3)

- [ ] Project setup (Next.js, Tailwind, shadcn/ui)
- [ ] Supabase setup and database schema
- [ ] Authentication system
- [ ] Basic layout components (header, footer, navigation)
- [ ] Admin panel shell

### Phase 2: Core CMS (Weeks 4-6)

- [ ] Page management (CRUD)
- [ ] Post management (news, announcements)
- [ ] Rich text editor integration
- [ ] Media library
- [ ] Basic public pages

### Phase 3: Government Features (Weeks 7-9)

- [ ] Services directory
- [ ] Officials directory
- [ ] Department pages
- [ ] Barangay directory
- [ ] Document management
- [ ] Transparency section

### Phase 4: Enhancement (Weeks 10-12)

- [ ] Search functionality
- [ ] Contact/feedback system
- [ ] Tourism section
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Performance optimization

### Phase 5: Polish & Deploy (Weeks 13-14)

- [ ] Testing and bug fixes
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Documentation
- [ ] Staff training
- [ ] Production deployment

---

## 📝 Coding Standards

### TypeScript

- Strict mode enabled
- No `any` types without justification
- Interface over type for object shapes
- Proper error handling with typed errors

### React/Next.js

- Functional components only
- Custom hooks for reusable logic
- Server Components by default
- Client Components only when needed
- Proper loading and error states

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Pages: `page.tsx` (Next.js convention)
- Types: `kebab-case.types.ts`

### Git Workflow

- Branch naming: `feature/`, `fix/`, `hotfix/`
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- PR required for main branch
- Code review before merge

---

## 🚀 Deployment

### Environments

| Environment | Branch    | URL                    |
| ----------- | --------- | ---------------------- |
| Development | `develop` | dev.monkayo.gov.ph     |
| Staging     | `staging` | staging.monkayo.gov.ph |
| Production  | `main`    | www.monkayo.gov.ph     |

### Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://monkayo.gov.ph
NEXT_PUBLIC_APP_NAME="LGU Monkayo"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Resend)
RESEND_API_KEY=your-resend-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
SENTRY_DSN=your-sentry-dsn
```

---

## 📚 Reference Links

### Government Standards

- [Philippine Government Official Gazette](https://www.officialgazette.gov.ph/)
- [DICT Government Website Standards](https://dict.gov.ph/)
- [FOI Philippines](https://foi.gov.ph/)

### Technical Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Design Inspiration

- [Philippine Government Portal](https://www.gov.ph/)
- [City of Davao Official Website](https://www.davaocity.gov.ph/)

---

## 👥 Team & Contacts

### Development Team

- **Project Lead**: [Aljon Moliva]
- **Frontend Developer**: [Aljon Moliva]
- **Backend Developer**: [Aljon Moliva]
- **UI/UX Designer**: [Aljon Moliva]

### LGU Monkayo Stakeholders

- **Project Sponsor**: [Name/Position]
- **Content Manager**: [Name/Position]
- **IT Liaison**: [Name/Position]

---

## 📄 License

This project is developed for the Local Government Unit of Monkayo, Davao de Oro, Philippines.

---

_Last Updated: December 2025_
_Version: 1.0.0_

## 🚨 Critical Rules

1. **Always regenerate types after schema changes**
2. **Use Server Components by default, Client Components when needed**
3. **Separate server and client Supabase instances**
4. **Use `after()` for non-blocking operations**
5. **Enable RLS on all tables**
6. **Compose UI with shadcn/ui components**
7. **Validate environment variables with Zod**
8. **Use Server Actions for mutations**
9. **Implement proper error boundaries**
10. **Stream data with Suspense for better UX**
11. **Test business logic, not implementation details**
