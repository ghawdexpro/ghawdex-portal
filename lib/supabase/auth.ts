import { createClient } from './server';

/**
 * Get current user session from Supabase
 */
export async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    return profile?.role === 'ADMIN';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}

/**
 * For API route protection - check if request has valid session
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * For API route protection - check if user is admin
 */
export async function requireAdmin() {
  const user = await requireAuth();
  const admin = await isAdmin(user.id);
  if (!admin) {
    throw new Error('Forbidden - Admin access required');
  }
  return user;
}
