"use client";

import React from "react";
import { useSkillFlow } from "../../context/SkillFlowContext";
import { ExternalLinkIcon, BookOpenIcon } from "../icons";

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  tag: string;
}

const DEV_RESOURCES: ResourceItem[] = [
  {
    title: "MDN Web Docs",
    description: "The definitive reference manual for HTML, CSS, and modern JavaScript APIs.",
    url: "https://developer.mozilla.org/",
    tag: "Reference",
  },
  {
    title: "Can I Use",
    description: "Up-to-date browser feature support tables for modern CSS and JS capabilities.",
    url: "https://caniuse.com/",
    tag: "Compatibility",
  },
  {
    title: "Bundlephobia",
    description: "Inspect the bundle cost and tree-shaking impact of any npm package.",
    url: "https://bundlephobia.com/",
    tag: "Performance",
  },
  {
    title: "Next.js App Router Docs",
    description: "Official guides on Server Components, streaming, and Server Actions.",
    url: "https://nextjs.org/docs",
    tag: "Framework",
  },
];

const DESIGN_RESOURCES: ResourceItem[] = [
  {
    title: "Nielsen Norman Group",
    description: "Evidence-based user experience research, UX reports, and heuristic guides.",
    url: "https://www.nngroup.com/",
    tag: "UX Research",
  },
  {
    title: "Laws of UX",
    description: "Collection of best practice psychology heuristics designers use when building UI.",
    url: "https://lawsofux.com/",
    tag: "Heuristics",
  },
  {
    title: "Type Scale Calculator",
    description: "Generate modular typographic scales with harmonious mathematical ratios.",
    url: "https://type-scale.com/",
    tag: "Typography",
  },
  {
    title: "Material Design 3",
    description: "Google's open-source design system with token structures and dynamic color.",
    url: "https://m3.material.io/",
    tag: "Design System",
  },
];

export function ResourcesCard() {
  const { activeRoadmap } = useSkillFlow();
  const resources = activeRoadmap.category === "Development" ? DEV_RESOURCES : DESIGN_RESOURCES;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <BookOpenIcon size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Curated Cheatsheets
          </h3>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            For {activeRoadmap.category} Learners
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-white/10">
        {resources.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-3 first:pt-1 last:pb-1"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[9px] uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {item.tag}
                </span>
                <ExternalLinkIcon size={12} className="text-slate-400 group-hover:text-blue-500" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
