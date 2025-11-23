# Portal Domain Configuration Guide

**Date:** November 23, 2025
**Current Status:** Code deployed, domain pending
**Target Domain:** portal.ghawdex.pro

---

## 🎯 Overview

This guide covers how to set up the custom domain `portal.ghawdex.pro` for the Employee Portal.

**Time required:** 5 minutes setup + 5-60 minutes for DNS propagation

---

## 📋 Step 1: Add Domain in Railway Dashboard

### 1.1 Open Railway Dashboard
1. Go to: https://railway.com/project/2bc9cc67-61e1-4cd5-b730-41cc02f835cd
2. Log in to your Railway account
3. Click on **`ghawdex-portal`** service

### 1.2 Navigate to Domain Settings
1. Go to **"Settings"** tab (right side)
2. Scroll down to **"Domains"** section
3. Click **"+ Add Custom Domain"** button

### 1.3 Enter Domain Name
1. In the text field, enter: `portal.ghawdex.pro`
2. Click **"Add Domain"** button
3. Railway will generate a **CNAME value**

### 1.4 Copy CNAME Value
Railway will display something like:
```
CNAME Value: v*.railway.app
```

**Example:**
```
v66r7fpe.up.railway.app
```

Copy this value - you'll need it for the next step.

---

## 🌐 Step 2: Add CNAME Record to Registrar

You're using **Namecheap** as your registrar for ghawdex.pro.

### 2.1 Log In to Namecheap
1. Go to: https://www.namecheap.com/
2. Log in to your account
3. Go to **"Dashboard"** or **"Manage Domains"**
4. Find **ghawdex.pro** in your domain list
5. Click **"Manage"**

### 2.2 Open Advanced DNS
1. Click on the **"Advanced DNS"** tab
2. Find the **DNS Records** section

### 2.3 Add CNAME Record

Look for existing records. You might see:
- `www` → (some value)
- `@` → (some value)
- Other subdomains

**Add a new CNAME record:**

1. Find the section where you can add a new record (usually a button like "+ Add Record")
2. Fill in the fields:
   - **Host/Name:** `portal` (just the subdomain, not the full domain)
   - **Type:** `CNAME` (select from dropdown)
   - **Value:** Paste the Railway CNAME value from Step 1.4 (e.g., `v66r7fpe.up.railway.app`)
   - **TTL:** 3600 (or select "Auto" for automatic)

3. Click **"Save"** or **"Add"**

4. Click **"Save All Records"** at the bottom of the page

### Example Screenshot
```
Host       | Type  | Value                        | TTL
-----------|-------|------------------------------|------
@          | A     | 76.76.19.38                  | 3600
www        | CNAME | example.ghawdex.pro          | 3600
mail       | MX    | aspmx.l.google.com           | 3600
portal     | CNAME | v66r7fpe.up.railway.app      | 3600  <- ADD THIS
```

---

## ⏱️ Step 3: Wait for DNS Propagation

DNS changes take time to propagate across the internet.

### 3.1 Propagation Timeline
- **Immediate:** Some ISPs pick it up immediately
- **30 minutes:** Most ISPs have the new records
- **4 hours:** Majority of internet updated
- **24-48 hours:** Full global propagation

### 3.2 Check Propagation

**Option A: Use DNS Checker**
1. Go to: https://dns.google/
2. Enter: `portal.ghawdex.pro`
3. Select **CNAME** record type
4. Click **Search**
5. If it shows your Railway CNAME value, propagation is complete

**Option B: Use Command Line**
```bash
# macOS/Linux
nslookup portal.ghawdex.pro
dig portal.ghawdex.pro

# Windows
nslookup portal.ghawdex.pro
```

Expected output:
```
portal.ghawdex.pro	3600	IN	CNAME	v66r7fpe.up.railway.app
v66r7fpe.up.railway.app	300	IN	A	76.76.21.XX
```

**Option C: Use Online Tool**
- https://mxtoolbox.com/mxlookup.aspx
- https://www.whatsmydns.net/

---

## 🔍 Step 4: Verify Domain is Working

### 4.1 Wait for Propagation
- Small delay (5-60 minutes typical)
- Global propagation (24-48 hours for all regions)

### 4.2 Test in Browser

Once propagation is complete:

1. Open: https://portal.ghawdex.pro
2. You should see the login page
3. Try logging in with: admin@ghawdex.com / password123
4. Dashboard should load
5. All features should work

### 4.3 Verify SSL Certificate

Once the domain is working:
1. Click the padlock icon in browser (next to URL)
2. You should see a valid SSL certificate
3. Issued to: portal.ghawdex.pro
4. No security warnings

---

## 📊 DNS Records Needed

Your Namecheap DNS should have these records:

| Host | Type | Value | Purpose |
|------|------|-------|---------|
| @ | A | (current value) | Main domain |
| www | CNAME | (current value) | www subdomain |
| portal | CNAME | v66r7fpe.up.railway.app | Employee portal |
| mail | MX | aspmx.l.google.com | Email (if using) |

