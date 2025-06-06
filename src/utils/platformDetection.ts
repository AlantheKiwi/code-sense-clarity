
export interface PlatformInfo {
  type: 'lovable' | 'bubble' | 'webflow' | 'flutterflow' | 'unknown';
  confidence: number;
  indicators: string[];
  framework?: string;
  buildTool?: string;
}

export const detectPlatform = (files: string[], analysisData?: any): PlatformInfo => {
  // Lovable detection
  if (files.some(f => f.includes('vite.config.ts')) && 
      files.some(f => f.includes('tailwind.config.ts')) &&
      files.some(f => f.includes('src/components/ui/'))) {
    return {
      type: 'lovable',
      confidence: 0.95,
      indicators: ['Vite config', 'Tailwind CSS', 'Shadcn/ui components', 'React/TypeScript'],
      framework: 'React',
      buildTool: 'Vite'
    };
  }

  // Bubble detection
  if (files.some(f => f.includes('bubble-export')) ||
      files.some(f => f.includes('.bubble')) ||
      analysisData?.platform === 'bubble') {
    return {
      type: 'bubble',
      confidence: 0.9,
      indicators: ['Bubble export structure', 'Workflow files', 'Database schema'],
      framework: 'Bubble',
      buildTool: 'Bubble Engine'
    };
  }

  // Webflow detection
  if (files.some(f => f.includes('webflow.js')) ||
      files.some(f => f.includes('.webflow')) ||
      files.some(f => f.includes('ix2/'))) {
    return {
      type: 'webflow',
      confidence: 0.85,
      indicators: ['Webflow.js', 'IX2 interactions', 'Static HTML structure'],
      framework: 'Static HTML/CSS',
      buildTool: 'Webflow'
    };
  }

  // FlutterFlow detection
  if (files.some(f => f.includes('pubspec.yaml')) ||
      files.some(f => f.includes('lib/flutter_flow/')) ||
      files.some(f => f.includes('.dart'))) {
    return {
      type: 'flutterflow',
      confidence: 0.9,
      indicators: ['Dart files', 'Flutter dependencies', 'FlutterFlow structure'],
      framework: 'Flutter',
      buildTool: 'Flutter SDK'
    };
  }

  return {
    type: 'unknown',
    confidence: 0.1,
    indicators: ['Could not determine platform'],
  };
};

export const getPlatformBadgeColor = (platform: string) => {
  switch (platform) {
    case 'lovable':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'bubble':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'webflow':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'flutterflow':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
