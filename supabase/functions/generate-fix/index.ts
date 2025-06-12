
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { issue, codeContext, platformInfo } = await req.json();
    console.log(`Generating AI fix for: ${issue.title}`);

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
            content: `You are a senior software engineer providing intelligent code fixes. 
            
            Platform context: ${platformInfo?.type || 'unknown'} (${platformInfo?.framework || 'unknown'})
            
            Generate multiple fix options with:
            1. Quick fix (minimal changes)
            2. Robust fix (comprehensive solution)
            3. Optimization fix (performance/best practices)
            
            For each fix, provide:
            - Exact code replacement
            - Explanation of changes
            - Trade-offs and considerations
            - Difficulty level (1-5)
            - Estimated implementation time
            
            Respond with JSON:
            {
              "fixes": [
                {
                  "type": "quick" | "robust" | "optimization",
                  "title": "string",
                  "description": "string",
                  "code": "string",
                  "explanation": "string",
                  "tradeoffs": "string",
                  "difficulty": 1-5,
                  "estimatedTime": "string",
                  "pros": ["string"],
                  "cons": ["string"]
                }
              ],
              "recommendation": "string (which fix to choose and why)"
            }`
          },
          {
            role: 'user',
            content: `Issue: ${issue.title}
            Description: ${issue.description}
            File: ${issue.file_path}
            Current code: ${issue.code_snippet || 'No code provided'}
            
            Context: ${codeContext || 'No additional context'}`
          }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    
    try {
      const fixes = JSON.parse(data.choices[0].message.content);
      return new Response(JSON.stringify(fixes), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Failed to generate structured fixes',
        rawResponse: data.choices[0].message.content 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error generating fix:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
