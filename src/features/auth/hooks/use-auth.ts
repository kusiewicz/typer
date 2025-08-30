import { getSupabaseBrowserClient } from "~/utils/supabase/client";
import { AuthService } from "../models/auth-service";

export const useAuth = () => {
  const supabase = getSupabaseBrowserClient();
  const authService = new AuthService(supabase);

  const handleLogout = async () => await authService.logout();

  return {
    handleLogout,
  };
};
