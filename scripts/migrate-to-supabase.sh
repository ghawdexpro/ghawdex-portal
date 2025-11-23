#!/bin/bash

# Bulk migration from Prisma to Supabase
# WARNING: This will modify files in place. Make sure you have git commits!

echo "🚀 Starting Prisma → Supabase migration..."

# Find all files that import prisma
files=$(grep -rl "from.*lib/prisma" app --include="*.ts" --include="*.tsx")

for file in $files; do
  echo "📝 Migrating: $file"

  # Replace import statement
  sed -i '' 's/import { prisma } from "@\/lib\/prisma";/import { createClient } from "@\/lib\/supabase\/server";/g' "$file"

  # Add async to createClient calls
  # This is a placeholder - we'll handle this in the wrapper

done

echo "✅ Import statements migrated!"
echo "⚠️  You still need to update query syntax manually"
echo "📋 Total files modified: $(echo "$files" | wc -l)"
