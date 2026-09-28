"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import { Roadmap, UserProfile, Note, RoadmapStats, Topic, Module } from "../types";
import { initialRoadmaps, initialUserProfile, initialNotes } from "../data/seedData";

interface SkillFlowContextType {
  roadmaps: Roadmap[];
  activeRoadmapSlug: string;
  activeRoadmap: Roadmap;
  userProfile: UserProfile;
  activeNoteContent: string;
  selectedModuleIdForNotes: string | null;
  setSelectedModuleIdForNotes: (id: string | null) => void;
  stats: RoadmapStats;
  nextUpTopic: Topic | null;
  filterStatus: "all" | "completed" | "remaining";
  setFilterStatus: (filter: "all" | "completed" | "remaining") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleTopicCompletion: (topicId: string) => void;
  addCustomTopic: (moduleId: string, title: string, resourceUrl?: string, difficulty?: "Beginner" | "Intermediate" | "Advanced") => void;
  saveCurrentNote: (content: string) => void;
  switchRoadmap: (slug: string) => void;
  triggerCelebration: () => void;
  resetToDefaultSeed: () => void;
  isHydrated: boolean;
}

const SkillFlowContext = createContext<SkillFlowContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROADMAPS: "skillflow_roadmaps_v1",
  PROFILE: "skillflow_profile_v1",
  NOTES: "skillflow_notes_v1",
  ACTIVE_SLUG: "skillflow_active_slug_v1",
  THEME: "skillflow_theme_v1",
};

// Clean synthesized pleasant audio chime using Web Audio API
function playChime(success100 = false) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (success100) {
      // Fanfare chord: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } else {
      // Crisp satisfying soft double chime
      const freqs = [659.25, 880]; // E5 -> A5
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    }
  } catch {
    // Graceful fallback if AudioContext is blocked
  }
}

