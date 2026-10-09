"use client";

import { FormEvent, useState } from "react";
import { Topic } from "../types";
import { useSkillFlow } from "../context/SkillFlowContext";
import { CheckCircleIcon, SparklesIcon } from "./icons";

interface ProofOfLearningProps {
  topic: Topic;
  requireVideoQuiz?: boolean;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

function buildVideoQuiz(topic: Topic): QuizQuestion[] {
  const takeaways = topic.key_takeaways?.filter((point) => point.trim()) ?? [];

  return takeaways.map((takeaway, questionIndex) => {
    const options: QuizOption[] = [
      { text: takeaway, isCorrect: true },
      {
        text: `The video recommends the opposite of this takeaway: “${takeaway}”`,
        isCorrect: false,
      },
      {
        text: `The video says to ignore this idea: “${takeaway}”`,
        isCorrect: false,
      },
      {
        text: `This idea is not included in the video summary: “${takeaway}”`,
        isCorrect: false,
      },
    ];
    const offset =
      (topic.id.charCodeAt(questionIndex % topic.id.length) + questionIndex) %
      options.length;

    return {
      prompt: `Which statement accurately reflects takeaway ${questionIndex + 1}?`,
      options: [...options.slice(offset), ...options.slice(0, offset)],
    };
  });
}

export function ProofOfLearning({
  topic,
  requireVideoQuiz = false,
}: ProofOfLearningProps) {
  const { toggleTopicCompletion } = useSkillFlow();
  const [reflection, setReflection] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const quiz = requireVideoQuiz ? buildVideoQuiz(topic) : [];
  const quizPassed =
    quiz.length > 0 &&
    quiz.every(
      (question, questionIndex) =>
        question.options[selectedAnswers[questionIndex]]?.isCorrect === true,
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requireVideoQuiz && !quizPassed) return;

    setError("");
    setIsSaving(true);
    try {
      const proofResponse = requireVideoQuiz
        ? `Passed video summary quiz: ${quiz.length}/${quiz.length} key takeaways correct.`
        : reflection;
      await toggleTopicCompletion(topic.id, proofResponse);
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
          Completion saved and progress updated.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          {requireVideoQuiz ? (
            quiz.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Answer every question correctly to unlock completion.
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
                        return (
                          <button
                            key={`${topic.id}-${questionIndex}-${optionIndex}`}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setSelectedAnswers((current) => ({
                                ...current,
                                [questionIndex]: optionIndex,
                              }));
                              setError("");
                            }}
                            className={`w-full rounded-lg border px-2.5 py-2 text-left text-[11px] leading-relaxed transition ${
                              selected
                                ? "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100"
                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700"
                            }`}
                          >
                            {option.text}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
                <p
                  aria-live="polite"
                  className="text-[11px] text-slate-500 dark:text-slate-400"
                >
                  {quizPassed
                    ? "All answers correct. Completion is unlocked."
                    : `${Object.keys(selectedAnswers).length}/${quiz.length} questions answered`}
                </p>
              </div>
            ) : (
              <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                Add key takeaways to this video topic to generate its completion
                quiz.
              </p>
            )
          ) : (
            <>
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
            </>
          )}
          <div className="flex items-center justify-between gap-3">
            {requireVideoQuiz ? (
              <span />
            ) : (
              <span className="text-[10px] text-slate-400">
                {reflection.trim().length}/2,000 characters
              </span>
            )}
            <button
              type="submit"
              disabled={
                isSaving ||
                (requireVideoQuiz ? !quizPassed : reflection.trim().length < 20)
              }
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : requireVideoQuiz
                  ? "Mark as Completed"
                  : "Submit & complete"}
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
