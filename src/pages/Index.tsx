
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

        {/* Large Prominent Touching Hands SVG */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <svg width="800" height="400" viewBox="0 0 800 400" className="opacity-40">
            <defs>
              <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            {/* Left hand (human) - much larger and more detailed */}
            <g transform="translate(50, 100)" className="animate-pulse">
              {/* Palm */}
              <path d="M250 200 C240 180, 220 170, 200 175 C180 180, 170 200, 175 220 C180 240, 200 250, 220 245 C240 240, 250 220, 250 200 Z" 
                    fill="url(#handGradient)" 
                    stroke="url(#handGradient)" 
                    strokeWidth="3" 
                    filter="url(#glow)"/>
              
              {/* Thumb */}
              <path d="M200 175 C190 165, 180 160, 170 165 C160 170, 155 180, 160 190 C165 200, 175 205, 185 200 C195 195, 200 185, 200 175 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Index finger - pointing towards the other hand */}
              <path d="M250 200 L320 180 L330 185 L335 190 L340 185 L350 190 L355 195 L350 200 L340 205 L330 200 L320 195 L255 210 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Middle finger */}
              <path d="M220 175 L235 155 L245 160 L240 180 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Ring finger */}
              <path d="M230 185 L245 165 L255 170 L250 190 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Pinky */}
              <path d="M240 195 L250 175 L260 180 L255 200 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
            </g>
            
            {/* Right hand (AI) - much larger and more detailed */}
            <g transform="translate(450, 100)" className="animate-pulse delay-500">
              {/* Palm */}
              <path d="M150 200 C160 180, 180 170, 200 175 C220 180, 230 200, 225 220 C220 240, 200 250, 180 245 C160 240, 150 220, 150 200 Z" 
                    fill="url(#handGradient)" 
                    stroke="url(#handGradient)" 
                    strokeWidth="3" 
                    filter="url(#glow)"/>
              
              {/* Thumb */}
              <path d="M200 175 C210 165, 220 160, 230 165 C240 170, 245 180, 240 190 C235 200, 225 205, 215 200 C205 195, 200 185, 200 175 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Index finger - pointing towards the other hand */}
              <path d="M150 200 L80 180 L70 185 L65 190 L60 185 L50 190 L45 195 L50 200 L60 205 L70 200 L80 195 L145 210 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Middle finger */}
              <path d="M180 175 L165 155 L155 160 L160 180 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Ring finger */}
              <path d="M170 185 L155 165 L145 170 L150 190 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
              
              {/* Pinky */}
              <path d="M160 195 L150 175 L140 180 L145 200 Z" 
                    fill="url(#handGradient)" 
                    filter="url(#glow)"/>
            </g>
            
            {/* Large sparks at touching point */}
            <g transform="translate(395, 290)" className="animate-pulse">
              <circle cx="5" cy="5" r="6" fill="#3b82f6" className="animate-pulse">
                <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="15" cy="0" r="4" fill="#8b5cf6" className="animate-pulse delay-300">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="0" cy="15" r="3" fill="#06b6d4" className="animate-pulse delay-700">
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="12" r="4" fill="#3b82f6" className="animate-pulse delay-1000">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="-8" cy="8" r="2" fill="#8b5cf6" className="animate-pulse delay-1500">
                <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
            </g>
            
            {/* Large energy waves */}
            <g transform="translate(400, 295)" className="opacity-60">
              <circle cx="0" cy="0" r="30" fill="none" stroke="url(#handGradient)" strokeWidth="2" className="animate-pulse">
                <animate attributeName="r" values="30;60;30" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="0" cy="0" r="45" fill="none" stroke="url(#handGradient)" strokeWidth="2" className="animate-pulse delay-1000">
                <animate attributeName="r" values="45;75;45" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.6;0.05;0.6" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="0" cy="0" r="60" fill="none" stroke="url(#handGradient)" strokeWidth="1" className="animate-pulse delay-2000">
                <animate attributeName="r" values="60;90;60" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.4;0.02;0.4" dur="3s" repeatCount="indefinite"/>
              </circle>
            </g>
          </svg>
        </div>
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
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-20">
            CodeSense
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Fix Your No-Code Generated Code
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 relative z-20">
            Turn messy generated code into clean, maintainable applications. Built for Lovable, Bubble, Webflow, and other no-code builders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
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
