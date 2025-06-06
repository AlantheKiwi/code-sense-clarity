import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  AlertTriangle, 
  FileText, 
  Zap,
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Github
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

const Index = () => {
  const { user, signInWithGitHub } = useAuth();
  const navigate = useNavigate();

  const handleAnalyzeCode = async () => {
    if (user) {
      // User is already authenticated, go to dashboard
      navigate('/dashboard');
    } else {
      // Start GitHub authentication
      try {
        await signInWithGitHub();
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/30"></div>
        
        {/* Digital grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-grid-slate-200/10 bg-[size:60px_60px]"></div>
        </div>
        
        {/* Floating digital elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-500/10 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-cyan-500/10 blur-xl animate-pulse delay-2000"></div>
        
        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M200,400 Q400,300 600,400 T1000,400" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" className="animate-pulse delay-500" />
          <path d="M150,600 Q350,500 550,600 T950,600" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" className="animate-pulse delay-1000" />
          <circle cx="300" cy="200" r="4" fill="#60a5fa" className="animate-pulse" />
          <circle cx="600" cy="400" r="4" fill="#a78bfa" className="animate-pulse delay-500" />
          <circle cx="800" cy="200" r="4" fill="#06b6d4" className="animate-pulse delay-1000" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={scrollToHowItWorks} className="text-slate-300 hover:text-white">
                How It Works
              </Button>
              {user ? (
                <>
                  <Button variant="ghost" asChild className="text-slate-300 hover:text-white">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <Button variant="outline" onClick={signInWithGitHub} className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                  <Github className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating tech keywords */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 text-blue-400/30 text-sm font-mono animate-fade-in">ANALYSIS</div>
            <div className="absolute top-32 right-20 text-purple-400/30 text-sm font-mono animate-fade-in delay-500">STRATEGY</div>
            <div className="absolute bottom-40 left-20 text-cyan-400/30 text-sm font-mono animate-fade-in delay-1000">CREATIVE</div>
            <div className="absolute bottom-60 right-10 text-blue-400/30 text-sm font-mono animate-fade-in delay-1500">VISION</div>
            <div className="absolute top-1/2 left-5 text-purple-400/30 text-sm font-mono animate-fade-in delay-2000">PLANNING</div>
            <div className="absolute top-1/3 right-5 text-cyan-400/30 text-sm font-mono animate-fade-in delay-2500">INNOVATIVE</div>
          </div>
          
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30 backdrop-blur-sm">
            Built for No-Code Builders
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CodeSense
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Fix Your No-Code Generated Code
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Turn messy generated code into clean, maintainable applications. Built for Lovable, Bubble, Webflow, and other no-code builders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              onClick={handleAnalyzeCode}
            >
              <Github className="mr-2 h-5 w-5" />
              Analyze My Code
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white backdrop-blur-sm"
              onClick={scrollToHowItWorks}
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stop Wrestling with Code Issues
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              CodeSense automatically finds and explains how to fix these issues in plain English
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-100 bg-red-50/50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TypeScript Errors Everywhere</h3>
                <p className="text-gray-600">Your generated code is full of type errors that break the build</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-100 bg-orange-50/50">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Messy File Structure</h3>
                <p className="text-gray-600">Components scattered everywhere with no clear organization</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-yellow-100 bg-yellow-50/50">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Problems</h3>
                <p className="text-gray-600">Slow loading times and inefficient code patterns</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Clean Code
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Issue Detection</h3>
                <p className="text-gray-600">Automatically finds problems in your generated code</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-100">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plain English Explanations</h3>
                <p className="text-gray-600">No technical jargon - clear explanations anyone can understand</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-100">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Step-by-Step Fixes</h3>
                <p className="text-gray-600">Guided solutions that walk you through each fix</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get from messy code to clean application in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your GitHub Repository</h3>
              <p className="text-gray-600">Securely connect your repository - we only read, never modify your code</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Instant Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your code and identifies issues in under 60 seconds</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fix Issues with Guided Help</h3>
              <p className="text-gray-600">Follow step-by-step instructions to clean up your code</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={handleAnalyzeCode}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <p className="text-gray-600 mb-4">Built for the no-code community</p>
            <Button variant="link">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
