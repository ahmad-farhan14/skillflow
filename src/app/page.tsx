import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Cloud,
  Flame,
  Layers3,
  ListChecks,
  NotebookPen,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ListChecks,
    title: "Interactive roadmap tracking",
    description:
      "Turn ambitious goals into clear milestones. Track what’s done and always know what to learn next.",
  },
  {
    icon: NotebookPen,
    title: "Quick notes, built in",
    description:
      "Capture ideas beside your learning path with a lightweight scratchpad and Markdown support.",
  },
  {
    icon: Cloud,
    title: "Progress that stays with you",
    description:
      "Keep your work in sync across sessions and build a daily streak with every small step.",
  },
  {
    icon: Layers3,
    title: "A calmer way to learn",
    description:
      "A focused workspace for your goals—no noisy feeds, just your roadmap and steady progress.",
  },
];

const previewModules = [
  { number: "01", title: "Foundations & the Web", progress: 100, complete: true },
  { number: "02", title: "HTML & Semantic Structure", progress: 72, complete: false },
  { number: "03", title: "CSS & Responsive Layout", progress: 24, complete: false },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#131314] text-white">
      <header className="border-b border-white/[0.08]">
        <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Sparkles size={17} />
            </span>
            SkillFlow
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm text-[#C4C7C5] transition hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#C4C7C5]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            A more focused way to grow
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Master Skills with Structured{" "}
            <span className="text-[#8E8E93]">
              Micro-Learning Roadmaps
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-[#8E8E93] sm:text-lg sm:leading-8">
            Make meaningful progress, one milestone at a time. Follow a clear
            learning path, keep useful notes close, and build a habit that lasts.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Start Learning Free <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.07]"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl sm:mt-20">
          <div className="absolute -inset-3 rounded-3xl bg-blue-500/[0.06] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-[#2E2E2F] bg-[#1E1E1F] shadow-2xl shadow-black/30">
            <div className="flex h-12 items-center gap-2 border-b border-white/[0.08] px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4A4A4C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4A4A4C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4A4A4C]" />
              <span className="ml-3 text-xs text-[#8E8E93]">Your learning workspace</span>
            </div>
            <div className="grid gap-6 p-5 sm:grid-cols-[1fr_240px] sm:p-8">
              <div>
                <p className="text-xs font-medium text-blue-400">DEVELOPMENT / CAREER TRACK</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frontend Web Developer
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#8E8E93]">
                  A clear path from web fundamentals to building and shipping
                  production-ready interfaces.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-[#C4C7C5]">
                  <span className="font-mono">8/28</span>
                  <span>milestones completed</span>
                  <span className="ml-auto font-mono">29%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#343436]">
                  <div className="h-full w-[29%] rounded-full bg-blue-500" />
                </div>
                <div className="mt-7 space-y-3">
                  {previewModules.map((module) => (
                    <div
                      key={module.number}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#19191A] p-3.5"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs ${
                          module.complete
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/[0.06] text-[#C4C7C5]"
                        }`}
                      >
                        {module.complete ? <Check size={15} /> : module.number}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {module.title}
                      </span>
                      <span className="font-mono text-xs text-[#8E8E93]">
                        {module.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-xl border border-white/[0.08] bg-[#19191A] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BookOpenCheck size={16} className="text-blue-400" />
                    Quick notes
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#8E8E93]">
                    Semantic HTML gives content structure and meaning. Use
                    elements that describe what the content is...
                  </p>
                  <div className="mt-3 border-t border-white/[0.08] pt-2 font-mono text-[10px] text-[#8E8E93]">
                    **Remember:** structure first
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#19191A] p-4">
                  <div>
                    <p className="text-xs text-[#8E8E93]">Current streak</p>
                    <p className="mt-1 font-mono text-lg font-medium">5 days</p>
                  </div>
                  <Flame size={19} className="text-amber-400" />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue-400">
              Built for steady progress
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to keep moving.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#8E8E93] sm:text-base">
              Less time figuring out what’s next. More time learning the things
              that matter to you.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-xl border border-[#2E2E2F] bg-[#1E1E1F] p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Icon size={18} />
                </span>
                <p className="mt-5 font-mono text-[10px] text-[#8E8E93]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#8E8E93]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-[#8E8E93] sm:flex-row">
          <span className="font-medium text-[#C4C7C5]">SkillFlow</span>
          <span>Make progress feel simple.</span>
          <Link href="/signup" className="transition hover:text-white">
            Start Learning Free
          </Link>
        </div>
      </footer>
    </main>
  );
}
