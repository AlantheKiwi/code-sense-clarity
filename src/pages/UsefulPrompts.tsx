
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Sparkles, Zap, Search, ArrowRight, Star, Users } from "lucide-react";

const UsefulPrompts = () => {
  const navigate = useNavigate();

  const platforms = [
    {
      id: 'lovable',
      name: 'Lovable',
      description: 'AI-powered React app builder with instant preview',
      prompts: 25,
      difficulty: 'Beginner',
      category: 'AI-Powered Builders',
      icon: Code,
      color: 'from-blue-500 to-purple-500',
      rating: 4.9
    },
    {
      id: 'bolt',
      name: 'Bolt (StackBlitz)',
      description: 'AI coding assistant for rapid prototyping',
      prompts: 22,
      difficulty: 'Intermediate',
      category: 'AI-Powered Builders',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      rating: 4.8
    },
    {
      id: 'bubble',
      name: 'Bubble',
      description: 'Complete web app platform with visual programming',
      prompts: 35,
      difficulty: 'Intermediate',
      category: 'Full-Stack App Builders',
      icon: Code,
      color: 'from-green-500 to-blue-500',
      rating: 4.7
    },
    {
      id: 'flutterflow',
      name: 'FlutterFlow',
      description: 'Cross-platform mobile app builder with Flutter',
      prompts: 28,
      difficulty: 'Advanced',
      category: 'Full-Stack App Builders',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      rating: 4.6
    },
    {
      id: 'adalo',
      name: 'Adalo',
      description: 'Native mobile app builder with database',
      prompts: 24,
      difficulty: 'Beginner',
      category: 'Full-Stack App Builders',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      rating: 4.5
    },
    {
      id: 'webflow',
      name: 'Webflow',
      description: 'Professional website builder with design freedom',
      prompts: 32,
      difficulty: 'Intermediate',
      category: 'Website & Content Builders',
      icon: Code,
      color: 'from-indigo-500 to-purple-500',
      rating: 4.8
    },
    {
      id: 'softr',
      name: 'Softr',
      description: 'Client portals and internal tools from Airtable',
      prompts: 18,
      difficulty: 'Beginner',
      category: 'Website & Content Builders',
      icon: Users,
      color: 'from-teal-500 to-green-500',
      rating: 4.4
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Database and workflow management platform',
      prompts: 30,
      difficulty: 'Intermediate',
      category: 'Data & Automation Platforms',
      icon: Search,
      color: 'from-orange-500 to-red-500',
      rating: 4.7
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automation and integration platform',
      prompts: 26,
      difficulty: 'Beginner',
      category: 'Data & Automation Platforms',
      icon: Zap,
      color: 'from-orange-400 to-yellow-500',
      rating: 4.6
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(platforms.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => navigate('/demo')}>
                Demo
              </Button>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-8">
              <Sparkles className="w-4 h-4 text-blue-300 mr-2" />
              <span className="text-blue-100 text-sm font-medium">Curated Prompt Library</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Any{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                No-Code Platform
              </span>
              {" "}with Proven Prompts
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Curated collection of battle-tested prompts for the top no-code builders. 
              From beginner tutorials to advanced optimization techniques.
            </p>

            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>240+ Prompts</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                <span>9 Platforms</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-purple-400 mr-2" />
                <span>Community Tested</span>
              </div>
            </div>
          </div>

          {/* Platform Categories */}
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.filter(p => p.category === category).map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <Card key={platform.id} className="bg-black/30 border-white/10 hover:bg-black/40 transition-all duration-300 cursor-pointer group" onClick={() => navigate(`/prompts/${platform.id}`)}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className={getDifficultyColor(platform.difficulty)}>
                            {platform.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl">{platform.name}</CardTitle>
                        <CardDescription className="text-white/70">
                          {platform.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-white/60">
                            <Code className="w-4 h-4 mr-1" />
                            <span className="text-sm">{platform.prompts} prompts</span>
                          </div>
                          <div className="flex items-center text-white/60">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            <span className="text-sm">{platform.rating}</span>
                          </div>
                        </div>
                        <Button className="w-full group-hover:bg-white group-hover:text-black transition-colors">
                          View Prompts
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UsefulPrompts;
