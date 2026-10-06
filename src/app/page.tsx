"use client";

import React, { useState } from "react";
import { useSkillFlow } from "../context/SkillFlowContext";
import { Navbar } from "../components/Navbar";
import { HeroBanner } from "../components/HeroBanner";
import { ModuleAccordion } from "../components/ModuleAccordion";
import { QuickNotesCard } from "../components/sidebar/QuickNotesCard";
import { ResourcesCard } from "../components/sidebar/ResourcesCard";
import { RoadmapSwitcherModal } from "../components/modals/RoadmapSwitcherModal";
import {
  SearchIcon,
  LayersIcon,
  SparklesIcon,
  XIcon,
} from "../components/icons";

export default function HomePage() {
  const {
    activeRoadmap,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    nextUpTopic,
    stats,
    isHydrated,
  } = useSkillFlow();

  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  // Jump to next up topic
  const handleContinueNext = () => {
    if (!nextUpTopic) return;
    const el = document.getElementById(`topic-${nextUpTopic.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-blue-500", "scale-[1.01]");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-blue-500", "scale-[1.01]");
      }, 1500);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 animate-pulse flex items-center justify-center text-white">
            <SparklesIcon size={20} />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Loading SkillFlow...
          </span>
        </div>
      </div>
    );
  }

  const remainingCount = stats.totalTopics - stats.completedTopics;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenRoadmapModal={() => setIsRoadmapModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero Overview Banner */}
        <HeroBanner onContinueNext={handleContinueNext} />

        {/* Search, Filter & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-y border-slate-200 py-3 dark:border-white/10">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-2 border-b-2 transition-colors ${
                filterStatus === "all"
                  ? "border-blue-500 text-slate-950 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              All Milestones <span className="ml-1 font-mono">{stats.totalTopics}</span>
            </button>
            <button
              onClick={() => setFilterStatus("remaining")}
              className={`px-3 py-2 border-b-2 transition-colors ${
                filterStatus === "remaining"
                  ? "border-blue-500 text-slate-950 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              To Do <span className="ml-1 font-mono">{remainingCount}</span>
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-3 py-2 border-b-2 transition-colors ${
                filterStatus === "completed"
                  ? "border-blue-500 text-slate-950 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Completed <span className="ml-1 font-mono">{stats.completedTopics}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <SearchIcon size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, concepts, resources..."
              className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <XIcon size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Split View Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Column: Modules & Milestones Timeline */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <LayersIcon size={18} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Roadmap Modules{" "}
                  <span className="font-mono text-sm font-normal text-slate-500 dark:text-slate-400">
                    {activeRoadmap.modules.length}
                  </span>
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click module header to toggle
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              {activeRoadmap.modules.map((module, idx) => (
                <ModuleAccordion
                  key={module.id}
                  module={module}
                  defaultExpanded={idx === 0 || idx === 1}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Learning Companion Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Contextual Quick Notes Card */}
            <QuickNotesCard />

            {/* Curated Cheatsheets Card */}
            <ResourcesCard />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">SkillFlow</span>
            <span>— Master Technical Skills with Curated Roadmaps</span>
          </div>
          <div>
            Built with Next.js App Router, Tailwind CSS & TypeScript.
          </div>
        </div>
      </footer>

      {/* Roadmap Switcher Modal */}
      <RoadmapSwitcherModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
      />
    </div>
  );
}
