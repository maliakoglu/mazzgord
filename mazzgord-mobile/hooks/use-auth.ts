import { useCallback, useEffect, useMemo, useState } from "react";
import { authApi, accountApi, getToken, removeToken, setToken, type Customer } from "@/lib/api";

type AuthState = {
  user: Customer | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

export function useAuth(): AuthState {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await accountApi.profile();
      if (profile.success && profile.data) {
        setUser(profile.data);
      } else {
        await removeToken();
        setUser(null);
      }
    } catch {
      await removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const result = await authApi.login({ email, password });
      if (result.success && result.token && result.customer) {
        await setToken(result.token);
        setUser(result.customer);
        return true;
      }
      setError(result.error || "Giris basarisiz");
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giris basarisiz");
      return false;
    }
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; phone?: string }): Promise<boolean> => {
    setError(null);
    try {
      const result = await authApi.register(data);
      if (result.success && result.token && result.customer) {
        await setToken(result.token);
        setUser(result.customer);
        return true;
      }
      setError(result.error || "Kayit basarisiz");
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayit basarisiz");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await removeToken();
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { user, loading, error, isAuthenticated, login, register, logout, refresh };
}
