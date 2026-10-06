import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { isSupabaseConfigured } from "@/utils/supabase/config";

function copyCookies(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) {
    to.cookies.set(cookie);
  }
  return to;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isRoot = pathname === "/";
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isAuthCallback = pathname === "/auth/confirm";
  if (!isRoot && !isDashboard && !isAuthPage && !isAuthCallback) {
    return NextResponse.next();
  }
  if (!isSupabaseConfigured()) {
    if (isDashboard) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "next",
        `${pathname}${request.nextUrl.search}`,
      );
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);

  if (!user && isDashboard) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );
    return copyCookies(response, NextResponse.redirect(loginUrl));
  }

  if (user && (isRoot || isAuthPage || isAuthCallback)) {
    return copyCookies(
      response,
      NextResponse.redirect(new URL("/dashboard", request.url)),
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/auth/confirm",
  ],
};
