import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

function getSafeRedirectPath(value: string | null) {
  if (value?.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const nextPath = getSafeRedirectPath(
    request.nextUrl.searchParams.get("next"),
  );

  if (!code) {
    redirect("/login?error=confirmation");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    redirect("/login?error=confirmation");
  }

  redirect(nextPath);
}
