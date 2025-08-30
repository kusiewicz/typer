import { SupabaseClient, User } from "@supabase/supabase-js";

interface AuthServiceProps {
  logout(): Promise<void>;
  getUser(): Promise<Partial<User> | null>;
}

interface SignUpProps {
  email: string;
  password: string;
  username: string;
  emailRedirectTo: string;
}

interface SignInProps {
  email: string;
  password: string;
}

export class AuthService implements AuthServiceProps {
  constructor(private supabase: SupabaseClient) {}

  async signUp({ email, password, username, emailRedirectTo }: SignUpProps) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: {
          username,
        },
      },
    });
  }

  async signIn({ email, password }: SignInProps) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user ? { email: data.user.email } : null;
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
