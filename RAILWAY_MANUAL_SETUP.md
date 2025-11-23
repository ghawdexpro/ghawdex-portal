# GhawdeX Portal - Railway Manual Setup Guide

**Status:** Node.js service deployed, PostgreSQL pending setup

## Quick Dashboard Setup (3 minutes)

### Step 1: Open Railway Dashboard
1. Visit: https://railway.com/project/2bc9cc67-61e1-4cd5-b730-41cc02f835cd
2. Log in with your Railway account

### Step 2: Add PostgreSQL Database Service
1. Click the **"+"** button or **"Add Service"**
2. Select **"Database"** → **"PostgreSQL"**
3. Wait for provisioning (~1-2 minutes)
4. PostgreSQL service will appear in the dashboard
5. Click on PostgreSQL service
6. Go to **"Variables"** tab
7. Copy the `DATABASE_URL` value (it will be auto-created)

### Step 3: Add DATABASE_URL to Node.js Service
1. Click on **"ghawdex-portal"** service (the Node.js app)
2. Go to **"Variables"** tab
3. You should see:
   ```
   NEXTAUTH_SECRET = sXRh6dVm6THaGM4ZDaYyd6teOltsbfNHRfERVhpOSUE=
   NEXTAUTH_URL = https://portal.ghawdex.pro
   NODE_ENV = production
   ```
4. Click **"New Variable"** (or **"+"**)
5. **Key:** `DATABASE_URL`
6. **Value:** Paste the value from PostgreSQL service's DATABASE_URL
7. Click **"Save"**

### Step 4: Deploy with PostgreSQL Connected
1. The service will automatically redeploy with the new DATABASE_URL
2. Wait for deployment to complete (shows green checkmark)

### Step 5: Run Migrations & Seed
Once PostgreSQL is connected and service is running:

```bash
cd /Users/maciejpopiel/ghawdex-portal

# Run migrations
railway run npx prisma migrate deploy

# Seed database with sample data
railway run npm run db:seed
```

### Step 6: Configure Custom Domain
1. In Railway Dashboard
2. Click on **"ghawdex-portal"** service
3. Go to **"Settings"** tab
4. Find **"Domains"** section
5. Click **"+ Add Custom Domain"** (or **"+ Generate Domain"**)
6. Enter: `portal.ghawdex.pro`
7. Click **"Add"**
8. Railway will show a CNAME value

### Step 7: Add CNAME to DNS Registrar
With Namecheap (or your registrar):
1. Log in to Namecheap
2. Go to: Domain List → ghawdex.pro → Manage
3. Go to: Advanced DNS
4. Add CNAME record:
   - **Host:** `portal`
   - **Type:** `CNAME`
   - **Value:** (from Railway dashboard - looks like `v*.railway.app`)
   - **TTL:** 30 minutes (or 3600)
5. Click **"Save All Records"**
6. Wait 5-60 minutes for DNS propagation

### Step 8: Test Production Portal
```bash
# Test login page loads
curl https://portal.ghawdex.pro/login

# Or open in browser
open https://portal.ghawdex.pro/login
```

**Login with:**
- Email: `admin@ghawdex.com`
- Password: `password123`

---

## What's Currently Set Up ✅

**Environment Variables (Already Set):**
- ✅ `NEXTAUTH_SECRET` = `sXRh6dVm6THaGM4ZDaYyd6teOltsbfNHRfERVhpOSUE=`
- ✅ `NEXTAUTH_URL` = `https://portal.ghawdex.pro`
- ✅ `NODE_ENV` = `production`
- ✅ `RAILWAY_ENVIRONMENT` = `production` (auto-set)
- ✅ `RAILWAY_PROJECT_ID` = `2bc9cc67-61e1-4cd5-b730-41cc02f835cd` (auto-set)

**Services:**
- ✅ ghawdex-portal (Node.js service)
- ⏳ PostgreSQL database (needs setup)

**Domain:**
- ⏳ portal.ghawdex.pro (needs configuration)

---

## Troubleshooting

### PostgreSQL Service Not Appearing
**Solution:**
1. Refresh the Railway dashboard (F5)
2. Or click "Back" and re-enter the project
3. PostgreSQL should appear in the services list

