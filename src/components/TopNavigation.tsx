
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  Home, 
  Play, 
  MessageSquare, 
  Code, 
  LogIn,
  X,
  Shield,
  BarChart3,
  Users,
  BookOpen,
  MessageCircle,
  Zap
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { UserMenu } from "@/components/UserMenu";

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicNavigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Play, label: 'Demo', path: '/demo' },
    { icon: MessageSquare, label: 'Useful Prompts', path: '/useful-prompts' },
    { icon: Code, label: 'Analyze Code', path: '/analyze', highlight: true },
  ];

  const protectedNavigationItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Overview', path: '/dashboard-overview' },
    { icon: Shield, label: 'Platform Health', path: '/platform-health', badge: '2 issues' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: BookOpen, label: 'Learning', path: '/learning', badge: '3 new' },
    { icon: MessageCircle, label: 'Experts', path: '/experts' },
    { icon: Zap, label: 'Integrations', path: '/integrations' },
    { icon: Code, label: 'API Keys', path: '/api-keys' },
  ];

  // Add admin navigation item for admin users
  const navigationItems = user ? protectedNavigationItems : publicNavigationItems;
  
  if (isAdmin && user) {
    navigationItems.push({
      icon: Shield,
      label: 'Admin Panel',
      path: '/admin',
      highlight: false
    });
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeSense
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.slice(0, user ? 4 : navigationItems.length).map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentPath(item.path);
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 ${
                    item.highlight 
                      ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
                      : item.icon === Shield && item.path === '/admin'
                      ? 'bg-red-50 hover:bg-red-100 text-red-600'
                      : isActive
                      ? ''
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {item.highlight && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {item.icon === Shield && item.path === '/admin' && (
                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                      Admin
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Button onClick={() => handleNavigation('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user ? (
              <UserMenu />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/login')}
                className="flex items-center gap-1"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-xs">Login</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPath(item.path);
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full justify-start flex items-center gap-3 ${
                      item.highlight && !isActive
                        ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
                        : item.icon === Shield && item.path === '/admin' && !isActive
                        ? 'bg-red-50 hover:bg-red-100 text-red-600'
                        : !isActive
                        ? 'hover:bg-accent'
                        : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    <div className="ml-auto flex items-center gap-1">
                      {item.highlight && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.icon === Shield && item.path === '/admin' && (
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </Button>
                );
              })}

              {/* Mobile Quick Actions for authenticated users */}
              {user && (
                <div className="border-t pt-4 mt-4 space-y-3">
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
              )}

              {/* Mobile Subscription Prompt for authenticated users */}
              {user && (
                <div className="border-t pt-4 mt-4">
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
