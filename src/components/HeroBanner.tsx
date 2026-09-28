"use client";

import React from "react";
import { useSkillFlow } from "../context/SkillFlowContext";
import {
  CodeIcon,
  PaletteIcon,
  CheckCircleIcon,
  ClockIcon,
  FlameIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "./icons";

interface HeroBannerProps {
  onContinueNext: () => void;
}

export function HeroBanner({ onContinueNext }: HeroBannerProps) {
  const { activeRoadmap, stats, nextUpTopic, triggerCelebration } = useSkillFlow();

  // Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.completionPercentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-linear-to-br from-white via-slate-50 to-blue-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 p-6 sm:p-8 shadow-sm transition-all">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Column: Roadmap Title, Tags & Description */}
        <div className="flex-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
              {activeRoadmap.category === "Development" ? <CodeIcon size={14} /> : <PaletteIcon size={14} />}
              {activeRoadmap.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {activeRoadmap.level}
            </span>
            {stats.completionPercentage === 100 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                <SparklesIcon size={12} /> Roadmap Mastered!
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {activeRoadmap.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {activeRoadmap.description}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            {nextUpTopic ? (
              <button
                onClick={onContinueNext}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Continue Next Milestone</span>
                <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={triggerCelebration}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 transition-all"
              >
                <SparklesIcon size={16} />
                <span>Celebrate 100% Completion!</span>
              </button>
            )}

            {nextUpTopic && (
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                Up next: <span className="font-semibold text-slate-800 dark:text-slate-200">{nextUpTopic.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Radial & Detailed Progress Card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/60 p-5 rounded-2xl shadow-sm">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-100 dark:text-slate-700"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke={stats.completionPercentage === 100 ? "#10B981" : "#2563EB"}
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {stats.completionPercentage}%
              </span>
              <span className="text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-400">
                Complete
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CheckCircleIcon size={18} />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {stats.completedTopics} / {stats.totalTopics}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Milestones</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
                <ClockIcon size={18} />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  ~{stats.estimatedHours - stats.completedHours}h
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hours Left</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <SparklesIcon size={18} />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {stats.completedModules} / {stats.totalModules}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Modules Done</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FlameIcon size={18} />
              </div>
              <div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  5 Days
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Daily Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Linear Progress Bar */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
          <span>Overall Roadmap Progress</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {stats.completedTopics} of {stats.totalTopics} milestones completed ({stats.completionPercentage}%)
          </span>
        </div>
        <div className="relative w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out relative ${
              stats.completionPercentage === 100
                ? "bg-linear-to-r from-emerald-500 to-teal-400"
                : "bg-linear-to-r from-blue-600 via-indigo-600 to-amber-500"
            }`}
            style={{ width: `${stats.completionPercentage}%` }}
          >
            <div className="shimmer-bar absolute inset-0 opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
