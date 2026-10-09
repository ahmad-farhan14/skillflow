"use client";

import { useEffect, useState } from "react";
import { Module, Topic } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import { QuickNotesCard } from "./sidebar/QuickNotesCard";
import { ProofOfLearning } from "./ProofOfLearning";
import {
  BookOpenIcon,
  CheckCircleIcon,
  CircleIcon,
  SparklesIcon,
  XIcon,
} from "./icons";

interface ResourceReaderProps {
  topic: Topic;
  module: Module;
  onSelectTopic: (topic: Topic) => void;
  onClose: () => void;
}

function getSafeResourceUrl(resourceUrl?: string) {
  if (!resourceUrl) return null;

  try {
    const url = new URL(resourceUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url;
  } catch {
    return null;
  }
}

function getYouTubeVideoId(url: URL | null) {
  if (!url) return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (
    host !== "youtu.be" &&
    host !== "youtube.com" &&
    host !== "m.youtube.com" &&
    host !== "music.youtube.com" &&
    host !== "youtube-nocookie.com"
  ) {
    return null;
  }

  let videoId: string | null = null;
  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (url.pathname === "/watch") {
    videoId = url.searchParams.get("v");
  } else {
    videoId =
      url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
  }

  return videoId && /^[\w-]{11}$/.test(videoId) ? videoId : null;
}

const DEFAULT_VIDEO_IDS = {
  html: "pQN-pnXPaVg",
  css: "jV8B24rSN5o",
  javascript: "W6NZfCO5SIk",
  react: "bMknfKXIFA8",
  next: "ZVnjOPwW4ZA",
  ux: "c9Wg6Cb_YlU",
  figma: "FTFaQWZBqQ8",
} as const;

function getDefaultVideoId(topic: Topic, module: Module) {
  const subject = `${topic.title} ${module.title}`.toLowerCase();

  if (subject.includes("figma")) return DEFAULT_VIDEO_IDS.figma;
  if (
    /ux|design|wirefram|persona|usability|user interview|prototype/.test(
      subject,
    )
  ) {
    return DEFAULT_VIDEO_IDS.ux;
  }
  if (/react|jsx|hooks|state management|zustand|component/.test(subject)) {
    return DEFAULT_VIDEO_IDS.react;
  }
  if (
    /next\.js|app router|server action|deployment|environment variable|api integration/.test(
      subject,
    )
  ) {
    return DEFAULT_VIDEO_IDS.next;
  }
  if (
    /css|grid|flexbox|tailwind|responsive|typography|color theory/.test(subject)
  ) {
    return DEFAULT_VIDEO_IDS.css;
  }
  if (/html|semantic|accessibility|form|seo/.test(subject)) {
    return DEFAULT_VIDEO_IDS.html;
  }
  return DEFAULT_VIDEO_IDS.javascript;
}

export function ResourceReader({
  topic,
  module,
  onSelectTopic,
  onClose,
}: ResourceReaderProps) {
  const { setSelectedModuleIdForNotes, toggleTopicCompletion } = useSkillFlow();
  const [progressError, setProgressError] = useState("");
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null);
  const mappedVideoId = getYouTubeVideoId(getSafeResourceUrl(topic.video_url));
  const resourceVideoId = getYouTubeVideoId(
    getSafeResourceUrl(topic.resource_url),
  );
  const videoId =
    mappedVideoId ?? resourceVideoId ?? getDefaultVideoId(topic, module);
  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;

  useEffect(() => {
    setSelectedModuleIdForNotes(module.id);
  }, [module.id, setSelectedModuleIdForNotes]);

  const handleToggleCompletion = async (item: Topic) => {
    setProgressError("");
    setPendingTopicId(item.id);
    try {
      await toggleTopicCompletion(item.id);
    } catch (error) {
      setProgressError(
        error instanceof Error
          ? error.message
          : "Unable to update your topic progress.",
      );
    } finally {
      setPendingTopicId(null);
    }
  };

  return (
    <div className="dark fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-[#131314] text-slate-100">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
            <BookOpenIcon size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-slate-400">
              {module.title}
            </p>
            <h2 className="truncate text-sm font-semibold text-white sm:text-base">
              {topic.title}
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reader"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <XIcon size={15} />
          <span className="hidden sm:inline">Close reader</span>
        </button>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-hidden">
        <section className="flex min-h-[60vh] flex-col border-b border-white/10 lg:col-span-8 lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <p className="truncate text-xs text-slate-400">
              {topic.resource_label || "Video lesson"}
            </p>
          </div>

          <div className="relative min-h-[55vh] flex-1 bg-[#0c0c0d] lg:min-h-0">
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={`${topic.title} video lesson`}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <section className="shrink-0 border-b border-white/10 px-4 py-5 sm:px-6">
            <div className="mb-4 flex items-center gap-2">
              <SparklesIcon size={16} className="text-amber-300" />
              <h3 className="text-sm font-semibold text-white">
                Video Summary
              </h3>
            </div>
            {topic.key_takeaways?.length ? (
              <ol className="space-y-3">
                {topic.key_takeaways.map((point, index) => (
                  <li
                    key={`${topic.id}-takeaway-${index}`}
                    className="flex gap-3 text-sm leading-relaxed text-slate-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/6 font-mono text-[11px] text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm leading-relaxed text-slate-400">
                A summary is not available for this topic yet.
              </p>
            )}
          </section>
        </section>

        <aside className="flex min-h-0 flex-col gap-4 bg-[#181819] p-4 sm:p-5 lg:col-span-4 lg:overflow-y-auto">
          <div className="max-h-[42vh] shrink-0 overflow-y-auto rounded-2xl">
            <QuickNotesCard />
          </div>

          <section className="min-h-0 rounded-2xl border border-white/10 bg-[#202022] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Module checklist
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Complete each topic after submitting its proof.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-300">
                {module.topics.filter((item) => item.is_completed).length}/
                {module.topics.length}
              </span>
            </div>

            {progressError && (
              <p role="alert" className="mb-3 text-xs text-red-400">
                {progressError}
              </p>
            )}
            <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
              {module.topics.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-2 rounded-lg px-2 py-2 ${
                    topic.id === item.id ? "bg-white/[0.07]" : ""
                  }`}
                >
                  <button
                    type="button"
                    disabled={pendingTopicId === item.id}
                    onClick={() =>
                      item.is_completed
                        ? void handleToggleCompletion(item)
                        : onSelectTopic(item)
                    }
                    aria-label={
                      item.is_completed
                        ? `Mark ${item.title} incomplete`
                        : `Open ${item.title}`
                    }
                    title={
                      item.is_completed
                        ? "Mark incomplete"
                        : "Open topic and submit proof"
                    }
                    className={`mt-0.5 shrink-0 ${
                      item.is_completed
                        ? "text-emerald-400 hover:text-amber-300"
                        : "text-slate-500 hover:text-blue-300"
                    }`}
                  >
                    {item.is_completed ? (
                      <CheckCircleIcon size={16} />
                    ) : (
                      <CircleIcon size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTopic(item)}
                    className={`min-w-0 flex-1 text-left text-xs leading-relaxed transition hover:text-blue-300 ${
                      item.is_completed
                        ? "text-slate-400 line-through"
                        : "text-slate-200"
                    }`}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <ProofOfLearning key={topic.id} topic={topic} requireVideoQuiz />
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
