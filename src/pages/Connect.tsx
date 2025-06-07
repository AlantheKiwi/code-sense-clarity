
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github, CheckCircle, Code, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const { user, session, error } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    console.log('🔗 Connect page loaded with:', {
      hasUser: !!user,
      hasSession: !!session,
      hasProviderToken: !!session?.provider_token,
      userEmail: user?.email,
      provider: user?.app_metadata?.provider
    });

    // Only auto-redirect if we have a valid session with GitHub token
    if (user && session?.provider_token) {
      console.log('✅ Valid GitHub session detected, starting countdown...');
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            console.log('⏰ Countdown finished, redirecting to dashboard...');
            navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [user, session, navigate]);

  // Handle authentication errors
  if (error) {
    console.error('❌ Authentication error on connect page:', error);
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
    console.log('⏳ No user detected, showing loading state...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Completing GitHub authentication...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we process your login</p>
        </div>
      </div>
    );
  }

  const hasGitHubToken = session?.provider_token;
  const isGitHubProvider = user?.app_metadata?.provider === 'github';

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
            GitHub Connected Successfully!
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
              GitHub Authentication Complete
            </CardTitle>
            <p className="text-gray-600">
              Ready to analyze your repositories for code issues.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">✅ Connection Status:</h3>
              <div className="space-y-2">
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
                
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-green-700">User authenticated</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-green-700">Provider: {isGitHubProvider ? 'GitHub' : 'Other'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {hasGitHubToken ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">GitHub token secured</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-yellow-600" />
                        <span className="text-yellow-700">Token pending</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-green-700">Session active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!hasGitHubToken}
              >
                View My Repositories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                {hasGitHubToken 
                  ? `Redirecting automatically in ${countdown} seconds...`
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
