
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface TeamMember extends User {
  joinedAt: string;
  permissions: string[];
}

export interface DebugSession {
  id: string;
  projectId: string;
  shareUrl: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  collaborators: TeamMember[];
}

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  mentions: string[];
}

export interface Expert {
  id: string;
  name: string;
  avatar?: string;
  specialty: string[];
  rating: number;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  totalConsultations: number;
}

export interface Consultation {
  id: string;
  expertId: string;
  userId: string;
  projectId: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledAt?: string;
  duration: number;
  price: number;
  notes?: string;
}

export interface SubscriptionTier {
  id: string;
  name: 'Free' | 'Pro' | 'Enterprise';
  price: number;
  features: string[];
  limits: {
    projects: number;
    teamMembers: number;
    analysesPerMonth: number;
    storageGB: number;
  };
}
