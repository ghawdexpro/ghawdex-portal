#!/bin/bash

# GhawdeX Portal - Railway Setup Script
# This script automates the Railway deployment setup

set -e

echo "🚀 GhawdeX Portal - Railway Setup"
echo "=================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm i -g @railway/cli"
    exit 1
fi

echo -e "${BLUE}✓ Railway CLI found${NC}"

# Get project info
PROJECT_ID=$(railway variables | grep RAILWAY_PROJECT_ID | awk '{print $NF}')
echo -e "${GREEN}✓ Project ID: $PROJECT_ID${NC}"

# Check if this is running in Railway environment
if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠ DATABASE_URL not set - Running locally${NC}"
    echo -e "${YELLOW}ℹ Set DATABASE_URL in Railway dashboard manually${NC}"

    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://railway.com/project/$PROJECT_ID"
    echo "2. Click '+ Add Service' → Select 'PostgreSQL'"
    echo "3. Wait for provisioning"
    echo "4. Environment variables will auto-update with DATABASE_URL"
    echo "5. Then run: railway run npx prisma migrate deploy"
    echo ""
else
    echo -e "${GREEN}✓ DATABASE_URL is set${NC}"

    echo ""
    echo "📊 Running Database Migrations..."
    railway run npx prisma migrate deploy

    echo ""
    echo "🌱 Seeding Database..."
    railway run npm run db:seed

    echo -e "${GREEN}✓ Database setup complete!${NC}"
fi

echo ""
echo "🔗 Configure Domain:"
echo "   railway domain"
echo ""
echo "📝 Monitor Logs:"
echo "   railway logs"
echo ""
echo "✅ Setup complete! Portal will be live soon."
