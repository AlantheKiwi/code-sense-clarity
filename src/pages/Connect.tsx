
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, CheckCircle, Code } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

const Connect = () => {
  const { user } = useAuth();

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
            Connected to GitHub
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to CodeSense, {user?.user_metadata?.full_name || 'Developer'}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's connect your repository and start analyzing your code.
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-lg max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Github className="h-6 w-6" />
              Select Repository
            </CardTitle>
            <p className="text-gray-600">
              Choose a repository from your GitHub account to analyze.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Connected Account:</h3>
              <div className="flex items-center gap-3">
                <img 
                  src={user?.user_metadata?.avatar_url} 
                  alt="GitHub Avatar" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-blue-800">{user?.user_metadata?.full_name}</p>
                  <p className="text-sm text-blue-600">@{user?.user_metadata?.user_name}</p>
                </div>
              </div>
            </div>

            <div className="text-center py-8">
              <Github className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Loading your repositories...
              </h3>
              <p className="text-gray-600 mb-4">
                We're fetching your GitHub repositories. This may take a moment.
              </p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>🔒 We only read your repositories - never modify your code</p>
              <p>✨ Select any public or private repository you own</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Connect;
