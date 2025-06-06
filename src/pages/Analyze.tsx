
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Code, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Analyze = () => {
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
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            Code Analysis
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Analyze Your Repository
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your GitHub repository to get instant insights and fixes for your generated code.
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-lg max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <p className="text-gray-600">
              First, you'll need to connect your GitHub account to access your repositories.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What we'll analyze:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• TypeScript type issues and errors</li>
                <li>• Component structure and organization</li>
                <li>• Performance optimization opportunities</li>
                <li>• Code quality and best practices</li>
                <li>• File structure improvements</li>
              </ul>
            </div>

            <Button 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg"
              size="lg"
              asChild
            >
              <Link to="/login">
                <Github className="mr-2 h-5 w-5" />
                Connect GitHub Account
              </Link>
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              <p>🔒 Your code stays private. We only read, never modify.</p>
              <p>✨ Analysis typically takes 30-60 seconds</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analyze;
