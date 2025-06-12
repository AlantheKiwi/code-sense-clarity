
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, ArrowLeft, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import APIKeysToolsTabs from "@/components/APIKeysToolsTabs";
import { AVAILABLE_TOOLS, Tool, APIKeyConfig } from "@/types/apiKeys";

const AdminAPIKeys = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const [systemConfigs, setSystemConfigs] = useState<APIKeyConfig[]>([]);
  const [userConfigs, setUserConfigs] = useState<APIKeyConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAllAPIKeys();
    }
  }, [isAdmin]);

  const fetchAllAPIKeys = async () => {
    try {
      setLoading(true);
      console.log('🔑 Fetching all API key configurations...');
      
      const { data, error } = await supabase
        .from('api_key_configs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching API keys:', error);
        throw error;
      }

      console.log('✅ Fetched API keys:', data);
      
      const systemKeys = data?.filter(config => config.scope === 'system') || [];
      const userKeys = data?.filter(config => config.scope === 'user') || [];
      
      setSystemConfigs(systemKeys);
      setUserConfigs(userKeys);
    } catch (error) {
      console.error('💥 Error in fetchAllAPIKeys:', error);
      toast({
        title: "Error",
        description: "Failed to fetch API key configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSystemKey = async (toolId: string, apiKey: string, enabled: boolean) => {
    try {
      console.log('💾 Saving system API key for tool:', toolId);
      
      const { error } = await supabase
        .from('api_key_configs')
        .upsert({
          tool_name: toolId,
          tool_category: AVAILABLE_TOOLS.find(t => t.id === toolId)?.category || 'other',
          api_key: apiKey,
          is_enabled: enabled,
          scope: 'system'
        }, {
          onConflict: 'user_id,tool_name,scope'
        });

      if (error) {
        console.error('❌ Error saving system API key:', error);
        throw error;
      }

      console.log('✅ System API key saved successfully');
      await fetchAllAPIKeys();
    } catch (error) {
      console.error('💥 Error in handleSaveSystemKey:', error);
      throw error;
    }
  };

  const handleTestKey = async (toolId: string, apiKey: string): Promise<boolean> => {
    // Mock test function - in real implementation, this would test the actual API
    console.log('🧪 Testing API key for tool:', toolId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.3); // 70% success rate for demo
      }, 1000);
    });
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
          <p className="text-gray-600">Loading API configurations...</p>
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
            <Key className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Admin
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">
            Manage system-wide and user API key configurations
          </p>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              System Keys ({systemConfigs.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Keys ({userConfigs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System-Wide API Keys
                </CardTitle>
                <p className="text-sm text-gray-600">
                  These API keys are used as defaults for all users when they haven't configured their own keys.
                </p>
              </CardHeader>
              <CardContent>
                <APIKeysToolsTabs
                  filteredTools={AVAILABLE_TOOLS}
                  configs={systemConfigs}
                  onSave={handleSaveSystemKey}
                  onTest={handleTestKey}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User API Keys Overview
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Overview of all user-configured API keys in the system.
                </p>
              </CardHeader>
              <CardContent>
                {userConfigs.length === 0 ? (
                  <div className="text-center py-8">
                    <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No User Keys Found</h3>
                    <p className="text-gray-500">Users haven't configured any personal API keys yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userConfigs.map((config) => (
                      <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{config.tool_name}</h4>
                          <p className="text-sm text-gray-600">User ID: {config.user_id}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={config.is_enabled ? "default" : "secondary"}>
                            {config.is_enabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <Badge variant="outline">{config.tool_category}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAPIKeys;
