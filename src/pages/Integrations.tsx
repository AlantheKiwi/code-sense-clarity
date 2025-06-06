
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Zap, 
  MessageSquare, 
  GitBranch, 
  Webhook,
  Settings,
  ExternalLink,
  CheckCircle,
  Plus,
  Slack,
  Github,
  Chrome,
  Smartphone
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'communication' | 'development' | 'automation' | 'analytics';
  isConnected: boolean;
  isPopular: boolean;
  features: string[];
}

const Integrations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [webhookUrl, setWebhookUrl] = useState('');

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get real-time notifications about critical issues and analysis results',
      icon: Slack,
      category: 'communication',
      isConnected: true,
      isPopular: true,
      features: ['Issue notifications', 'Team alerts', 'Custom channels', 'Rich formatting']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Automatically comment on PRs with issue findings and suggestions',
      icon: Github,
      category: 'development',
      isConnected: false,
      isPopular: true,
      features: ['PR comments', 'Issue creation', 'Status checks', 'Repository sync']
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Create tickets automatically for critical issues found during analysis',
      icon: Settings,
      category: 'development',
      isConnected: false,
      isPopular: true,
      features: ['Auto ticket creation', 'Priority mapping', 'Custom fields', 'Status tracking']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps through automated workflows',
      icon: Zap,
      category: 'automation',
      isConnected: true,
      isPopular: true,
      features: ['Custom workflows', '5000+ apps', 'Trigger events', 'Data transformation']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Send analysis notifications to your Discord server channels',
      icon: MessageSquare,
      category: 'communication',
      isConnected: false,
      isPopular: false,
      features: ['Channel notifications', 'Rich embeds', 'Role mentions', 'Thread support']
    },
    {
      id: 'webhooks',
      name: 'Custom Webhooks',
      description: 'Send analysis data to any endpoint with custom webhook integration',
      icon: Webhook,
      category: 'automation',
      isConnected: false,
      isPopular: false,
      features: ['Custom payloads', 'Retry logic', 'Authentication', 'Real-time delivery']
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isConnected: !integration.isConnected }
        : integration
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication': return 'bg-blue-100 text-blue-800';
      case 'development': return 'bg-green-100 text-green-800';
      case 'automation': return 'bg-purple-100 text-purple-800';
      case 'analytics': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const connectedIntegrations = integrations.filter(i => i.isConnected);
  const availableIntegrations = integrations.filter(i => !i.isConnected);

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
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate('/team')}>
                Team
              </Button>
              <Button variant="ghost" onClick={() => navigate('/learning')}>
                Learning
              </Button>
              <Button variant="ghost" onClick={() => navigate('/experts')}>
                Experts
              </Button>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Zap className="mr-2 h-4 w-4" />
                Integrations
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Integrations Hub
          </h1>
          <p className="text-xl text-gray-600">
            Connect CodeSense with your favorite tools and automate your workflow
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{connectedIntegrations.length}</div>
                  <p className="text-sm text-gray-600">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{availableIntegrations.length}</div>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Webhook className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">5,000+</div>
                  <p className="text-sm text-gray-600">Via Zapier</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-gray-500 mr-3" />
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <p className="text-sm text-gray-600">Monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
            <TabsTrigger value="api">API & Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableIntegrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-8 w-8 text-gray-700" />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {integration.name}
                              {integration.isPopular && (
                                <Badge variant="default" className="text-xs">Popular</Badge>
                              )}
                            </CardTitle>
                            <Badge className={getCategoryColor(integration.category)} variant="outline">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{integration.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Features:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {integration.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        onClick={() => toggleIntegration(integration.id)}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="connected" className="space-y-6">
            {connectedIntegrations.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No connected integrations</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your first integration to start automating your workflow
                  </p>
                  <Button onClick={() => setActiveTab('available')}>
                    Browse Available Integrations
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {connectedIntegrations.map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <Card key={integration.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-8 w-8 text-gray-700" />
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {integration.name}
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              </CardTitle>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={integration.isConnected}
                              onCheckedChange={() => toggleIntegration(integration.id)}
                            />
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Active Features:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {integration.features.slice(0, 2).map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">Status:</h4>
                            <div className="text-sm">
                              <div className="flex items-center text-green-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Connected & Active
                              </div>
                              <div className="text-gray-500 mt-1">Last sync: 2 minutes ago</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* API Access */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    API Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Use our REST API to integrate CodeSense with your custom applications
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">API Key</label>
                      <div className="flex space-x-2">
                        <Input 
                          type="password" 
                          value="cs_1234567890abcdef" 
                          readOnly 
                          className="flex-1"
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Base URL</label>
                      <Input 
                        value="https://api.codesense.dev/v1" 
                        readOnly 
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Docs
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Regenerate Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Custom Webhooks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" />
                    Custom Webhooks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Receive real-time notifications when analysis completes
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Webhook URL</label>
                      <Input 
                        placeholder="https://your-app.com/webhooks/codesense"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Events</label>
                      <div className="space-y-2 mt-2">
                        {[
                          'analysis.completed',
                          'analysis.failed',
                          'issue.critical',
                          'issue.resolved'
                        ].map((event) => (
                          <div key={event} className="flex items-center space-x-2">
                            <Switch defaultChecked />
                            <span className="text-sm font-mono">{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Save Webhook
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* API Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle>API Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <p className="text-sm text-gray-600">API Calls This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">156ms</div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">45</div>
                    <p className="text-sm text-gray-600">Webhook Deliveries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integrations;
