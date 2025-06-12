
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Key } from "lucide-react";
import { APIKeyConfig } from "@/types/apiKeys";

interface UserAPIKeysTabProps {
  userConfigs: APIKeyConfig[];
}

const UserAPIKeysTab = ({ userConfigs }: UserAPIKeysTabProps) => {
  return (
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
  );
};

export default UserAPIKeysTab;
