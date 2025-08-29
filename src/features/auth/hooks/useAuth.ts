import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getSupabaseBrowserClient } from "~/utils/supabase/client";
import { SupabaseAuthService } from "../models/AuthService";

export const useAuth = () => {
  const navigate = useNavigate();
  const supabase = getSupabaseBrowserClient();
  const authService = new SupabaseAuthService(supabase);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
      // TODO: Add proper error handling
    }
  }, [authService, navigate]);

  return {
    handleLogout,
    isAuthenticated: authService.isAuthenticated(),
  };
};
