// MIGRATED TO SUPABASE - This file wraps Supabase with Prisma-like API
import { getDB } from './db';

// Export as thenable so it works with: const db = await prisma
export const prisma = getDB() as any;