---

## 🔗 Verification Checklist

- [ ] Domain added in Railway dashboard
- [ ] CNAME record added to Namecheap
- [ ] "Save All Records" clicked
- [ ] Waited 5+ minutes
- [ ] DNS propagation checked
- [ ] Portal loads at https://portal.ghawdex.pro
- [ ] Login page appears
- [ ] Can log in with admin@ghawdex.com
- [ ] Dashboard loads without errors
- [ ] SSL certificate is valid

---

## 🆘 Troubleshooting

### Domain Doesn't Resolve
**Symptoms:** "Can't find server" or timeout

**Solutions:**
1. Wait longer (up to 60 minutes)
2. Verify CNAME record in Namecheap:
   - Host: `portal`
   - Type: `CNAME`
   - Value: `v66r7fpe.up.railway.app` (or Railway's value)
3. Clear browser cache and DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache

   # Linux
   sudo systemctl restart systemd-resolved
   ```
4. Try from different network (mobile hotspot)
5. Try from incognito/private browser
6. Check with: `nslookup portal.ghawdex.pro`

### Domain Resolves but Shows Error

**Symptoms:** Domain loads but shows Railway error page

**Solutions:**
1. Verify domain is added in Railway (might need 5 min to sync)
2. Restart Railway service: `railway restart`
3. Check Railway logs: `railway logs`
4. Verify SERVICE is still running (green indicator in dashboard)

### SSL Certificate Error

**Symptoms:** HTTPS warning or "not secure"

**Solutions:**
1. Wait 5-10 minutes for Railway to generate certificate
2. Check Railway dashboard for certificate status
3. Try accessing via HTTP first (not recommended)
4. Clear browser cache
5. Try different browser

### Domain Points to Wrong Site

**Symptoms:** Domain loads but shows different website

**Solutions:**
1. Verify you added the CNAME record to ghawdex.pro registrar (not another domain)
2. Check the CNAME value matches exactly (including `.up.railway.app`)
3. Verify in Namecheap:
   - Domain: `ghawdex.pro`
   - Subdomain: `portal`
   - Type: `CNAME` (not A record)
4. Wait for DNS propagation
5. Contact Namecheap support if issues persist

### Multiple Domain Issues

If you have multiple subdomains (www, app, portal):
```
www    → CNAME to www service
app    → CNAME to app service
portal → CNAME to portal service (this one)
```

Each needs its own CNAME record pointing to the correct service.

---

## 📈 After Domain is Live

### 1. Test All Features
- [ ] Login works
- [ ] All pages load
- [ ] All links work
- [ ] Calendar displays
- [ ] Admin panel accessible
- [ ] No console errors

### 2. Share Portal URL with Team
- Update bookmarks
- Add to company wiki
- Share in employee handbook
- Post in company chat

### 3. Monitor Performance
```bash
railway logs --follow
```

Check for any errors or issues.

### 4. Update Email Links
If you email employees about the portal, use: https://portal.ghawdex.pro

---

## 📞 DNS Provider Comparison

If you need to use a different registrar:

| Provider | CNAME Setup | Notes |
|----------|-----------|-------|
| Namecheap | Advanced DNS tab | Easy to use |
| GoDaddy | DNS Management | Similar to Namecheap |
| Google Domains | DNS settings | Clean interface |
| Route 53 | Hosted Zone | AWS service |
| CloudFlare | DNS Records | Includes CDN |

All work the same way - add a CNAME record for `portal` pointing to Railway.

---

## 💡 Tips

1. **TTL (Time to Live):** Lower = faster updates but more DNS queries. 3600 (1 hour) is standard.

2. **CNAME vs A Record:**
   - Use CNAME for Railway (recommended)
   - A records are for direct IP addresses

3. **Subdomains:** You can have multiple subdomains pointing to different services:
   - `portal.ghawdex.pro` → Employee Portal
   - `app.ghawdex.pro` → Solar Analysis App
   - `www.ghawdex.pro` → Marketing Website

4. **SSL Certificates:** Railway automatically provides SSL/TLS certificates for your domain. No additional configuration needed.

---

## 🚀 Timeline

**Immediate:** Add domain to Railway, add CNAME to registrar
**5-30 minutes:** Most users can access
**1-24 hours:** Worldwide propagation complete

---

## ✅ Success Indicators

When domain is properly configured:

✅ https://portal.ghawdex.pro loads
✅ URL shows in browser address bar
✅ Padlock shows secure (green)
✅ Login page appears
✅ Can log in and access dashboard
✅ No SSL warnings
✅ All pages load from portal.ghawdex.pro

---

**Current Status:** Domain configuration ready
**Next Step:** Add CNAME record in Namecheap
**Target:** portal.ghawdex.pro fully functional
