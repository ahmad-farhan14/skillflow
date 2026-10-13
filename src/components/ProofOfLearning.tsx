"use client";

import { FormEvent, useState } from "react";
import { Topic, TopicVideoLesson } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import { CheckCircleIcon, SparklesIcon } from "./icons";

interface ProofOfLearningProps {
  topic: Topic;
  videoLesson?: TopicVideoLesson;
}

export function ProofOfLearning({ topic, videoLesson }: ProofOfLearningProps) {
  const { toggleTopicCompletion } = useSkillFlow();
  const [reflection, setReflection] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const quiz = videoLesson?.quiz ?? [];
  const hasValidQuizAnswers = quiz.every(
    (question) =>
      Number.isInteger(question.correctIndex) &&
      question.correctIndex >= 0 &&
      question.correctIndex < question.options.length,
  );
  const allAnswered =
    quiz.length > 0 &&
    hasValidQuizAnswers &&
    quiz.every((_, questionIndex) => selectedAnswers[questionIndex] !== undefined);
  const score = submittedScore ?? topic.proof_score ?? null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let proofResponse = reflection.trim();
    let proofScore: number | undefined;
    if (videoLesson) {
      if (!hasValidQuizAnswers) {
        setError("This quiz has an invalid answer key. Please contact support.");
        return;
      }
      if (!allAnswered) return;
      const correctAnswers = quiz.reduce(
        (total, question, questionIndex) =>
          total + Number(selectedAnswers[questionIndex] === question.correctIndex),
        0,
      );
      proofScore = Math.round((correctAnswers / quiz.length) * 100);
      proofResponse = `Video quiz score: ${proofScore}%. ${correctAnswers}/${quiz.length} answers correct.`;
      setSubmittedScore(proofScore);
      setIsSubmitted(true);
    }

    setError("");
    setIsSaving(true);
    try {
      await toggleTopicCompletion(topic.id, proofResponse, proofScore);
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

      {topic.is_completed && (
        <p className="mb-2 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
          <CheckCircleIcon size={14} />
          Completion saved
          {score !== null && ` · Score: ${score}%`}
        </p>
      )}

      {videoLesson && (!topic.is_completed || isSubmitted) ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Answer every question to submit your score for {videoLesson.videoTitle}.
          </p>
          {quiz.map((question, questionIndex) => (
            <fieldset key={`${topic.id}-quiz-${questionIndex}`}>
              <legend className="mb-2 text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {question.prompt}
              </legend>
              <div className="space-y-1.5">
                {question.options.map((option, optionIndex) => {
                  const selected =
                    selectedAnswers[questionIndex] === optionIndex;
                  const isCorrectAnswer =
                    optionIndex === question.correctIndex;
                  const isIncorrectSelection =
                    isSubmitted && selected && !isCorrectAnswer;
                  const resultClass = isSubmitted
                    ? isCorrectAnswer
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100"
                      : isIncorrectSelection
                        ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
                        : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    : selected
                      ? "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700";

                  return (
                    <button
                      key={`${topic.id}-${questionIndex}-${optionIndex}`}
                      type="button"
                      aria-pressed={selected}
                      disabled={isSubmitted || topic.is_completed}
                      onClick={() => {
                        setSelectedAnswers((current) => ({
                          ...current,
                          [questionIndex]: optionIndex,
                        }));
                        setError("");
                      }}
                      className={`w-full rounded-lg border px-2.5 py-2 text-left text-[11px] leading-relaxed transition disabled:cursor-default ${resultClass}`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span>{option.text}</span>
                        {isSubmitted && isCorrectAnswer && (
                          <span className="shrink-0 font-semibold text-emerald-700 dark:text-emerald-300">
                            Correct answer
                          </span>
                        )}
                        {isIncorrectSelection && (
                          <span className="shrink-0 font-semibold text-red-700 dark:text-red-300">
                            Your answer
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          {isSubmitted && score !== null && (
            <p
              aria-live="polite"
              className="text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              Score: {score}%
            </p>
          )}
          {!topic.is_completed && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {Object.keys(selectedAnswers).length}/{quiz.length} answered
              </span>
              <button
                type="submit"
                disabled={isSaving || !allAnswered}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : isSubmitted
                    ? "Retry save"
                    : "Submit quiz"}
              </button>
            </div>
          )}
          {error && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </form>
      ) : topic.is_completed ? null : (
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
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
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
