# ritmeLab Website — Claude Code Prompt

> **Instructions:** Open your terminal, `cd` into the project root (the extracted v0 folder), run `claude`, then paste this entire prompt.

---

## Project Context

You are building a complete production-ready marketing website for ritmeLab — a digital transformation consultancy and software studio based in Indonesia.

The project is a Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui codebase exported from v0.

---

## CRITICAL RULES — READ FIRST

- NEVER change any design, colors, fonts, spacing, layout, or existing styling from the v0 export
- Always follow existing code patterns and component structure
- Use TypeScript strictly — no `any` types
- Use existing shadcn/ui components already installed
- Ask before making any assumption

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | PostgreSQL (self-hosted, via `pg` library) |
| Image Storage | VPS filesystem served via `/uploads` path |
| Email | Resend |
| Auth | NextAuth.js v5 (credentials provider) |
| Process Manager | PM2 (production) |
| Reverse Proxy | Nginx (production) |

---

## Database Schema

Create a single migration file at `db/migrations/001_initial.sql`:

```sql
-- Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads from contact form
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case studies
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  outcome TEXT NOT NULL,
  image_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'coming_soon',
  link VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site content (hero, approach, process, footer)
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Site settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Seed Data

Create `db/seed.sql` with the following initial data:

### Admin User
- Email: `admin@ritmelab.io`
- Password: generate a secure bcrypt hash for `admin123` — user will change this after first login

### Case Studies (3, all published)

**Case Study 1**
- industry: `Mining & Heavy Industry`
- title: `From Reactive to Resilient`
- description: `A coal mining contractor managing heavy equipment across remote sites with no centralized system. Maintenance was purely reactive, asset visibility was nonexistent, and unplanned downtime was eating into margins with no way to predict or prevent it.`
- outcome: `Enterprise asset management deployed across operations. Full equipment lifecycle visibility, scheduled maintenance workflows, and real-time tracking — turning downtime from a surprise into a managed variable.`
- display_order: 1, is_published: true

**Case Study 2**
- industry: `Retail & Distribution`
- title: `One System, Many Brands`
- description: `A portfolio of multi-brand retail and distribution businesses running on disconnected systems — inventory was inaccurate, sales data was siloed per store, and scaling to new locations meant multiplying the chaos.`
- outcome: `Unified retail management system across brands and locations. Centralized inventory, real-time sales visibility, and an operational foundation built to scale without adding complexity.`
- display_order: 2, is_published: true

**Case Study 3**
- industry: `Medical Equipment Manufacturing`
- title: `Built to Comply, Built to Scale`
- description: `A medical equipment manufacturer running their entire operation on spreadsheets. Production scheduling was manual, quality control had no traceability, and the business was growing faster than their processes could handle.`
- outcome: `Full ERP implementation from the ground up. End-to-end production tracking, automated quality workflows, and compliance-ready operations — giving the business the infrastructure to grow with confidence.`
- display_order: 3, is_published: true

### Products (6)

| # | Name | Tagline | Status | Link | Order |
|---|---|---|---|---|---|
| 1 | Qrazey | QR codes that work harder | available | /products/qrazey | 1 |
| 2 | ritmeERP | Enterprise resource planning, built for the way you actually work | coming_soon | — | 2 |
| 3 | Sadhe | Unified omnichannel retail management for Indonesian SMEs | coming_soon | — | 3 |
| 4 | Damel | GPS-verified field CRM with WhatsApp-first communication | coming_soon | — | 4 |
| 5 | Dokem | Document management with e-signature and e-Meterai compliance | coming_soon | — | 5 |
| 6 | Sukha | Property and rental management for modern landlords | coming_soon | — | 6 |

Qrazey description: `An affordable QR code platform built for emerging markets. Generate, customize, and track QR codes — from simple URLs to rich product pages, vCards, and social profiles.`

### Site Content

Section `hero`:
- key: `headline`, value: `We don't build software. We build futures.`
- key: `subheadline`, value: use existing v0 subheadline text

Section `footer`:
- key: `email`, value: `hello@ritmelab.io`

---

## Environment Variables

Create `.env.local.example`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ritmelab

# Auth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=hello@ritmelab.io
NOTIFICATION_EMAIL=hello@ritmelab.io

