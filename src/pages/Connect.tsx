
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github, CheckCircle, Code, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const { user, session, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only auto-redirect if we have a valid session with GitHub token
    if (user && session?.provider_token) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, session, navigate]);

  // Show error if there's an auth issue
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Authentication failed: {error}
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => navigate('/login')} 
              className="w-full mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading if no user yet
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Completing authentication...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Successfully Connected!
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to CodeSense, {user?.user_metadata?.full_name || user?.user_metadata?.name || 'Developer'}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your GitHub account is now connected. Let's analyze your repositories for code issues and improvements.
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-lg max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Github className="h-6 w-6" />
              GitHub Connected
            </CardTitle>
            <p className="text-gray-600">
              Ready to analyze your repositories for code issues.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Connected Account:</h3>
              <div className="flex items-center gap-3">
                <img 
                  src={user?.user_metadata?.avatar_url} 
                  alt="GitHub Avatar" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-green-800">
                    {user?.user_metadata?.full_name || user?.user_metadata?.name}
                  </p>
                  <p className="text-sm text-green-600">
                    @{user?.user_metadata?.user_name || user?.user_metadata?.preferred_username}
                  </p>
                </div>
                <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
              </div>
              
              {session?.provider_token && (
                <div className="mt-2 text-xs text-green-600">
                  ✓ GitHub access token secured
                </div>
              )}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!session?.provider_token}
              >
                View My Repositories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                {session?.provider_token 
                  ? 'Redirecting automatically in a few seconds...'
                  : 'Completing GitHub connection...'
                }
              </p>
            </div>

            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>🔒 We only read your repositories - never modify your code</p>
              <p>✨ Select any public or private repository you own</p>
              <p>⚡ Analysis typically takes 30-60 seconds</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Connect;
