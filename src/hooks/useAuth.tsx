
import { useState, useEffect, createContext, useContext } from 'react';

// Mock User type to replace Supabase User
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    avatar_url: string;
    full_name: string;
    user_name: string;
  };
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication for now - will be replaced with actual Supabase auth
    setLoading(false);
  }, []);

  const signInWithGitHub = async () => {
    console.log('Starting GitHub OAuth flow...');
    // Mock successful login for now
    const mockUser: MockUser = {
      id: '1',
      email: 'user@example.com',
      user_metadata: {
        avatar_url: 'https://github.com/github.png',
        full_name: 'GitHub User',
        user_name: 'githubuser'
      }
    };
    setUser(mockUser);
  };

  const signOut = async () => {
    console.log('Signing out...');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
