# ritmeLab Website — Implementation Progress

**Project:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
**Repository:** https://github.com/2142kk/ritme-website
**Start Date:** June 19, 2026

---

## Executive Summary

Core infrastructure and authentication framework complete. Database connected with seed data loaded. Dynamic content fetching implemented. Ready for remaining feature work (products section, admin panel, legal pages, production config).

---

## Implementation Status

### ✅ Step 1 — Database Connection
**Status:** COMPLETE

**Deliverables:**
- [lib/db.ts](lib/db.ts) — PostgreSQL connection pool using `pg` library
- Database URL configured via `.env.local`
- Connection pooling with error handling

**Database Schema:**
- [db/migrations/001_initial.sql](db/migrations/001_initial.sql) — All tables created
  - `admin_users` — Authentication
  - `leads` — Contact form submissions
  - `case_studies` — Case study content
  - `products` — Product catalog
  - `site_content` — Dynamic homepage content
  - `site_settings` — Global settings

**Seed Data:**
- [db/seed.sql](db/seed.sql) — Initial data loaded
  - 1 admin user (email: admin@ritmelab.io, password: admin123)
  - 3 published case studies
  - 6 products (1 available, 5 coming soon)
  - Hero section content

---

### ✅ Step 2 — Authentication
**Status:** COMPLETE

**Deliverables:**
- [auth.ts](auth.ts) — NextAuth.js v5 credentials provider
  - Email/password validation against `admin_users` table
  - bcrypt password comparison
  - JWT session strategy
  - Custom callbacks for user/session handling

- [app/api/auth/[...nextauth]/route.ts](app/api/auth/[...nextauth]/route.ts) — NextAuth API route

- [middleware.ts](middleware.ts) — Route protection
  - Protects `/admin/*` routes
  - Redirects unauthenticated users to `/admin/login`
  - Allows public access to `/admin/login`

- [app/admin/login/page.tsx](app/admin/login/page.tsx) — Login page
  - Email/password form
  - Error handling with toast notifications
  - Redirect to dashboard on success

- [components/admin/sidebar.tsx](components/admin/sidebar.tsx) — Admin sidebar navigation
  - 6 admin sections (Dashboard, Leads, Case Studies, Products, Content, Settings)
  - Mobile-responsive with hamburger menu
  - Logout button

- [types/next-auth.d.ts](types/next-auth.d.ts) — TypeScript type definitions

**Testing Credentials:**
- Email: `admin@ritmelab.io`
- Password: `admin123` (change after first login)

---

### ✅ Step 3 — File Upload
**Status:** COMPLETE

**Deliverables:**
- [app/api/upload/route.ts](app/api/upload/route.ts) — File upload endpoint
  - Accepts multipart form data
  - Validates file types (jpg, png, webp)
  - Enforces 5MB max file size
  - Generates unique filenames
  - Saves to `public/uploads` directory
  - Returns public URL

- [components/image-upload.tsx](components/image-upload.tsx) — Reusable upload component
  - Drag-and-drop support
  - File preview
  - Remove/replace functionality
  - Error handling with toast notifications
  - Used in admin panel for case studies/products

**Configuration:**
- Upload directory: `./public/uploads` (development)
- Public URL: `/uploads`
- Max file size: 5MB
- Allowed types: JPEG, PNG, WebP

---

### ✅ Step 4 — Contact Form API
**Status:** COMPLETE

**Deliverables:**
- [app/api/contact/route.ts](app/api/contact/route.ts) — Contact form endpoint
  - Validates input with Zod schema
  - Saves submissions to `leads` table with status `new`
  - Sends email notification via Resend
  - Includes detailed error handling

- [components/contact.tsx](components/contact.tsx) — Updated contact form
  - Calls `/api/contact` endpoint instead of simulating submission
  - Error handling with toast notifications
  - Success feedback with automatic reset

**Fields Validated:**
- `name` (required, max 255 chars)
- `email` (required, valid email format)
- `company` (optional, max 255 chars)
- `message` (required)

**Email Notification:**
- To: `NOTIFICATION_EMAIL` env var
- Subject: "New Lead from ritmeLab Website"
- Includes all lead details and timestamp

---

### ✅ Step 5 — Public Site — Dynamic Content
**Status:** COMPLETE

**Deliverables:**
- [components/case-studies.tsx](components/case-studies.tsx) — Database-driven case studies
  - Fetches from `case_studies` table
  - Only shows published content (`is_published = true`)
  - Sorted by `display_order`
  - Graceful fallback to hardcoded data if DB empty

- [components/hero.tsx](components/hero.tsx) — Database-driven hero section
  - Fetches `headline` and `subheadline` from `site_content` table
  - Server component for data fetching
  - Graceful fallback to defaults

- [components/hero-client.tsx](components/hero-client.tsx) — Client component for animations
  - Fade-in animation on mount
  - Client-side interactivity

**Content Sources:**
- Case studies: `site_content` with `section='hero'`
- Featured CTA buttons
- All sections respect `is_published` flag

---

