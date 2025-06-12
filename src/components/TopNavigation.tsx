
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
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

const TopNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Play, label: 'Demo', path: '/demo' },
    { icon: MessageSquare, label: 'Useful Prompts', path: '/useful-prompts' },
    { icon: Code, label: 'Analyze Code', path: '/analyze', highlight: true },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

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
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 ${
                    item.highlight 
                      ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
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
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full justify-start flex items-center gap-3 ${
                      item.highlight 
                        ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {item.highlight && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        New
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
