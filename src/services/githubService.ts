
import { supabase } from "@/integrations/supabase/client";

export interface GitHubFile {
  path: string;
  content: string;
  type: 'file' | 'dir';
  size: number;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  language: string;
  updated_at: string;
  private: boolean;
  html_url: string;
}

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=50', {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getRepoFiles(owner: string, repo: string, path: string = ''): Promise<GitHubFile[]> {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const contents = await response.json();
    const files: GitHubFile[] = [];

    for (const item of contents) {
      if (item.type === 'file' && this.shouldAnalyzeFile(item.name)) {
        // Get file content
        const fileResponse = await fetch(item.download_url);
        const content = await fileResponse.text();
        
        files.push({
          path: item.path,
          content,
          type: 'file',
          size: item.size,
        });
      } else if (item.type === 'dir' && this.shouldAnalyzeDirectory(item.name)) {
        // Recursively get files from subdirectories
        const subFiles = await this.getRepoFiles(owner, repo, item.path);
        files.push(...subFiles);
      }
    }

    return files;
  }

  private shouldAnalyzeFile(filename: string): boolean {
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.py', '.java', '.cpp', '.c', '.cs', '.go', '.rs'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  private shouldAnalyzeDirectory(dirname: string): boolean {
    const skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
    return !skipDirs.includes(dirname);
  }

  async analyzeRepository(repoFullName: string, userId: string): Promise<string> {
    console.log(`Starting analysis for ${repoFullName}`);
    
    const [owner, repo] = repoFullName.split('/');
    const files = await this.getRepoFiles(owner, repo);
    
    console.log(`Found ${files.length} files to analyze`);

    // Call our AI analysis edge function
    const { data, error } = await supabase.functions.invoke('analyze-code', {
      body: {
        repoName: repoFullName,
        files: files.slice(0, 20), // Limit to first 20 files for now
        userId
      }
    });

    if (error) throw error;
    
    return data.analysisId;
  }
}
