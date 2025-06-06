
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { signInWithGitHub } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGitHub();
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeSense
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to analyze your code</p>
        </div>

        <Card className="border-2 border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Connect with GitHub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
              size="lg"
              onClick={handleGitHubSignIn}
              disabled={isLoading}
            >
              <Github className="mr-2 h-5 w-5" />
              {isLoading ? 'Connecting...' : 'Sign in with GitHub'}
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              We only read your repositories - never write or modify code
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="link" asChild>
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
