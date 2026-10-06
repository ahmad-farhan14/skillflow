import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SkillFlowProvider } from "../context/SkillFlowContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillFlow — Developer & Designer Learning Roadmap Tracker",
  description:
    "Master technical skills with curated roadmaps, interactive module checklists, automatic progress tracking, and daily learning streaks.",
  keywords: [
    "SkillFlow",
    "Frontend Roadmap",
    "UI/UX Design Roadmap",
    "Developer Roadmap",
    "Learning Streak",
    "Progress Tracker",
    "Study Notes",
  ],
  authors: [{ name: "SkillFlow Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const savedTheme = localStorage.getItem("skillflow_theme_v1");
              const isDark = savedTheme
                ? savedTheme === "dark"
                : window.matchMedia("(prefers-color-scheme: dark)").matches;
              document.documentElement.classList.toggle("dark", isDark);
              document.documentElement.style.colorScheme = isDark ? "dark" : "light";
            } catch {}
          })();`}
        </Script>
        <SkillFlowProvider>{children}</SkillFlowProvider>
      </body>
    </html>
  );
}
