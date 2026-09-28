import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkillFlowProvider } from "../context/SkillFlowContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <SkillFlowProvider>{children}</SkillFlowProvider>
      </body>
    </html>
  );
}
