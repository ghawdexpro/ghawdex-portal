# GhawdeX Portal - Getting Started

Welcome! This guide will help you get the portal up and running in 10 minutes.

## 📋 Prerequisites

- Node.js 20.9.0 or higher
- PostgreSQL database (local or cloud)
- npm package manager
- Terminal/Command prompt

## 🚀 Quick Start (10 Minutes)

### Step 1: Install Dependencies (2 min)
```bash
cd ghawdex-portal
npm install
```

### Step 2: Set Up Environment (1 min)
```bash
cp .env.example .env.local
```

Now edit `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ghawdex_portal"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3001"
```

**Where to get DATABASE_URL:**
- **Local PostgreSQL**: `postgresql://postgres:password@localhost:5432/ghawdex_portal`
- **Railway**: Copy from Railway dashboard
- **AWS RDS**: Copy from AWS console
- **Heroku**: Copy from Heroku dashboard

### Step 3: Initialize Database (3 min)
```bash
# Create tables
npx prisma migrate dev --name init

# Seed sample data
npm run db:seed
```

### Step 4: Start Development Server (1 min)
```bash
npm run dev
```

Visit **http://localhost:3001** 🎉

### Step 5: Login
Default credentials (from seed):
- **Email**: `admin@ghawdex.com`
- **Password**: `password123`

## ✅ What You Should See

1. Login page → Enter credentials → Dashboard
2. Dashboard shows quick links to all sections
3. Admin panel link in sidebar (for admin users)
4. Announcements, team members, policies, etc. (if seeded)

## 🎮 Try It Out

### As Regular User
1. Login with demo credentials
2. Browse company info
3. View team directory
4. Read policies
5. Check goals
6. Browse procedures
7. Search wiki

### As Admin
1. Click "Admin Panel" in sidebar
2. Add company information
3. Create announcements
4. Manage team members
5. Create policies
6. Set goals
7. Add procedures
8. Create wiki pages
9. Manage users

## 📝 Add Your Own Content

### 1. Edit Company Info
- Admin Panel → Company Info
- Add mission, vision, values
- Click "Save Changes"

### 2. Add Team Members
- Admin Panel → Team Members
- Fill in name, title, department, email
- Click "Add Member"

### 3. Create Policies
- Admin Panel → Policies
- Select category (Vacation Policy, etc.)
- Enter content
- Click "Create Policy"

### 4. Set Goals
- Admin Panel → Goals
- Enter title, description, period
- Set progress (0-100%)
- Click "Create Goal"

### 5. Add Procedures
- Admin Panel → Procedures
- Select category (Emergency, How-To, etc.)
- Enter steps
- Click "Create"

### 6. Create Wiki Pages
- Admin Panel → Wiki Pages
- Enter title (slug auto-generates)
- Select category
- Write content
- Click "Create Page"

## 🔧 Useful Commands

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm start              # Run production build
npm run lint           # Check code quality

npm run db:studio      # Open database editor
npm run db:seed        # Re-seed sample data
npm run db:push        # Push schema to database
```

## 🐛 Troubleshooting

### Port 3001 Already in Use
```bash
# Use different port
npm run dev -- -p 3002
```

### Can't Connect to Database
```bash
# Test connection
psql $DATABASE_URL

# Check .env.local has correct DATABASE_URL
cat .env.local
```

### Forgot Password
1. Open Prisma Studio: `npm run db:studio`
2. Find user in Users table
3. Update password field with new bcrypt hash
4. Or delete user and create new one via admin panel

### Page Not Loading
1. Check browser console for errors
2. Check terminal for server errors
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Restart dev server: `npm run dev`

## 🚢 Deploy to Production

### Option 1: Railway (Recommended)
```bash
npm install -g @railway/cli
railway init
railway up
```

### Option 2: Docker
```bash
docker build -t ghawdex-portal .
docker run -p 3001:3001 ghawdex-portal
```

### Option 3: Vercel
```bash
npm install -g vercel
vercel
```

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup
- **API_REFERENCE.md** - API endpoints
- **PROJECT_SUMMARY.md** - Project overview

## 🔐 Security Tips

1. Change default password immediately
2. Use strong NEXTAUTH_SECRET
3. Use HTTPS in production
4. Keep Node.js updated
5. Regularly backup database
6. Monitor admin access

## 💡 Pro Tips

### Speed Up Development
```bash
# Skip Prisma type generation
export PRISMA_SKIP_ENGINE_CHECK=true
```

### Debug Database Issues
```bash
# View all SQL queries
export DEBUG=prisma:*
npm run dev
```

### Test Admin Features
1. Create test user: Admin Panel → User Management
2. Logout (top right → Sign Out)
3. Login as new user
4. Try different role types

### Bulk Add Data
Use `prisma/seed.ts` to add data programmatically:
```bash
npm run db:seed
```

## 📞 Getting Help

1. **Check error messages** - They usually tell you what's wrong
2. **Check the docs** - README.md has troubleshooting
3. **Check console** - Browser console shows client errors
4. **Check terminal** - Terminal shows server errors

## 🎓 Next Steps

1. ✅ Get it running locally
2. ✅ Add your company information
3. ✅ Create sample content
4. ✅ Create team member accounts
5. ✅ Test all features
6. Deploy to production

## 📋 Checklist

- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Database connected
- [ ] Server running
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can access admin panel
- [ ] Added company info
- [ ] Added team members
- [ ] Created sample content
- [ ] Ready to deploy

## 🎉 You're All Set!

Your GhawdeX Portal is ready. Start exploring and customize it to your needs!

---

**Questions?** Check the documentation files or review the code comments.

**Ready to deploy?** Follow the deployment instructions in README.md.

**Built with Next.js, TypeScript, and Tailwind CSS** ⚡
