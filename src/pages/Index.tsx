
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Search, BookOpen, Github, Zap, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
                <Link to="/how-it-works">How It Works</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            Built for No-Code Builders
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            CodeSense
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fix Your No-Code Generated Code
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Turn messy generated code into clean, maintainable applications. Built for Lovable, Bubble, Webflow, and other no-code builders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link to="/analyze">
                <Github className="mr-2 h-5 w-5" />
                Analyze My Code
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg" asChild>
              <Link to="/demo">
                See How It Works
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stop Wrestling with Code Issues
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No-code platforms generate functional code, but it's often messy and hard to maintain. CodeSense fixes that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 border-2 border-red-100 bg-red-50/50">
              <CardHeader>
                <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">TypeScript Errors Everywhere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">Generated code often has type issues that break builds and confuse developers.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-100 bg-orange-50/50">
              <CardHeader>
                <div className="mx-auto h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">Messy File Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700">Poor organization makes code hard to understand and impossible to maintain.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-yellow-100 bg-yellow-50/50">
              <CardHeader>
                <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-800">Performance Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700">Inefficient patterns and unnecessary re-renders slow down your applications.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              CodeSense automatically finds and explains how to fix these issues in plain English
            </h3>
            <p className="text-lg text-gray-600">
              No more deciphering cryptic error messages or wondering why your code doesn't work.
            </p>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for No-Code Builders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform generated code into professional-grade applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Issue Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-powered analysis finds TypeScript errors, performance issues, and code quality problems automatically.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Type safety issues
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Performance bottlenecks
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Code quality problems
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Plain English Explanations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get clear, jargon-free explanations of what's wrong and why it matters for your application.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    No technical jargon
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Visual examples
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Impact explanations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Step-by-Step Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Follow guided instructions to fix issues yourself, or get exact code snippets to implement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Guided tutorials
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Copy-paste solutions
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How CodeSense Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get from messy code to clean application in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Connect Your GitHub Repository</h3>
              <p className="text-gray-600">
                Securely connect your GitHub account and select the repository containing your generated code.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Get Instant Analysis</h3>
              <p className="text-gray-600">
                Our AI scans your code and identifies issues, performance problems, and improvement opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Fix Issues with Guided Help</h3>
              <p className="text-gray-600">
                Follow step-by-step instructions or copy ready-to-use code fixes directly into your project.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link to="/analyze">
                Start Analyzing Your Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CodeSense
            </span>
          </div>
          <p className="text-lg mb-4">Built for the no-code community</p>
          <p className="text-sm text-gray-500">
            Transform your generated code into professional applications
          </p>
          <div className="mt-6">
            <Button variant="link" className="text-gray-400 hover:text-white" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
