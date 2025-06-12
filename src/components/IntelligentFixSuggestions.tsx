
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Copy, 
  Check, 
  Clock, 
  Target,
  Loader2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Fix {
  type: 'quick' | 'robust' | 'optimization';
  title: string;
  description: string;
  code: string;
  explanation: string;
  tradeoffs: string;
  difficulty: number;
  estimatedTime: string;
  pros: string[];
  cons: string[];
}

interface FixResponse {
  fixes: Fix[];
  recommendation: string;
}

interface IntelligentFixSuggestionsProps {
  issue: any;
  platformInfo: any;
}

const IntelligentFixSuggestions = ({ issue, platformInfo }: IntelligentFixSuggestionsProps) => {
  const [fixes, setFixes] = useState<FixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedFix, setCopiedFix] = useState<string | null>(null);
  const { toast } = useToast();

  const generateFixes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-fix', {
        body: {
          issue,
          codeContext: `Platform: ${platformInfo?.type}, Framework: ${platformInfo?.framework}`,
          platformInfo
        }
      });

      if (error) throw error;
      setFixes(data);
    } catch (error) {
      console.error('Error generating fixes:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI fixes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async (code: string, fixType: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedFix(fixType);
    setTimeout(() => setCopiedFix(null), 2000);
    toast({
      title: "Code Copied",
      description: "Fix code has been copied to clipboard.",
    });
  };

  const getFixIcon = (type: string) => {
    switch (type) {
      case 'quick':
        return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'robust':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'optimization':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800';
    if (difficulty <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (!fixes && !loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI-Powered Fix Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Get intelligent, context-aware fix suggestions powered by AI.
          </p>
          <Button onClick={generateFixes} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            Generate Smart Fixes
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Generating AI Fixes
          </h3>
          <p className="text-gray-600">
            Analyzing your code and generating intelligent solutions...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Fix Suggestions</CardTitle>
        {fixes?.recommendation && (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>AI Recommendation:</strong> {fixes.recommendation}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={fixes?.fixes[0]?.type || 'quick'}>
          <TabsList className="grid w-full grid-cols-3">
            {fixes?.fixes.map((fix) => (
              <TabsTrigger key={fix.type} value={fix.type} className="flex items-center gap-1">
                {getFixIcon(fix.type)}
                {fix.type === 'quick' && 'Quick'}
                {fix.type === 'robust' && 'Robust'}
                {fix.type === 'optimization' && 'Optimize'}
              </TabsTrigger>
            ))}
          </TabsList>

          {fixes?.fixes.map((fix) => (
            <TabsContent key={fix.type} value={fix.type} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{fix.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(fix.difficulty)}>
                      Difficulty: {fix.difficulty}/5
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {fix.estimatedTime}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{fix.description}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Code Solution</h5>
                  <div className="relative">
                    <pre className="bg-gray-50 border p-3 rounded-lg text-sm overflow-x-auto">
                      <code>{fix.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(fix.code, fix.type)}
                    >
                      {copiedFix === fix.type ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Explanation</h5>
                  <p className="text-sm text-gray-600">{fix.explanation}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-green-700 flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Pros
                    </h5>
                    <ul className="text-sm space-y-1">
                      {fix.pros.map((pro, index) => (
                        <li key={index} className="text-green-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-red-700 flex items-center gap-1">
                      <ThumbsDown className="h-3 w-3" />
                      Cons
                    </h5>
                    <ul className="text-sm space-y-1">
                      {fix.cons.map((con, index) => (
                        <li key={index} className="text-red-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {fix.tradeoffs && (
                  <div>
                    <h5 className="font-medium mb-2">Trade-offs</h5>
                    <p className="text-sm text-gray-600">{fix.tradeoffs}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IntelligentFixSuggestions;
