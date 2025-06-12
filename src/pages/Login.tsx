
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Code, AlertCircle, ExternalLink, Copy, CheckCircle, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const { user, signInWithGitHub, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("email");
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError(null);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setEmailError("Passwords don't match");
          return;
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        
        if (error) throw error;
        
        // Show success message for sign up
        setEmailError("Check your email for a confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      setEmailError(error.message || 'Authentication failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(type);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Show loading state while checking authentication
  if (loading && !error && !emailError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated (but not during initial load)
  if (user && !loading) {
    return null;
  }

  const isConfigurationError = error && (
    error.includes('OAuth') || 
    error.includes('redirect') || 
    error.includes('configured') ||
    error.includes('Invalid login credentials') ||
    error.includes('client_id') ||
    error.includes('unauthorized_client')
  );

  const currentUrl = window.location.origin;
  const callbackUrl = "https://dtwgnqzuskdfuypigaor.supabase.co/auth/v1/callback";
  const connectUrl = `${currentUrl}/connect`;

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
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                {emailError && (
                  <Alert variant={emailError.includes("Check your email") ? "default" : "destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {emailError}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <Button 
                    type="submit"
                    className="w-full"
                    disabled={emailLoading}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {emailLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                  </Button>
                </form>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setEmailError(null);
                      setPassword("");
                      setConfirmPassword("");
                    }}
                    className="text-sm"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="github" className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                {isConfigurationError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold text-yellow-900">🔧 Configuration Required</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-yellow-800 mb-2">Step 1: GitHub OAuth App</p>
                        <div className="text-xs text-yellow-700 space-y-1">
                          <p>• Go to GitHub → Settings → Developer settings → OAuth Apps</p>
                          <p>• Create new OAuth app with these settings:</p>
                          <div className="bg-yellow-100 p-2 rounded border">
                            <p><strong>Homepage URL:</strong></p>
                            <div className="flex items-center gap-1 mt-1">
                              <code className="text-xs bg-white px-1 rounded flex-1">{currentUrl}</code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(currentUrl, 'homepage')}
                                className="h-6 w-6 p-0"
                              >
                                {copiedUrl === 'homepage' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                            <p className="mt-2"><strong>Callback URL:</strong></p>
                            <div className="flex items-center gap-1 mt-1">
                              <code className="text-xs bg-white px-1 rounded flex-1">{callbackUrl}</code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(callbackUrl, 'callback')}
                                className="h-6 w-6 p-0"
                              >
                                {copiedUrl === 'callback' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-yellow-800 mb-2">Step 2: Supabase Configuration</p>
                        <div className="text-xs text-yellow-700 space-y-1">
                          <p>• Go to Supabase → Authentication → URL Configuration:</p>
                          <div className="bg-yellow-100 p-2 rounded border">
                            <p><strong>Site URL:</strong></p>
                            <div className="flex items-center gap-1 mt-1">
                              <code className="text-xs bg-white px-1 rounded flex-1">{currentUrl}</code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(currentUrl, 'site')}
                                className="h-6 w-6 p-0"
                              >
                                {copiedUrl === 'site' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                            <p className="mt-2"><strong>Redirect URLs:</strong></p>
                            <div className="flex items-center gap-1 mt-1">
                              <code className="text-xs bg-white px-1 rounded flex-1">{connectUrl}</code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(connectUrl, 'redirect')}
                                className="h-6 w-6 p-0"
                              >
                                {copiedUrl === 'redirect' ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                          <p>• Go to Authentication → Providers → Enable GitHub</p>
                          <p>• Add your GitHub Client ID and Client Secret</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open('https://github.com/settings/applications/new', '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        GitHub OAuth
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open('https://supabase.com/dashboard/project/dtwgnqzuskdfuypigaor/auth/url-configuration', '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Supabase URLs
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open('https://supabase.com/dashboard/project/dtwgnqzuskdfuypigaor/auth/providers', '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Supabase Auth
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
              </TabsContent>
            </Tabs>
            
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
