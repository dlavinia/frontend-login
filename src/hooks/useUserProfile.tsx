import { useState, useEffect } from "react";
import api from "../services/api/axiosInstance";
import { useAuth } from "./useAuth";

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  avatar?: { high: string; medium: string; low: string };
};

export function useUserProfile() {
  const { logout } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/auth/profile/");
        setUser(response.data);
      } catch (err: any) {
        setError("User not found");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout]);

  return { user, loading, error };
}