# Upload
UPLOAD_DIR=/uploads
NEXT_PUBLIC_UPLOAD_URL=/uploads
```

---

## Step 1 — Database Connection

Create `lib/db.ts` using the `pg` library (Pool) with `DATABASE_URL` from env.

---

## Step 2 — Authentication

Set up NextAuth.js v5 with credentials provider:
- Validate email/password against `admin_users` table
- Use bcrypt to compare password hash
- Protect all `/admin/*` routes via `middleware.ts`
- Redirect unauthenticated users to `/admin/login`

---

## Step 3 — File Upload

Create `app/api/upload/route.ts`:
- Accept multipart form data (images only: jpg, png, webp)
- Save to `UPLOAD_DIR` (env variable)
- Return the public URL
- Max file size: 5MB

Create a reusable `ImageUpload` component for the admin panel.

---

## Step 4 — Contact Form API

Create `app/api/contact/route.ts`:
- Accept POST: name, email, company, message
- Validate all fields
- Save to `leads` table with status `new`
- Send email notification via Resend to `NOTIFICATION_EMAIL`
- Email subject: `New Lead from ritmeLab Website`
- Email body: all lead details + timestamp

Update `components/contact.tsx` to call this API instead of the current simulated submission.

---

## Step 5 — Public Site — Dynamic Content

Update the following components to fetch content from the database instead of hardcoded values. Only show records where `is_published = true`.

- `components/case-studies.tsx` → fetch from `case_studies` table
- Homepage sections → fetch from `site_content` table

For hero, approach, and process sections: if no published content exists in DB, fall back to the existing hardcoded v0 content (graceful fallback).

---

## Step 6 — Products Section on Homepage

Add a new Products section to `app/page.tsx` BETWEEN the Process section and Case Studies section:
- Section number: `[05]`
- Section title: `What We've Built`
- Fetch products from database where `is_published = true`
- Show Qrazey as featured (`status: available`) with link
- Show remaining 5 with `Coming Soon` badge
- Keep exact same design language as existing sections

Add `Products` to nav in `components/header.tsx` pointing to `#products`.

Renumber existing sections: Case Studies → `[06]`, Contact → `[07]`

---

## Step 7 — Qrazey Product Page

Create `app/products/qrazey/page.tsx` (static page, no DB needed). Use same design language as homepage. Include Header and Footer components.

### Hero
- Eyebrow: `A ritmeLab Product`
- Title: `QR codes that work harder`
- Subtitle: `Affordable, powerful QR code generation built for emerging markets. Free for personal use. Seriously affordable for business.`

### Features (3 cards)
1. **Generate** — Website URLs, vCards, WhatsApp, social profiles, WiFi, location, calendar events, and more. Every type you need, in one place.
2. **Customize** — Colors, gradients, logos, frames, and patterns. Make every QR code look like it belongs to your brand.
3. **Track** — Know when, where, and how your QR codes are scanned. Geographic data, device types, and time patterns for paid users.

### Pricing (3 tiers)
1. **Free** — Personal use. Static QR codes, basic customization, basic scan count. Forever free.
2. **Pay-as-you-go** — For one-time needs. No subscriptions, no penalties. Affordable per-QR pricing.
3. **Business** — Unlimited dynamic QR codes, full analytics, priority support. Built for teams.

### CTA
- Heading: `Ready to create your first QR code?`
- Button: `Get Started Free` (href="#" for now)
- Note: `No credit card required`

---

## Step 8 — Dark/Light Mode Toggle

`next-themes` is already installed:
- Wrap app in `ThemeProvider` in `app/layout.tsx`
- Add sun/moon toggle button in `components/header.tsx`
- Works on both desktop and mobile

---

## Step 9 — Admin Panel

Build a complete admin panel at `/admin/*` using the same design language as the public site. All routes protected by NextAuth middleware.

### /admin/login
- Email + password form
- Redirect to `/admin` on success

### /admin (Dashboard)
- Stats cards: Total leads, New leads this week, Contacted, Converted
- Recent leads table (last 5 entries)

### /admin/leads
- Full leads table: Name, Email, Company, Date, Status, Actions
- Status options: `new` `contacted` `converted` `closed`
- Click row → detail drawer/modal:
  - Full message
  - Status dropdown
  - Notes textarea + save button
  - Delete button with confirmation
- Export to CSV button
- Filter by status

### /admin/case-studies
- List all with publish toggle
- Add / Edit form:
  - Industry, Title, Description, Outcome
  - Image upload (ImageUpload component)
  - Display order
  - Draft / Publish toggle
- Delete with confirmation

### /admin/products
- List all products
- Edit each:
  - Name, Tagline, Description
  - Status: `available` / `coming_soon`
  - Link (optional)
  - Display order
  - Published toggle
- No add/delete (products are fixed)

### /admin/content
Tabs for each section:
- **Hero** — headline, subheadline
- **Approach** — 4 cards (icon, title, description)
- **Process** — 4 phases (number, title, description)
- **Footer** — email, social links

Each tab has:
- Edit form
- Save as Draft button
- Publish button (makes live on site)

### /admin/settings
- Change admin email
- Change admin password (current + new + confirm)
- Notification email (where leads are sent)

### Admin Layout
- Sidebar navigation (collapsible on mobile)
- Same typography and color system as public site

---

## Step 10 — Legal Pages

### app/privacy-policy/page.tsx
Standard privacy policy covering:
- Data collected: name, email, company, message (contact form only)
- How we use it: responding to inquiries
- Cookies: none beyond session
- Third parties: Resend for email delivery
- User rights
- Contact: hello@ritmelab.io
- Governed by Indonesian law
- Last updated: June 2026

### app/terms/page.tsx
Standard terms of service covering:
- Use of website
- Intellectual property (ritmeLab owns all content)
- No warranties
- Limitation of liability
- Governing law: Republic of Indonesia
- Contact: hello@ritmelab.io
- Last updated: June 2026

Update footer links to point to `/privacy-policy` and `/terms`.

---

## Step 11 — Production Config

### ecosystem.config.js (PM2)

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

### nginx.conf.example

```nginx
server {
    listen 80;
    server_name ritmelab.io www.ritmelab.io;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ritmelab.io www.ritmelab.io;

    ssl_certificate /etc/letsencrypt/live/ritmelab.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ritmelab.io/privkey.pem;

    location /uploads/ {
        alias /uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### DEPLOYMENT.md

Create a step-by-step VPS deployment guide covering:
1. SSH into VPS (Ubuntu 24.04)
2. Install Node.js 20, PostgreSQL, Nginx, PM2, Certbot
3. Create database and run migrations + seed
4. Clone repo and install dependencies
5. Set up `.env.local` with production values
6. Build Next.js (`pnpm build`)
7. Start with PM2 (`pm2 start ecosystem.config.js --env production`)
8. Configure Nginx (copy nginx.conf.example)
9. SSL with Certbot (`certbot --nginx -d ritmelab.io -d www.ritmelab.io`)
10. Create `/uploads` directory with correct permissions (`chmod 755`)
11. Save PM2 process (`pm2 save && pm2 startup`)

---

## Build Order

Execute steps 1–11 in order. After each step confirm it compiles and works before proceeding. If you encounter any issue or need clarification, **stop and ask**.
