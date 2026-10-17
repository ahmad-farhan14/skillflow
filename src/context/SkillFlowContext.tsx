"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import confetti from "canvas-confetti";
import {
  Roadmap,
  UserProfile,
  Note,
  RoadmapStats,
  Topic,
  Module,
  RoadmapExamProgress,
} from "../types";
import {
  initialRoadmaps,
  initialUserProfile,
  initialNotes,
} from "../data/seedData";
import { createClient } from "../utils/supabase/client";
import { isSupabaseConfigured } from "../utils/supabase/config";

interface SkillFlowContextType {
  roadmaps: Roadmap[];
  activeRoadmapSlug: string;
  activeRoadmap: Roadmap;
  userProfile: UserProfile;
  activeNoteContent: string;
  selectedModuleIdForNotes: string | null;
  setSelectedModuleIdForNotes: (id: string | null) => void;
  stats: RoadmapStats;
  roadmapExamProgress: RoadmapExamProgress | null;
  nextUpTopic: Topic | null;
  filterStatus: "all" | "completed" | "remaining";
  setFilterStatus: (filter: "all" | "completed" | "remaining") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleTopicCompletion: (
    topicId: string,
    proofResponse?: string,
    proofScore?: number,
  ) => Promise<void>;
  submitFinalExam: (score: number) => Promise<void>;
  addCustomTopic: (
    moduleId: string,
    title: string,
    resourceUrl?: string,
    difficulty?: "Beginner" | "Intermediate" | "Advanced",
  ) => void;
  saveCurrentNote: (content: string) => void;
  switchRoadmap: (slug: string) => void;
  triggerCelebration: () => void;
  resetToDefaultSeed: () => void;
  isHydrated: boolean;
}

const SkillFlowContext = createContext<SkillFlowContextType | undefined>(
  undefined,
);

const STORAGE_KEYS = {
  ROADMAPS: "skillflow_roadmaps_v1",
  PROFILE: "skillflow_profile_v1",
  NOTES: "skillflow_notes_v1",
  ACTIVE_SLUG: "skillflow_active_slug_v1",
  THEME: "skillflow_theme_v1",
};

const PROGRESS_COLUMN_ALIASES: Record<string, string> = {
  completed: "is_completed",
  is_completed: "completed",
  proof_response: "proof_text",
  proof_text: "proof_response",
  proof_score: "quiz_score",
  quiz_score: "proof_score",
};

