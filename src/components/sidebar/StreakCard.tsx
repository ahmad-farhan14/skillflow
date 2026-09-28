"use client";

import React, { useMemo } from "react";
import { useSkillFlow } from "../../context/SkillFlowContext";
import { FlameIcon, AwardIcon, SparklesIcon, CheckIcon } from "../icons";

const MOTIVATION_QUOTES = [
  "Small daily habits compound into massive technical mastery.",
  "You don't have to be great to start, but you have to start to be great.",
  "Consistency beats intensity every single time.",
  "Every line of code and design iteration gets you closer to senior level.",
  "Tutorial hell ends where deliberate project practice begins.",
];

export function StreakCard() {
  const { userProfile, triggerCelebration } = useSkillFlow();

  // Generate 7-day activity sequence for visual dots
  const weekDays = useMemo(() => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      const isToday = i === 0;
      const isCompleted = Boolean(userProfile.weekly_activity?.[iso]);
      days.push({
        date: iso,
        name: dayNames[d.getDay()],
        isToday,
        isCompleted,
      });
    }
    return days;
  }, [userProfile.weekly_activity]);

  // Pick a quote based on current streak
  const quote = MOTIVATION_QUOTES[userProfile.current_streak % MOTIVATION_QUOTES.length];

  return (
    <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-linear-to-br from-amber-50/70 via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 p-5 shadow-sm transition-all">
      {/* Top Row: Flame Icon + Streak Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-xs">
            <FlameIcon size={24} className="animate-flame text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {userProfile.current_streak}
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Days</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Learning Streak
            </p>
          </div>
        </div>

        <button
          onClick={triggerCelebration}
          title="Celebrate streak"
          className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition-colors"
        >
          <AwardIcon size={18} />
        </button>
      </div>

      {/* 7-Day Dot Matrix */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-medium">
          <span>Weekly Activity</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">Active This Week</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1">
              <div
                title={`${day.date} — ${day.isCompleted ? "Active" : "Missed"}`}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                  day.isCompleted
                    ? "bg-amber-500 text-white shadow-xs"
                    : day.isToday
                    ? "border-2 border-dashed border-amber-400 text-amber-600 dark:text-amber-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {day.isCompleted ? <CheckIcon size={14} /> : day.name.slice(0, 1)}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{day.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="pt-3 border-t border-amber-200/60 dark:border-amber-900/40 flex items-start gap-2">
        <SparklesIcon size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-snug">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
