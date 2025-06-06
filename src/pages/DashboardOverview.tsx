import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Code, 
  Settings, 
  HelpCircle, 
  User, 
  LogOut, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Shield,
  Upload,
  Github,
  Activity,
  Zap,
  BarChart3,
  Clock,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [user] = useState({ name: "Alex Johnson", email: "alex@example.com", avatar: "" });

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      trend: "up",
      icon: BarChart3,
      description: "Projects in development"
    },
    {
      title: "Issues Detected",
      value: "47",
      breakdown: "8 critical, 15 warnings, 24 info",
      trend: "down",
      change: "-5",
      icon: AlertTriangle,
      description: "Across all projects"
    },
    {
      title: "Issues Resolved",
      value: "89%",
      change: "+3%",
      trend: "up",
      icon: CheckCircle,
      description: "Success rate this week"
    },
    {
      title: "Platform Health",
      value: "94",
      change: "Excellent",
      trend: "up",
      icon: Shield,
      description: "Overall system health"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      project: "E-commerce App",
      platform: "Lovable",
      issues: 3,
      status: "completed",
      timeAgo: "2 hours ago",
      type: "Debug Session"
    },
    {
      id: 2,
      project: "Portfolio Site",
      platform: "Webflow",
      issues: 0,
      status: "success",
      timeAgo: "5 hours ago",
      type: "Health Check"
    },
    {
      id: 3,
      project: "SaaS Dashboard",
      platform: "Bubble",
      issues: 7,
      status: "in-progress",
      timeAgo: "1 day ago",
      type: "Full Analysis"
    },
    {
      id: 4,
      project: "Landing Page",
      platform: "Lovable",
      issues: 2,
      status: "completed",
      timeAgo: "2 days ago",
      type: "Quick Scan"
    }
  ];

  const platformStatuses = [
    { name: "Lovable", status: "operational", uptime: "99.9%" },
    { name: "Bubble", status: "operational", uptime: "99.7%" },
    { name: "Webflow", status: "maintenance", uptime: "98.9%" },
    { name: "Framer", status: "operational", uptime: "99.8%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-500";
      case "maintenance": return "bg-yellow-500";
      case "degraded": return "bg-orange-500";
      case "outage": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodeSense
                </span>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-white hover:text-blue-300">
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => navigate('/projects')}>
                  Projects
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  Debug Sessions
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-white/70 hover:text-white">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/50" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-xl text-white/70">
            Here's your debugging overview and project insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = getTrendIcon(stat.trend);
            return (
              <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="flex items-center text-xs">
                    <TrendIcon className={`mr-1 h-3 w-3 ${getTrendColor(stat.trend)}`} />
                    <span className={getTrendColor(stat.trend)}>{stat.change}</span>
                    <span className="text-white/50 ml-1">from last week</span>
                  </div>
                  {stat.breakdown && (
                    <p className="text-xs text-white/60 mt-1">{stat.breakdown}</p>
                  )}
                  <p className="text-xs text-white/50 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity Section */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.project}</p>
                        <div className="flex items-center space-x-2 text-sm text-white/60">
                          <span>{activity.platform}</span>
                          <span>•</span>
                          <span>{activity.type}</span>
                          <span>•</span>
                          <span>{activity.issues} issues found</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge 
                          variant={activity.status === 'completed' ? 'default' : activity.status === 'success' ? 'secondary' : 'destructive'}
                          className="mb-1"
                        >
                          {activity.status}
                        </Badge>
                        <div className="flex items-center text-xs text-white/50">
                          <Clock className="mr-1 h-3 w-3" />
                          {activity.timeAgo}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Quick Actions and Platform Status */}
          <div className="space-y-6">
            {/* Quick Actions Panel */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Code className="mr-2 h-4 w-4" />
                  New Debug Session
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Project Files
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Github className="mr-2 h-4 w-4" />
                  Connect GitHub Repository
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Shield className="mr-2 h-4 w-4" />
                  Run Health Check
                </Button>
              </CardContent>
            </Card>

            {/* Platform Status Widget */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Platform Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {platformStatuses.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(platform.status)}`}></div>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/60">{platform.uptime}</div>
                      <div className="text-xs text-white/40 capitalize">{platform.status}</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 border-white/20 text-white hover:bg-white/10">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View Status Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
