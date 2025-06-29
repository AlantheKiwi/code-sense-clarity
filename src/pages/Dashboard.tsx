
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Github, Search, Calendar, GitBranch, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useToast } from "@/hooks/use-toast";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  html_url: string;
  stargazers_count: number;
  private: boolean;
}

const Dashboard = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  useEffect(() => {
    fetchRepositories();
  }, [session]);

  const fetchRepositories = async () => {
    // Check for GitHub access token in session
    const githubToken = session?.provider_token;
    
    if (!githubToken) {
      setError('GitHub access token not found. Please sign in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching repositories with token...');
      
      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('GitHub access token expired. Please sign in again.');
        }
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos = await response.json();
      console.log(`Fetched ${repos.length} repositories`);
      setRepositories(repos);
    } catch (err: any) {
      console.error('Error fetching repositories:', err);
      setError(err.message || 'Failed to fetch repositories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeRepo = async (repo: Repository) => {
    if (!session?.provider_token) {
      toast({
        title: "GitHub Token Required",
        description: "Please reconnect your GitHub account to analyze repositories.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAnalyzing(repo.full_name);
      
      toast({
        title: "Analysis Started",
        description: `Starting AI-powered analysis of ${repo.name} using GPT-4o. This may take a few minutes.`,
      });
      
      // Navigate to analysis page which will start the real analysis
      navigate(`/analysis/${encodeURIComponent(repo.full_name)}`);
      
    } catch (error) {
      console.error('Error starting analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to start repository analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(null);
    }
  };

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'PHP': 'bg-purple-500',
      'Ruby': 'bg-red-500',
      'C++': 'bg-blue-600',
      'C#': 'bg-purple-600',
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Removed custom navigation - now using TopNavigation */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subscription Banner */}
        <SubscriptionBanner currentTier="Free" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Repositories
          </h1>
          <p className="text-xl text-gray-600">
            Select a repository to analyze for code issues and improvements.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 mb-8">
            <CardContent className="p-6">
              <p className="text-red-800">{error}</p>
              <div className="mt-4 space-x-2">
                <Button onClick={fetchRepositories} variant="outline">
                  Retry
                </Button>
                {error.includes('token') && (
                  <Button onClick={() => navigate('/login')} variant="outline">
                    Sign In Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && filteredRepositories.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepositories.map((repo) => (
              <Card key={repo.id} className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        {repo.name}
                        {repo.private && (
                          <Badge variant="secondary" className="text-xs">Private</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAnalyzeRepo(repo)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={analyzing === repo.full_name}
                  >
                    <GitBranch className="mr-2 h-4 w-4" />
                    {analyzing === repo.full_name ? 'Starting Analysis...' : 'Analyze Repository'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRepositories.length === 0 && repositories.length > 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No repositories found</h3>
              <p className="text-gray-600">Try adjusting your search terms.</p>
            </CardContent>
          </Card>
        )}

        {!loading && repositories.length === 0 && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <Github className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No repositories found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any repositories in your GitHub account.
              </p>
              <Button onClick={fetchRepositories} variant="outline">
                Refresh
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
