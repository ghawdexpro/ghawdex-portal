# GhawdeX Portal - Railway Deployment Setup

**Project Status:** Code deployed, ready for services configuration

## Quick Setup (5 steps)

### 1. Project Already Created ✅
- Project ID: `ghawdex-portal`
- Workspace: Max's Projects
- Linked locally

### 2. Add PostgreSQL Service
In Railway Dashboard:
1. Go to: https://railway.com/project/ghawdex-portal
2. Click: "+ Add Service"
3. Select: "PostgreSQL"
4. Railway will auto-generate `DATABASE_URL`

### 3. Link Node.js Service
In Railway Dashboard:
1. Click: "+ Add Service"
2. Select: "GitHub" → Link repository (if available)
3. Or use: "Docker" with existing deployment

### 4. Set Environment Variables
In Railway Dashboard → Variables:

```
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
NEXTAUTH_URL=https://portal.ghawdex.pro
NODE_ENV=production
```

Railway will auto-provide:
- `DATABASE_URL` (from PostgreSQL service)

### 5. Deploy & Configure Domain
```bash
railway up
railway domain
# → portal.ghawdex.pro
```

---

## Manual Setup via Railway Dashboard

### Step-by-Step

#### A. Open Project Dashboard
- URL: https://railway.com/project/ghawdex-portal
- Or use: `railway open`

#### B. Add PostgreSQL Database
1. Click **"+ Add"** button
2. Select **"Database"** → **"PostgreSQL"**
3. Wait for provisioning (~1-2 minutes)
4. Click on PostgreSQL service
5. Go to **"Variables"** tab
6. Copy `DATABASE_URL`

#### C. Deploy Node.js Application
**Option 1: Using CLI (Recommended)**
```bash
cd /Users/maciejpopiel/ghawdex-portal
railway service --set ghawdex-portal
railway up
```

**Option 2: Using GitHub (If repo created)**
1. Create GitHub repo: https://github.com/maciejpopiel/ghawdex-portal
2. Push code: `git push origin master`
3. In Railway: Add Service → GitHub → Select repo
4. Railway auto-deploys on push

#### D. Configure Environment Variables
1. Go to Railway Dashboard
2. Select Node.js service
3. Click **"Variables"** tab
4. Add:
   - `NEXTAUTH_SECRET` - Generate: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Set to: `https://portal.ghawdex.pro`
   - `NODE_ENV` - Set to: `production`

5. PostgreSQL service will auto-set `DATABASE_URL`

#### E. Deploy
```bash
railway up
```

Or automatic if connected to GitHub.

#### F. Run Migrations
```bash
railway run npx prisma migrate deploy
```

#### G. Seed Database (Optional)
```bash
railway run npm run db:seed
```

#### H. Configure Custom Domain
1. In Railway Dashboard
2. Select Node.js service
3. Go to **"Settings"** tab
4. Click **"+ Generate Domain"** or **"+ Add Custom Domain"**
5. Enter: `portal.ghawdex.pro`
6. Railway provides CNAME value
7. Add CNAME to DNS registrar (Namecheap)

---

## Environment Variables Reference

### Development (.env)
```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3001"
```

### Production (Railway Dashboard)
```
DATABASE_URL=postgresql://user:password@host:5432/railway
NEXTAUTH_SECRET=<secure random 32 character string>
NEXTAUTH_URL=https://portal.ghawdex.pro
NODE_ENV=production
```

### Generate Secure NEXTAUTH_SECRET
```bash
openssl rand -base64 32
# Example output: abc123XYZ+/==
# Copy this to Railway Dashboard
```

---

## Verify Deployment

### Check Status
```bash
railway status
```

### View Logs
```bash
railway logs
```

### Open Dashboard
```bash
railway open
```

### Test Production URL
```bash
curl https://portal.ghawdex.pro/login
```

---

## Troubleshooting

### Build Fails
```bash
# Check build logs
railway logs
# Common issues:
# - Missing environment variables
# - Database connection string incorrect
# - Node version mismatch
```

### Database Migration Error
```bash
# Verify connection
railway run npx prisma db push --skip-generate

# Check status
railway run npx prisma migrate status

# Manual migration
railway run npx prisma migrate deploy
```

### NEXTAUTH_SECRET Not Set
```bash
# Error: NEXTAUTH_SECRET must be 32+ chars
# Solution: Generate and set in Railway Variables
openssl rand -base64 32
# Copy output to Railway Dashboard
```

### Domain Not Resolving
```bash
# Check DNS propagation
nslookup portal.ghawdex.pro

# Or use
dig portal.ghawdex.pro

# Verify CNAME in registrar
# Allow 24-48 hours for full propagation
```

---

## Production Checklist

- [ ] PostgreSQL database added to Railway
- [ ] Node.js service deployed
- [ ] Environment variables set:
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXTAUTH_URL
  - [ ] NODE_ENV=production
  - [ ] DATABASE_URL (auto-set)
- [ ] Database migrations run: `railway run npx prisma migrate deploy`
- [ ] Database seeded: `railway run npm run db:seed` (optional)
- [ ] Custom domain configured: portal.ghawdex.pro
- [ ] HTTPS enabled (automatic with Railway)
- [ ] Login tested: https://portal.ghawdex.pro/login
- [ ] Admin panel verified: https://portal.ghawdex.pro/admin

---

## Performance & Monitoring

### Monitor Logs
```bash
# Stream logs
railway logs --tail

# View specific number of logs
railway logs -n 100
```

### Check Resource Usage
- Go to Railway Dashboard
- Service Metrics tab
- Monitor CPU, Memory, Network

### Set Up Alerts (Optional)
- Railway Dashboard → Settings → Notifications
- Configure Slack, Email, or webhooks

---

## Deployment URL

- **Production:** https://portal.ghawdex.pro
- **Railway Dashboard:** https://railway.com/project/ghawdex-portal
- **Main Site:** https://www.ghawdex.pro (footer link: "Team Portal")
- **Solar Tool:** https://app.ghawdex.pro

---

## Support

For Railway help:
- Docs: https://docs.railway.app/
- Status: https://status.railway.app/
- Community: https://discord.gg/railway

For Portal issues:
- See: QUICK_START.md
- See: DEPLOYMENT_PORTAL.md

---

**Portal is ready for production!** Deploy following the steps above. 🚀
