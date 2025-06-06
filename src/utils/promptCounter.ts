
// Utility to help maintain accurate prompt counts for each platform
// This file should be updated whenever prompts are added or removed

export const PLATFORM_PROMPT_COUNTS = {
  lovable: 5,
  bolt: 1,
  bubble: 2,
  flutterflow: 1,
  adalo: 1,
  webflow: 1,
  softr: 1,
  airtable: 1,
  zapier: 1
} as const;

export type PlatformId = keyof typeof PLATFORM_PROMPT_COUNTS;

export const getTotalPromptCount = (): number => {
  return Object.values(PLATFORM_PROMPT_COUNTS).reduce((sum, count) => sum + count, 0);
};

export const getPromptCount = (platformId: PlatformId): number => {
  return PLATFORM_PROMPT_COUNTS[platformId] || 0;
};

// Instructions for maintaining this file:
// 1. When adding a new prompt to any platform, increment the count here
// 2. When removing a prompt from any platform, decrement the count here
// 3. Update the UsefulPrompts.tsx file to use these counts instead of hardcoded values
// 4. This ensures consistency across the application
