
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, Code, Shield } from "lucide-react";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import { Tool, APIKeyConfig, TOOL_CATEGORIES } from "@/types/apiKeys";

interface APIKeysToolsTabsProps {
  filteredTools: Tool[];
  configs: APIKeyConfig[];
  onSave: (toolId: string, apiKey: string, enabled: boolean) => Promise<void>;
  onTest: (toolId: string, apiKey: string) => Promise<boolean>;
}

const APIKeysToolsTabs = ({ filteredTools, configs, onSave, onTest }: APIKeysToolsTabsProps) => {
  const getToolsByCategory = (category: string) => {
    return filteredTools.filter(tool => tool.category === category);
  };

  return (
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
        {Object.entries(TOOL_CATEGORIES).map(([categoryKey, categoryLabel]) => (
          <CategoryToolsGrid
            key={categoryKey}
            categoryKey={categoryKey}
            categoryLabel={categoryLabel}
            tools={getToolsByCategory(categoryKey)}
            configs={configs}
            onSave={onSave}
            onTest={onTest}
          />
        ))}
      </TabsContent>

      {Object.entries(TOOL_CATEGORIES).map(([categoryKey, categoryLabel]) => (
        <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
          <CategoryToolsGrid
            categoryKey={categoryKey}
            categoryLabel={categoryLabel}
            tools={getToolsByCategory(categoryKey)}
            configs={configs}
            onSave={onSave}
            onTest={onTest}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default APIKeysToolsTabs;
