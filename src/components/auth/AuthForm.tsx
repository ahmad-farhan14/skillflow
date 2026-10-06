"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  signInWithPassword,
  signUp,
} from "@/app/actions/auth";

interface AuthFormProps {
  mode: "login" | "signup";
  nextPath: string;
  initialError?: string;
}

export function AuthForm({ mode, nextPath, initialError }: AuthFormProps) {
  const action = mode === "login" ? signInWithPassword : signUp;
  const [state, formAction, isPending] = useActionState(action, {
    error: initialError,
  });
  const isSignup = mode === "signup";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F17] px-4 py-12 text-slate-100">
      <section className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs">
            SF
          </span>
          SkillFlow
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#121824] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-blue-400">
              Your learning workspace
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {isSignup
                ? "Sign up to continue your roadmap and keep your progress in sync."
                : "Sign in to pick up where you left off."}
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <input type="hidden" name="next" value={nextPath} />
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                minLength={isSignup ? 8 : undefined}
                maxLength={128}
                placeholder={isSignup ? "At least 8 characters" : "Your password"}
                className="w-full rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {isSignup && (
                <p className="mt-2 text-xs text-slate-500">
                  Use at least 8 characters.
                </p>
              )}
            </div>

            {state.error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
              >
                {state.error}
              </p>
            )}
            {state.message && (
              <p
                role="status"
                className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 text-sm text-blue-200"
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? isSignup
                  ? "Creating account..."
                  : "Signing in..."
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {isSignup ? "Already have an account?" : "New to SkillFlow?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              {isSignup ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
