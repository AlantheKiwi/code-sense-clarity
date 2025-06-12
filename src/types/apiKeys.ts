
export interface APIKeyConfig {
  id: string;
  tool_name: string;
  tool_category: 'ai_analysis' | 'debugging' | 'code_quality' | 'performance' | 'security';
  api_key: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  website?: string;
  docUrl?: string;
  icon?: string;
  isPopular?: boolean;
}

export const AVAILABLE_TOOLS: Tool[] = [
  // AI Analysis Tools
  {
    id: 'openai',
    name: 'OpenAI GPT-4',
    category: 'ai_analysis',
    description: 'Advanced AI code analysis and suggestions',
    website: 'https://openai.com',
    docUrl: 'https://platform.openai.com/docs',
    isPopular: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'ai_analysis',
    description: 'Sophisticated AI assistant for code review',
    website: 'https://anthropic.com',
    docUrl: 'https://docs.anthropic.com',
    isPopular: true
  },
  {
    id: 'genspark',
    name: 'Genspark',
    category: 'ai_analysis',
    description: 'AI-powered search and code analysis',
    website: 'https://genspark.ai',
    docUrl: 'https://docs.genspark.ai'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'ai_analysis',
    description: 'Real-time AI research and analysis',
    website: 'https://perplexity.ai',
    docUrl: 'https://docs.perplexity.ai'
  },
  // Debugging Tools
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'debugging',
    description: 'Error tracking and performance monitoring',
    website: 'https://sentry.io',
    docUrl: 'https://docs.sentry.io',
    isPopular: true
  },
  {
    id: 'logrocket',
    name: 'LogRocket',
    category: 'debugging',
    description: 'Session replay and debugging',
    website: 'https://logrocket.com',
    docUrl: 'https://docs.logrocket.com'
  },
  {
    id: 'rollbar',
    name: 'Rollbar',
    category: 'debugging',
    description: 'Real-time error monitoring',
    website: 'https://rollbar.com',
    docUrl: 'https://docs.rollbar.com'
  },
  // Code Quality
  {
    id: 'sonarqube',
    name: 'SonarQube',
    category: 'code_quality',
    description: 'Code quality and security analysis',
    website: 'https://sonarqube.org',
    docUrl: 'https://docs.sonarqube.org'
  },
  {
    id: 'snyk',
    name: 'Snyk',
    category: 'security',
    description: 'Security vulnerability scanning',
    website: 'https://snyk.io',
    docUrl: 'https://docs.snyk.io',
    isPopular: true
  },
  {
    id: 'codeclimate',
    name: 'Code Climate',
    category: 'code_quality',
    description: 'Automated code review and quality metrics',
    website: 'https://codeclimate.com',
    docUrl: 'https://docs.codeclimate.com'
  },
  // Performance
  {
    id: 'newrelic',
    name: 'New Relic',
    category: 'performance',
    description: 'Application performance monitoring',
    website: 'https://newrelic.com',
    docUrl: 'https://docs.newrelic.com'
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'performance',
    description: 'Infrastructure and application monitoring',
    website: 'https://datadoghq.com',
    docUrl: 'https://docs.datadoghq.com'
  }
];

export const TOOL_CATEGORIES = {
  ai_analysis: 'AI Analysis',
  debugging: 'Debugging & Monitoring',
  code_quality: 'Code Quality',
  performance: 'Performance',
  security: 'Security'
};
