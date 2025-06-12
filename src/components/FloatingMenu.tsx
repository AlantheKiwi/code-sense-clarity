
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  Home, 
  Play, 
  MessageSquare, 
  Code, 
  LogIn
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

const FloatingMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position to move menu with page
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Play, label: 'Demo', path: '/demo' },
    { icon: MessageSquare, label: 'Useful Prompts', path: '/useful-prompts' },
    { icon: Code, label: 'Analyze Code', path: '/analyze', highlight: true },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-100"
      style={{
        transform: `translateX(-50%) translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="bg-background/90 backdrop-blur-md border rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
        {/* Quick Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={`rounded-full h-8 w-8 p-0 ${
                  item.highlight 
                    ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
                    : 'hover:bg-accent'
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>

        {/* Mobile Menu Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.highlight && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        New
                      </Badge>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Authentication */}
        {user ? (
          <UserMenu />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/login')}
            className="rounded-full h-8 px-3 text-xs"
          >
            <LogIn className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;
