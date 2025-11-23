#!/usr/bin/env node

/**
 * Database initialization script
 * Runs migrations and seeds the database
 * Called once on application startup in production
 */

const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

async function initializeDatabase() {
  console.log('🔄 Initializing database...');

  try {
    // Run migrations
    console.log('📊 Running migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Migrations completed');

    // Seed database
    console.log('🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');

    console.log('✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Only run if explicitly called
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
