
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, Download, Star, ArrowLeft, Search, Filter, CheckCircle, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LovablePrompts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const promptCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Perfect for beginners learning Lovable',
      prompts: [
        {
          id: 1,
          title: 'Structure a New Project with Clear Architecture',
          description: 'The most effective way to start any Lovable project with proper structure and constraints',
          difficulty: 'Beginner',
          rating: 4.9,
          verified: true,
          useCase: 'Starting new Lovable projects with proper foundation',
          tags: ['architecture', 'project-setup', 'best-practices'],
          prompt: `I need a **[APP_TYPE]** application with:
- **Tech Stack:** React frontend, Tailwind CSS for styling, Supabase for auth and database
- **Core Features:** [LIST_MAIN_FEATURES]
- **Key Pages:** [LIST_3-5_MAIN_PAGES]

Start by building the **main dashboard page**, containing:
- A header with navigation
- [SPECIFIC_DASHBOARD_REQUIREMENTS]
- Clean, responsive design with dummy data for now

**Important:** Do not modify auth or unrelated pages. Focus only on the dashboard implementation.`,
          whyItWorks: "This follows Lovable's recommended structure with clear tech stack, focused scope, and specific starting point."
        },
        {
          id: 2,
          title: 'Build a Landing Page with Hero Section',
          description: 'Build a responsive landing page with hero section, features, and call-to-action',
          difficulty: 'Beginner',
          rating: 4.8,
          verified: true,
          useCase: 'Marketing websites, portfolios',
          tags: ['responsive', 'landing', 'hero'],
          prompt: 'Create a modern landing page for a SaaS product with a hero section, features grid, testimonials, and CTA. Use Tailwind CSS for styling and make it fully responsive.'
        }
      ]
    },
    {
      id: 'advanced-features',
      name: 'Advanced Features',
      description: 'Complex implementations and integrations',
      prompts: [
        {
          id: 3,
          title: 'Implement Real-time Chat with WebSockets',
          description: 'Build a real-time chat application with multiple rooms',
          difficulty: 'Advanced',
          rating: 4.7,
          verified: true,
          useCase: 'Community platforms, customer support',
          tags: ['websockets', 'realtime', 'chat'],
          prompt: 'Create a real-time chat application with multiple chat rooms, user authentication, message history, and online status indicators. Use WebSocket connections for real-time updates.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      description: 'Common issues and solutions',
      prompts: [
        {
          id: 4,
          title: 'Fix React State Update Issues',
          description: 'Resolve common state management problems',
          difficulty: 'Intermediate',
          rating: 4.6,
          verified: true,
          useCase: 'Debugging React applications',
          tags: ['debugging', 'state', 'react'],
          prompt: 'Help me debug why my React component state is not updating properly. Show me common patterns for state updates and how to avoid stale closures.'
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      description: 'Optimization and clean code techniques',
      prompts: [
        {
          id: 5,
          title: 'Optimize Performance with React.memo',
          description: 'Implement performance optimizations in React apps',
          difficulty: 'Intermediate',
          rating: 4.8,
          verified: true,
          useCase: 'Performance optimization',
          tags: ['performance', 'optimization', 'memo'],
          prompt: 'Show me how to optimize a React application using React.memo, useMemo, and useCallback. Include examples of when and when not to use these optimizations.'
        }
      ]
    }
  ];

  const allPrompts = promptCategories.flatMap(category => category.prompts);
  
  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || 
                           promptCategories.find(cat => cat.prompts.some(p => p.id === prompt.id))?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (text: string, title: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `"${title}" prompt copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      });
    }
  };

  const downloadPrompt = (prompt: any) => {
    const element = document.createElement('a');
    const file = new Blob([`${prompt.title}\n\n${prompt.description}\n\nPrompt:\n${prompt.prompt}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.title.replace(/\s+/g, '_')}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => navigate('/useful-prompts')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Prompts
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Lovable Prompts</span>
              </div>
            </div>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </nav>

      {/* Platform Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Lovable</h1>
                <p className="text-white/70">AI-powered React app builder with instant preview</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">25</div>
                <div className="text-white/60">Total Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">4.8</div>
                <div className="text-white/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">React</div>
                <div className="text-white/60">Primary Framework</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="All">All Categories</option>
              {promptCategories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Prompt Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="bg-black/30 border-white/10 hover:bg-black/40 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white text-lg">{prompt.title}</CardTitle>
                        {prompt.verified && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <CardDescription className="text-white/70 mb-3">
                        {prompt.description}
                      </CardDescription>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getDifficultyColor(prompt.difficulty)}>
                          {prompt.difficulty}
                        </Badge>
                        <div className="flex items-center text-white/60">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          <span className="text-sm">{prompt.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-white/60 mb-2">
                        <strong>Use case:</strong> {prompt.useCase}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/60">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm font-mono leading-relaxed whitespace-pre-line">
                      {prompt.prompt}
                    </p>
                  </div>
                  {prompt.whyItWorks && (
                    <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 mb-4">
                      <p className="text-blue-200 text-sm">
                        <strong>Why it works:</strong> {prompt.whyItWorks}
                      </p>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Prompt
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => downloadPrompt(prompt)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No prompts found</h3>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LovablePrompts;
