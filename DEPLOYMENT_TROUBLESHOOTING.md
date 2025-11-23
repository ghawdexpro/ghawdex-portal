# GhawdeX Portal - Deployment Troubleshooting Guide

## Issue: Wrong Application Deployed to Railway

### Problem
The Railway deployment of `ghawdex-portal` was serving the **main Ghawdex website** instead of the **employee portal** application.

**Symptoms:**
- Root URL (`https://web-production-39617.up.railway.app/`) returned HTTP 200 with "Solar Installation in 9 Days" hero section
- Portal-specific routes (`/login`, `/dashboard`, `/admin`) returned HTTP 404
- Custom domain `portal.ghawdex.pro` showed 500 error or main website content

### Root Cause Analysis

The issue likely occurred due to one of the following:

1. **Repository Mixup**: The `ghawdex-portal` repository on GitHub contains the correct portal code locally, but the deployment appears to be pulling from a different source
2. **Cached Build**: Railway may have cached an older build from before the portal code was properly configured
3. **Wrong Branch/Deploy Target**: The Railway deployment may have been pointing to the wrong GitHub repository or branch
4. **Build Artifact Mismatch**: The `.next` production build directory may not have been rebuilt with the latest code

### Repository Verification

✅ **Local Repository Status (CORRECT):**
```
Repository: ghawdex-portal
Branch: main
Latest Commit: 12674bb (Downgrade Next.js to 15)
Codebase: Contains portal routes (/admin, /dashboard, /login, /calendar, /team, etc.)
```

❌ **Railway Deployment Status (WRONG):**
```
Deployed App: Main Ghawdex website ("Solar Installation in 9 Days")
Expected: Employee portal interface
Routes: Portal-specific routes return 404
```

### Solution

#### Step 1: Verify GitHub Repository
Ensure the `ghawdex-portal` repository on GitHub contains the correct portal code:
- Check: https://github.com/ghawdexpro/ghawdex-portal
- Should contain: `/app/dashboard`, `/app/login`, `/app/admin`, etc.
- Should NOT contain: main website hero sections or "Solar Installation" content

#### Step 2: Force Railway Rebuild

Option A - Via Railway CLI:
```bash
# Connect to Railway project
railway link

# Trigger a rebuild by making a small commit
echo "# Force rebuild" >> README.md
git add README.md
git commit -m "Force Railway rebuild"
git push origin main

# Monitor the deployment
railway logs
```

Option B - Via Railway Dashboard:
1. Go to https://railway.app
2. Select the `ghawdex-portal` project
3. Click on the service
4. Look for "Redeploy" or "Rebuild" button
5. Force a clean rebuild (clear cache if available)

#### Step 3: Clear Build Cache

If the issue persists:
```bash
# Locally clear build cache
rm -rf .next/
npm install
npm run build

# Force push to trigger fresh Railway build
git push origin main --force
```

#### Step 4: Verify Deployment

After rebuild:
```bash
# Test portal routes
curl -I https://web-production-39617.up.railway.app/login
# Should return: HTTP 200 (not 404)

curl -I https://web-production-39617.up.railway.app/dashboard
# Should return: HTTP 200 (not 404)

curl https://web-production-39617.up.railway.app/
# Should contain: "GhawdeX Portal" or login form (not "Solar Installation")
```

### Prevention

1. **Repository Hygiene**
   - Keep `ghawdex-portal` repo as PORTAL ONLY
   - Keep main website in separate repository (e.g., `ghawdex` or `ghawdex-main`)
   - Never merge main website code into portal repo

2. **Deployment Configuration**
   - Document Railway project settings (repository, branch, environment variables)
   - Store Railway configuration in `railway.toml` (versioned in git)
   - Add deployment verification to CI/CD pipeline

3. **Monitoring**
   - Set up health checks for portal-specific routes (`/login`, `/dashboard`)
   - Monitor HTTP status codes for 404s on expected routes
   - Add automatic alerts for deployment failures

4. **Documentation**
   - Document which repositories are deployed where
   - Maintain deployment checklist (see below)

### Deployment Checklist

Before deploying to Railway:

```markdown
## Pre-Deployment Checklist

- [ ] Verify correct repository: `ghawdex-portal` (portal code only)
- [ ] Check branch: main
- [ ] Local build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Environment variables set: `.env.production` has SUPABASE vars
- [ ] Test portal routes locally: `npm run dev` then visit /login
- [ ] Commit all changes: `git status` shows clean working tree
- [ ] Push to main: `git push origin main`
- [ ] Verify deployment: Check Railway logs via `railway logs`
- [ ] Test portal routes: Visit /login, /dashboard, /admin
- [ ] Verify no 404s: All portal routes return HTTP 200+
- [ ] Test custom domain: https://portal.ghawdex.pro works

## Post-Deployment Verification

```bash
# Test root page
curl -I https://web-production-39617.up.railway.app/

# Test portal routes
curl -I https://web-production-39617.up.railway.app/login
curl -I https://web-production-39617.up.railway.app/dashboard
curl -I https://web-production-39617.up.railway.app/admin

# Test custom domain
curl -I https://portal.ghawdex.pro/

# Monitor logs
railway logs --service ghawdex-portal
```

### Related Documentation

- `README.md` - Project overview
- `.env.production` - Production environment variables
- `next.config.ts` - Next.js configuration
- `package.json` - Project dependencies and scripts

### Support

If the issue persists:
1. Check Railway service logs: `railway logs`
2. Verify GitHub repository has correct code
3. Verify Railway project is linked to correct repo: `railway link`
4. Check environment variables on Railway match `.env.production`
5. Force clean rebuild: Delete production deployment and redeploy from scratch
