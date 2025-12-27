# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LGU Monkayo CMS - A government website and content management system for the Local Government Unit of Monkayo, Davao de Oro, Philippines. Built with Next.js 16, Supabase, and shadcn/ui.

## Commands

```bash
# Development
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Production build
npm run lint             # Run ESLint

# Database (Supabase local)
npm run db:start         # Start local Supabase (ports 54321-54324)
npm run db:stop          # Stop local Supabase
npm run db:push          # Apply new migrations (SAFE - preserves data)
npm run db:types         # Regenerate TypeScript types from schema
npm run db:status        # Check migration status
npm run db:reset         # DANGER: Drops ALL data, recreates from scratch

# Testing (Playwright)
npm run test             # Run all tests
npm run test:ui          # Interactive test UI
npm run test:headed      # Run tests with visible browser
```

## Architecture

### Route Groups
- `app/(cms)/` - Admin CMS dashboard and content management
- `app/(auth)/` - Authentication pages (signin, signup)
- `app/about/` - Public about pages (elected officials, etc.)
- `app/page.tsx` - Public homepage

### Key Directories
- `components/ui/` - shadcn/ui components (don't modify directly)
- `components/cms/` - Reusable CMS components (data-table, form-dialog, image-upload)
- `components/homepage/` - Homepage section components
- `components/layout/` - Public site layout (public-header, public-footer, public-layout)
- `components/public/` - Public page components (elected-officials org chart)
- `lib/supabase/` - Supabase clients (client.ts for browser, server.ts for server)
- `lib/actions/` - Server Actions for database operations
- `lib/context/` - React contexts (branding)
- `types/supabase.ts` - Auto-generated database types (via `npm run db:types`)
- `supabase/migrations/` - SQL migration files

### Supabase Client Pattern
```typescript
// Server Components / Server Actions
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

// Client Components
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

### CMS Page Pattern
Each CMS content section follows this structure:
```
app/(cms)/content/{section}/
  page.tsx           # Server component fetching data
  {item}-table.tsx   # Client component with DataTable
  {item}-dialog.tsx  # Client component for create/edit forms
```

## Critical Rules

### Database & Infrastructure
1. **Database migrations**: NEVER use `npm run db:reset` unless you want to wipe all data. Use `npm run db:push` for new migrations.
2. **Regenerate types**: Always run `npm run db:types` after schema changes.
3. **RLS**: All tables have Row Level Security. Public can view published content; authenticated admins can CRUD.

### Next.js & React
4. **Server vs Client components**: Use Server Components by default. Add `'use client'` only for interactivity (useState, event handlers).
5. **Supabase clients**: Use `server.ts` in Server Components/Actions, `client.ts` in Client Components.
6. **Image uploads**: Use the `ImageUpload` component from `components/cms/image-upload.tsx` with Supabase Storage utilities from `lib/supabase/storage.ts`.

### Code Quality & Best Practices
7. **Separation of Concerns**: Keep logic, UI, and data fetching separate.
   - Server Actions (`lib/actions/`) handle all database operations
   - Components handle UI rendering only
   - Types/interfaces in `types/` or colocated with features
   - Utilities in `lib/utils.ts` or domain-specific files

8. **Single Responsibility**: Each function/component should do one thing well.
   - Split large components into smaller, focused ones
   - Extract reusable logic into custom hooks (`hooks/`)
   - Keep Server Actions focused on single operations

9. **DRY (Don't Repeat Yourself)**: Extract common patterns.
   - Reusable UI → `components/cms/` or `components/ui/`
   - Shared logic → `lib/` or custom hooks
   - Common types → `types/`

10. **Type Safety**: Use TypeScript strictly.
    - No `any` types without justification
    - Use generated Supabase types from `types/supabase.ts`
    - Define explicit return types for functions

11. **Error Handling**: Always handle errors gracefully.
    - Wrap database operations in try/catch
    - Provide meaningful error messages
    - Use toast notifications for user feedback

## Naming Conventions

### Files & Folders
| Type | Convention | Example |
|------|------------|---------|
| Components | `kebab-case.tsx` | `hero-carousel.tsx`, `data-table.tsx` |
| Pages | `page.tsx` (Next.js) | `app/(cms)/dashboard/page.tsx` |
| Server Actions | `kebab-case.ts` | `lib/actions/homepage.ts` |
| Utilities | `kebab-case.ts` | `lib/utils.ts` |
| Types | `kebab-case.ts` | `types/supabase.ts` |
| Hooks | `use-{name}.ts` | `hooks/use-media-query.ts` |

### Folders
| Folder | Purpose | Naming |
|--------|---------|--------|
| `app/(group)/` | Route groups | `(cms)`, `(auth)`, `(public)` |
| `app/{route}/` | URL routes | `dashboard`, `about`, `signin` |
| `components/{domain}/` | Domain components | `cms`, `homepage`, `layout`, `public` |
| `lib/actions/` | Server Actions by domain | `homepage.ts`, `about.ts`, `news.ts` |

### Code
| Type | Convention | Example |
|------|------------|---------|
| Components | `PascalCase` | `HeroCarousel`, `DataTable` |
| Functions | `camelCase` | `getHeroSlides`, `createOfficial` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_FILE_SIZE`, `API_URL` |
| Types/Interfaces | `PascalCase` | `HeroSlide`, `Official` |
| Database tables | `snake_case` | `hero_slides`, `elected_officials` |
| CSS classes | Tailwind utilities | `flex items-center gap-4` |

### Component File Structure
```tsx
// 1. Imports (external, then internal, then types)
'use client'; // if needed

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Official } from '@/types/supabase';

// 2. Types/Interfaces (if not imported)
interface OfficialCardProps {
  official: Official;
  onEdit?: (id: string) => void;
}

// 3. Component
export function OfficialCard({ official, onEdit }: OfficialCardProps) {
  // hooks first
  const [isOpen, setIsOpen] = useState(false);

  // handlers
  const handleEdit = () => onEdit?.(official.id);

  // render
  return (
    <div>...</div>
  );
}
```

## Database Migration Workflow

```bash
# 1. Create migration file: supabase/migrations/YYYYMMDDHHMMSS_description.sql
# 2. Apply migration
npm run db:push
# 3. Regenerate types
npm run db:types
# 4. Verify
npm run db:status
```

Migration naming: `YYYYMMDDHHMMSS_description.sql` (e.g., `20251225000001_add_column_to_users.sql`)

## Tech Stack

- **Framework**: Next.js 16.0.8 (App Router, TypeScript)
- **React**: 19.2.1
- **Styling**: Tailwind CSS 4
- **UI**: shadcn/ui + Radix UI primitives
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth (email/password, magic link)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React + Tabler Icons
- **Animations**: Framer Motion

## Database Schema Overview

Key tables by category:
- **Homepage**: `hero_slides`, `homepage_news`, `logo_section`, `faqs`, `vision_mission`, `flagship_programs`
- **About**: `elected_officials`, `elected_officials_backgrounds`, `organizational_structure`, `committees`, `history`
- **Directory**: `departments`, `barangays`
- **Content**: `news`, `tourism`, `documents`, `eservices`, `disclosure_documents`, `citizens_charter`, `job_vacancies`
- **System**: `users`, `site_settings`, `media`, `menus`, `audit_logs`

User roles: `admin`, `staff`, `client` (simplified 3-role system)

## Common Patterns

### Server Action
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createItem(data: InsertType) {
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from('table_name')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  revalidatePath('/path');
  return result;
}
```

### CMS Table Page
```typescript
// page.tsx (Server Component)
import { createClient } from '@/lib/supabase/server';
import { ItemsTable } from './items-table';

export default async function ItemsPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });

  return <ItemsTable items={items ?? []} />;
}
```

## Storage Buckets

- `hero-slides` - Hero carousel images
- `logos` - Partner/government logos
- `officials` - Elected official photos
- `branding` - Site logos and branding assets

Use `uploadImage()` and `deleteImage()` from `lib/supabase/storage.ts`.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For local development, Supabase CLI provides these automatically when running `npm run db:start`.
