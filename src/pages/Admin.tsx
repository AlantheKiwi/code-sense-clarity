
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Key, 
  Settings, 
  BarChart3, 
  Database 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  const adminCards = [
    {
      title: "API Keys Management",
      description: "Manage system-wide API keys and configurations",
      icon: Key,
      route: "/admin/api-keys",
      color: "bg-blue-500",
    },
    {
      title: "User Management",
      description: "View users and manage roles and permissions",
      icon: Users,
      route: "/admin/users",
      color: "bg-green-500",
    },
    {
      title: "System Settings",
      description: "Configure global system settings and preferences",
      icon: Settings,
      route: "/admin/settings",
      color: "bg-purple-500",
    },
    {
      title: "Analytics",
      description: "View system usage analytics and reports",
      icon: BarChart3,
      route: "/admin/analytics",
      color: "bg-orange-500",
    },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have admin permissions to access this area.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Administrator
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">
            Manage system configurations, users, and API keys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.route} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(card.route)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <Button variant="outline" className="w-full">
                    Access {card.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Authentication</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">API Services</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Operational
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active API Keys</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Keys</span>
                  <span className="font-semibold">-</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
