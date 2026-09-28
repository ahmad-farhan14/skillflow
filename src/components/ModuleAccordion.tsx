"use client";

import React, { useState } from "react";
import { Module } from "../types";
import { TopicItem } from "./TopicItem";
import { useSkillFlow } from "../context/SkillFlowContext";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  PlusIcon,
  FileTextIcon,
  XIcon,
} from "./icons";

interface ModuleAccordionProps {
  module: Module;
  defaultExpanded?: boolean;
}

export function ModuleAccordion({ module, defaultExpanded = true }: ModuleAccordionProps) {
  const {
    filterStatus,
    searchQuery,
    nextUpTopic,
    addCustomTopic,
    setSelectedModuleIdForNotes,
    selectedModuleIdForNotes,
  } = useSkillFlow();

  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newResource, setNewResource] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

  // Calculate module-level statistics
  const totalTopics = module.topics.length;
  const completedTopics = module.topics.filter((t) => t.is_completed).length;
  const isModuleComplete = totalTopics > 0 && completedTopics === totalTopics;
  const modulePercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Filter topics based on search query and status filter
  const filteredTopics = module.topics.filter((t) => {
    // Filter by status
    if (filterStatus === "completed" && !t.is_completed) return false;
    if (filterStatus === "remaining" && t.is_completed) return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesDesc = t.description?.toLowerCase().includes(q) || false;
      const matchesResource = t.resource_label?.toLowerCase().includes(q) || false;
      return matchesTitle || matchesDesc || matchesResource;
    }

    return true;
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addCustomTopic(module.id, newTitle, newResource, newDifficulty);
    setNewTitle("");
    setNewResource("");
    setIsAddingTopic(false);
  };

  // If search query is active and this module has no matching topics, hide it
  if (searchQuery.trim() && filteredTopics.length === 0) {
    return null;
  }

  const isModuleSelectedForNotes = selectedModuleIdForNotes === module.id;

  return (
    <div
      id={`module-${module.id}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isModuleComplete
          ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      }`}
    >
      {/* Module Header / Accordion Trigger */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors select-none"
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Module Index Pill */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
              isModuleComplete
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40"
            }`}
          >
            {isModuleComplete ? <CheckCircleIcon size={18} /> : String(module.order_index).padStart(2, "0")}
          </div>

          {/* Module Titles */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                {module.title}
              </h3>
              {isModuleComplete ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                  Completed
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {completedTopics} / {totalTopics} completed
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {module.description}
            </p>
          </div>
        </div>

        {/* Right side stats & toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          {/* Mini progress bar */}
          <div className="w-28 sm:w-32 flex flex-col items-end gap-1">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {modulePercentage}%
            </span>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isModuleComplete ? "bg-emerald-500" : "bg-blue-600"
                }`}
                style={{ width: `${modulePercentage}%` }}
              />
            </div>
          </div>

          {/* Context note button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedModuleIdForNotes(isModuleSelectedForNotes ? null : module.id);
            }}
            title={isModuleSelectedForNotes ? "Clear module note filter" : "Take notes for this module"}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              isModuleSelectedForNotes
                ? "bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200"
                : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <FileTextIcon size={16} />
          </button>

          {/* Expand / Collapse Chevron */}
          <div
            className={`text-slate-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <ChevronDownIcon size={20} />
          </div>
        </div>
      </div>

      {/* Accordion Content / Topic List */}
      {isExpanded && (
        <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-1 space-y-3">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                isNextUp={nextUpTopic?.id === topic.id}
              />
            ))
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              No milestones match the current filter or search.
            </div>
          )}

          {/* Add Custom Milestone Form / Button */}
          {isAddingTopic ? (
            <form
              onSubmit={handleCreateTopic}
              className="mt-4 p-4 rounded-xl border border-blue-200 dark:border-blue-800/70 bg-blue-50/30 dark:bg-blue-950/20 space-y-3 animate-in fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Add Custom Milestone to {module.title}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingTopic(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <XIcon size={16} />
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Milestone title (e.g. Build interactive CSS dropdown menu)..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  placeholder="Optional reference URL (https://...)"
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as "Beginner" | "Intermediate" | "Advanced")}
                  className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingTopic(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingTopic(true)}
              className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <PlusIcon size={14} />
              <span>Add Custom Milestone to this Module</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
