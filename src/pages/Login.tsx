
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github, Code, AlertCircle, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const { user, signInWithGitHub, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User already logged in, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGitHubSignIn = async () => {
    try {
      clearError();
      await signInWithGitHub();
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      // Error is handled by the auth context
    }
  };

  // Don't render login form if user is already authenticated
  if (user) {
    return null;
  }

  const isConfigurationError = error && (
    error.includes('OAuth') || 
    error.includes('redirect') || 
    error.includes('configured') ||
    error.includes('Invalid login credentials')
  );

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
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {isConfigurationError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-yellow-900">Configuration Required</h3>
                <p className="text-sm text-yellow-800">
                  GitHub OAuth needs to be configured in your Supabase project:
                </p>
                <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
                  <li>Go to Authentication → Providers in Supabase</li>
                  <li>Enable GitHub provider</li>
                  <li>Set up GitHub OAuth app credentials</li>
                  <li>Configure Site URL and Redirect URLs</li>
                </ol>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open('https://supabase.com/dashboard/project/dtwgnqzuskdfuypigaor/auth/providers', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Supabase Auth
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open('https://github.com/settings/applications/new', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    GitHub OAuth
                  </Button>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
              size="lg"
              onClick={handleGitHubSignIn}
              disabled={loading}
            >
              <Github className="mr-2 h-5 w-5" />
              {loading ? 'Connecting...' : 'Sign in with GitHub'}
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
