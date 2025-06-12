
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Code, Shield, Settings } from "lucide-react";
import APIKeyCard from "@/components/APIKeyCard";
import { Tool, APIKeyConfig } from "@/types/apiKeys";

interface CategoryToolsGridProps {
  categoryKey: string;
  categoryLabel: string;
  tools: Tool[];
  configs: APIKeyConfig[];
  onSave: (toolId: string, apiKey: string, enabled: boolean) => Promise<void>;
  onTest: (toolId: string, apiKey: string) => Promise<boolean>;
}

const CategoryToolsGrid = ({ 
  categoryKey, 
  categoryLabel, 
  tools, 
  configs, 
  onSave, 
  onTest 
}: CategoryToolsGridProps) => {
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

  if (tools.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getCategoryIcon(categoryKey)}
        <h2 className="text-xl font-semibold">{categoryLabel}</h2>
        <Badge variant="outline">{tools.length}</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <APIKeyCard
            key={tool.id}
            tool={tool}
            config={configs.find(c => c.tool_name === tool.id)}
            onSave={onSave}
            onTest={onTest}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryToolsGrid;
