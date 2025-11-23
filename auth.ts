// STUB: NextAuth disabled during Supabase migration
// TODO: Replace with Supabase Auth

export async function auth() {
  return null;
}

export async function signIn() {
  return null;
}

export async function signOut() {
  return null;
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
};
