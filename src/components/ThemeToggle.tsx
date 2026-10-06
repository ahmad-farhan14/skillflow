"use client";

import { useSkillFlow } from "../context/SkillFlowContext";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useSkillFlow();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
      className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-[#1E1E1F] dark:text-slate-300 dark:hover:bg-white/10"
    >
      {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
