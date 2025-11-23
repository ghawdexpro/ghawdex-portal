# GhawdeX Employee Portal - Deployment Guide

**Status:** Ready for Production
**Database:** PostgreSQL on Railway
**Domain:** portal.ghawdex.pro
**Linked:** From main website footer (ghawdex.pro)

## Pre-Deployment Checklist

### Local Development Complete ✅
- [x] All pages built and tested
- [x] Calendar system added
- [x] Database seeded with sample data
- [x] Authentication working (NextAuth)
- [x] Admin panel functional
- [x] Build passing (45 routes configured)

### Production Configuration

#### 1. Main Website Footer Link ✅
**File:** `/Users/maciejpopiel/ghawdex landings/components/Footer.tsx`
- "Team Portal" link added to Quick Links
- Points to: `https://portal.ghawdex.pro`
- Opens in new tab with proper attributes

#### 2. Portal Configuration
**Directory:** `/Users/maciejpopiel/ghawdex-portal`

**Changes Made:**
- `prisma/schema.prisma`: Updated to PostgreSQL provider
- `.env.example`: Updated with production URLs
- `QUICK_START.md`: Added production deployment instructions

## Deployment Steps

### Step 1: Initialize Railway Project
```bash
cd /Users/maciejpopiel/ghawdex-portal
npm i -g @railway/cli
railway init
```
Select:
- Connect to: GitHub (recommended) or existing Railway account
- Scope: Current directory

### Step 2: Add PostgreSQL Database
In Railway Dashboard:
1. Go to: Settings → Add Service
2. Select: PostgreSQL
3. Railway auto-generates `DATABASE_URL`

### Step 3: Configure Environment Variables
In Railway Dashboard → Variables:

```
NEXTAUTH_SECRET = <generate secure key>
NEXTAUTH_URL = https://portal.ghawdex.pro
DATABASE_URL = <auto-provided by Railway>
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
# Copy output to Railway dashboard
```

### Step 4: Deploy
```bash
railway up
```
Railway will:
- Build Next.js application
- Create PostgreSQL database
- Set environment variables
- Deploy to production

### Step 5: Run Database Migrations
```bash
railway run npx prisma migrate deploy
```

### Step 6: Seed Production Database
```bash
railway run npm run db:seed
```
This creates:
- Admin user (admin@ghawdex.com / password123)
- Sample company information
- Sample team members
- Sample policies
- Sample goals
- Sample calendar events

### Step 7: Configure Custom Domain
In Railway Dashboard → Settings:
1. Go to: Domains
2. Click: "Create Domain"
3. Enter: `portal.ghawdex.pro`
4. Railway provides DNS instructions

**DNS Configuration (Namecheap):**
```
Type     Host      Value
CNAME    portal    v*.railway.app  (value provided by Railway)
```

Allow 5-60 minutes for DNS propagation.

### Step 8: Verify Deployment
```bash
# Test login
curl https://portal.ghawdex.pro/login
```

Or visit:
- **Login:** https://portal.ghawdex.pro/login
- **Dashboard:** https://portal.ghawdex.pro/dashboard (requires login)
- **Admin Panel:** https://portal.ghawdex.pro/admin (requires admin role)

## Production URLs

| Resource | URL |
|----------|-----|
| Employee Portal | https://portal.ghawdex.pro |
| Main Website | https://www.ghawdex.pro |
| Solar Analysis | https://app.ghawdex.pro |

## Maintenance

### Backup Database
```bash
railway run pg_dump $DATABASE_URL > backup.sql
```

### Monitor Logs
```bash
railway logs --service ghawdex-portal
```

### Update Code
```bash
# Make changes locally
git add .
git commit -m "Update portal"
git push

# Railway auto-deploys on push (if configured)
# Or manually:
railway up
```

### Reset Production Database
```bash
# WARNING: This deletes all data!
railway run npx prisma migrate reset
railway run npm run db:seed
```

## Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:**
- Verify `DATABASE_URL` is set in Railway dashboard
- Ensure PostgreSQL add-on is provisioned
- Restart Railway app

### NEXTAUTH_SECRET Missing
```
Error: NEXTAUTH_SECRET not set
```
**Solution:**
- Generate: `openssl rand -base64 32`
- Add to Railway Variables
- Restart app

### Domain Not Resolving
```
Error: Cannot resolve portal.ghawdex.pro
```
**Solution:**
- Check DNS propagation: https://dns.google/
- Verify CNAME record with registrar
- Wait 24-48 hours for full propagation
- Clear browser cache

### Migration Failed
```
Error: Migration cannot be applied
```
**Solution:**
```bash
# Check migration status
railway run npx prisma migrate status

# Check database connection
railway run npx prisma db push --skip-generate
```

## Security Considerations

### Change Admin Password
**In production, change the default password:**

1. Log in to admin account
2. Navigate to: Admin → Users
3. Edit admin user
4. Change password from `password123` to secure password

### Enable HTTPS
✅ Automatic with Railway custom domains

### Backup Strategy
- Daily automated backups via Railway
- Manual backup before major updates
- Keep 30-day backup retention

### Access Control
- Only admins can access `/admin/*` routes
- Role-based access control implemented
- NextAuth handles sessions securely

## Post-Deployment

### 1. Test All Features
- [ ] Login with admin account
- [ ] View dashboard
- [ ] Check company info
- [ ] View team directory
- [ ] Review policies
- [ ] Check goals
- [ ] View calendar
- [ ] Access wiki pages
- [ ] Test admin panel

### 2. Send to Employees
- [ ] Share portal URL: https://portal.ghawdex.pro
- [ ] Provide login credentials
- [ ] Create employee accounts
- [ ] Test employee access

### 3. Monitor Performance
- [ ] Check Railway logs for errors
- [ ] Monitor database performance
- [ ] Review user activity
- [ ] Set up alerting if available

## Rollback Plan

If deployment has issues:

```bash
# 1. Check Railway logs
railway logs

# 2. Revert to previous commit
git revert HEAD

# 3. Redeploy
railway up

# 4. Restore database if needed
# (Only if data corruption suspected)
```

---

**Portal is production-ready!** 🚀

All files configured for PostgreSQL, migrations prepared, and documentation complete.

Follow the deployment steps above to launch at `portal.ghawdex.pro`
