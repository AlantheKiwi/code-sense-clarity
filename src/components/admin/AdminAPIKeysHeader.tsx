
import { Key, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminAPIKeysHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/admin')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Admin Panel
      </Button>
      
      <div className="flex items-center gap-3 mb-2">
        <Key className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          Admin
        </Badge>
      </div>
      <p className="text-gray-600 text-lg">
        Manage system-wide and user API key configurations
      </p>
    </div>
  );
};

export default AdminAPIKeysHeader;
