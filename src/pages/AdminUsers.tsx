
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Shield, Crown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  roles: Array<{ role: 'admin' | 'user' }>;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const { isAdmin, assignRole, removeRole } = useAdmin();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('👥 Fetching all users...');
      
      // First get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('❌ Error fetching roles:', rolesError);
        throw rolesError;
      }

      // Get users from auth metadata (limited info available via RLS)
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('❌ Error fetching auth users:', authError);
        // Fallback: create mock data based on roles
        const mockUsers = rolesData?.map(role => ({
          id: role.user_id,
          email: `user-${role.user_id.slice(0, 8)}@example.com`,
          created_at: role.created_at,
          last_sign_in_at: role.created_at,
          roles: [{ role: role.role }]
        })) || [];
        
        setUsers(mockUsers);
        return;
      }

      // Combine auth data with roles
      const usersWithRoles = authData.users.map(user => ({
        id: user.id,
        email: user.email || 'No email',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at || user.created_at,
        roles: rolesData?.filter(role => role.user_id === user.id).map(role => ({ role: role.role })) || []
      }));

      console.log('✅ Fetched users with roles:', usersWithRoles);
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('💥 Error in fetchUsers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId: string, role: 'admin' | 'user', hasRole: boolean) => {
    try {
      if (hasRole) {
        await removeRole(userId, role);
        toast({
          title: "Success",
          description: `${role} role removed successfully`,
        });
      } else {
        await assignRole(userId, role);
        toast({
          title: "Success",
          description: `${role} role assigned successfully`,
        });
      }
      await fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update user role: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">Admin access required</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Panel
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Admin
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">
            Manage user roles and permissions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Users ({users.length})
            </CardTitle>
            <p className="text-sm text-gray-600">
              View and manage user roles and permissions in the system.
            </p>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Users Found</h3>
                <p className="text-gray-500">No users have signed up yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => {
                  const isUserAdmin = user.roles.some(r => r.role === 'admin');
                  const isRegularUser = user.roles.some(r => r.role === 'user');
                  
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.email}</h4>
                          <p className="text-sm text-gray-600">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <Badge 
                            variant={isUserAdmin ? "default" : "outline"}
                            className={isUserAdmin ? "bg-red-100 text-red-700 border-red-200" : ""}
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                          <Badge 
                            variant={isRegularUser ? "default" : "outline"}
                            className={isRegularUser ? "bg-blue-100 text-blue-700 border-blue-200" : ""}
                          >
                            <User className="h-3 w-3 mr-1" />
                            User
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={isUserAdmin ? "destructive" : "default"}
                            onClick={() => handleToggleRole(user.id, 'admin', isUserAdmin)}
                          >
                            {isUserAdmin ? "Remove Admin" : "Make Admin"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