## 📋 Remaining Steps

### ⏳ Step 6 — Products Section on Homepage
**Status:** NOT STARTED

**Requirements:**
- New Products section between Process and Case Studies
- Section number: `[05]`
- Title: "What We've Built"
- Fetch from `products` table (where `is_published = true`)
- Display Qrazey as featured (status: `available`) with link
- Show remaining 5 with "Coming Soon" badge
- Maintain existing design language

**Deliverables Needed:**
- Create `components/products.tsx`
- Update `app/page.tsx` to include Products section
- Update section numbering (Case Studies → `[06]`, Contact → `[07]`)
- Add "Products" link to header nav

---

### ⏳ Step 7 — Qrazey Product Page
**Status:** NOT STARTED

**Requirements:**
- Create `app/products/qrazey/page.tsx`
- Static page (no DB needed)
- Same design language as homepage
- Include Header and Footer components

**Sections:**
1. **Hero**
   - Eyebrow: "A ritmeLab Product"
   - Title: "QR codes that work harder"
   - Subtitle: Defined in prompt

2. **Features** (3 cards)
   - Generate
   - Customize
   - Track

3. **Pricing** (3 tiers)
   - Free
   - Pay-as-you-go
   - Business

4. **CTA**
   - Heading: "Ready to create your first QR code?"
   - Button: "Get Started Free"
   - Note: "No credit card required"

---

### ⏳ Step 8 — Dark/Light Mode Toggle
**Status:** NOT STARTED

**Requirements:**
- `next-themes` already installed (v0.4.6)
- Wrap app in `ThemeProvider` in `app/layout.tsx`
- Add sun/moon toggle button in `components/header.tsx`
- Works on desktop and mobile

**Deliverables Needed:**
- Update `app/layout.tsx` with ThemeProvider
- Add toggle button to header

---

### ⏳ Step 9 — Admin Panel
**Status:** PARTIALLY STARTED (skeleton only)

**Dashboard Pages Created (placeholder):**
- `/admin` — Dashboard (stats placeholder)
- `/admin/leads` — Leads management
- `/admin/case-studies` — Case studies management
- `/admin/products` — Products management
- `/admin/content` — Content management
- `/admin/settings` — Settings management

**Full Requirements:**

#### `/admin/login` — COMPLETE
- Email + password form ✅
- Redirect to `/admin` on success ✅

#### `/admin` (Dashboard) — NEEDS IMPLEMENTATION
- Stats cards: Total leads, New leads this week, Contacted, Converted
- Recent leads table (last 5 entries)

#### `/admin/leads` — NEEDS IMPLEMENTATION
- Full leads table: Name, Email, Company, Date, Status, Actions
- Status options: `new`, `contacted`, `converted`, `closed`
- Click row → detail drawer/modal:
  - Full message
  - Status dropdown
  - Notes textarea + save button
  - Delete button with confirmation
- Export to CSV button
- Filter by status

#### `/admin/case-studies` — NEEDS IMPLEMENTATION
- List all with publish toggle
- Add / Edit form:
  - Industry, Title, Description, Outcome
  - Image upload (ImageUpload component)
  - Display order
  - Draft / Publish toggle
- Delete with confirmation

#### `/admin/products` — NEEDS IMPLEMENTATION
- List all products
- Edit each:
  - Name, Tagline, Description
  - Status: `available` / `coming_soon`
  - Link (optional)
  - Display order
  - Published toggle
- No add/delete (products are fixed)

#### `/admin/content` — NEEDS IMPLEMENTATION
Tabs for each section:
- **Hero** — headline, subheadline
- **Approach** — 4 cards (icon, title, description)
- **Process** — 4 phases (number, title, description)
- **Footer** — email, social links

Each tab:
- Edit form
- Save as Draft button
- Publish button

#### `/admin/settings` — NEEDS IMPLEMENTATION
- Change admin email
- Change admin password (current + new + confirm)
- Notification email (where leads are sent)

#### Admin Layout — NEEDS IMPLEMENTATION
- Sidebar navigation ✅ (created)
- Same typography and color system as public site

---

### ⏳ Step 10 — Legal Pages
**Status:** NOT STARTED

**Deliverables Needed:**

#### `app/privacy-policy/page.tsx`
Standard privacy policy covering:
- Data collected: name, email, company, message (contact form only)
- How we use it: responding to inquiries
- Cookies: none beyond session
- Third parties: Resend for email delivery
- User rights
- Contact: hello@ritmelab.io
- Governed by Indonesian law
- Last updated: June 2026

#### `app/terms/page.tsx`
Standard terms of service covering:
- Use of website
- Intellectual property (ritmeLab owns all content)
- No warranties
- Limitation of liability
- Governing law: Republic of Indonesia
- Contact: hello@ritmelab.io
- Last updated: June 2026

#### Footer Updates
- Update footer links to point to `/privacy-policy` and `/terms`

---

### ⏳ Step 11 — Production Config
**Status:** NOT STARTED

**Deliverables Needed:**

