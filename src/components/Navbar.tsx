"use client";

import React, { useState } from "react";
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
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => switchRoadmap("frontend-web-developer")}>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <SparklesIcon size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  SkillFlow
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 transition-all shadow-sm"
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
            className="relative"
            onMouseEnter={() => setShowStreakTooltip(true)}
            onMouseLeave={() => setShowStreakTooltip(false)}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm cursor-pointer hover:bg-amber-100/80 dark:hover:bg-amber-900/40 transition-colors">
              <FlameIcon size={18} className="text-amber-500 animate-flame" />
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 tabular-nums">
                {userProfile.current_streak} Days Streak
              </span>
            </div>

            {/* Streak Hover Popover */}
            {showStreakTooltip && (
              <div className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 rounded-xl shadow-xl z-50 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1.5">
                  <span className="flex items-center gap-1">
                    <FlameIcon size={16} className="text-amber-500" />
                    Consistent Learner
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                    {userProfile.current_streak}d
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Complete at least one milestone every 24 hours to keep your flame burning bright!
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Last active:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {userProfile.last_active_date || "Today"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
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

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
            <img
              src={userProfile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"}
              alt={userProfile.full_name}
              className="w-9 h-9 rounded-full ring-2 ring-blue-500/30 object-cover"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {userProfile.full_name}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Active Learner
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
