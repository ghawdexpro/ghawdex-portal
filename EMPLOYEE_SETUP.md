# Employee Account Setup Guide

**Date:** November 23, 2025
**Portal:** https://portal.ghawdex.pro
**Admin Account:** admin@ghawdex.com / password123

---

## 🎯 Overview

This guide covers how to create and manage employee accounts in the GhawdeX Portal.

---

## 📋 Step 1: Access Admin Panel

1. Go to: https://portal.ghawdex.pro/login
2. Log in with:
   - **Email:** admin@ghawdex.com
   - **Password:** password123
3. You'll see the main dashboard
4. Click on **"User Management"** in the admin panel (or navigate to `/admin/users`)

---

## 👥 Step 2: Create Employee Accounts

### Via Admin Panel (Recommended)

1. Go to Admin → User Management
2. Click **"+ Create New User"** button
3. Fill in the following fields:

**Required Fields:**
- **Email:** Employee's email address (e.g., john.doe@ghawdex.com)
- **Name:** Employee's full name (e.g., John Doe)
- **Password:** Temporary password (employee can change later)
- **Role:** Select role:
  - **EMPLOYEE** - Can view company info, calendar, policies, goals, team (default)
  - **MANAGER** - Can create announcements, edit policies, manage team
  - **ADMIN** - Full access to manage all content and users

4. Click **"Create User"**

### Via Direct Database (Advanced)

If the admin panel isn't available, you can add users directly to the database:

```bash
# Connect to the database
railway run npx prisma studio

# Or add via SQL:
INSERT INTO "User" (email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'employee@ghawdex.com',
  'Employee Name',
  '$2b$10$...',  -- bcrypt hashed password
  'EMPLOYEE',
  NOW(),
  NOW()
);
```

---

## 📝 Example Employee Accounts to Create

You might want to create accounts for your team:

| Email | Name | Role | Department |
|-------|------|------|-----------|
| john.doe@ghawdex.com | John Doe | MANAGER | Engineering |
| sarah.smith@ghawdex.com | Sarah Smith | EMPLOYEE | Marketing |
| michael.johnson@ghawdex.com | Michael Johnson | EMPLOYEE | Sales |
| emily.wilson@ghawdex.com | Emily Wilson | MANAGER | Operations |

---

## 🔐 Password Management

### Initial Password
- Set a temporary password when creating the account
- Employee should receive this via secure channel
- Employee should change password on first login

### Change Password Later
1. Log in as the employee
2. Go to Settings (top-right menu)
3. Click "Change Password"
4. Enter current password and new password
5. Save

### Admin Reset Password
1. Go to Admin → User Management
2. Find employee in list
3. Click "Reset Password"
4. Set temporary password
5. Send to employee securely

---

## 👤 User Roles Explained

### EMPLOYEE (Default)
**Access:**
- ✅ View company information
- ✅ View team directory
- ✅ View policies and procedures
- ✅ View company goals
- ✅ View master calendar
- ✅ View wiki/documentation
- ✅ View company culture

**Cannot:**
- ❌ Edit any content
- ❌ Manage users
- ❌ Create announcements
- ❌ Manage calendar events
- ❌ Access admin panel

**Use for:** Most employees

### MANAGER
**Access:**
- ✅ Everything employees can see
- ✅ Create and edit announcements
- ✅ Edit company information
- ✅ Manage team members
- ✅ Edit policies
- ✅ Create and edit goals
- ✅ Manage calendar events
- ✅ Create wiki pages

**Cannot:**
- ❌ Manage users (create/delete accounts)
- ❌ Access full admin panel
- ❌ Change system settings

**Use for:** Department heads, team leads

### ADMIN (Full Access)
**Access:**
- ✅ Everything

**Use for:** Portal administrators (you)

---

## 🔄 Bulk User Creation

If you need to create many users at once, use this script:

