import { supabase } from "@/lib/supabase";
import type { User } from "@/types";

type AuthForm = {
  email: string;
  password: string;
};

export async function registerUser({ email, password }: AuthForm) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function loginUser({ email, password }: AuthForm) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function logoutUser() {
  let { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function fetchUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
