
import { Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface APIKeysHeaderProps {
  enabledToolsCount: number;
  totalToolsCount: number;
}

const APIKeysHeader = ({ enabledToolsCount, totalToolsCount }: APIKeysHeaderProps) => {
  return (
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
          {totalToolsCount} tools available
        </Badge>
      </div>
    </div>
  );
};

export default APIKeysHeader;
