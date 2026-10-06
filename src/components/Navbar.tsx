"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { signOut } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { useSkillFlow } from "../context/SkillFlowContext";
import {
  FlameIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  CodeIcon,
  PaletteIcon,
  ResetIcon,
  SparklesIcon,
} from "./icons";

interface NavbarProps {
  onOpenRoadmapModal: () => void;
}

export function Navbar({ onOpenRoadmapModal }: NavbarProps) {
  const {
    roadmaps,
    activeRoadmap,
    userProfile,
    isDarkMode,
    toggleDarkMode,
    switchRoadmap,
    resetToDefaultSeed,
  } = useSkillFlow();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      setIsAuthLoading(false);
      setAuthError("");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setAuthError("");
    try {
      await signOut();
      setAuthUser(null);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign out.";
      setAuthError(message);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => switchRoadmap("frontend-web-developer")}>
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <SparklesIcon size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-slate-950 dark:text-white">
                  SkillFlow
                </span>
                <span className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 dark:border-white/10 dark:text-slate-400">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Developer & Designer Learning Tracker
              </p>
            </div>
          </div>

          {/* Roadmap Selector Dropdown / Modal Trigger */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{activeRoadmap.title}</span>
              <ChevronDownIcon size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Curated Roadmaps
                </div>
                {roadmaps.map((r) => {
                  const isActive = r.slug === activeRoadmap.slug;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRoadmap(r.slug);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {r.category === "Development" ? <CodeIcon size={18} /> : <PaletteIcon size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium">{r.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{r.estimated_hours}h estimated</div>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                  );
                })}

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenRoadmapModal();
                    }}
                    className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline py-1"
                  >
                    View All Roadmaps & Compare →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Streak Pill, Theme Toggle, Profile Avatar */}
        <div className="flex items-center gap-3">
          {/* Mobile roadmap browse button */}
          <button
            onClick={onOpenRoadmapModal}
            className="md:hidden text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            Roadmaps
          </button>

          {/* Daily Streak Pill */}
          <div
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-slate-600 dark:text-slate-300"
            title="Current learning streak"
            aria-label={`${userProfile.current_streak} day learning streak`}
          >
            <FlameIcon size={15} className="text-amber-500" />
            <span className="font-mono tabular-nums">{userProfile.current_streak}d</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {isDarkMode ? <SunIcon size={18} className="text-amber-400" /> : <MoonIcon size={18} className="text-slate-700" />}
          </button>

          {/* Reset Seed Button */}
          <button
            onClick={resetToDefaultSeed}
            title="Reset progress to default seed"
            aria-label="Reset seed data"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm hidden sm:block"
          >
            <ResetIcon size={16} />
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-3 dark:border-slate-800">
            {isAuthLoading ? (
              <span
                aria-label="Checking sign-in status"
                className="h-8 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"
              />
            ) : authUser ? (
              <>
                <span className="hidden max-w-40 truncate text-xs text-slate-700 dark:text-slate-300 sm:block">
                  {typeof authUser.user_metadata.full_name === "string"
                    ? authUser.user_metadata.full_name
                    : authUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-60 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      {authError && (
        <p role="alert" className="bg-red-950 px-4 py-2 text-center text-xs text-red-200">
          {authError}
        </p>
      )}
    </header>
  );
}
