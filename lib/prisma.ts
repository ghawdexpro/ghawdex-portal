// MIGRATED TO SUPABASE - This file now wraps Supabase with Prisma-like API
import { getDB } from './db';

// Create a proxy that makes getDB() calls synchronous-looking
// by storing the promise and awaiting it when methods are called
let dbInstance: any = null;

export const prisma = new Proxy({} as any, {
  get(_target, model: string) {
    // Return a proxy for each model
    return new Proxy({} as any, {
      get(_modelTarget, method: string) {
        return async (...args: any[]) => {
          // Get fresh DB instance for each call
          const db = await getDB();
          const modelAPI = (db as any)[model];
          if (!modelAPI || !modelAPI[method]) {
            throw new Error(`Method ${String(model)}.${String(method)} not found in Supabase wrapper`);
          }
          return modelAPI[method](...args);
        };
      },
    });
  },
});
