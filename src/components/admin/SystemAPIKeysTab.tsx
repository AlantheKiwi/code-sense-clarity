
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import APIKeysToolsTabs from "@/components/APIKeysToolsTabs";
import { AVAILABLE_TOOLS, APIKeyConfig } from "@/types/apiKeys";

interface SystemAPIKeysTabProps {
  systemConfigs: APIKeyConfig[];
  onSave: (toolId: string, apiKey: string, enabled: boolean) => Promise<void>;
  onTest: (toolId: string, apiKey: string) => Promise<boolean>;
}

const SystemAPIKeysTab = ({ systemConfigs, onSave, onTest }: SystemAPIKeysTabProps) => {
  return (
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
          onSave={onSave}
          onTest={onTest}
        />
      </CardContent>
    </Card>
  );
};

export default SystemAPIKeysTab;
