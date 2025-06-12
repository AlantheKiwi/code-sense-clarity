
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.10';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { repoName, files, userId } = await req.json();
    console.log(`Starting AI analysis for repo: ${repoName}`);

    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    // Create analysis record
    const { data: analysis, error: analysisError } = await supabase
      .from('repository_analyses')
      .insert({
        user_id: userId,
        repo_name: repoName.split('/')[1],
        repo_full_name: repoName,
        repo_url: `https://github.com/${repoName}`,
        total_files: files.length,
        critical_issues: 0,
        warnings: 0,
        suggestions: 0,
        analysis_data: { status: 'analyzing' }
      })
      .select()
      .single();

    if (analysisError) throw analysisError;

    // Analyze files with AI
    const allIssues = [];
    let processedFiles = 0;

    for (const file of files) {
      console.log(`Analyzing file: ${file.path}`);
      
      const fileIssues = await analyzeFileWithAI(file);
      
      // Save issues to database
      if (fileIssues.length > 0) {
        const issuesWithAnalysisId = fileIssues.map(issue => ({
          ...issue,
          analysis_id: analysis.id
        }));
        
        const { error: issuesError } = await supabase
          .from('code_issues')
          .insert(issuesWithAnalysisId);
          
        if (issuesError) console.error('Error saving issues:', issuesError);
        
        allIssues.push(...fileIssues);
      }
      
      processedFiles++;
      
      // Update progress
      await supabase
        .from('repository_analyses')
        .update({
          analysis_data: { 
            status: 'analyzing',
            files_processed: processedFiles,
            total_files: files.length 
          }
        })
        .eq('id', analysis.id);
    }

    // Count issues by type
    const critical = allIssues.filter(i => i.issue_type === 'critical').length;
    const warnings = allIssues.filter(i => i.issue_type === 'warning').length;
    const suggestions = allIssues.filter(i => i.issue_type === 'suggestion').length;

    // Update final analysis
    await supabase
      .from('repository_analyses')
      .update({
        critical_issues: critical,
        warnings: warnings,
        suggestions: suggestions,
        analysis_data: { status: 'completed', total_issues: allIssues.length }
      })
      .eq('id', analysis.id);

    return new Response(JSON.stringify({ 
      success: true, 
      analysisId: analysis.id,
      totalIssues: allIssues.length,
      breakdown: { critical, warnings, suggestions }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function analyzeFileWithAI(file: { path: string, content: string }) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a senior code reviewer. Analyze the provided code and identify issues.
          
          For each issue found, respond with a JSON array of objects with this exact structure:
          {
            "file_path": "path/to/file",
            "line_number": number or null,
            "issue_type": "critical" | "warning" | "suggestion",
            "issue_category": "string",
            "title": "string",
            "description": "string", 
            "suggested_fix": "string",
            "estimated_fix_time": "string",
            "difficulty_level": "easy" | "medium" | "hard",
            "code_snippet": "string",
            "fixed_code": "string",
            "why_matters": "string"
          }
          
          Focus on:
          - Critical: Syntax errors, type errors, security vulnerabilities, bugs that break functionality
          - Warning: Performance issues, code smells, maintainability problems
          - Suggestion: Best practices, optimizations, style improvements
          
          Only return valid JSON array, no other text.`
        },
        {
          role: 'user',
          content: `File: ${file.path}\n\nCode:\n${file.content}`
        }
      ],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  
  try {
    const issues = JSON.parse(data.choices[0].message.content);
    return Array.isArray(issues) ? issues : [];
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    return [];
  }
}
