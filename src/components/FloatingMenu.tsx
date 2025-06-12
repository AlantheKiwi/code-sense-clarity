
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
  LogIn,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

const FloatingMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-20'
      }`}
    >
      <div className="bg-background/80 backdrop-blur-md border rounded-full shadow-lg px-2 py-2 flex items-center gap-2">
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

        {/* Scroll Indicator */}
        <div className="flex flex-col">
          <ChevronUp className="h-2 w-2 text-muted-foreground" />
          <ChevronDown className="h-2 w-2 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
