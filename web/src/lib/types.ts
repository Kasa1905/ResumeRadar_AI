export interface RepositoryAnalysis {
  has_description: boolean;
  has_readme: boolean;
  multiple_languages: boolean;
  recently_updated: boolean;
  has_topics: boolean;
  has_external_link: boolean;
  strong_project: boolean;
}

export interface RepositoryItem {
  name: string;
  description: string | null;
  primary_language: string | null;
  topics: string[];
  last_updated: string;
  default_branch: string;
  readme_first_lines: string | null;
  analysis: RepositoryAnalysis;
}

export interface GitHubAnalysisData {
  total_repos: number;
  skills_detected: Record<string, number>;
  repos: RepositoryItem[];
}

export interface LinkedInCertification {
  name: string;
  issuer: string;
}

export interface LinkedInRole {
  title: string;
  company: string;
}

export interface LinkedInAnalysisData {
  profile_id?: string;
  total_certifications?: number;
  total_roles?: number;
  certifications?: LinkedInCertification[];
  roles?: LinkedInRole[];
  access_note?: string;
  error?: string;
  detail?: string;
}

export interface AnalyzeResponse {
  github: GitHubAnalysisData;
  linkedin?: LinkedInAnalysisData;
}

export interface AnalyzeRequest {
  github_url: string;
  linkedin_url?: string;
}