export function SkillFlowProvider({ children }: { children: React.ReactNode }) {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(initialRoadmaps);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeRoadmapSlug, setActiveRoadmapSlug] = useState<string>("frontend-web-developer");
  const [selectedModuleIdForNotes, setSelectedModuleIdForNotes] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "remaining">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedRoadmaps = localStorage.getItem(STORAGE_KEYS.ROADMAPS);
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const savedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
      const savedSlug = localStorage.getItem(STORAGE_KEYS.ACTIVE_SLUG);
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

      if (savedRoadmaps) setRoadmaps(JSON.parse(savedRoadmaps));
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      if (savedSlug) setActiveRoadmapSlug(savedSlug);
      
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
      setIsDarkMode(initialDark);
      if (initialDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Failed to load SkillFlow state from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync roadmaps changes to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(roadmaps));
    }
  }, [roadmaps, isHydrated]);

  // Sync profile changes to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    }
  }, [userProfile, isHydrated]);

  // Sync notes changes to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    }
  }, [notes, isHydrated]);

  // Sync active slug to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SLUG, activeRoadmapSlug);
    }
  }, [activeRoadmapSlug, isHydrated]);

  // Toggle Dark Mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem(STORAGE_KEYS.THEME, "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(STORAGE_KEYS.THEME, "light");
      }
      return next;
    });
  }, []);

  // Compute active roadmap
  const activeRoadmap = useMemo(() => {
    const found = roadmaps.find((r: Roadmap) => r.slug === activeRoadmapSlug);
    return found || roadmaps[0];
  }, [roadmaps, activeRoadmapSlug]);

  // Compute progress stats for current active roadmap
  const stats: RoadmapStats = useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    const totalModules = activeRoadmap.modules.length;
    let completedModules = 0;

    activeRoadmap.modules.forEach((mod: Module) => {
      let modAllDone = mod.topics.length > 0;
      mod.topics.forEach((top: Topic) => {
        totalTopics += 1;
        if (top.is_completed) {
          completedTopics += 1;
        } else {
          modAllDone = false;
        }
      });
      if (modAllDone) completedModules += 1;
    });

    const completionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const estimatedHours = activeRoadmap.estimated_hours;
    const completedHours = Math.round((completionPercentage / 100) * estimatedHours);

    return {
      totalTopics,
      completedTopics,
      completionPercentage,
      estimatedHours,
      completedHours,
      totalModules,
      completedModules,
    };
  }, [activeRoadmap]);

  // First uncompleted topic (for "Continue Next" quick action)
  const nextUpTopic = useMemo(() => {
    for (const mod of activeRoadmap.modules) {
      for (const top of mod.topics) {
        if (!top.is_completed) {
          return top;
        }
      }
    }
    return null;
  }, [activeRoadmap]);

  // Trigger confetti celebration
  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#F59E0B", "#10B981", "#6366F1", "#EC4899"],
    });
  }, []);

  // Toggle Topic completion
  const toggleTopicCompletion = useCallback(
    (topicId: string) => {
      let isNowCompleted = false;

      setRoadmaps((prevRoadmaps: Roadmap[]) =>
        prevRoadmaps.map((r: Roadmap) => {
          if (r.id !== activeRoadmap.id) return r;
          return {
            ...r,
            modules: r.modules.map((m: Module) => ({
              ...m,
              topics: m.topics.map((t: Topic) => {
                if (t.id === topicId) {
                  isNowCompleted = !t.is_completed;
                  return {
                    ...t,
                    is_completed: isNowCompleted,
                    completed_at: isNowCompleted ? new Date().toISOString() : null,
                  };
                }
                return t;
              }),
            })),
          };
        })
      );

      // Play chime audio
      if (isNowCompleted) {
        playChime(false);
      }

      // Update streak and activity
      const today = new Date().toISOString().split("T")[0];
      setUserProfile((prevProfile: UserProfile) => {
        const lastActive = prevProfile.last_active_date;
        const isToday = lastActive === today;
        const newStreak = isToday ? prevProfile.current_streak : prevProfile.current_streak + 1;
        const weekly = { ...prevProfile.weekly_activity, [today]: true };

        return {
          ...prevProfile,
          current_streak: newStreak,
          last_active_date: today,
          weekly_activity: weekly,
        };
      });

      // If user reached a new full milestone or 100% completion, trigger extra celebration
      if (isNowCompleted && stats.completedTopics + 1 === stats.totalTopics) {
        setTimeout(() => {
          playChime(true);
          triggerCelebration();
        }, 200);
      }
    },
    [activeRoadmap.id, stats, triggerCelebration]
  );

  // Add custom topic inline
  const addCustomTopic = useCallback(
    (moduleId: string, title: string, resourceUrl?: string, difficulty: "Beginner" | "Intermediate" | "Advanced" = "Beginner") => {
      if (!title.trim()) return;

      const newTopic: Topic = {
        id: `custom-topic-${Date.now()}`,
        module_id: moduleId,
        title: title.trim(),
        resource_url: resourceUrl?.trim() || undefined,
        resource_label: resourceUrl ? "Custom Reference" : undefined,
        order_index: 999,
        estimated_minutes: 30,
        difficulty,
        is_completed: false,
      };

      setRoadmaps((prevRoadmaps: Roadmap[]) =>
        prevRoadmaps.map((r: Roadmap) => {
          if (r.id !== activeRoadmap.id) return r;
          return {
            ...r,
            modules: r.modules.map((m: Module) => {
              if (m.id !== moduleId) return m;
              return {
                ...m,
                topics: [...m.topics, newTopic],
              };
            }),
          };
        })
      );
    },
    [activeRoadmap.id]
  );

  // Get active note content (either for selected module or for the active roadmap)
  const activeNoteContent = useMemo(() => {
    const existing = notes.find(
      (n: Note) =>
        n.roadmap_id === activeRoadmap.id &&
        (selectedModuleIdForNotes ? n.module_id === selectedModuleIdForNotes : n.module_id === null || !n.module_id)
    );
    return existing ? existing.content : "";
  }, [notes, activeRoadmap.id, selectedModuleIdForNotes]);

  // Save note content
  const saveCurrentNote = useCallback(
    (content: string) => {
      setNotes((prevNotes: Note[]) => {
        const existingIndex = prevNotes.findIndex(
          (n: Note) =>
            n.roadmap_id === activeRoadmap.id &&
            (selectedModuleIdForNotes ? n.module_id === selectedModuleIdForNotes : n.module_id === null || !n.module_id)
        );

        if (existingIndex >= 0) {
          const updated = [...prevNotes];
          updated[existingIndex] = {
            ...updated[existingIndex],
            content,
            updated_at: new Date().toISOString(),
          };
          return updated;
        } else {
          const newNote: Note = {
            id: `note-${Date.now()}`,
            user_id: userProfile.id,
            roadmap_id: activeRoadmap.id,
            module_id: selectedModuleIdForNotes,
            content,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          };
          return [newNote, ...prevNotes];
        }
      });
    },
    [activeRoadmap.id, selectedModuleIdForNotes, userProfile.id]
  );

  // Switch roadmap
  const switchRoadmap = useCallback((slug: string) => {
    setActiveRoadmapSlug(slug);
    setSelectedModuleIdForNotes(null);
  }, []);

  // Reset to default seed
  const resetToDefaultSeed = useCallback(() => {
    if (confirm("Reset SkillFlow data back to default roadmap presets & progress?")) {
      setRoadmaps(initialRoadmaps);
      setUserProfile(initialUserProfile);
      setNotes(initialNotes);
      localStorage.removeItem(STORAGE_KEYS.ROADMAPS);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      triggerCelebration();
    }
  }, [triggerCelebration]);

  const value = {
    roadmaps,
    activeRoadmapSlug,
    activeRoadmap,
    userProfile,
    activeNoteContent,
    selectedModuleIdForNotes,
    setSelectedModuleIdForNotes,
    stats,
    nextUpTopic,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleDarkMode,
    toggleTopicCompletion,
    addCustomTopic,
    saveCurrentNote,
    switchRoadmap,
    triggerCelebration,
    resetToDefaultSeed,
    isHydrated,
  };

  return <SkillFlowContext.Provider value={value}>{children}</SkillFlowContext.Provider>;
}

export function useSkillFlow() {
  const context = useContext(SkillFlowContext);
  if (!context) {
    throw new Error("useSkillFlow must be used within a SkillFlowProvider");
  }
  return context;
}
