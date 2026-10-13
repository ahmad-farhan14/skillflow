"use client";

import { useEffect, useState } from "react";
import { Module, Topic } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import { topicVideoLessons } from "../data/videoLessons";
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

export function ResourceReader({
  topic,
  module,
  onSelectTopic,
  onClose,
}: ResourceReaderProps) {
  const { setSelectedModuleIdForNotes, toggleTopicCompletion } = useSkillFlow();
  const [progressError, setProgressError] = useState("");
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null);
  const videoLesson = topicVideoLessons[topic.id];
  const mappedVideoId = getYouTubeVideoId(
    getSafeResourceUrl(videoLesson?.videoUrl ?? topic.video_url),
  );
  const resourceVideoId = getYouTubeVideoId(
    getSafeResourceUrl(topic.resource_url),
  );
  const videoId = mappedVideoId ?? resourceVideoId;
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`
    : null;

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
    <div className="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-[#131314] dark:text-slate-100">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-white/10 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
            <BookOpenIcon size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
              {module.title}
            </p>
            <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
              {topic.title}
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reader"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <XIcon size={15} />
          <span className="hidden sm:inline">Close reader</span>
        </button>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-hidden">
        <section className="flex min-h-[60vh] flex-col border-b border-slate-200 dark:border-white/10 lg:col-span-8 lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10 sm:px-6">
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {videoLesson?.videoTitle ?? topic.resource_label ?? "Learning resource"}
            </p>
          </div>

          <div className="relative min-h-[55vh] flex-1 bg-slate-200 dark:bg-[#0c0c0d] lg:min-h-0">
            {embedUrl ? (
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={`${topic.title} video lesson`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Open this topic&apos;s learning resource
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    This resource is available outside the video player.
                  </p>
                </div>
                {topic.resource_url && (
                  <a
                    href={topic.resource_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Open {topic.resource_label || "learning resource"}
                  </a>
                )}
              </div>
            )}
          </div>
          <section className="shrink-0 border-b border-slate-200 px-4 py-5 dark:border-white/10 sm:px-6">
            <div className="mb-5 flex items-center gap-2">
              <SparklesIcon size={16} className="text-amber-500 dark:text-amber-300" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Video Summary
              </h3>
            </div>
            {videoLesson?.overview && videoLesson.takeaways.length ? (
              <div className="space-y-5">
                <section className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-400/15 dark:bg-blue-400/[0.06]">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    Overview
                  </h4>
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {videoLesson.overview}
                  </p>
                </section>

                <section>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                      Key takeaways
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {videoLesson.takeaways.length} practical points
                    </span>
                  </div>
                  <ol className="space-y-3">
                    {videoLesson.takeaways.map((point, index) => (
                      <li
                        key={`${topic.id}-takeaway-${index}`}
                        className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 font-mono text-[11px] font-semibold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                A verified summary is not available for this video yet.
              </p>
            )}
          </section>
        </section>

        <aside className="flex min-h-0 flex-col gap-4 bg-slate-100 p-4 dark:bg-[#181819] sm:p-5 lg:col-span-4 lg:overflow-y-auto">
          <div className="max-h-[42vh] shrink-0 overflow-y-auto rounded-2xl">
            <QuickNotesCard />
          </div>

          <section className="min-h-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#202022]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Module checklist
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  Submit the video quiz or a reflection to complete a topic.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-600 dark:bg-white/5 dark:text-slate-300">
                {module.topics.filter((item) => item.is_completed).length}/
                {module.topics.length}
              </span>
            </div>

            {progressError && (
              <p role="alert" className="mb-3 text-xs text-red-600 dark:text-red-400">
                {progressError}
              </p>
            )}
            <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
              {module.topics.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-2 rounded-lg px-2 py-2 ${
                    topic.id === item.id
                      ? "bg-slate-100 dark:bg-white/[0.07]"
                      : ""
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
                        ? "text-emerald-600 hover:text-amber-600 dark:text-emerald-400 dark:hover:text-amber-300"
                        : "text-slate-500 hover:text-blue-600 dark:hover:text-blue-300"
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
                    className={`min-w-0 flex-1 text-left text-xs leading-relaxed transition hover:text-blue-600 dark:hover:text-blue-300 ${
                      item.is_completed
                        ? "text-slate-400 line-through dark:text-slate-400"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span>{item.title}</span>
                  </button>
                  {item.is_completed && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {item.proof_score !== null &&
                      item.proof_score !== undefined
                        ? `${item.proof_score}%`
                        : "Complete"}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3 dark:border-white/10">
              <ProofOfLearning
                key={topic.id}
                topic={topic}
                videoLesson={videoLesson}
              />
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
