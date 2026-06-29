"use client";

import { createContext, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { ROUTES } from "@/utils/constants";
import { AuthUser } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticating: boolean;
  error?: string;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticating: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useSWR<AuthUser>(ROUTES.currentUser, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isAuthenticating: isLoading,
        error: error instanceof Error ? error.message : undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
