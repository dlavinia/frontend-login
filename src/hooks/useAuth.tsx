import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../services/storage";
import { login as loginApi } from "../services/api/auth";
import { SplashScreen } from "../components/SplashScreen";
type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { tokens } = await loginApi(email, password);
    setTokenState(tokens.access);
    setToken(tokens.access);
  };

  const logout = () => {
    setTokenState(null);
    removeToken();
  };

  if (loading) {
    return <SplashScreen/>
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
