"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isSupabaseConfigured } from "@/utils/supabase/config";

export interface AuthFormState {
  error?: string;
  message?: string;
}

function validateCredentials(formData: FormData, requireStrongPassword: boolean) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { error: "Enter a valid email address." } as const;
  }
  if (email.trim().length > 254) {
    return { error: "Email addresses must be 254 characters or fewer." } as const;
  }
  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter your password." } as const;
  }
  if (password.length > 128) {
    return { error: "Passwords must be 128 characters or fewer." } as const;
  }
  if (requireStrongPassword && password.length < 8) {
    return { error: "Your password must be at least 8 characters." } as const;
  }

  return { email: email.trim(), password } as const;
}

function getRedirectPath(value: FormDataEntryValue | null) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
  ) {
    return value;
  }
  return "/dashboard";
}

export async function signInWithPassword(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Authentication is not configured yet. Set your Supabase URL and publishable key to continue.",
    };
  }

  const credentials = validateCredentials(formData, false);
  if ("error" in credentials) return credentials;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { error: error.message };
  }

  redirect(getRedirectPath(formData.get("next")));
}

export async function signUp(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Authentication is not configured yet. Set your Supabase URL and publishable key to continue.",
    };
  }

  const credentials = validateCredentials(formData, true);
  if ("error" in credentials) return credentials;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const confirmationUrl = new URL("/auth/confirm", siteUrl);
  confirmationUrl.searchParams.set(
    "next",
    getRedirectPath(formData.get("next")),
  );

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: confirmationUrl.toString(),
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect(getRedirectPath(formData.get("next")));
  }

  return {
    message: "Check your email for a confirmation link before signing in.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Unable to sign out: ${error.message}`);
  }
}
