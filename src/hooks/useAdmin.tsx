
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  userRoles: UserRole[];
  fetchUserRoles: () => Promise<void>;
  assignRole: (userId: string, role: 'admin' | 'user') => Promise<void>;
  removeRole: (userId: string, role: 'admin' | 'user') => Promise<void>;
}

export const useAdmin = (): AdminContextType => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      console.log('🔐 Checking admin status for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('❌ Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        const adminStatus = !!data;
        console.log('✅ Admin status:', adminStatus);
        setIsAdmin(adminStatus);
      }
    } catch (error) {
      console.error('💥 Error in checkAdminStatus:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRoles = async () => {
    if (!user || !isAdmin) return;

    try {
      console.log('📋 Fetching all user roles...');
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching user roles:', error);
        throw error;
      }

      console.log('✅ Fetched user roles:', data);
      setUserRoles(data || []);
    } catch (error) {
      console.error('💥 Error in fetchUserRoles:', error);
      throw error;
    }
  };

  const assignRole = async (userId: string, role: 'admin' | 'user') => {
    if (!user || !isAdmin) {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      console.log(`👑 Assigning ${role} role to user:`, userId);
      
      const { error } = await supabase
        .from('user_roles')
        .upsert(
          { user_id: userId, role },
          { onConflict: 'user_id,role' }
        );

      if (error) {
        console.error('❌ Error assigning role:', error);
        throw error;
      }

      console.log('✅ Role assigned successfully');
      await fetchUserRoles();
    } catch (error) {
      console.error('💥 Error in assignRole:', error);
      throw error;
    }
  };

  const removeRole = async (userId: string, role: 'admin' | 'user') => {
    if (!user || !isAdmin) {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      console.log(`🗑️ Removing ${role} role from user:`, userId);
      
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) {
        console.error('❌ Error removing role:', error);
        throw error;
      }

      console.log('✅ Role removed successfully');
      await fetchUserRoles();
    } catch (error) {
      console.error('💥 Error in removeRole:', error);
      throw error;
    }
  };

  return {
    isAdmin,
    loading,
    userRoles,
    fetchUserRoles,
    assignRole,
    removeRole,
  };
};