### DATABASE_URL Not Showing
**Solution:**
1. Click on the PostgreSQL service
2. Go to "Variables" tab
3. You should see `DATABASE_URL` listed
4. If not, wait 1-2 minutes for provisioning to complete
5. Refresh the page

### Deployment Still Shows "Building"
**Solution:**
1. Wait 3-5 minutes for Next.js build to complete
2. Check build logs: Click service → "Deployments" tab
3. View logs for errors
4. Common issues:
   - Missing environment variables (check all are set)
   - Database connection timeout (DATABASE_URL correct?)

### Domain Not Working
**Solution:**
1. Verify CNAME was added to registrar
2. Check DNS propagation: https://dns.google
3. Wait up to 48 hours for full propagation
4. Try with different DNS resolver
5. Clear browser cache and cookies
6. Test with: `nslookup portal.ghawdex.pro`

### Login Not Working
**Solution:**
1. Check DATABASE_URL is set and migrations ran
2. Verify NEXTAUTH_SECRET is exactly: `sXRh6dVm6THaGM4ZDaYyd6teOltsbfNHRfERVhpOSUE=`
3. Check NEXTAUTH_URL is exactly: `https://portal.ghawdex.pro`
4. Run migrations: `railway run npx prisma migrate deploy`
5. Seed database: `railway run npm run db:seed`

---

## Environment Variables Reference

### Auto-Set by Railway
- `RAILWAY_ENVIRONMENT` - Environment name
- `RAILWAY_ENVIRONMENT_ID` - Unique ID
- `RAILWAY_ENVIRONMENT_NAME` - Display name
- `RAILWAY_PRIVATE_DOMAIN` - Internal domain
- `RAILWAY_PROJECT_ID` - Project ID
- `RAILWAY_PROJECT_NAME` - Project name
- `RAILWAY_SERVICE_ID` - Service ID
- `RAILWAY_SERVICE_NAME` - Service name

### Auto-Set by PostgreSQL Service
- `DATABASE_URL` - PostgreSQL connection string (after adding service)

### Manually Set (Already Done)
- `NEXTAUTH_SECRET` - Session encryption key
- `NEXTAUTH_URL` - App production URL
- `NODE_ENV` - Set to "production"

---

## Commands Reference

### Check Status
```bash
railway status
```

### View Logs
```bash
railway logs
```

### View Variables
```bash
railway variables
```

### Open Dashboard
```bash
railway open
```

### Run Migrations
```bash
railway run npx prisma migrate deploy
```

### Seed Database
```bash
railway run npm run db:seed
```

### Restart Service
```bash
railway service ghawdex-portal  # Set context
railway down                     # Stop current
railway up                       # Redeploy
```

---

## Timeline

**Already Completed:**
✅ Node.js service deployed
✅ Environment variables set (NEXTAUTH_SECRET, NEXTAUTH_URL, NODE_ENV)
✅ Code built and running on Railway

**Next (Manual steps above):**
⏳ Add PostgreSQL service (dashboard)
⏳ Set DATABASE_URL variable (dashboard)
⏳ Run migrations (CLI or dashboard)
⏳ Seed database (CLI)
⏳ Configure domain (dashboard + registrar)

---

## Success Checklist

- [ ] PostgreSQL service added to Railway
- [ ] DATABASE_URL variable set in Node.js service
- [ ] Service redeploys with DATABASE_URL
- [ ] Run: `railway run npx prisma migrate deploy`
- [ ] Run: `railway run npm run db:seed`
- [ ] Custom domain added to Railway: portal.ghawdex.pro
- [ ] CNAME added to registrar
- [ ] DNS propagates (wait 5-60 min)
- [ ] Login page accessible: https://portal.ghawdex.pro/login
- [ ] Can login with admin@ghawdex.com / password123
- [ ] All pages load (company, team, policies, goals, etc.)
- [ ] Admin panel accessible and functional

---

## Project Links

| Service | URL | Status |
|---------|-----|--------|
| **Main Website** | https://www.ghawdex.pro | ✅ Live |
| **Employee Portal** | https://portal.ghawdex.pro | 🔄 Deploying |
| **Solar Tool** | https://app.ghawdex.pro | ✅ Live |
| **Railway Dashboard** | https://railway.com/project/2bc9cc67-61e1-4cd5-b730-41cc02f835cd | 🔄 Active |

---

**Portal is live on Railway!** Just need to add PostgreSQL and configure domain. 🚀