```bash
# Create a CSV file: employees.csv
# Format: email,name,role
# Example:
# john.doe@ghawdex.com,John Doe,EMPLOYEE
# sarah.smith@ghawdex.com,Sarah Smith,MANAGER

# Then run via admin panel API or manually add each user
```

Or via direct database insert:

```bash
railway run npx prisma studio

# Or use Prisma seed script
npm run db:seed
```

---

## 📧 Onboarding Email Template

Send this email to new employees:

---

**Subject: Welcome to GhawdeX Employee Portal!**

Hello [Employee Name],

Welcome to the GhawdeX Employee Portal! Here's how to get started:

**Portal URL:** https://portal.ghawdex.pro

**Your Login Credentials:**
- Email: [email]
- Temporary Password: [password]

**First Steps:**
1. Visit the portal login page
2. Enter your email and temporary password
3. Change your password to something secure
4. Explore the portal to see:
   - Company information and culture
   - Team directory
   - Company goals and progress
   - Master calendar with events
   - Policies and procedures
   - Engineering wiki

**Need Help?**
- Contact: admin@ghawdex.com
- Or reach out to your department head

Welcome aboard!

---

## 🚀 Post-Onboarding Checklist

After creating employee accounts:

- [ ] Send welcome emails with credentials
- [ ] Ask employees to change their temporary password
- [ ] Verify they can log in successfully
- [ ] Share portal features overview
- [ ] Answer any questions

---

## 🆘 Troubleshooting

### Employee Can't Log In
**Possible causes:**
- Account not created yet (check in User Management)
- Wrong email/password (verify in database)
- Account disabled (check status)

**Solution:**
1. Go to Admin → User Management
2. Verify employee account exists
3. If not, create it
4. If exists, reset password
5. Send new credentials

### Can't Access Admin Panel
**Possible causes:**
- User role is not ADMIN
- User not created in database

**Solution:**
1. Log in as admin@ghawdex.com
2. Go to User Management
3. Change user role to ADMIN
4. Have user log out and log back in

### Password Reset Not Working
**Possible causes:**
- Admin panel not accessible
- Database connection issue

**Solution:**
1. Check Railway logs: `railway logs`
2. Verify DATABASE_URL is set
3. Try resetting via `railway run npx prisma studio`

---

## 📊 User Management API Endpoints

If you want to automate user creation:

### Create User
```bash
POST /api/admin/users
Content-Type: application/json

{
  "email": "john.doe@ghawdex.com",
  "name": "John Doe",
  "password": "temporary-password",
  "role": "EMPLOYEE"
}
```

### Get All Users
```bash
GET /api/admin/users
```

### Update User
```bash
PUT /api/admin/users/[user-id]
Content-Type: application/json

{
  "name": "Updated Name",
  "role": "MANAGER"
}
```

### Delete User
```bash
DELETE /api/admin/users/[user-id]
```

---

## 🔐 Security Best Practices

1. **Change Default Admin Password**
   - Log in as admin@ghawdex.com
   - Change the temporary password to a strong, unique password
   - Store securely in password manager

2. **Use Strong Employee Passwords**
   - At least 8 characters
   - Mix of uppercase, lowercase, numbers, special characters
   - No dictionary words

3. **Share Credentials Securely**
   - Use password manager or encrypted email
   - Never share in plain text chat
   - Use different temporary passwords for each user

4. **Regular Access Reviews**
   - Periodically review who has access
   - Remove access for departed employees
   - Update roles as positions change

5. **Monitor Activity**
   - Check Railway logs for errors
   - Monitor failed login attempts
   - Keep backups of database

---

## 📞 Support

If employees have issues:

1. Check their account in User Management
2. Verify their role allows access to the page they're visiting
3. Have them clear browser cache
4. Have them try incognito/private mode
5. Reset their password if needed

---

**Portal Status:** 🟢 READY
**Admin Access:** ✅ READY
**Next Step:** Create employee accounts!
