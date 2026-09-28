"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSkillFlow } from "../../context/SkillFlowContext";
import {
  FileTextIcon,
  CopyIcon,
  CheckIcon,
  TrashIcon,
} from "../icons";

export function QuickNotesCard() {
  const {
    activeRoadmap,
    activeNoteContent,
    selectedModuleIdForNotes,
    setSelectedModuleIdForNotes,
    saveCurrentNote,
  } = useSkillFlow();

  const [text, setText] = useState(activeNoteContent);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "dirty">("saved");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync internal state when activeNoteContent changes (e.g. switched roadmap or module)
  useEffect(() => {
    setText(activeNoteContent);
    setSaveStatus("saved");
  }, [activeNoteContent, selectedModuleIdForNotes, activeRoadmap.id]);

  // Debounced auto-save (500ms)
  useEffect(() => {
    if (text === activeNoteContent) return;

    setSaveStatus("saving");
    const timer = setTimeout(() => {
      saveCurrentNote(text);
      setSaveStatus("saved");
    }, 600);

    return () => clearTimeout(timer);
  }, [text, activeNoteContent, saveCurrentNote]);

  // Formatting helpers
  const insertFormatting = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const nextVal = text.substring(0, start) + replacement + text.substring(end);
    setText(nextVal);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 50);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    if (confirm("Clear current scratchpad notes?")) {
      setText("");
      saveCurrentNote("");
    }
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeRoadmap.slug}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedModule = activeRoadmap.modules.find((m) => m.id === selectedModuleIdForNotes);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <FileTextIcon size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              Quick Notes
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {saveStatus === "saving" ? (
                <span className="text-amber-500 font-medium">Saving...</span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Auto-saved</span>
              )}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy notes to clipboard"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? <CheckIcon size={15} className="text-emerald-500" /> : <CopyIcon size={15} />}
          </button>
          <button
            type="button"
            onClick={handleClear}
            title="Clear notes"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <TrashIcon size={15} />
          </button>
        </div>
      </div>

      {/* Scope Selector (General Roadmap vs Specific Module) */}
      <div className="mb-2">
        <select
          value={selectedModuleIdForNotes || ""}
          onChange={(e) => setSelectedModuleIdForNotes(e.target.value || null)}
          className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">General {activeRoadmap.title} Notes</option>
          {activeRoadmap.modules.map((m) => (
            <option key={m.id} value={m.id}>
              Module {m.order_index}: {m.title}
            </option>
          ))}
        </select>
        {selectedModule && (
          <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-medium truncate">
            Scoping notes to: {selectedModule.title}
          </div>
        )}
      </div>

      {/* Markdown Quick Toolbar */}
      <div className="flex items-center gap-1 mb-2 py-1 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
        <button
          type="button"
          onClick={() => insertFormatting("**", "**")}
          title="Bold"
          className="px-2 py-0.5 rounded font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("*", "*")}
          title="Italic"
          className="px-2 py-0.5 rounded italic font-serif hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("\n- ")}
          title="Bullet list"
          className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("`", "`")}
          title="Inline code"
          className="px-2 py-0.5 rounded font-mono text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          &lt;/&gt;
        </button>
        <button
          type="button"
          onClick={() => insertFormatting("[", "](https://)")}
          title="Link"
          className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Link
        </button>
      </div>

      {/* Scratchpad Textarea */}
      <div className="relative flex-1 min-h-40">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Jot down notes, code snippets, key takeaways, and bookmark links here..."
          className="w-full h-40 text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono leading-relaxed"
        />
      </div>

      {/* Export footer */}
      <div className="mt-2 pt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>Markdown supported</span>
        <button
          type="button"
          onClick={handleExportMarkdown}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Export .md file
        </button>
      </div>
    </div>
  );
}
