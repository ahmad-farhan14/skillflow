"use client";

import React, { useState } from "react";
import { Topic } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import {
  CheckIcon,
  ExternalLinkIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
} from "./icons";

interface TopicItemProps {
  topic: Topic;
  isNextUp?: boolean;
}

export function TopicItem({ topic, isNextUp = false }: TopicItemProps) {
  const { toggleTopicCompletion } = useSkillFlow();
  const [showTakeaways, setShowTakeaways] = useState(false);

  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case "Advanced":
        return "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Intermediate":
        return "bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Beginner":
      default:
        return "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    }
  };

  return (
    <div
      id={`topic-${topic.id}`}
      className={`group relative rounded-xl border p-3.5 sm:p-4 transition-all duration-200 ${
        topic.is_completed
          ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400"
          : isNextUp
          ? "bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700/80 shadow-sm ring-1 ring-blue-500/20"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
      }`}
    >
      {/* "Next Up" Ribbon Indicator */}
      {isNextUp && !topic.is_completed && (
        <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wide uppercase shadow-xs flex items-center gap-1">
          <SparklesIcon size={10} /> Next Up
        </div>
      )}

      <div className="flex items-start gap-3.5">
        {/* Interactive Custom Checkbox */}
        <button
          type="button"
          onClick={() => toggleTopicCompletion(topic.id)}
          aria-label={`Mark ${topic.title} as ${topic.is_completed ? "incomplete" : "completed"}`}
          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
            topic.is_completed
              ? "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
              : "border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-slate-800"
          }`}
        >
          {topic.is_completed && <CheckIcon size={15} className="animate-in zoom-in-75" />}
        </button>

        {/* Topic Content & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`text-sm sm:text-base font-semibold cursor-pointer transition-colors ${
                topic.is_completed
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {topic.title}
            </span>

            {/* Badges */}
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                topic.difficulty
              )}`}
            >
              {topic.difficulty || "Beginner"}
            </span>

            {topic.estimated_minutes && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <ClockIcon size={12} /> {topic.estimated_minutes}m
              </span>
            )}
          </div>

          {topic.description && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
              {topic.description}
            </p>
          )}

          {/* Links & Takeaways Accordion */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            {topic.resource_url && (
              <a
                href={topic.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>{topic.resource_label || "Study Resource"}</span>
                <ExternalLinkIcon size={12} />
              </a>
            )}

            {topic.key_takeaways && topic.key_takeaways.length > 0 && (
              <button
                type="button"
                onClick={() => setShowTakeaways(!showTakeaways)}
                className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
              >
                <span>Key takeaways ({topic.key_takeaways.length})</span>
                {showTakeaways ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
              </button>
            )}

            {topic.completed_at && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-auto">
                Completed {new Date(topic.completed_at).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Expandable Key Takeaways Box */}
          {showTakeaways && topic.key_takeaways && (
            <div className="mt-3 p-3 rounded-lg bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in">
              <div className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1">
                <SparklesIcon size={14} className="text-amber-500" /> Core Concepts:
              </div>
              <ul className="list-disc list-inside space-y-1">
                {topic.key_takeaways.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
