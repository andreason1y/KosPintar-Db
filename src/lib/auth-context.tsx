import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { MOCK_USER } from "./mock-data";

interface AuthContextType {
  user: typeof MOCK_USER | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nama: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading auth state on mount
  useEffect(() => {
    // Simulate checking if user is logged in
    const timer = setTimeout(() => {
      // For demo purposes, user is logged in by default
      // Change this to null to test unauthenticated flow
      setUser(MOCK_USER);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For demo, always succeed
      setUser(MOCK_USER);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nama: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For demo, always succeed
      setUser({ ...MOCK_USER, email, nama });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
