export interface AuthService {
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}

export class SupabaseAuthService implements AuthService {
  constructor(private supabase: any) {}

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  isAuthenticated(): boolean {
    // This would typically check the current session
    // For now, we'll assume it's handled by the context
    return true;
  }
}
