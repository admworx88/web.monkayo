# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

🏛️ LGU Monkayo CMS Website
A modern, accessible, and citizen-centric Content Management System for the Local Government Unit of Monkayo, Davao de Oro, Philippines.

## Vision

Build a transparent, user-friendly, and mobile-responsive government website that serves as the digital gateway for constituents to access public services, information, and engage with their local government.

## Mission

Deliver a modern CMS platform that empowers LGU Monkayo staff to manage content efficiently while providing citizens with seamless access to government services, news, and official documents.

## Tech Stack

- **Framework**: Next.js 16.0.8 (App Router)
- **Backend**: Supabase (local development via CLI)
- **Styling**: Tailwind CSS 4 (with PostCSS)
- **Language**: TypeScript 5 (strict mode enabled)
- **Fonts**: Geist Sans and Geist Mono from `next/font/google`

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Supabase Local Development

The project uses Supabase CLI for local database management:

```bash
# Start local Supabase instance
npm run db:start

# Stop local Supabase instance
npm run db:stop

# Reset database (applies migrations and seeds)
npm run db:reset

# Generate TypeScript types from database schema
# Output: types/supabase.ts
npm run db:types

# Push database changes
npm run db:push

# Check Supabase services status
npm run db:status
```

### Supabase Configuration

- **API Port**: 54421
- **Database Port**: 54422
- **Studio Port**: 54423 (web interface at http://127.0.0.1:54423)
- **Inbucket Port**: 54424 (email testing at http://127.0.0.1:54424)
- **Site URL**: http://127.0.0.1:3000
- **Database Version**: PostgreSQL 17
- **API Schemas**: `public`, `graphql_public`

Database migrations are located in `supabase/migrations/` and seeds in `supabase/seed.sql`.

**Auth Callback**: Magic link and OAuth flows use `app/api/auth/callback/route.ts` to handle redirects.

## Architecture

### Path Aliases

TypeScript paths are configured with `@/*` mapping to the root directory, allowing imports like:

```typescript
import { Component } from "@/app/components/Component";
```

### Route Group Organization

The project uses Next.js route groups to separate concerns:

- **`(auth)`** - Authentication pages (signin, signup) with centered layout and theme toggle
- **`(cms)`** - CMS dashboard area with sidebar navigation
- **Root** - Public landing page with marketing sections

Each route group has its own `layout.tsx` that applies only to routes within that group.

**Root Layout** (`app/layout.tsx`):
- Configures `ThemeProvider` with dark mode as default
- Loads Geist Sans and Geist Mono fonts
- Includes global `Toaster` component for notifications

### Supabase Client Architecture

The project follows Supabase SSR best practices with three separate client instances:

**Server-side (lib/supabase/server.ts)**

- Uses `createServerClient` from `@supabase/ssr`
- Accesses Next.js cookies API (`next/headers`)
- For Server Components, Server Actions, and Route Handlers
- Type-safe with `Database` type from generated types

**Client-side (lib/supabase/client.ts)**

- Uses `createBrowserClient` from `@supabase/ssr`
- For Client Components only
- Simpler implementation without cookie handling

**Middleware (lib/supabase/middleware.ts)**

- Exports `updateSession()` function for Next.js middleware
- Refreshes auth tokens and manages session state
- Returns both the response and user object

### Component Organization

```
components/
├── auth/          # Authentication forms and OAuth buttons
├── dashboard/     # Dashboard-specific components
├── landing/       # Landing page sections (hero, benefits, pricing, etc.)
├── theme/         # Theme toggle component
└── ui/            # shadcn/ui components (installed via shadcn CLI)
```

### UI Library

This project uses **shadcn/ui** components configured with:

- Style: `new-york`
- Base color: `neutral`
- Icon library: `lucide-react`
- RSC support enabled
- CSS variables for theming (via `next-themes`)

Install new components with: `npx shadcn@latest add <component-name>`

### Key Dependencies

- **Forms**: `react-hook-form` with `@hookform/resolvers` and `zod` validation
- **Tables**: `@tanstack/react-table` for data tables
- **Drag & Drop**: `@dnd-kit/*` for sortable interfaces
- **Charts**: `recharts` for data visualization
- **Notifications**: `sonner` for toast messages
- **Themes**: `next-themes` for dark mode support (default: dark mode)

### Server Actions Pattern

Authentication and mutations are handled via Server Actions (marked with `'use server'`):

**Location**: Colocated with route groups in `actions.ts` files
- `app/(auth)/actions.ts` - Authentication actions (signIn, signUp, signOut, magic link)
- `app/(cms)/dashboard/actions.ts` - Dashboard-specific actions

**Pattern**:
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function myAction(formData: FormData) {
  const supabase = await createClient();
  // ... perform action
  revalidatePath('/', 'layout');
  redirect('/destination');
}
```

All Server Actions use the server Supabase client and handle revalidation/redirects.

### Type Generation

After modifying the Supabase database schema, always regenerate types:

```bash
npm run db:types
```

This generates TypeScript types in `types/supabase.ts` based on the local database schema.

### Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54421
NEXT_PUBLIC_SUPABASE_ANON_KEY=<generated-by-supabase-start>
```

These are automatically set when running `npm run db:start`. Check with `npm run db:status` or `npx supabase status -o env`.

## Database Schema

### User System

The project extends Supabase auth with a custom `public.users` table:

**User Roles** (enum: `user_role`):
- `client` - End users/citizens
- `staff` - LGU staff members (default)
- `admin` - System administrators

**`public.users` table**:
- Links to `auth.users` via foreign key on `id`
- Fields: `first_name`, `last_name`, `email`, `avatar_url`, `role`
- Automatic profile creation on signup via database trigger `on_auth_user_created`
- Auto-updating `updated_at` timestamp via trigger

**Row Level Security (RLS)**:
- All users can view all profiles (`SELECT`)
- Users can only update/insert their own profile (`auth.uid() = id`)

### Migration Workflow

Migrations are located in `supabase/migrations/` with timestamp-based naming:
- `20251210000000_create_user_role_enum.sql`
- `20251210000001_create_users_table.sql`

Always create migrations in sequence to maintain proper dependency order.

## Configuration Files

- **tsconfig.json**: Strict TypeScript with ES2017 target, JSX transform using `react-jsx`
- **next.config.ts**: Next.js configuration (currently minimal)
- **eslint.config.mjs**: ESLint with Next.js core-web-vitals and TypeScript configs
- **supabase/config.toml**: Complete Supabase local configuration (auth, storage, realtime, etc.)
- **components.json**: shadcn/ui configuration (new-york style, neutral base color)

## Supabase Features Enabled

- **Auth**: Email confirmations disabled for local dev, JWT expiry 1 hour
- **Storage**: 50MiB file size limit
- **Realtime**: Enabled for live database changes
- **Studio**: Available at http://127.0.0.1:54323
- **Inbucket**: Email testing interface for auth emails
- **Edge Functions**: Enabled with Deno 2, hot reload via `per_worker` policy

## Important Notes

- Always run `npm run db:start` before local development to ensure Supabase services are running
- The project uses React 19.2.1 with the new JSX transform
- Tailwind CSS 4 uses native CSS processing via PostCSS
- Environment variables should go in `.env*` files (excluded from git)

### Local Development Email Testing

Auth emails (magic links, confirmations) are intercepted by Inbucket in local development:
- Access Inbucket at http://127.0.0.1:54424
- All emails sent locally appear in the Inbucket inbox
- No actual emails are sent during local development
- Magic link auth actions include helpful reminder about checking Inbucket

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
