import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Code, 
  AlertTriangle, 
  AlertCircle, 
  Lightbulb,
  FileText,
  Clock,
  Target,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CodeIssue {
  id: string;
  file_path: string;
  line_number: number | null;
  issue_type: 'critical' | 'warning' | 'suggestion';
  issue_category: string;
  title: string;
  description: string;
  suggested_fix: string | null;
  estimated_fix_time: string | null;
  difficulty_level: 'easy' | 'medium' | 'hard' | null;
}

interface AnalysisData {
  id: string;
  repo_name: string;
  repo_full_name: string;
  total_files: number;
  critical_issues: number;
  warnings: number;
  suggestions: number;
  analyzed_at: string;
}

const Analysis = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<CodeIssue | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (repoName) {
      checkExistingAnalysis();
    }
  }, [repoName, user]);

  const checkExistingAnalysis = async () => {
    if (!user || !repoName) return;

    try {
      const decodedRepoName = decodeURIComponent(repoName);
      
      const { data: existingAnalysis } = await supabase
        .from('repository_analyses')
        .select('*')
        .eq('user_id', user.id)
        .eq('repo_full_name', decodedRepoName)
        .order('analyzed_at', { ascending: false })
        .limit(1)
        .single();

      if (existingAnalysis) {
        setAnalysisData(existingAnalysis);
        await fetchIssues(existingAnalysis.id);
        setLoading(false);
      } else {
        // Start new analysis
        await startAnalysis();
      }
    } catch (error) {
      console.error('Error checking existing analysis:', error);
      await startAnalysis();
    }
  };

  const fetchIssues = async (analysisId: string) => {
    try {
      const { data: issuesData, error } = await supabase
        .from('code_issues')
        .select('*')
        .eq('analysis_id', analysisId)
        .order('issue_type', { ascending: true });

      if (error) throw error;
      
      // Type cast the data to ensure TypeScript compatibility
      const typedIssues = (issuesData || []).map(issue => ({
        ...issue,
        issue_type: issue.issue_type as 'critical' | 'warning' | 'suggestion',
        difficulty_level: issue.difficulty_level as 'easy' | 'medium' | 'hard' | null
      }));
      
      setIssues(typedIssues);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analysis issues.",
        variant: "destructive",
      });
    }
  };

  const startAnalysis = async () => {
    if (!user || !repoName) return;

    setAnalyzing(true);
    setProgress(0);

    try {
      const decodedRepoName = decodeURIComponent(repoName);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Mock analysis - in real implementation, this would call GitHub API
      const mockAnalysis = await performMockAnalysis(decodedRepoName);
      
      clearInterval(progressInterval);
      setProgress(100);

      // Save to database
      const { data: analysisRecord, error: analysisError } = await supabase
        .from('repository_analyses')
        .insert({
          user_id: user.id,
          repo_name: decodedRepoName.split('/')[1],
          repo_full_name: decodedRepoName,
          repo_url: `https://github.com/${decodedRepoName}`,
          analysis_data: mockAnalysis,
          total_files: mockAnalysis.totalFiles,
          critical_issues: mockAnalysis.issues.filter((i: any) => i.issue_type === 'critical').length,
          warnings: mockAnalysis.issues.filter((i: any) => i.issue_type === 'warning').length,
          suggestions: mockAnalysis.issues.filter((i: any) => i.issue_type === 'suggestion').length,
        })
        .select()
        .single();

      if (analysisError) throw analysisError;

      // Save issues with proper typing
      const issuesData = mockAnalysis.issues.map((issue: any) => ({
        ...issue,
        analysis_id: analysisRecord.id,
      }));

      const { error: issuesError } = await supabase
        .from('code_issues')
        .insert(issuesData);

      if (issuesError) throw issuesError;

      setAnalysisData(analysisRecord);
      
      // Type cast the issues data when setting state
      const typedIssues = issuesData.map(issue => ({
        ...issue,
        issue_type: issue.issue_type as 'critical' | 'warning' | 'suggestion',
        difficulty_level: issue.difficulty_level as 'easy' | 'medium' | 'hard' | null
      }));
      
      setIssues(typedIssues);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${mockAnalysis.issues.length} issues in ${mockAnalysis.totalFiles} files.`,
      });

    } catch (error) {
      console.error('Error during analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze repository. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  const performMockAnalysis = async (repoFullName: string) => {
    // Mock analysis logic - in real implementation, this would fetch and analyze actual files
    const mockIssues = [
      {
        file_path: 'src/components/Dashboard.tsx',
        line_number: 45,
        issue_type: 'critical',
        issue_category: 'TypeScript Error',
        title: 'Property "user" does not exist on type',
        description: 'The "user" property is being accessed without proper type checking, which will cause TypeScript compilation errors.',
        suggested_fix: 'Add optional chaining: user?.metadata instead of user.metadata',
        estimated_fix_time: '2 minutes',
        difficulty_level: 'easy',
      },
      {
        file_path: 'src/pages/Home.tsx',
        line_number: 120,
        issue_type: 'warning',
        issue_category: 'Large Component',
        title: 'Component exceeds 200 lines',
        description: 'This component is too large and should be broken down into smaller, more manageable pieces.',
        suggested_fix: 'Extract sections into separate components like Header, Hero, and Footer',
        estimated_fix_time: '30 minutes',
        difficulty_level: 'medium',
      },
      {
        file_path: 'src/utils/api.ts',
        line_number: 15,
        issue_type: 'critical',
        issue_category: 'Missing Error Handling',
        title: 'API call lacks error handling',
        description: 'This fetch call can fail and crash the application. Always implement proper error handling for API calls.',
        suggested_fix: 'Wrap in try-catch block and handle network errors gracefully',
        estimated_fix_time: '10 minutes',
        difficulty_level: 'easy',
      },
      {
        file_path: 'src/components/UserList.tsx',
        line_number: 8,
        issue_type: 'suggestion',
        issue_category: 'Performance',
        title: 'Consider using React.memo for optimization',
        description: 'This component re-renders frequently. Adding React.memo could improve performance.',
        suggested_fix: 'Export with React.memo() to prevent unnecessary re-renders',
        estimated_fix_time: '5 minutes',
        difficulty_level: 'easy',
      },
      {
        file_path: 'src/hooks/useData.ts',
        line_number: null,
        issue_type: 'warning',
        issue_category: 'Unused Import',
        title: 'Unused import: useCallback',
        description: 'The useCallback import is not being used in this file and should be removed.',
        suggested_fix: 'Remove unused import from React import statement',
        estimated_fix_time: '1 minute',
        difficulty_level: 'easy',
      },
    ];

    return {
      totalFiles: 47,
      issues: mockIssues,
      repositoryType: 'React/TypeScript',
      buildTool: 'Vite',
      framework: 'React',
    };
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'suggestion':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (loading || analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
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
              <UserMenu />
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center py-12">
            <CardContent>
              <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analyzing Repository
              </h3>
              <p className="text-gray-600 mb-6">
                Scanning {decodeURIComponent(repoName || '')} for code issues...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-gray-500">{progress}% complete</p>
              </div>
            </CardContent>
          </Card>
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
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Code className="h-4 w-4" />
            <span>{analysisData?.repo_full_name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Code Analysis Results
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{analysisData?.total_files} files analyzed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Analyzed {analysisData ? new Date(analysisData.analyzed_at).toLocaleDateString() : ''}</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Critical Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">{analysisData?.critical_issues || 0}</div>
              <p className="text-sm text-red-700">Must fix to prevent build failures</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900">{analysisData?.warnings || 0}</div>
              <p className="text-sm text-yellow-700">Should fix for better code quality</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                <Lightbulb className="h-5 w-5" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{analysisData?.suggestions || 0}</div>
              <p className="text-sm text-blue-700">Optimization opportunities</p>
            </CardContent>
          </Card>
        </div>

        {/* Issues List */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Issues Found</h2>
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card 
                  key={issue.id} 
                  className={`cursor-pointer transition-all ${getIssueColor(issue.issue_type)} ${
                    selectedIssue?.id === issue.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.issue_type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{issue.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {issue.issue_category}
                          </Badge>
                          {issue.difficulty_level && (
                            <Badge variant="outline" className="text-xs">
                              {issue.difficulty_level}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{issue.file_path}</p>
                    {issue.line_number && (
                      <p className="text-xs text-gray-500">Line {issue.line_number}</p>
                    )}
                    {issue.estimated_fix_time && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Target className="h-3 w-3" />
                        <span>~{issue.estimated_fix_time} to fix</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Issue Details */}
          <div>
            {selectedIssue ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getIssueIcon(selectedIssue.issue_type)}
                    Issue Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedIssue.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedIssue.file_path}</p>
                    {selectedIssue.line_number && (
                      <p className="text-xs text-gray-500">Line {selectedIssue.line_number}</p>
                    )}
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Problem Description</h5>
                    <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                  </div>

                  {selectedIssue.suggested_fix && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Suggested Fix</h5>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{selectedIssue.suggested_fix}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    {selectedIssue.estimated_fix_time && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{selectedIssue.estimated_fix_time}</span>
                      </div>
                    )}
                    {selectedIssue.difficulty_level && (
                      <Badge variant="outline" className="text-xs">
                        {selectedIssue.difficulty_level} difficulty
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12 text-gray-500">
                <CardContent>
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>Select an issue to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