function getMissingProgressColumn(error: {
  code?: string;
  message: string;
}): string | null {
  if (
    error.code !== "PGRST204" &&
    error.code !== "42703" &&
    !/schema cache/i.test(error.message)
  ) {
    return null;
  }

  return (
    error.message.match(/Could not find the ['"]([\w]+)['"] column/i)?.[1] ??
    error.message.match(
      /column ["']?[\w.]+\.["']?([\w]+)["']? does not exist/i,
    )?.[1] ??
    error.message.match(/column ["']?([\w]+)["']? of relation/i)?.[1] ??
    null
  );
}

function getProgressSaveErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "Unknown database error.";
}

async function upsertTopicProgress(
  supabase: ReturnType<typeof createClient>,
  payload: Record<string, string | boolean | number | null>,
) {
  const compatiblePayload = { ...payload };

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { error } = await supabase
      .from("topic_learning_progress")
      .upsert(compatiblePayload, { onConflict: "user_id,topic_id" });
    if (!error) return;

    const missingColumn = getMissingProgressColumn(error);
    const alias = missingColumn
      ? PROGRESS_COLUMN_ALIASES[missingColumn]
      : undefined;
    if (
      !missingColumn ||
      !alias ||
      !(missingColumn in compatiblePayload) ||
      alias in compatiblePayload
    ) {
      throw error;
    }

    console.warn(
      `Retrying topic progress save with the "${alias}" column after "${missingColumn}" was not found.`,
    );
    compatiblePayload[alias] = compatiblePayload[missingColumn];
    delete compatiblePayload[missingColumn];
  }

  throw new Error(
    "Unable to save topic progress using the available database columns.",
  );
}

// Clean synthesized pleasant audio chime using Web Audio API
function playChime(success100 = false) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
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
  const [roadmapExamProgressBySlug, setRoadmapExamProgressBySlug] = useState<
    Record<string, RoadmapExamProgress>
  >({});
  const [userProfile, setUserProfile] =
    useState<UserProfile>(initialUserProfile);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeRoadmapSlug, setActiveRoadmapSlug] = useState<string>(
    "frontend-web-developer",
  );
  const [selectedModuleIdForNotes, setSelectedModuleIdForNotes] = useState<
    string | null
  >(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "remaining"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const progressMutationVersion = useRef(0);

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

      const initialDark = savedTheme ? savedTheme === "dark" : true;
      setIsDarkMode(initialDark);
      if (initialDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.style.colorScheme = initialDark
        ? "dark"
        : "light";
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

  useEffect(() => {
    if (!isHydrated || !isSupabaseConfigured()) return;

    let cancelled = false;
    const restoreStartedAtVersion = progressMutationVersion.current;
    const restoreSupabaseProgress = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.error(
            "Failed to verify account for progress sync",
            userError,
          );
          return;
        }
        if (!user) return;

        const { data, error } = await supabase
          .from("topic_learning_progress")
          .select("topic_id, is_completed, completed_at, proof_score")
          .eq("user_id", user.id);
        if (error) {
          console.error("Failed to restore Supabase topic progress", error);
          return;
        }
        if (
          cancelled ||
          restoreStartedAtVersion !== progressMutationVersion.current
        ) {
          return;
        }

        const progressByTopic = new Map(
          data.map((record) => [
            record.topic_id,
            {
              is_completed: record.is_completed,
              completed_at: record.completed_at,
              proof_score: record.proof_score,
            },
          ]),
        );
        setRoadmaps((currentRoadmaps) =>
          currentRoadmaps.map((roadmap) => ({
            ...roadmap,
            modules: roadmap.modules.map((module) => ({
              ...module,
              topics: module.topics.map((topic) => {
                const progress = progressByTopic.get(topic.id);
                return progress
                  ? {
                      ...topic,
                      is_completed: progress.is_completed,
                      completed_at: progress.completed_at,
                      proof_score: progress.proof_score,
                    }
                  : topic;
              }),
            })),
          })),
        );

        const { data: examRecords, error: examError } = await supabase
          .from("roadmap_learning_progress")
          .select("roadmap_slug, final_exam_score, is_completed, completed_at")
          .eq("user_id", user.id);
        if (examError) {
          console.error(
            "Failed to restore Supabase roadmap exam progress",
            examError,
          );
          return;
        }
        if (
          cancelled ||
          restoreStartedAtVersion !== progressMutationVersion.current
        ) {
          return;
        }
        setRoadmapExamProgressBySlug(
          Object.fromEntries(
            examRecords.map((record) => [
              record.roadmap_slug,
              {
                final_exam_score: record.final_exam_score,
                is_completed: record.is_completed,
                completed_at: record.completed_at,
              },
            ]),
          ),
        );
      } catch (error) {
        console.error("Failed to restore Supabase topic progress", error);
      }
    };

    void restoreSupabaseProgress();
    return () => {
      cancelled = true;
    };
  }, [isHydrated]);

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
      document.documentElement.style.colorScheme = next ? "dark" : "light";
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

    const completionPercentage =
      totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const estimatedHours = activeRoadmap.estimated_hours;
    const completedHours = Math.round(
      (completionPercentage / 100) * estimatedHours,
    );

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
  const roadmapExamProgress =
    roadmapExamProgressBySlug[activeRoadmap.slug] ?? null;

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
    async (topicId: string, proofResponse?: string, proofScore?: number) => {
      progressMutationVersion.current += 1;
      const topic = activeRoadmap.modules
        .flatMap((module) => module.topics)
        .find((item) => item.id === topicId);
      if (!topic) {
        throw new Error("This learning topic could not be found.");
      }

      const isNowCompleted = !topic.is_completed;
      const normalizedProof = proofResponse?.trim() ?? "";
      if (isNowCompleted && normalizedProof.length < 20) {
        throw new Error(
          "Write at least 20 characters in your reflection before completing this topic.",
        );
      }
      if (isNowCompleted && normalizedProof.length > 2000) {
        throw new Error("Your reflection must be 2,000 characters or fewer.");
      }
      if (
        isNowCompleted &&
        proofScore !== undefined &&
        (!Number.isInteger(proofScore) || proofScore < 0 || proofScore > 100)
      ) {
        throw new Error("Quiz score must be a whole number from 0 to 100.");
      }

      if (!isSupabaseConfigured()) {
        throw new Error(
          "Supabase is not configured. Set the Supabase URL and publishable key before saving progress.",
        );
      }

      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(`Unable to verify your account: ${userError.message}`);
      }
      if (!user) {
        throw new Error("Sign in to save validated topic progress.");
      }

      const completedAt = isNowCompleted ? new Date().toISOString() : null;
      if (isNowCompleted) {
        try {
          await upsertTopicProgress(supabase, {
            user_id: user.id,
            topic_id: topicId,
            proof_response: normalizedProof,
            proof_score: proofScore ?? null,
            is_completed: true,
            completed_at: completedAt,
          });
        } catch (error) {
          throw new Error(
            `Unable to save your proof of learning: ${getProgressSaveErrorMessage(error)}`,
          );
        }
      } else {
        try {
          await upsertTopicProgress(supabase, {
            user_id: user.id,
            topic_id: topicId,
            proof_response: null,
            proof_score: null,
            is_completed: false,
            completed_at: completedAt,
          });
        } catch (error) {
          throw new Error(
            `Unable to update your topic progress: ${getProgressSaveErrorMessage(error)}`,
          );
        }

        if (roadmapExamProgressBySlug[activeRoadmap.slug]?.is_completed) {
          const { error } = await supabase
            .from("roadmap_learning_progress")
            .upsert(
              {
                user_id: user.id,
                roadmap_slug: activeRoadmap.slug,
                final_exam_score:
                  roadmapExamProgressBySlug[activeRoadmap.slug]
                    .final_exam_score,
                is_completed: false,
                completed_at: null,
              },
              { onConflict: "user_id,roadmap_slug" },
            );
          if (error) {
            throw new Error(
              `Unable to update roadmap completion: ${error.message}`,
            );
          }
          setRoadmapExamProgressBySlug((current) => ({
            ...current,
            [activeRoadmap.slug]: {
              ...current[activeRoadmap.slug],
              is_completed: false,
              completed_at: null,
            },
          }));
        }
      }

      setRoadmaps((prevRoadmaps: Roadmap[]) =>
        prevRoadmaps.map((r: Roadmap) => {
          if (r.id !== activeRoadmap.id) return r;
          return {
            ...r,
            modules: r.modules.map((m: Module) => ({
              ...m,
              topics: m.topics.map((t: Topic) => {
                if (t.id === topicId) {
                  return {
                    ...t,
                    is_completed: isNowCompleted,
                    proof_score: isNowCompleted ? (proofScore ?? null) : null,
                    completed_at: completedAt,
                  };
                }
                return t;
              }),
            })),
          };
        }),
      );

      // Play chime audio
      if (isNowCompleted) {
        playChime(false);

        // Update streak and activity only after Supabase confirms completion.
        const today = new Date().toISOString().split("T")[0];
        setUserProfile((prevProfile: UserProfile) => {
          const isToday = prevProfile.last_active_date === today;
          const weekly = { ...prevProfile.weekly_activity, [today]: true };

          return {
            ...prevProfile,
            current_streak: isToday
              ? prevProfile.current_streak
              : prevProfile.current_streak + 1,
            last_active_date: today,
            weekly_activity: weekly,
          };
        });

        // If user reached a new full milestone or 100% completion, celebrate.
        if (stats.completedTopics + 1 === stats.totalTopics) {
          setTimeout(() => {
            playChime(true);
            triggerCelebration();
          }, 200);
        }
      }
    },
    [activeRoadmap, roadmapExamProgressBySlug, stats, triggerCelebration],
  );

  const submitFinalExam = useCallback(
    async (score: number) => {
      const topics = activeRoadmap.modules.flatMap((module) => module.topics);
      if (topics.length === 0 || topics.some((topic) => !topic.is_completed)) {
        throw new Error(
          "Complete every roadmap topic before taking the final exam.",
        );
      }
      if (!Number.isInteger(score) || score < 0 || score > 100) {
        throw new Error(
          "Final exam score must be a whole number from 0 to 100.",
        );
      }
      if (!isSupabaseConfigured()) {
        throw new Error(
          "Supabase is not configured. Set the Supabase URL and publishable key before saving progress.",
        );
      }

      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(`Unable to verify your account: ${userError.message}`);
      }
      if (!user) {
        throw new Error("Sign in to save your final roadmap exam.");
      }

      const completedAt = new Date().toISOString();
      const { error } = await supabase.from("roadmap_learning_progress").upsert(
        {
          user_id: user.id,
          roadmap_slug: activeRoadmap.slug,
          final_exam_score: score,
          is_completed: true,
          completed_at: completedAt,
        },
        { onConflict: "user_id,roadmap_slug" },
      );
      if (error) {
        throw new Error(
          `Unable to save your final roadmap exam: ${error.message}`,
        );
      }

      setRoadmapExamProgressBySlug((current) => ({
        ...current,
        [activeRoadmap.slug]: {
          final_exam_score: score,
          is_completed: true,
          completed_at: completedAt,
        },
      }));
      triggerCelebration();
    },
    [activeRoadmap, triggerCelebration],
  );

  // Add custom topic inline
  const addCustomTopic = useCallback(
    (
      moduleId: string,
      title: string,
      resourceUrl?: string,
      difficulty: "Beginner" | "Intermediate" | "Advanced" = "Beginner",
    ) => {
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
        }),
      );
    },
    [activeRoadmap.id],
  );

  // Get active note content (either for selected module or for the active roadmap)
  const activeNoteContent = useMemo(() => {
    const existing = notes.find(
      (n: Note) =>
        n.roadmap_id === activeRoadmap.id &&
        (selectedModuleIdForNotes
          ? n.module_id === selectedModuleIdForNotes
          : n.module_id === null || !n.module_id),
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
            (selectedModuleIdForNotes
              ? n.module_id === selectedModuleIdForNotes
              : n.module_id === null || !n.module_id),
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
    [activeRoadmap.id, selectedModuleIdForNotes, userProfile.id],
  );

  // Switch roadmap
  const switchRoadmap = useCallback((slug: string) => {
    setActiveRoadmapSlug(slug);
    setSelectedModuleIdForNotes(null);
  }, []);

  // Reset to default seed
  const resetToDefaultSeed = useCallback(() => {
    if (
      confirm(
        "Reset SkillFlow data back to default roadmap presets & progress?",
      )
    ) {
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
    roadmapExamProgress,
    nextUpTopic,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleDarkMode,
    toggleTopicCompletion,
    submitFinalExam,
    addCustomTopic,
    saveCurrentNote,
    switchRoadmap,
    triggerCelebration,
    resetToDefaultSeed,
    isHydrated,
  };

  return (
    <SkillFlowContext.Provider value={value}>
      {children}
    </SkillFlowContext.Provider>
  );
}

export function useSkillFlow() {
  const context = useContext(SkillFlowContext);
  if (!context) {
    throw new Error("useSkillFlow must be used within a SkillFlowProvider");
  }
  return context;
}
