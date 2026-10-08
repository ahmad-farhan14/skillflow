"use client";

import { FormEvent, useState } from "react";
import { Topic } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import { CheckCircleIcon, SparklesIcon } from "./icons";

interface ProofOfLearningProps {
  topic: Topic;
}

export function ProofOfLearning({ topic }: ProofOfLearningProps) {
  const { toggleTopicCompletion } = useSkillFlow();
  const [reflection, setReflection] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      await toggleTopicCompletion(topic.id, reflection);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save your proof of learning.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-700 dark:bg-slate-950/60">
      <div className="mb-2 flex items-center gap-2">
        <SparklesIcon size={15} className="text-amber-500" />
        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
          Proof of Learning
        </h4>
      </div>
      {topic.is_completed ? (
        <p className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
          <CheckCircleIcon size={14} />
          Reflection submitted and progress saved.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <label
            htmlFor={`proof-${topic.id}`}
            className="block text-xs leading-relaxed text-slate-600 dark:text-slate-400"
          >
            In your own words, what is one useful idea you learned about{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {topic.title}
            </span>
            ?
          </label>
          <textarea
            id={`proof-${topic.id}`}
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            minLength={20}
            maxLength={2000}
            required
            rows={3}
            placeholder="Write a short reflection (at least 20 characters)..."
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs leading-relaxed text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] text-slate-400">
              {reflection.trim().length}/2,000 characters
            </span>
            <button
              type="submit"
              disabled={isSaving || reflection.trim().length < 20}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Submit & complete"}
            </button>
          </div>
          {error && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
