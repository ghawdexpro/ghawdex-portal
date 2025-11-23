import { createClient } from '@/lib/supabase/server';

// Supabase wrapper that mimics Prisma API for easier migration
export async function getDB() {
  const supabase = await createClient();

  return {
    announcement: {
      findMany: async (opts?: { orderBy?: any }) => {
        let query = supabase.from('Announcement').select('*');
        if (opts?.orderBy?.createdAt === 'desc') {
          query = query.order('createdAt', { ascending: false });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('Announcement')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('Announcement')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('Announcement')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    user: {
      findMany: async (opts?: { select?: any }) => {
        let query = supabase.from('User');
        // If specific columns requested, build select string
        if (opts?.select) {
          const columns = Object.keys(opts.select).filter(k => opts.select[k]).join(',');
          query = query.select(columns || '*');
        } else {
          query = query.select('*');
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      findUnique: async ({ where }: { where: { id?: string, email?: string } }) => {
        let query = supabase.from('User').select('*');
        if (where.id) query = query.eq('id', where.id);
        if (where.email) query = query.eq('email', where.email);
        const { data, error } = await query.single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('User')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('User')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('User')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    teamMember: {
      findMany: async (opts?: { orderBy?: any }) => {
        let query = supabase.from('TeamMember').select('*');
        if (opts?.orderBy?.name === 'asc') {
          query = query.order('name', { ascending: true });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('TeamMember')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('TeamMember')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('TeamMember')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    policy: {
      findMany: async (opts?: { where?: any, orderBy?: any }) => {
        let query = supabase.from('Policy').select('*');
        if (opts?.where?.status) {
          query = query.eq('status', opts.where.status);
        }
        if (opts?.orderBy?.createdAt === 'desc') {
          query = query.order('createdAt', { ascending: false });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('Policy')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('Policy')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('Policy')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    goal: {
      findMany: async (opts?: { where?: any, orderBy?: any }) => {
        let query = supabase.from('Goal').select('*');
        if (opts?.where?.status) {
          query = query.eq('status', opts.where.status);
        }
        if (opts?.orderBy?.createdAt === 'desc') {
          query = query.order('createdAt', { ascending: false });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('Goal')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('Goal')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('Goal')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    procedure: {
      findMany: async (opts?: { orderBy?: any }) => {
        let query = supabase.from('Procedure').select('*');
        if (opts?.orderBy?.createdAt === 'desc') {
          query = query.order('createdAt', { ascending: false });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('Procedure')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('Procedure')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('Procedure')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    wikiPage: {
      findMany: async (opts?: { where?: any, orderBy?: any }) => {
        let query = supabase.from('WikiPage').select('*');
        if (opts?.where?.published) {
          query = query.eq('published', opts.where.published);
        }
        if (opts?.orderBy?.createdAt === 'desc') {
          query = query.order('createdAt', { ascending: false });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      findUnique: async ({ where }: { where: { id?: string, slug?: string } }) => {
        let query = supabase.from('WikiPage').select('*');
        if (where.id) query = query.eq('id', where.id);
        if (where.slug) query = query.eq('slug', where.slug);
        const { data, error } = await query.single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('WikiPage')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('WikiPage')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('WikiPage')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    tool: {
      findMany: async (opts?: { orderBy?: any }) => {
        let query = supabase.from('Tool').select('*');
        if (opts?.orderBy?.category === 'asc') {
          query = query.order('category', { ascending: true });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('Tool')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('Tool')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('Tool')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    calendarEvent: {
      findMany: async (opts?: { orderBy?: any }) => {
        let query = supabase.from('CalendarEvent').select('*');
        if (opts?.orderBy?.startDate === 'desc') {
          query = query.order('startDate', { ascending: false });
        } else if (opts?.orderBy?.startDate === 'asc') {
          query = query.order('startDate', { ascending: true });
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },
      create: async ({ data }: { data: any }) => {
        const { data: result, error } = await supabase
          .from('CalendarEvent')
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      update: async ({ where, data }: { where: { id: string }, data: any }) => {
        const { data: result, error } = await supabase
          .from('CalendarEvent')
          .update(data)
          .eq('id', where.id)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      delete: async ({ where }: { where: { id: string } }) => {
        const { error } = await supabase
          .from('CalendarEvent')
          .delete()
          .eq('id', where.id);
        if (error) throw error;
        return { id: where.id };
      },
    },

    companyInfo: {
      findFirst: async () => {
        const { data, error } = await supabase
          .from('CompanyInfo')
          .select('*')
          .limit(1)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
      },
      upsert: async ({ where, create, update }: { where: { id: string }, create: any, update: any }) => {
        const { data: existing } = await supabase
          .from('CompanyInfo')
          .select('*')
          .eq('id', where.id)
          .single();

        if (existing) {
          const { data: result, error } = await supabase
            .from('CompanyInfo')
            .update(update)
            .eq('id', where.id)
            .select()
            .single();
          if (error) throw error;
          return result;
        } else {
          const { data: result, error } = await supabase
            .from('CompanyInfo')
            .insert([create])
            .select()
            .single();
          if (error) throw error;
          return result;
        }
      },
    },
  };
}

// Export a singleton-like function
export { getDB as prisma };
