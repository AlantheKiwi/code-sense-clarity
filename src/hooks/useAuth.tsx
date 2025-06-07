
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔐 Auth state changed:', event, {
        hasSession: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email,
        hasProviderToken: !!session?.provider_token,
        provider: session?.user?.app_metadata?.provider
      });
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Clear any previous errors on successful auth
      if (session && error) {
        console.log('✅ Clearing previous auth errors');
        setError(null);
      }

      // Log successful OAuth completion
      if (event === 'SIGNED_IN' && session?.provider_token) {
        console.log('🎉 GitHub OAuth completed successfully!');
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ Error getting initial session:', error);
        setError(error.message);
      }
      console.log('🔍 Initial session check:', {
        hasSession: !!session,
        userEmail: session?.user?.email,
        hasProviderToken: !!session?.provider_token
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGitHub = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Starting GitHub OAuth flow...');
      
      // More reliable redirect URL generation
      const baseUrl = window.location.origin;
      const redirectUrl = `${baseUrl}/connect`;
      console.log('📍 Using redirect URL:', redirectUrl);
      console.log('🌐 Current origin:', window.location.origin);
      console.log('🔗 Current href:', window.location.href);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          scopes: 'repo read:user user:email',
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('❌ GitHub OAuth error:', error);
        
        // More specific error handling
        if (error.message.includes('Invalid login credentials')) {
          setError('GitHub OAuth configuration issue. Please check your Supabase GitHub provider settings.');
        } else if (error.message.includes('redirect')) {
          setError(`Redirect URL configuration issue. Expected: ${redirectUrl}. Please check your Supabase Site URL and Redirect URLs.`);
        } else if (error.message.includes('client_id')) {
          setError('GitHub Client ID not configured. Please add your GitHub OAuth app credentials to Supabase.');
        } else if (error.message.includes('unauthorized_client')) {
          setError('GitHub OAuth app not authorized. Please check your GitHub OAuth app callback URL.');
        } else {
          setError(`GitHub authentication failed: ${error.message}`);
        }
        throw error;
      }

      console.log('✅ OAuth request initiated successfully');
    } catch (error: any) {
      console.error('💥 GitHub sign-in error:', error);
      if (!error.message.includes('OAuth')) {
        setError(error.message || 'Failed to sign in with GitHub');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('👋 Signing out...');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Error signing out:', error);
        setError(error.message);
        throw error;
      }
      
      // Clear state immediately
      setSession(null);
      setUser(null);
      console.log('✅ Sign out completed');
    } catch (error: any) {
      console.error('💥 Sign out error:', error);
      setError(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue: AuthContextType = {
    user, 
    session, 
    loading, 
    error, 
    signInWithGitHub, 
    signOut, 
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
