# GhawdeX Portal - Setup Guide

## Quick Start

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment

Edit `.env.local` with your configuration:

```env
# PostgreSQL Database
DATABASE_URL="postgresql://username:password@localhost:5432/ghawdex_portal"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3001"
```

### 3. Set Up Database

```bash
# Run migrations to create tables
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# (Optional) Seed initial data
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3001

### 5. Create First Admin User

Currently, you need to create the first admin user manually. Option A:

**Using Prisma Studio:**
```bash
npx prisma studio
```

Then navigate to the `User` table and create a record:
- Email: `admin@ghawdex.com`
- Password: Hash with bcryptjs (`bcryptjs.hash("password123", 10)`)
- Name: `Admin`
- Role: `ADMIN`
- Active: `true`

**Option B - Via Database:**
```bash
psql postgresql://username:password@localhost:5432/ghawdex_portal

-- First, generate a bcrypt hash of your password using Node.js:
-- node -e "require('bcryptjs').hash('password123', 10).then(console.log)"

INSERT INTO "User" (id, email, password, name, role, active, "createdAt", "updatedAt")
VALUES (
  'cuid-here',
  'admin@ghawdex.com',
  '$2a$10$...hash...',
  'Admin',
  'ADMIN',
  true,
  NOW(),
  NOW()
);
```

### 6. Login

- Navigate to http://localhost:3001/login
- Use credentials you just created
- You should be redirected to the dashboard

## Adding Initial Data

### Add Company Information
1. Go to Admin Panel → Company Info
2. Fill in Mission, Vision, and Values
3. Click "Save Changes"

### Add Team Members
1. Go to Admin Panel → Team Members
2. Fill in the form with employee details
3. Click "Add Member"
4. Repeat for each team member

### Create Policies
1. Go to Admin Panel → Policies
2. Select a category (Employee Manual, Vacation Policy, etc.)
3. Enter title and content
4. Click "Create Policy"

### Set Goals
1. Go to Admin Panel → Goals
2. Fill in goal details, period, and progress
3. Click "Create Goal"

### Add Procedures
1. Go to Admin Panel → Procedures
2. Select category (Emergency, Problem-Solving, Best Practices, How-To)
3. Enter title and step-by-step instructions
4. Click "Create"

### Add Tools & Software
1. Go to Admin Panel → Tools & Software
2. Enter tool name, category, description, and URL
3. Click "Add Tool"

### Create Wiki Pages
1. Go to Admin Panel → Engineering Wiki
2. Enter title (slug auto-generates)
3. Select category and enter content
4. Click "Create Page"

## User Roles

### ADMIN
- Access to admin panel
- Can manage all content
- Can create/edit/delete users
- Full portal access

### MANAGER
- Can view all portal content
- Can manage team-specific content
- Cannot access user management

### EMPLOYEE
- Read-only access to portal
- Can view company info, team, policies, goals, procedures, wiki
- Cannot edit any content

## Database Tables

All created automatically on migration:
- `User` - Employee accounts
- `CompanyInfo` - Company mission, vision, values
- `TeamMember` - Team directory
- `Announcement` - Company announcements
- `Policy` - Policies and guidelines
- `Goal` - Company and team goals
- `Procedure` - Procedures and workflows
- `WikiPage` - Documentation and guides
- `Tool` - Company software catalog
- `CalendarEvent` - Important dates

## Common Tasks

### Generate TypeScript Types
```bash
npx prisma generate
```

### View Database
```bash
npx prisma studio
```

### Reset Database (WARNING: Data Loss!)
```bash
npx prisma migrate reset
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Deployment to Railway

### 1. Create Railway Account
Visit https://railway.app and sign up

### 2. Create PostgreSQL Database
- In Railway dashboard, create new PostgreSQL plugin
- Note the `DATABASE_URL`

### 3. Deploy Application
```bash
railway init
railway up
```

### 4. Configure Environment
In Railway dashboard → Variables:
- Set `NEXTAUTH_SECRET` (generate new)
- Set `NEXTAUTH_URL` to your production domain
- `DATABASE_URL` auto-configured

### 5. Custom Domain
```bash
railway domain
```

Follow prompts to add your domain and configure DNS.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
npm run dev -- -p 3002
```

### Database Connection Error
```bash
# Test connection
psql $DATABASE_URL

# Check Prisma connection
npx prisma db pull
```

### Build Fails
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Authentication Issues
- Clear browser cookies
- Check `NEXTAUTH_SECRET` is set
- Verify user exists in database
- Check user's `active` field is `true`

## File Structure Reference

```
app/
├── page.tsx                 # Home/landing
├── login/                   # Login page
├── dashboard/               # Protected routes start here
│   ├── page.tsx            # Main dashboard
│   ├── company/            # Company info
│   ├── team/               # Team directory
│   ├── policies/           # Policies
│   ├── goals/              # Goals
│   ├── procedures/         # Procedures
│   ├── culture/            # Culture & tools
│   └── wiki/               # Engineering wiki
├── admin/                  # Admin-only routes
│   ├── page.tsx           # Admin dashboard
│   ├── company/           # Edit company
│   ├── announcements/     # Manage announcements
│   ├── team/              # Manage team
│   ├── policies/          # Manage policies
│   ├── goals/             # Manage goals
│   ├── procedures/        # Manage procedures
│   ├── tools/             # Manage tools
│   ├── wiki/              # Manage wiki
│   └── users/             # Manage users
└── api/
    ├── auth/              # Authentication
    ├── policies/          # Read policies
    ├── goals/             # Read goals
    ├── procedures/        # Read procedures
    ├── tools/             # Read tools
    ├── wiki/              # Read wiki
    └── admin/             # Admin operations

components/
└── Sidebar.tsx            # Navigation

lib/
├── prisma.ts              # Database client
└── auth.ts                # Authentication config

prisma/
└── schema.prisma          # Database schema

middleware.ts              # Auth middleware
```

## Next Steps

1. Set up the database and environment
2. Create first admin account
3. Add company information
4. Add team members
5. Create policies and procedures
6. Set company goals
7. Add tools and resources
8. Create wiki documentation
9. Create user accounts for team
10. Deploy to Railway

## Support

For issues or questions, contact the development team.
