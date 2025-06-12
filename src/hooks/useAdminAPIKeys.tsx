
import { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { APIKeyConfig, AVAILABLE_TOOLS } from "@/types/apiKeys";

export const useAdminAPIKeys = () => {
  const { user } = useAuth();
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
    if (!user) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('💾 Saving system API key for tool:', toolId);
      
      const { error } = await supabase
        .from('api_key_configs')
        .upsert({
          user_id: user.id,
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
      
      toast({
        title: "Success",
        description: `System API key for ${AVAILABLE_TOOLS.find(t => t.id === toolId)?.name} saved successfully`,
      });
    } catch (error) {
      console.error('💥 Error in handleSaveSystemKey:', error);
      toast({
        title: "Error",
        description: `Failed to save system API key: ${error.message}`,
        variant: "destructive",
      });
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

  return {
    systemConfigs,
    userConfigs,
    loading,
    handleSaveSystemKey,
    handleTestKey,
    fetchAllAPIKeys
  };
};
