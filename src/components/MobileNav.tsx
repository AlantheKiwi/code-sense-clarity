
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Code, 
  BarChart3, 
  Shield, 
  Users, 
  BookOpen, 
  MessageCircle,
  Zap,
  Bell,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  currentPath: string;
}

const MobileNav = ({ currentPath }: MobileNavProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: BarChart3,
      badge: null
    },
    {
      title: 'Overview',
      path: '/dashboard-overview',
      icon: BarChart3,
      badge: null
    },
    {
      title: 'Platform Health',
      path: '/platform-health',
      icon: Shield,
      badge: '2 issues'
    },
    {
      title: 'Team',
      path: '/team',
      icon: Users,
      badge: null
    },
    {
      title: 'Learning',
      path: '/learning',
      icon: BookOpen,
      badge: '3 new'
    },
    {
      title: 'Experts',
      path: '/experts',
      icon: MessageCircle,
      badge: null
    },
    {
      title: 'Integrations',
      path: '/integrations',
      icon: Zap,
      badge: null
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CodeSense
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">CodeSense</span>
                </div>
                
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    
                    return (
                      <Button
                        key={item.path}
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleNavigation(item.path)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </nav>

                {/* Mobile Quick Actions */}
                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-medium text-sm text-gray-500">Quick Actions</h3>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => handleNavigation('/analyze')}
                  >
                    Start New Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleNavigation('/experts')}
                  >
                    Get Expert Help
                  </Button>
                </div>

                {/* Mobile Subscription Prompt */}
                <div className="border-t pt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                    <h3 className="font-medium text-blue-900 mb-2">Upgrade to Pro</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Unlock unlimited analyses and team features
                    </p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
