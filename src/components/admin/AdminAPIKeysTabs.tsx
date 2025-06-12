
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users } from "lucide-react";
import SystemAPIKeysTab from "./SystemAPIKeysTab";
import UserAPIKeysTab from "./UserAPIKeysTab";
import { APIKeyConfig } from "@/types/apiKeys";

interface AdminAPIKeysTabsProps {
  systemConfigs: APIKeyConfig[];
  userConfigs: APIKeyConfig[];
  onSave: (toolId: string, apiKey: string, enabled: boolean) => Promise<void>;
  onTest: (toolId: string, apiKey: string) => Promise<boolean>;
}

const AdminAPIKeysTabs = ({ systemConfigs, userConfigs, onSave, onTest }: AdminAPIKeysTabsProps) => {
  return (
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
        <SystemAPIKeysTab
          systemConfigs={systemConfigs}
          onSave={onSave}
          onTest={onTest}
        />
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <UserAPIKeysTab userConfigs={userConfigs} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminAPIKeysTabs;
