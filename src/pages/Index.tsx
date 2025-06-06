import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Code, Sparkles, Zap, Play } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    navigate('/dashboard-overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-purple-900 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-10 left-20 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
          <div className="absolute top-40 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
        </div>
        
        {/* Enhanced Touching Hands Illustration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
          <svg width="800" height="600" viewBox="0 0 800 600" className="animate-pulse">
            <defs>
              <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6366F1" }} />
                <stop offset="100%" style={{ stopColor: "#D8B4FE" }} />
              </linearGradient>
            </defs>
            <path
              d="M200,300 C200,150 400,150 400,300 C400,450 200,450 200,300 Z M600,300 C600,150 400,150 400,300 C400,450 600,450 600,300 Z"
              fill="url(#handGradient)"
              stroke="#A78BFA"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
            <path
              d="M250,350 L350,250 M550,350 L450,250"
              stroke="#EDE9FE"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodeSense
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/70 hover:text-white">
                How it works
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Demo
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Contact
              </Button>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Hero content with enhanced backdrop */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-8">
                <Sparkles className="w-4 h-4 text-blue-300 mr-2" />
                <span className="text-blue-100 text-sm font-medium">AI-Powered Code Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Debug Your No-Code Apps with{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Precision
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                CodeSense analyzes your Lovable, Bubble, and Webflow projects to identify bugs, 
                performance issues, and optimization opportunities instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={handleAnalyzeClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 border-0"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Analyze My Code
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 opacity-70">
                <div className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-blue-300" />
                  <span className="text-sm text-white">Trusted by 100+ No-Code Makers</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-300" />
                  <span className="text-sm text-white">AI-Powered Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Unlock the Power of AI-Driven Debugging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <Code className="text-blue-300 h-6 w-6 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Issue Detection</h3>
              <p className="text-white/70">
                Automatically identify bugs, performance bottlenecks, and security vulnerabilities in your no-code projects.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <Zap className="text-purple-300 h-6 w-6 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Analysis</h3>
              <p className="text-white/70">
                Get instant feedback as you build, ensuring a smooth and error-free development process.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <Sparkles className="text-pink-300 h-6 w-6 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-white/70">
                Receive intelligent suggestions and best practices to optimize your no-code applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="space-y-6">
            {/* Steps */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Connect Your Project</h3>
                <p className="text-white/70">
                  Connect your Lovable, Bubble, or Webflow project to CodeSense.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold text-xl flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Run AI Analysis</h3>
                <p className="text-white/70">
                  Let our AI engine analyze your project for potential issues.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-pink-600 text-white font-bold text-xl flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Optimize and Deploy</h3>
                <p className="text-white/70">
                  Implement the suggested optimizations and deploy your bug-free application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial Cards */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 italic mb-4">
                "CodeSense has been a game-changer for my no-code development workflow. I can now catch bugs before they make it to production!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-400 mr-3"></div>
                <div>
                  <p className="text-white font-semibold">Alex Johnson</p>
                  <p className="text-white/50 text-sm">No-Code Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 italic mb-4">
                "I used to spend hours debugging my Bubble apps. CodeSense has saved me so much time and frustration."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-400 mr-3"></div>
                <div>
                  <p className="text-white font-semibold">Emily Carter</p>
                  <p className="text-white/50 text-sm">Bubble Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Supercharge Your No-Code Projects?
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Start your free trial today and experience the power of AI-driven debugging.
          </p>
          <Button 
            size="lg"
            onClick={handleAnalyzeClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-xl font-semibold shadow-lg shadow-blue-500/25 border-0"
          >
            Analyze My Code
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
