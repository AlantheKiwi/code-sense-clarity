
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Download, Star, ArrowLeft, CheckCircle, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ZapierPrompts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const prompts = [
    {
      id: 1,
      title: 'Build Efficient Multi-App Automation Workflow',
      description: 'Create complex automations connecting multiple apps with proper error handling',
      difficulty: 'Advanced',
      rating: 4.6,
      verified: true,
      useCase: 'Workflow automation, app integration',
      tags: ['automation', 'multi-app', 'error-handling'],
      prompt: `Create a Zapier automation for [WORKFLOW_DESCRIPTION]:

1. **Trigger setup:** Choose the most reliable trigger with proper filters
2. **Data mapping:** Ensure clean data transfer between apps with validation
3. **Error handling:** Add paths for failed actions and notification systems
4. **Testing:** Use Zapier's testing tools at each step before going live  
5. **Monitoring:** Set up failure notifications and regular workflow health checks

Focus on reliability and maintainability. Document the workflow logic for future updates.`,
      whyItWorks: "Based on Zapier's workflow automation best practices and error handling recommendations."
    }
  ];

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
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => navigate('/useful-prompts')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Prompts
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Zapier Prompts</span>
              </div>
            </div>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </nav>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Zapier</h1>
                <p className="text-white/70">Automation and integration platform</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">26</div>
                <div className="text-white/60">Total Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">4.6</div>
                <div className="text-white/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">Automation</div>
                <div className="text-white/60">Specialist</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {prompts.map((prompt) => (
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
                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg p-3 mb-4">
                    <p className="text-orange-200 text-sm">
                      <strong>Why it works:</strong> {prompt.whyItWorks}
                    </p>
                  </div>
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

          <div className="text-center mt-12">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">More Prompts Coming Soon!</h3>
              <p className="text-white/70 mb-6">
                We're expanding our Zapier collection with prompts for webhook integrations, conditional logic, data transformation, and enterprise workflow management.
              </p>
              <Button onClick={() => navigate('/useful-prompts')}>
                Explore Other Platforms
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZapierPrompts;
