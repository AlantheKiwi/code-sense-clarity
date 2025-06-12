
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Search, Settings, Shield, Activity, Code, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import APIKeyCard from "@/components/APIKeyCard";
import { AVAILABLE_TOOLS, TOOL_CATEGORIES, Tool, APIKeyConfig } from "@/types/apiKeys";

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
        .from('api_key_configs' as any)
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
          .from('api_key_configs' as any)
          .update({
            api_key: apiKey,
            is_enabled: enabled,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingConfig.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('api_key_configs' as any)
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

  const getToolsByCategory = (category: string) => {
    return filteredTools.filter(tool => tool.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai_analysis': return <Brain className="h-4 w-4" />;
      case 'debugging': return <Activity className="h-4 w-4" />;
      case 'code_quality': return <Code className="h-4 w-4" />;
      case 'performance': return <Activity className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const enabledToolsCount = configs.filter(c => c.is_enabled).length;

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Key className="h-8 w-8" />
              API Keys Management
            </h1>
            <p className="text-muted-foreground">
              Configure and manage API keys for development tools and services
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              {enabledToolsCount} tools enabled
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              {AVAILABLE_TOOLS.length} tools available
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(TOOL_CATEGORIES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tools by Category */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ai_analysis" className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              AI
            </TabsTrigger>
            <TabsTrigger value="debugging" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Debug
            </TabsTrigger>
            <TabsTrigger value="code_quality" className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              Quality
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {Object.entries(TOOL_CATEGORIES).map(([categoryKey, categoryLabel]) => {
              const categoryTools = getToolsByCategory(categoryKey);
              if (categoryTools.length === 0) return null;

              return (
                <div key={categoryKey} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(categoryKey)}
                    <h2 className="text-xl font-semibold">{categoryLabel}</h2>
                    <Badge variant="outline">{categoryTools.length}</Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryTools.map((tool) => (
                      <APIKeyCard
                        key={tool.id}
                        tool={tool}
                        config={configs.find(c => c.tool_name === tool.id)}
                        onSave={saveAPIKey}
                        onTest={testAPIKey}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {Object.entries(TOOL_CATEGORIES).map(([categoryKey, categoryLabel]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
              <div className="flex items-center gap-2">
                {getCategoryIcon(categoryKey)}
                <h2 className="text-xl font-semibold">{categoryLabel}</h2>
                <Badge variant="outline">{getToolsByCategory(categoryKey).length}</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getToolsByCategory(categoryKey).map((tool) => (
                  <APIKeyCard
                    key={tool.id}
                    tool={tool}
                    config={configs.find(c => c.tool_name === tool.id)}
                    onSave={saveAPIKey}
                    onTest={testAPIKey}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default APIKeys;