#### `ecosystem.config.js` (PM2)
```javascript
module.exports = {
  apps: [{
    name: 'ritmelab-website',
    script: 'node_modules/.bin/next',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

#### `nginx.conf.example`
- HTTPS redirect (80 → 443)
- SSL certificate configuration
- /uploads caching (30 days)
- Proxy to localhost:3000

#### `DEPLOYMENT.md`
Step-by-step VPS deployment guide:
1. SSH into VPS (Ubuntu 24.04)
2. Install Node.js 20, PostgreSQL, Nginx, PM2, Certbot
3. Create database and run migrations + seed
4. Clone repo and install dependencies
5. Set up `.env.local` with production values
6. Build Next.js (`pnpm build`)
7. Start with PM2 (`pm2 start ecosystem.config.js --env production`)
8. Configure Nginx (copy nginx.conf.example)
9. SSL with Certbot
10. Create `/uploads` directory with correct permissions
11. Save PM2 process (`pm2 save && pm2 startup`)

---

## Environment Variables

**Development (.env.local):**
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ritmelab

# Auth
NEXTAUTH_SECRET=your-secret-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=hello@ritmelab.io
NOTIFICATION_EMAIL=hello@ritmelab.io

# Upload
UPLOAD_DIR=./public/uploads
NEXT_PUBLIC_UPLOAD_URL=/uploads
```

---

## Current Git Status

**Latest Commit:** `a1dd958` — Dynamic content fetching implementation
**Commits:**
1. `f3d3d89` — Initial commit: Next.js setup with authentication and database schema
2. `bfa9ecb` — File upload API and ImageUpload component
3. `c02c146` — Contact form API with email notifications
4. `a1dd958` — Dynamic content fetching from database

**Branch:** master
**Remote:** origin (GitHub)

---

## Development Checklist

### Before Proceeding
- [ ] Database migrations run (`psql ritmelab < db/migrations/001_initial.sql`)
- [ ] Seed data loaded (`psql ritmelab < db/seed.sql`)
- [ ] Dependencies installed (`pnpm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Dev server starts (`pnpm dev`)

### Testing
- [ ] Login works with admin@ritmelab.io / admin123
- [ ] Admin routes protected (redirect to login without session)
- [ ] Contact form submits and saves to DB
- [ ] File upload creates files in public/uploads
- [ ] Case studies fetch from DB or show fallback
- [ ] Hero section displays from DB or shows defaults

### Code Quality
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No console.log statements in production code
- [ ] All API routes have error handling
- [ ] Database queries use parameterized statements (SQL injection safe)
- [ ] User inputs validated before processing
- [ ] No hardcoded secrets in code

---

## Next Steps

1. **Step 6 — Products Section** (recommended)
   - Estimated effort: 2-3 hours
   - Creates featured product section on homepage
   - Renumbers existing sections

2. **Step 7 — Qrazey Product Page**
   - Estimated effort: 2-3 hours
   - Standalone product showcase page

3. **Step 8 — Dark/Light Mode**
   - Estimated effort: 30 minutes
   - Quick win, already have next-themes installed

4. **Step 9 — Admin Panel Full Implementation**
   - Estimated effort: 8-10 hours
   - CRUD operations for all content types
   - Complex but highest value feature

5. **Step 10 — Legal Pages**
   - Estimated effort: 1 hour
   - Standard boilerplate content

6. **Step 11 — Production Config**
   - Estimated effort: 1-2 hours
   - Deployment documentation and config files

---

## Known Limitations / TODOs

- [ ] Admin panel CRUD fully implemented
- [ ] Dark mode toggle added to header
- [ ] Approach section in site_content (not yet seeded)
- [ ] Process section in site_content (not yet seeded)
- [ ] Footer links updated to privacy/terms
- [ ] Resend API key configured for email
- [ ] NextAuth secret set to secure value
- [ ] Production database configured
- [ ] SSL certificates obtained
- [ ] VPS deployment tested

---

## Architecture Notes

### Database Strategy
- PostgreSQL with migrations pattern
- Fallback to hardcoded data if DB empty
- All content published via `is_published` flag
- Display order controlled via `display_order` field

### Authentication
- NextAuth.js v5 with credentials provider
- JWT-based sessions
- Middleware route protection
- No third-party auth providers

### File Storage
- Files saved to `public/uploads` (dev) or `/uploads` (production)
- Unique filenames generated via crypto.randomBytes
- MIME type validation (jpg, png, webp only)
- 5MB file size limit

### API Design
- Input validation with Zod
- Consistent error responses
- Toast notifications for user feedback
- Email notifications for leads via Resend

---

## References

- [ritmeLab Claude Code Prompt](doc/ritmelab-claude-code-prompt.md)
- [GitHub Repository](https://github.com/2142kk/ritme-website)
- [NextAuth.js v5 Docs](https://authjs.dev)
- [Next.js 16 App Router](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com)

---

**Last Updated:** June 19, 2026 - 21:30 UTC
**Status:** On Track — 45% Complete (5 of 11 steps)
