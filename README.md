# GhawdeX Engineering Employee Portal

A comprehensive employee portal for GhawdeX Engineering featuring company information, policies, goals, procedures, and project documentation.

## Features

- **Authentication & Authorization**: Secure login with role-based access (Admin, Manager, Employee)
- **Company Information**: Mission, vision, values, and organizational structure
- **Team Directory**: Browse team members by department with contact information
- **Policies & Procedures**: Employee manual, vacation policy, benefits, and procedures
- **Goals & Objectives**: Quarterly, yearly, and ongoing goal tracking
- **Procedures & Workflows**: Emergency procedures, problem-solving guides, and best practices
- **Engineering Wiki**: Searchable project documentation and technical guides
- **Company Culture**: Tools, software, and company philosophies
- **Admin Panel**: Full content management system for all portal sections
- **User Management**: Create, activate, deactivate, and manage employee accounts

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS v4
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- PostgreSQL database
- Environment variables configured

### Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: http://localhost:3001 (local) or your production URL

3. **Set up the database**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

5. **Create first admin user**:
   - Database seeding script or manual entry required
   - Default credentials should be changed in production

## Development

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
ghawdex-portal/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── company/            # Company information
│   │   ├── team/               # Team directory
│   │   ├── policies/           # Policies
│   │   ├── goals/              # Goals
│   │   ├── procedures/         # Procedures
│   │   ├── culture/            # Culture & tools
│   │   └── wiki/               # Engineering wiki
│   ├── (admin)/
│   │   └── admin/              # Admin panel
│   └── api/
│       ├── auth/               # Authentication routes
│       ├── (public routes)     # Read-only API endpoints
│       └── admin/              # Admin-only API endpoints
├── components/
│   └── Sidebar.tsx             # Navigation sidebar
├── lib/
│   ├── prisma.ts               # Prisma client
│   └── auth.ts                 # NextAuth configuration
├── prisma/
│   └── schema.prisma           # Database schema
└── middleware.ts               # Auth middleware
```

## Database Schema

The portal uses Prisma ORM with PostgreSQL. Key models:

- **User**: Employee accounts with roles (Admin, Manager, Employee)
- **CompanyInfo**: Mission, vision, and company values
- **TeamMember**: Team directory with contact information
- **Announcement**: Company announcements and news
- **Policy**: Policies, procedures, and guidelines
- **Goal**: Company and team goals with progress tracking
- **Procedure**: Step-by-step procedures and best practices
- **WikiPage**: Project documentation and guides
- **Tool**: Company software and tools directory
- **CalendarEvent**: Important dates and deadlines

## Authentication & Authorization

### Login
Users log in with email and password. Credentials are validated against the database.

### Roles
- **ADMIN**: Full access to portal and admin panel
- **MANAGER**: Can manage team content and view reports
- **EMPLOYEE**: Can view all portal content (read-only)

### Protected Routes
All routes except `/login` and `/` require authentication via middleware.

## Admin Panel

Access admin panel at `/admin` (Admin role required).

### Available Management Sections
1. **Company Info**: Edit mission, vision, and values
2. **Announcements**: Create, edit, and delete announcements
3. **Team Members**: Manage team directory
4. **Policies**: Create and manage policies
5. **Goals**: Set and track company goals
6. **Procedures**: Document procedures and workflows
7. **Tools**: Catalog of company software and tools
8. **Wiki Pages**: Create and manage documentation
9. **User Management**: Create accounts and manage roles

## Deployment

### Railway Deployment

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Initialize and deploy**:
   ```bash
   railway init
   railway up
   ```

3. **Set environment variables** in Railway dashboard:
   - `DATABASE_URL`: Railway PostgreSQL URL
   - `NEXTAUTH_SECRET`: Generate secure secret
   - `NEXTAUTH_URL`: Your production domain

4. **Custom domain**:
   ```bash
   railway domain
   ```

### Environment Variables

Required for production:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate with openssl>
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

## Security Considerations

- Passwords are hashed with bcryptjs
- Authentication tokens are JWT-based with NextAuth.js
- All admin routes check for ADMIN role
- CSRF protection enabled with NextAuth.js
- Database credentials should never be committed
- Use strong NEXTAUTH_SECRET in production

## Performance

- Server-side rendering for SEO and initial load
- Database queries are optimized with Prisma
- Images should be optimized before upload
- Consider implementing caching for frequently accessed content

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL format
- Check PostgreSQL service is running
- Ensure firewall allows connection

### Authentication Issues
- Clear browser cookies and try again
- Verify NEXTAUTH_SECRET is set
- Check user exists in database

### Build Errors
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

## Future Enhancements

- Rich text editor for content creation
- Document upload and management
- Email notifications
- Search across all content
- Calendar/scheduling features
- Performance analytics
- Dark/light theme toggle
- Mobile app
- API for external integrations

## Support

For issues or feature requests, contact the development team.

## License

Proprietary - GhawdeX Engineering
