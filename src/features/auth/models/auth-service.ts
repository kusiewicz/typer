import { SupabaseClient, User } from "@supabase/supabase-js";

interface AuthServiceProps {
  logout(): Promise<void>;
  getUser(): Promise<Partial<User> | null>;
}

interface SignUpProps {
  email: string;
  password: string;
  username: string;
}

interface SignInProps {
  email: string;
  password: string;
}

// TODO Wedle tego arktykulu o modularyzacji
export class AuthService implements AuthServiceProps {
  private readonly defaultSignUpOptions = {
    emailRedirectTo: "",
  };

  constructor(private supabase: SupabaseClient) {}

  async signUp(credentials: SignUpProps) {
    return await this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: this.defaultSignUpOptions.emailRedirectTo,
        data: { username: credentials.username },
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
