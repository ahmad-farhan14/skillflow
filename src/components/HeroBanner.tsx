"use client";

import React from "react";
import { useSkillFlow } from "../context/SkillFlowContext";
import {
  CodeIcon,
  PaletteIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "./icons";

interface HeroBannerProps {
  onContinueNext: () => void;
}

export function HeroBanner({ onContinueNext }: HeroBannerProps) {
  const { activeRoadmap, stats, nextUpTopic, triggerCelebration } = useSkillFlow();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
              {activeRoadmap.category === "Development" ? (
                <CodeIcon size={14} />
              ) : (
                <PaletteIcon size={14} />
              )}
              {activeRoadmap.category}
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              {activeRoadmap.level}
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {activeRoadmap.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            {activeRoadmap.description}
          </p>
        </div>

        {nextUpTopic ? (
          <button
            onClick={onContinueNext}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <span>Continue learning</span>
            <ArrowRightIcon
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        ) : (
          <button
            onClick={triggerCelebration}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <SparklesIcon size={16} />
            <span>Celebrate completion</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <CheckCircleIcon size={16} className="text-slate-500 dark:text-slate-400" />
          <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
            {stats.completedTopics}/{stats.totalTopics}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">milestones</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon size={16} className="text-slate-500 dark:text-slate-400" />
          <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
            {Math.max(0, stats.estimatedHours - stats.completedHours)}h
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">remaining</span>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon size={16} className="text-slate-500 dark:text-slate-400" />
          <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
            {stats.completedModules}/{stats.totalModules}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">modules</span>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Roadmap progress</span>
          <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
            {stats.completionPercentage}% completed
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
          role="progressbar"
          aria-label="Roadmap progress"
          aria-valuenow={stats.completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-[width] duration-500"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
