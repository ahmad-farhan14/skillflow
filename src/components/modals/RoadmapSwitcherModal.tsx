"use client";

import React from "react";
import { useSkillFlow } from "../../context/SkillFlowContext";
import { Roadmap, Module, Topic } from "../../types";
import {
  XIcon,
  CodeIcon,
  PaletteIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "../icons";

interface RoadmapSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapSwitcherModal({ isOpen, onClose }: RoadmapSwitcherModalProps) {
  const { roadmaps, activeRoadmapSlug, switchRoadmap } = useSkillFlow();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 overflow-hidden animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <XIcon size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <SparklesIcon size={14} /> Available Tracks
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Choose Your Learning Journey
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Switch between curated tracks or explore new technical horizons. Your progress in each roadmap is automatically saved.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {roadmaps.map((r: Roadmap) => {
            const isActive = r.slug === activeRoadmapSlug;

            // Calculate progress for this roadmap
            let total = 0;
            let completed = 0;
            r.modules.forEach((m: Module) => {
              m.topics.forEach((t: Topic) => {
                total += 1;
                if (t.is_completed) completed += 1;
              });
            });
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div
                key={r.id}
                onClick={() => {
                  switchRoadmap(r.slug);
                  onClose();
                }}
                className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20 shadow-md"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 hover:shadow-md"
                }`}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide">
                    Active
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        r.category === "Development"
                          ? "bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400"
                          : "bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      {r.category === "Development" ? <CodeIcon size={22} /> : <PaletteIcon size={22} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {r.category} • {r.level}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {r.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <ClockIcon size={12} /> {r.estimated_hours}h estimated
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {percent}% completed
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percent === 100
                          ? "bg-emerald-500"
                          : "bg-linear-to-r from-blue-600 to-indigo-600"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white"
                    }`}
                  >
                    <span>{isActive ? "Currently Learning" : "Switch to this Track"}</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
