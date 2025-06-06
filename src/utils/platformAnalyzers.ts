
export interface PlatformIssue {
  id: string;
  platform: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: string;
  title: string;
  description: string;
  fix: string;
  example?: string;
  platformSpecificAdvice: string;
}

export const analyzeLovableProject = (files: string[]): PlatformIssue[] => {
  const issues: PlatformIssue[] = [];

  // Check for overly complex AI-generated components
  if (files.some(f => f.includes('LargeComponent.tsx'))) {
    issues.push({
      id: 'lovable-1',
      platform: 'lovable',
      severity: 'warning',
      category: 'AI Code Cleanup',
      title: 'Large AI-generated component detected',
      description: 'This component is over 300 lines, indicating it may have been generated with too many features at once.',
      fix: 'Break this component into smaller, focused components using the "extract component" pattern.',
      example: 'Split UserDashboard into UserProfile, UserStats, and UserActions components',
      platformSpecificAdvice: 'In Lovable, ask the AI to "refactor this component into smaller pieces" for better maintainability.'
    });
  }

  // Check for unused Shadcn/ui components
  if (files.some(f => f.includes('src/components/ui/'))) {
    issues.push({
      id: 'lovable-2',
      platform: 'lovable',
      severity: 'suggestion',
      category: 'Bundle Optimization',
      title: 'Unused Shadcn/ui components detected',
      description: 'Several UI components are imported but not used, increasing bundle size.',
      fix: 'Remove unused imports from components/ui/ directory.',
      platformSpecificAdvice: 'Lovable automatically installs Shadcn components. Clean up unused ones to optimize your bundle.'
    });
  }

  // Check for missing Supabase RLS policies
  if (files.some(f => f.includes('supabase'))) {
    issues.push({
      id: 'lovable-3',
      platform: 'lovable',
      severity: 'critical',
      category: 'Security',
      title: 'Missing Row Level Security policies',
      description: 'Database tables without proper RLS policies can expose sensitive data.',
      fix: 'Add RLS policies to all tables that handle user data.',
      example: 'CREATE POLICY "Users can only see their own data" ON profiles FOR SELECT USING (auth.uid() = user_id);',
      platformSpecificAdvice: 'In Lovable, use the Supabase integration panel to set up RLS policies through the UI.'
    });
  }

  return issues;
};

export const analyzeBubbleProject = (files: string[]): PlatformIssue[] => {
  const issues: PlatformIssue[] = [];

  issues.push({
    id: 'bubble-1',
    platform: 'bubble',
    severity: 'warning',
    category: 'Database Performance',
    title: 'Inefficient database queries detected',
    description: 'Repeating groups are loading too much data without proper constraints.',
    fix: 'Add search constraints and limit the number of items loaded.',
    example: 'Add "Created date > Current date/time -days 30" constraint',
    platformSpecificAdvice: 'In Bubble, always add constraints to your searches and use pagination for large datasets.'
  });

  issues.push({
    id: 'bubble-2',
    platform: 'bubble',
    severity: 'suggestion',
    category: 'Workflow Optimization',
    title: 'Complex workflow chains detected',
    description: 'Some workflows have more than 10 actions, making them hard to debug.',
    fix: 'Break complex workflows into smaller, reusable custom events.',
    platformSpecificAdvice: 'Use Bubble\'s custom events feature to create modular, testable workflow components.'
  });

  return issues;
};

export const analyzeUniversalNoCodeIssues = (files: string[]): PlatformIssue[] => {
  const issues: PlatformIssue[] = [];

  // Check for hardcoded API keys
  if (files.some(f => f.includes('api_key') || f.includes('secret_key'))) {
    issues.push({
      id: 'universal-1',
      platform: 'universal',
      severity: 'critical',
      category: 'Security',
      title: 'Hardcoded API keys detected',
      description: 'API keys found in source code pose a serious security risk.',
      fix: 'Move all API keys to environment variables or secure storage.',
      example: 'Use process.env.API_KEY instead of hardcoded strings',
      platformSpecificAdvice: 'Use your platform\'s environment variable system or secrets management.'
    });
  }

  // Check for accessibility issues
  issues.push({
    id: 'universal-2',
    platform: 'universal',
    severity: 'warning',
    category: 'Accessibility',
    title: 'Missing accessibility attributes',
    description: 'Images and interactive elements lack proper alt text and ARIA labels.',
    fix: 'Add alt attributes to images and aria-label to interactive elements.',
    example: '<img src="photo.jpg" alt="User profile photo" />',
    platformSpecificAdvice: 'Good accessibility improves SEO and user experience across all platforms.'
  });

  return issues;
};
