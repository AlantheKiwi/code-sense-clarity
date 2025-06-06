
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Code, 
  Shield, 
  Zap, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Activity
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";

const PlatformHealth = () => {
  const [healthData, setHealthData] = useState({
    lovable: { score: 85, issues: 12, projects: 156 },
    bubble: { score: 78, issues: 18, projects: 89 },
    webflow: { score: 92, issues: 5, projects: 234 },
    flutterflow: { score: 74, issues: 23, projects: 67 }
  });

  const [trendingIssues] = useState([
    {
      platform: 'lovable',
      issue: 'Large AI-generated components',
      frequency: 34,
      impact: 'Medium',
      trend: 'increasing'
    },
    {
      platform: 'bubble',
      issue: 'Inefficient database queries',
      frequency: 28,
      impact: 'High',
      trend: 'stable'
    },
    {
      platform: 'universal',
      issue: 'Missing environment variables',
      frequency: 45,
      impact: 'High',
      trend: 'decreasing'
    },
    {
      platform: 'webflow',
      issue: 'Accessibility violations',
      frequency: 19,
      impact: 'Medium',
      trend: 'decreasing'
    }
  ]);

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 75) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'lovable':
        return <Code className="h-6 w-6 text-blue-600" />;
      case 'bubble':
        return <Shield className="h-6 w-6 text-purple-600" />;
      case 'webflow':
        return <Zap className="h-6 w-6 text-green-600" />;
      case 'flutterflow':
        return <Activity className="h-6 w-6 text-cyan-600" />;
      default:
        return <Code className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Platform Health Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor the health and performance of projects across different no-code platforms
          </p>
        </div>

        {/* Platform Health Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(healthData).map(([platform, data]) => (
            <Card key={platform} className={`${getHealthBg(data.score)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 capitalize">
                  {getPlatformIcon(platform)}
                  {platform}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold mb-2 ${getHealthColor(data.score)}`}>
                  {data.score}%
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Issues Found</span>
                    <span className="font-medium">{data.issues}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projects Analyzed</span>
                    <span className="font-medium">{data.projects}</span>
                  </div>
                </div>
                <Progress value={data.score} className="mt-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Issues */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingIssues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {issue.platform}
                        </Badge>
                        <Badge 
                          variant={issue.impact === 'High' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {issue.impact} Impact
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900">{issue.issue}</h4>
                      <p className="text-sm text-gray-600">
                        Affects {issue.frequency}% of projects
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${
                      issue.trend === 'increasing' ? 'text-red-600' : 
                      issue.trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {issue.trend === 'increasing' ? '↗' : 
                       issue.trend === 'decreasing' ? '↘' : '→'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Platform Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Lovable</h4>
                      <p className="text-sm text-green-700">All systems operational</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Bubble</h4>
                      <p className="text-sm text-yellow-700">Scheduled maintenance at 2 AM UTC</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-yellow-800">Maintenance</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Webflow</h4>
                      <p className="text-sm text-green-700">All systems operational</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">FlutterFlow</h4>
                      <p className="text-sm text-green-700">All systems operational</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                <p className="text-sm text-gray-600">Projects Analyzed This Week</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15,293</div>
                <p className="text-sm text-gray-600">Issues Fixed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                <p className="text-sm text-gray-600">Average Health Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformHealth;
