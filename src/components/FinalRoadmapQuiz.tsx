"use client";

import { FormEvent, useState } from "react";
import { useSkillFlow } from "../context/SkillFlowContext";
import { topicVideoLessons } from "../data/videoLessons";
import { buildRoadmapFinalQuiz, shuffleQuizForAttempt } from "../utils/quiz";
import { CheckCircleIcon, SparklesIcon } from "./icons";

export function FinalRoadmapQuiz() {
  const { activeRoadmap, stats, roadmapExamProgress, submitFinalExam } =
    useSkillFlow();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const sources = activeRoadmap.modules.flatMap((module) =>
    module.topics.flatMap((topic) => {
      const lesson = topicVideoLessons[topic.id];
      return lesson
        ? [
            {
              topicId: topic.id,
              moduleId: module.id,
              topicTitle: topic.title,
              videoTitle: lesson.videoTitle,
              takeaways: lesson.takeaways,
            },
          ]
        : [];
    }),
  );
  const [quiz, setQuiz] = useState(() => buildRoadmapFinalQuiz(sources));
  const [hasStarted, setHasStarted] = useState(false);
  const isUnlocked =
    stats.totalTopics > 0 && stats.completedTopics === stats.totalTopics;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctAnswers = quiz.reduce(
    (total, question, questionIndex) =>
      total + Number(selectedAnswers[questionIndex] === question.correctIndex),
    0,
  );
  const score = quiz.length
    ? Math.round((correctAnswers / quiz.length) * 100)
    : 0;
  const allAnswered = quiz.length >= 10 && answeredCount === quiz.length;

  const handleRetake = () => {
    setSelectedAnswers({});
    setQuiz(shuffleQuizForAttempt(buildRoadmapFinalQuiz(sources)));
    setHasStarted(true);
    setIsSubmitted(false);
    setIsSaved(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!allAnswered) return;

    setError("");
    setIsSubmitted(true);
    setIsSaving(true);
    try {
      await submitFinalExam(score);
      setIsSaved(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save your final exam.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="border-t border-slate-200 pt-6 dark:border-white/10">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
            <SparklesIcon size={17} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Final Roadmap Quiz
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Certificate Exam · {quiz.length} questions across video summaries
            </p>
          </div>
        </div>
        {roadmapExamProgress?.is_completed && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircleIcon size={15} />
            Completed · {roadmapExamProgress.final_exam_score}%
          </span>
        )}
      </div>

      {!isUnlocked ? (
        <div className="border-l-2 border-amber-400 py-2 pl-4">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Exam locked
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Complete all {stats.totalTopics} roadmap topics to unlock the
            certificate exam. {stats.completedTopics}/{stats.totalTopics}{" "}
            complete.
          </p>
        </div>
      ) : quiz.length < 10 ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          This roadmap needs at least 10 mapped video-summary takeaways to build
          the final exam.
        </p>
      ) : !hasStarted ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Start a randomized {quiz.length}-question exam drawn from this
            roadmap&apos;s video takeaways.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuiz(shuffleQuizForAttempt(buildRoadmapFinalQuiz(sources)));
              setHasStarted(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            Begin certificate exam
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {roadmapExamProgress?.is_completed && !isSubmitted && (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Your saved exam score is {roadmapExamProgress.final_exam_score}%.
              You can take the exam again to update it.
            </p>
          )}
          {quiz.map((question, questionIndex) => (
            <fieldset key={`${activeRoadmap.slug}-final-${questionIndex}`}>
              <legend className="mb-2 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                <span className="mr-2 font-mono text-xs text-slate-400">
                  {String(questionIndex + 1).padStart(2, "0")}
                </span>
                {question.prompt}
              </legend>
              <div className="grid gap-2 md:grid-cols-3">
                {question.options.map((option, optionIndex) => {
                  const selected =
                    selectedAnswers[questionIndex] === optionIndex;
                  const hasAnswered =
                    selectedAnswers[questionIndex] !== undefined;
                  const isCorrect = optionIndex === question.correctIndex;
                  const isIncorrectSelection =
                    hasAnswered && selected && !isCorrect;
                  const resultClass = hasAnswered
                    ? isCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100"
                      : isIncorrectSelection
                        ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
                        : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    : selected
                      ? "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700";

                  return (
                    <button
                      key={`${questionIndex}-${optionIndex}`}
                      type="button"
                      aria-pressed={selected}
                      disabled={isSubmitted}
                      onClick={() => {
                        setSelectedAnswers((current) => ({
                          ...current,
                          [questionIndex]: optionIndex,
                        }));
                        setError("");
                      }}
                      className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs leading-relaxed transition disabled:cursor-default ${resultClass}`}
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span>{option.text}</span>
                        {hasAnswered && isCorrect && (
                          <span className="shrink-0 font-semibold text-emerald-700 dark:text-emerald-300">
                            Correct
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

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
            <div
              aria-live="polite"
              className="text-xs text-slate-600 dark:text-slate-400"
            >
              {isSubmitted
                ? `Final score: ${score}% · ${correctAnswers}/${quiz.length} correct`
                : `Live score: ${answeredCount ? Math.round((correctAnswers / answeredCount) * 100) : 0}% · ${answeredCount}/${quiz.length} answered`}
            </div>
            {isSaved ? (
              <button
                type="button"
                onClick={handleRetake}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                Retake exam
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSaving || !allAnswered}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : isSubmitted
                    ? "Retry save"
                    : roadmapExamProgress?.is_completed
                      ? "Submit retake"
                      : "Submit final exam"}
              </button>
            )}
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
