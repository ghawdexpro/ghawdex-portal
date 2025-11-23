# GhawdeX Portal - Quick Start Guide

## ✅ Project Status: Ready to Use

The employee portal is fully set up and ready to run locally or deploy.

## Prerequisites

- Node.js ≥ 20.9.0
- npm or yarn

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at: `http://localhost:3001`

### 3. Access the Application

#### Login Credentials (Demo)
- **Email:** `admin@ghawdex.com`
- **Password:** `password123`
- **Role:** Admin

#### Default Routes
- **Home/Login:** `http://localhost:3001/login`
- **Dashboard:** `http://localhost:3001/dashboard`
- **Admin Panel:** `http://localhost:3001/admin`

## Database

**Development:** SQLite (local, auto-created)
- **Database File:** `prisma/dev.db`
- **Migrations:** Pre-initialized in `prisma/migrations`
- **Seeded Data:** Includes sample users, policies, team members, goals, procedures, tools, and wiki pages

**Production:** PostgreSQL (via Railway)
- **Provider:** Configured in `prisma/schema.prisma`
- **Connection:** Via `DATABASE_URL` environment variable
- **Migrations:** Applied automatically on deployment

### Reset Database
```bash
# Reset and reseed the database
rm prisma/dev.db
npx prisma migrate dev
npm run db:seed
```

## Build for Production

```bash
npm run build
npm start
```

## Available Scripts

```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio for database management
npm run prisma       # Access Prisma CLI
```

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── login/page.tsx         # Login page
├── dashboard/             # Dashboard section (protected)
│   ├── layout.tsx
│   └── page.tsx
├── admin/                 # Admin panel (protected)
│   ├── layout.tsx
│   ├── company/
│   ├── announcements/
│   ├── team/
│   ├── policies/
│   ├── goals/
│   ├── procedures/
│   ├── tools/
│   ├── users/
│   └── wiki/
├── api/                   # API routes
│   ├── auth/
│   ├── admin/
│   └── (public endpoints)
└── (portal pages)         # Company, Team, Policies, Goals, etc.

lib/
├── prisma.ts             # Prisma client singleton

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Migration history
├── dev.db               # SQLite database (local dev)
└── seed.js              # Database seeding script

components/
└── (React components)

public/
└── (Static assets)
```

## Key Features

### Authentication
- NextAuth.js v4 with credentials-based authentication
- JWT sessions
- Role-based access control (Admin, Manager, Employee)

### Admin Features
- Company information management (Mission, Vision, Values)
- Announcement management
- Team member directory management
- Policy management
- Goal tracking
- Procedure documentation
- Tool/Software catalog
- Wiki page management
- User management with role assignment

### Portal Features
- Company information display
- Team directory
- Policies viewing
- Goals and progress tracking
- Procedures documentation
- Culture/Tools information
- Wiki documentation

## Environment Variables

### .env.local (Development)
```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### For Production
Update the following in your deployment environment:
- `DATABASE_URL` - Connection string for PostgreSQL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Prisma 4 with SQLite (dev) / PostgreSQL (prod)
- **Authentication:** NextAuth.js v4
- **Password Hashing:** bcryptjs

## Deployment

### Railway (Recommended) - Production Setup
```bash
# 1. Initialize Railway project
npm i -g @railway/cli
railway init

# 2. Add PostgreSQL database add-on in Railway dashboard
# (or use: railway add -d postgresql)

# 3. Set environment variables in Railway dashboard
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
NEXTAUTH_URL="https://portal.ghawdex.pro"
DATABASE_URL="<auto-set by Railway PostgreSQL>"

# 4. Run migrations on production database
railway run npx prisma migrate deploy

# 5. Seed production database (optional)
railway run npm run db:seed

# 6. Deploy
railway up

# 7. Add custom domain
railway domain
# → portal.ghawdex.pro
```

### Production Checklist
- [ ] PostgreSQL add-on created in Railway
- [ ] Environment variables configured
- [ ] Migrations applied to production
- [ ] Admin user created (via seed or manually)
- [ ] Custom domain set to `portal.ghawdex.pro`
- [ ] HTTPS enabled (automatic with Railway)
- [ ] Tested login at https://portal.ghawdex.pro

### Other Platforms
The application is built as a standard Next.js app and can be deployed to:
- Vercel
- Netlify
- AWS
- Azure
- Any Node.js hosting with PostgreSQL support

## Troubleshooting

### Build Issues
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Issues
```bash
# View database in Prisma Studio
npm run db:studio

# Reset database completely
rm prisma/dev.db
npx prisma migrate dev
npm run db:seed
```

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3002
```

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org)

---

**Ready to go!** Start with `npm install && npm run dev` 🚀
