
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Database, 
  Globe, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Demo = () => {
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const demoOptions = [
    {
      id: 'lovable',
      title: 'Lovable Project Demo',
      subtitle: 'React/TypeScript E-commerce App',
      icon: Code,
      files: 15,
      issues: 23,
      description: 'See how CodeSense analyzes React components and TypeScript code',
      thumbnail: '🛒',
      issues_preview: ['Missing error handling', 'Large components', 'Performance optimizations']
    },
    {
      id: 'bubble',
      title: 'Bubble App Demo',
      subtitle: 'Social Media Platform',
      icon: Database,
      files: 8,
      issues: 17,
      description: 'Discover database optimization and workflow improvements',
      thumbnail: '📱',
      issues_preview: ['Database privacy rules', 'Workflow efficiency', 'Image optimization']
    },
    {
      id: 'general',
      title: 'General No-Code Demo',
      subtitle: 'Portfolio Website',
      icon: Globe,
      files: 12,
      issues: 19,
      description: 'Universal issues that affect any no-code platform',
      thumbnail: '🌐',
      issues_preview: ['Security vulnerabilities', 'Accessibility issues', 'SEO improvements']
    }
  ];

  const analysisSteps = [
    'Scanning project structure...',
    'Analyzing code patterns...',
    'Detecting platform specifics...',
    'Identifying security issues...',
    'Checking performance optimizations...',
    'Generating recommendations...',
    'Analysis complete!'
  ];

  const startDemo = (demoId: string) => {
    setSelectedDemo(demoId);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const getDemoResults = () => {
    const demos = {
      lovable: {
        platform: 'Lovable (React/TypeScript)',
        critical: 3,
        warnings: 12,
        suggestions: 8,
        issues: [
          {
            type: 'critical',
            title: 'Missing error handling in payment flow',
            file: 'components/PaymentForm.tsx',
            line: 45,
            description: 'Payment processing lacks proper error handling and user feedback'
          },
          {
            type: 'warning',
            title: '400-line component needs refactoring',
            file: 'pages/ProductCatalog.tsx',
            line: 1,
            description: 'Component is too large and should be split into smaller, reusable parts'
          },
          {
            type: 'suggestion',
            title: 'Add React.memo for better performance',
            file: 'components/ProductCard.tsx',
            line: 12,
            description: 'Wrap component in React.memo to prevent unnecessary re-renders'
          }
        ]
      },
      bubble: {
        platform: 'Bubble',
        critical: 2,
        warnings: 9,
        suggestions: 6,
        issues: [
          {
            type: 'critical',
            title: 'Unsafe database queries without privacy rules',
            file: 'Database Schema',
            line: null,
            description: 'User data is accessible without proper privacy rules in place'
          },
          {
            type: 'warning',
            title: 'Inefficient repeating group configurations',
            file: 'Profile Page',
            line: null,
            description: 'Repeating groups are loading too much data, causing performance issues'
          },
          {
            type: 'suggestion',
            title: 'Optimize image loading workflows',
            file: 'Image Upload',
            line: null,
            description: 'Add image compression and lazy loading for better user experience'
          }
        ]
      },
      general: {
        platform: 'Universal Platform',
        critical: 4,
        warnings: 8,
        suggestions: 7,
        issues: [
          {
            type: 'critical',
            title: 'Hardcoded API keys in source code',
            file: 'config/api.js',
            line: 3,
            description: 'API keys should be stored securely in environment variables'
          },
          {
            type: 'warning',
            title: 'Missing alt tags for accessibility',
            file: 'portfolio.html',
            line: 23,
            description: 'Images lack proper alt text, affecting screen reader accessibility'
          },
          {
            type: 'suggestion',
            title: 'Add meta tags for better SEO',
            file: 'index.html',
            line: 8,
            description: 'Missing description and keywords meta tags for search optimization'
          }
        ]
      }
    };
    return demos[selectedDemo as keyof typeof demos];
  };

  if (selectedDemo && !isAnalyzing && analysisStep >= analysisSteps.length - 1) {
    const results = getDemoResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <nav className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeSense Demo
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
                <Button onClick={() => navigate('/login')}>
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Results Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900">Analysis Complete!</h1>
            </div>
            <p className="text-gray-600">
              Platform detected: <Badge variant="secondary">{results.platform}</Badge>
            </p>
          </div>

          {/* Issue Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-red-800">Critical Issues</CardTitle>
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-700">{results.critical}</div>
                <p className="text-sm text-red-600">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-yellow-800">Warnings</CardTitle>
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700">{results.warnings}</div>
                <p className="text-sm text-yellow-600">Should be addressed soon</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-blue-800">Suggestions</CardTitle>
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">{results.suggestions}</div>
                <p className="text-sm text-blue-600">Optimization opportunities</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Issues */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detailed Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.issues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    issue.type === 'critical' ? 'bg-red-500' :
                    issue.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{issue.title}</h3>
                      <Badge variant={
                        issue.type === 'critical' ? 'destructive' :
                        issue.type === 'warning' ? 'default' : 'secondary'
                      }>
                        {issue.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                    <div className="text-xs text-gray-500">
                      {issue.file} {issue.line && `(Line ${issue.line})`}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Ready to analyze your real project?</h2>
              <p className="mb-6 opacity-90">
                This was just a demo! Sign up now to get instant analysis of your actual no-code projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/login')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setSelectedDemo(null)}
                  className="border-white text-white hover:bg-white/10"
                >
                  Try Another Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedDemo && isAnalyzing) {
    const progress = ((analysisStep + 1) / analysisSteps.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Analyzing Your Project</CardTitle>
            <p className="text-gray-600">Please wait while we scan your code...</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progress} className="w-full" />
            <div className="space-y-2">
              {analysisSteps.map((step, index) => (
                <div key={index} className={`flex items-center space-x-3 ${
                  index <= analysisStep ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {index < analysisStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : index === analysisStep ? (
                    <div className="h-5 w-5 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeSense Demo
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              <Button onClick={() => navigate('/login')}>
                Skip Demo - Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See CodeSense in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience how CodeSense analyzes real no-code projects and identifies critical issues, 
            performance optimizations, and security vulnerabilities.
          </p>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            No sign-up required • Interactive demo
          </Badge>
        </div>

        {/* Demo Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoOptions.map((demo) => {
            const Icon = demo.icon;
            return (
              <Card key={demo.id} className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{demo.thumbnail}</div>
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                  <p className="text-gray-600">{demo.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{demo.description}</p>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{demo.files} files</span>
                    <span className="text-red-600 font-semibold">{demo.issues} issues found</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Preview issues:</p>
                    {demo.issues_preview.map((issue, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                        {issue}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 group-hover:bg-blue-700"
                    onClick={() => startDemo(demo.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start {demo.title.split(' ')[0]} Demo
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What You'll See in the Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Real-Time Analysis</h3>
              <p className="text-sm text-gray-600">Watch as issues are discovered in real-time</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Platform Detection</h3>
              <p className="text-sm text-gray-600">Automatic recognition of your no-code platform</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Issue Prioritization</h3>
              <p className="text-sm text-gray-600">Critical, warning, and suggestion categories</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Fix Suggestions</h3>
              <p className="text-sm text-gray-600">Actionable recommendations for each issue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
