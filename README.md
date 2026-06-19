# ritmeLab Website

A production-ready marketing website for ritmeLab — a digital transformation consultancy and software studio based in Indonesia.

**Tech Stack:** Next.js 16 • React 19 • TypeScript • Tailwind CSS v4 • shadcn/ui • PostgreSQL • NextAuth.js v5

**Repository:** [https://github.com/2142kk/ritme-website](https://github.com/2142kk/ritme-website)

---

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- pnpm (or npm/yarn)

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/2142kk/ritme-website.git
   cd ritme-website
   pnpm install
   ```

2. **Create database:**
   ```bash
   createdb ritmelab
   ```

3. **Run migrations:**
   ```bash
   psql ritmelab < db/migrations/001_initial.sql
   ```

4. **Seed data:**
   ```bash
   psql ritmelab < db/seed.sql
   ```

5. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

6. **Start dev server:**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## Default Credentials

**Admin Login:**
- Email: `admin@ritmelab.io`
- Password: `admin123`

**⚠️ Change password immediately after first login!**

---

## Project Structure

```
ritme-website/
├── app/                      # Next.js app directory
│   ├── admin/               # Protected admin routes
│   ├── api/                 # API routes
│   ├── products/            # Product pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── admin/               # Admin components
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── db.ts               # PostgreSQL connection
├── db/
│   ├── migrations/          # Database migrations
│   └── seed.sql            # Initial data
├── auth.ts                 # NextAuth configuration
├── middleware.ts           # Route protection
├── PROGRESS.md             # Implementation status
└── package.json
```

---

## Key Features

### ✅ Implemented
- **Database** — PostgreSQL with migrations
- **Authentication** — NextAuth.js with credentials provider
- **Admin Panel** — Protected routes with sidebar navigation
- **File Upload** — Image upload API with validation
- **Contact Form** — Email notifications via Resend
- **Dynamic Content** — Database-driven case studies and hero section

### ⏳ In Progress / Upcoming
- Products section on homepage
- Qrazey product page
- Dark/Light mode toggle
- Full admin CRUD operations
- Legal pages (privacy, terms)
- Production deployment config

See [PROGRESS.md](PROGRESS.md) for detailed status.

---

## Development

### Build
```bash
pnpm build
```

### Type Check
```bash
pnpm tsc --noEmit
```

### Lint
```bash
pnpm lint
```

### Database

**Run migrations:**
```bash
psql ritmelab < db/migrations/001_initial.sql
```

**Reset database (dev only):**
```bash
dropdb ritmelab
createdb ritmelab
psql ritmelab < db/migrations/001_initial.sql
psql ritmelab < db/seed.sql
```

---

## Admin Panel

### Access
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Login:** admin@ritmelab.io / admin123

### Sections
- **Dashboard** — Stats and recent leads
- **Leads** — Manage contact form submissions
- **Case Studies** — Create, edit, publish case studies
- **Products** — Manage product catalog
- **Content** — Edit hero, approach, process, footer content
- **Settings** — Change password, notification email

---

## API Endpoints

### Public
- `GET /` — Homepage
- `GET /products/qrazey` — Qrazey product page
- `POST /api/contact` — Submit contact form
- `POST /api/upload` — Upload image (multipart form-data)

### Protected (Admin)
- `GET /admin` — Dashboard
- `GET /admin/login` — Login page
- `GET /api/auth/...` — NextAuth endpoints

---

## Environment Variables

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
UPLOAD_DIR=./public/uploads
NEXT_PUBLIC_UPLOAD_URL=/uploads
```

---

## Deployment

See [PROGRESS.md → Step 11](PROGRESS.md#-step-11--production-config) for production deployment guide.

**Quick summary:**
1. Set up VPS (Ubuntu 24.04)
2. Install Node.js, PostgreSQL, Nginx, PM2, Certbot
3. Clone repo and configure `.env.local`
4. Run migrations and build
5. Start with PM2
6. Configure Nginx reverse proxy
7. Enable SSL with Certbot

---

## Security

### Required Checks
- ✅ No hardcoded secrets (use env vars)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation (Zod schemas)
- ✅ XSS prevention (React auto-escaping)
- ✅ CSRF protection (NextAuth built-in)
- ✅ Password hashing (bcrypt)
- ✅ Route protection (middleware)

### Before Production
- [ ] Change `NEXTAUTH_SECRET` to secure random value
- [ ] Configure Resend API key
- [ ] Update database credentials
- [ ] Enable HTTPS/SSL
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Review security headers in nginx.conf

---

## Troubleshooting

### Database connection fails
```bash
# Check PostgreSQL is running
psql -U postgres -l

# Verify DATABASE_URL in .env.local
# Format: postgresql://user:password@host:port/database
```

### Login not working
```bash
# Verify admin user exists
psql ritmelab -c "SELECT email FROM admin_users;"

# Check NextAuth secret is set
echo $NEXTAUTH_SECRET
```

### Upload fails
```bash
# Check uploads directory exists and has permissions
ls -la public/uploads/

# Verify UPLOAD_DIR and NEXT_PUBLIC_UPLOAD_URL in .env.local
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Type check
pnpm tsc --noEmit
```

---

## Contributing

Commits follow conventional commits format:
```
<type>: <description>

<optional body>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

---

## License

Copyright © 2026 ritmeLab. All rights reserved.

---

## Support

For issues, questions, or feature requests:
- Email: [hello@ritmelab.io](mailto:hello@ritmelab.io)
- GitHub Issues: [https://github.com/2142kk/ritme-website/issues](https://github.com/2142kk/ritme-website/issues)

---

## Resources

- [Implementation Progress](PROGRESS.md)
- [Claude Code Prompt](doc/ritmelab-claude-code-prompt.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [NextAuth.js](https://authjs.dev)

---

**Last Updated:** June 19, 2026
