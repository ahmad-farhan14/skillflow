import { VideoQuizQuestion } from "../types";

export interface TakeawayQuizSource {
  topicId: string;
  moduleId?: string;
  topicTitle: string;
  videoTitle: string;
  takeaways: string[];
}

interface TakeawayEntry {
  topicId: string;
  topicTitle: string;
  videoTitle: string;
  text: string;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function getCorrectOptionIndex(question: VideoQuizQuestion) {
  const index = question.correctIndex;
  if (
    index !== undefined &&
    Number.isInteger(index) &&
    index >= 0 &&
    index < question.options.length
  ) {
    return question.correctAnswer === undefined ||
      question.options[index]?.text === question.correctAnswer
      ? index
      : null;
  }

  const answerIndexes = question.options.flatMap((option, optionIndex) =>
    option.text === question.correctAnswer ? [optionIndex] : [],
  );
  return answerIndexes.length === 1 ? answerIndexes[0] : null;
}

export function shuffleQuizForAttempt(
  questions: VideoQuizQuestion[],
): VideoQuizQuestion[] {
  return shuffle(
    questions.map((question) => {
      const correctIndex = getCorrectOptionIndex(question);
      const options = shuffle(question.options);
      return {
        ...question,
        options,
        correctIndex:
          correctIndex === null
            ? question.correctIndex
            : options.findIndex(
                (option) => option === question.options[correctIndex],
              ),
      };
    }),
  );
}

function createTakeawayQuestions(
  correctEntries: TakeawayEntry[],
  allEntries: TakeawayEntry[],
): VideoQuizQuestion[] {
  const promptTemplates = [
    (title: string, focus: string) =>
      `Which recommendation about "${focus}" appears in "${title}"'s summary?`,
    (title: string, focus: string) =>
      `According to "${title}", what should you do about "${focus}"?`,
    (title: string, focus: string) =>
      `Which statement about "${focus}" aligns with "${title}"?`,
    (title: string, focus: string) =>
      `What does "${title}" advise when working with "${focus}"?`,
    (title: string, focus: string) =>
      `Which practice concerning "${focus}" is supported by "${title}"?`,
  ];

  return correctEntries.map((entry, questionIndex) => {
    const distractors: TakeawayEntry[] = [];
    for (let offset = 0; offset < allEntries.length; offset += 1) {
      const candidate =
        allEntries[(questionIndex * 2 + offset) % allEntries.length];
      if (
        candidate.topicId !== entry.topicId &&
        candidate.text !== entry.text &&
        !distractors.some((distractor) => distractor.text === candidate.text)
      ) {
        distractors.push(candidate);
      }
      if (distractors.length === 2) break;
    }

    const correctIndex = questionIndex % 3;
    const options = distractors.map(({ text }) => ({ text }));
    options.splice(correctIndex, 0, { text: entry.text });
    const focus = entry.text
      .replace(/`/g, "")
      .split(/[.;!?]/, 1)[0]
      .slice(0, 55);

    return {
      prompt: promptTemplates[questionIndex % promptTemplates.length](
        entry.videoTitle,
        focus,
      ),
      options,
      correctIndex,
    };
  });
}

export function buildTopicVideoQuiz(
  source: TakeawayQuizSource,
  allSources: TakeawayQuizSource[],
  authoredQuestions: VideoQuizQuestion[],
): VideoQuizQuestion[] {
  const authored = authoredQuestions.slice(0, 2);
  const requiredTakeaways = Math.max(0, 5 - authored.length);
  const correctEntries = source.takeaways
    .slice(0, requiredTakeaways)
    .map((text) => ({ ...source, text }));
  const allEntries = allSources.flatMap((item) =>
    item.takeaways.map((text) => ({ ...item, text })),
  );

  return [
    ...authored,
    ...createTakeawayQuestions(correctEntries, allEntries),
  ].slice(0, 5);
}

export function buildRoadmapFinalQuiz(
  sources: TakeawayQuizSource[],
): VideoQuizQuestion[] {
  const allEntries = sources.flatMap((source) =>
    source.takeaways.map((text) => ({ ...source, text })),
  );
  const sourcesByModule = new Map<string, TakeawayQuizSource[]>();
  for (const source of sources) {
    const moduleSources =
      sourcesByModule.get(source.moduleId ?? source.topicId) ?? [];
    moduleSources.push(source);
    sourcesByModule.set(source.moduleId ?? source.topicId, moduleSources);
  }

  const moduleGroups = [...sourcesByModule.values()];
  const correctEntries: TakeawayEntry[] = moduleGroups
    .flatMap((group) => {
      const source = group.find((item) => item.takeaways.length > 0);
      return source?.takeaways[0]
        ? [{ ...source, text: source.takeaways[0] }]
        : [];
    })
    .slice(0, 15);
  for (let takeawayIndex = 1; correctEntries.length < 15; takeawayIndex += 1) {
    for (const group of moduleGroups) {
      for (const source of group) {
        const text = source.takeaways[takeawayIndex];
        if (text) correctEntries.push({ ...source, text });
        if (correctEntries.length === 15) break;
      }
      if (correctEntries.length === 15) break;
    }
    if (takeawayIndex >= 4) break;
  }

  return createTakeawayQuestions(correctEntries, allEntries);
}
