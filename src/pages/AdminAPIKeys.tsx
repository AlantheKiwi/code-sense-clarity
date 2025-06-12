
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminAPIKeys } from "@/hooks/useAdminAPIKeys";
import AdminAPIKeysHeader from "@/components/admin/AdminAPIKeysHeader";
import AdminAPIKeysTabs from "@/components/admin/AdminAPIKeysTabs";

const AdminAPIKeys = () => {
  const { isAdmin } = useAdmin();
  const {
    systemConfigs,
    userConfigs,
    loading,
    handleSaveSystemKey,
    handleTestKey
  } = useAdminAPIKeys();

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
        <AdminAPIKeysHeader />
        <AdminAPIKeysTabs
          systemConfigs={systemConfigs}
          userConfigs={userConfigs}
          onSave={handleSaveSystemKey}
          onTest={handleTestKey}
        />
      </div>
    </div>
  );
};

export default AdminAPIKeys;
