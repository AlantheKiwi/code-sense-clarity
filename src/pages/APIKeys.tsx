
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AVAILABLE_TOOLS, Tool, APIKeyConfig } from "@/types/apiKeys";
import APIKeysHeader from "@/components/APIKeysHeader";
import APIKeysFilters from "@/components/APIKeysFilters";
import APIKeysToolsTabs from "@/components/APIKeysToolsTabs";
import APIKeysLoading from "@/components/APIKeysLoading";

const APIKeys = () => {
  const [configs, setConfigs] = useState<APIKeyConfig[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('api_key_configs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setConfigs(data || []);
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      toast({
        title: "Error",
        description: "Failed to load API key configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAPIKey = async (toolId: string, apiKey: string, enabled: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
      if (!tool) throw new Error('Tool not found');

      const existingConfig = configs.find(c => c.tool_name === toolId);

      if (existingConfig) {
        const { error } = await supabase
          .from('api_key_configs')
          .update({
            api_key: apiKey,
            is_enabled: enabled,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingConfig.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('api_key_configs')
          .insert({
            tool_name: toolId,
            tool_category: tool.category,
            api_key: apiKey,
            is_enabled: enabled,
            user_id: user.id
          });

        if (error) throw error;
      }

      await fetchAPIKeys();
    } catch (error: any) {
      console.error('Error saving API key:', error);
      throw error;
    }
  };

  const testAPIKey = async (toolId: string, apiKey: string): Promise<boolean> => {
    try {
      // For now, we'll implement basic validation
      // In a real implementation, you'd call each tool's API to validate
      switch (toolId) {
        case 'openai':
          return apiKey.startsWith('sk-') && apiKey.length > 20;
        case 'anthropic':
          return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
        case 'genspark':
          return apiKey.length > 10;
        default:
          return apiKey.length > 5;
      }
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  };

  const filteredTools = AVAILABLE_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enabledToolsCount = configs.filter(c => c.is_enabled).length;

  if (loading) {
    return <APIKeysLoading />;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <APIKeysHeader 
          enabledToolsCount={enabledToolsCount}
          totalToolsCount={AVAILABLE_TOOLS.length}
        />

        <APIKeysFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <APIKeysToolsTabs
          filteredTools={filteredTools}
          configs={configs}
          onSave={saveAPIKey}
          onTest={testAPIKey}
        />
      </div>
    </div>
  );
};

export default APIKeys;
