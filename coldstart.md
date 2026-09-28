# Coldstart Document — SkillFlow (v1.0)

## 1. Project Overview & PRD

- **Name:** SkillFlow
- **Category:** Developer & Designer Learning Roadmap Tracker
- **Tagline:** Master technical skills with curated roadmaps, interactive module checklists, automatic progress tracking, and daily learning streaks.
- **Problem:** Self-learners and aspiring engineers struggle to stay consistent, lose track of what to study next, and lack an organized way to record notes and visualize tangible learning progress.
- **Target Users:** Self-taught developers, bootcamp students, UI/UX designers, and professionals upskilling in modern tech.

### Core Features (In-Scope):

1. **Curated Preset Roadmaps:**
   - **Frontend Web Developer:** HTML & Semantic Web, CSS & Modern Layouts (Flexbox/Grid/Tailwind), JavaScript & DOM, React Fundamentals, Next.js App Router, State Management, API Integration & Deployment.
   - **Basic UI/UX Design:** Design Thinking & UX Research, Wireframing & Information Architecture, Figma Essentials, Typography & Color Theory, Interactive Prototyping, Usability Testing & Design Systems.
2. **Interactive Module Checklist:**
   - Multi-tier milestones (Roadmap -> Module -> Milestone / Checklist Item).
   - Instant toggle with completed state persistence.
3. **Automatic Progress Calculation:**
   - Live recalculation of completion percentage per module and overall roadmap.
   - Visual progress bars with smooth animated transitions.
4. **Quick Notes Feature:**
   - Lightweight, contextual notes widget tied to active roadmaps/modules.
   - Auto-saving scratchpad for study notes, key takeaways, and bookmark links.
5. **Daily Learning Streak Counter:**
   - Streak badge with flame icon (`#F59E0B`), tracking consecutive learning activity days.
   - Daily activity tracker card.
6. **Responsive, Modern UI:**
   - Mobile-first layout with clean desktop split-view (roadmap timeline + sticky sidebar for streak & notes).
   - Dark / Light mode support with clean glassmorphic aesthetic.

### Out of Scope:

- Live video streaming or LMS video hosting.
- Automated code execution / sandbox grader.
- Paid subscription paywalls.

---

## 2. User Persona & User Flow

- **Persona:** Alex Pratama (24), aspiring frontend developer transitioning into tech. Needs structured guidance, tangible milestones to beat tutorial hell, and quick note-taking while building projects.
- **User Flow:**
  1. Open SkillFlow Dashboard.
  2. Select active roadmap (Frontend Web Developer or Basic UI/UX Design).
  3. View overall progress ring, next up milestones, and current streak.
  4. Expand module -> check off completed topics -> watch progress bar update instantly.
  5. Jot down quick notes / bookmarks in the quick notes panel.
  6. Return daily to build streak count.

---

## 3. Wireframe & Component Structure

1. **Header / Navbar:**
   - Brand Logo ("SkillFlow" with gradient icon).
   - Roadmap Selector Switcher (Quick tabs or dropdown).
   - Streak Pill Badge (`🔥 X Days Streak`).
   - Theme toggle & profile placeholder.
2. **Hero Overview Banner:**
   - Active Roadmap Title & Description badge.
   - Radial / Horizontal Progress Bar (% completed, total completed / total topics).
   - Stats row: Completed Milestones, Total Hours Estimated, Current Streak.
3. **Main Content Grid (2 Columns on Desktop):**
   - **Left / Main Column (Roadmap Timeline & Modules):**
     - Module Accordion / Cards:
       - Header: Module title, topic count, sub-progress indicator.
       - Body: Interactive checklist items with resource links and status pills.
   - **Right Column (Sticky Sidebar):**
     - Streak Card & Daily Motivation.
     - Quick Notes Card with auto-save textarea, formatting shortcuts, and clear/export actions.
     - Recommended Resources & Cheatsheets card.
4. **Modals & Drawers:**
   - Roadmap Switcher / Detail Modal.
   - New Milestone / Custom Note Dialog.

---

## 4. Database Schema (PostgreSQL / Supabase / Prisma)

- **Table `profiles` / `User`:**
  - `id`: UUID, Primary Key
  - `email`: String, Unique
  - `full_name`: String
  - `avatar_url`: String (optional)
  - `current_streak`: Int (default: 0)
  - `last_active_date`: Date
  - `created_at`: Timestamptz
- **Table `roadmaps`:**
  - `id`: UUID, Primary Key
  - `slug`: String, Unique
  - `title`: String
  - `description`: Text
  - `category`: String ("Development" | "Design")
  - `icon`: String
  - `estimated_hours`: Int
  - `created_at`: Timestamptz
- **Table `modules`:**
  - `id`: UUID, Primary Key
  - `roadmap_id`: UUID, Foreign Key -> roadmaps.id
  - `title`: String
  - `description`: Text
  - `order_index`: Int
  - `created_at`: Timestamptz
- **Table `topics` / `milestones`:**
  - `id`: UUID, Primary Key
  - `module_id`: UUID, Foreign Key -> modules.id
  - `title`: String
  - `resource_url`: String (optional)
  - `order_index`: Int
  - `created_at`: Timestamptz
- **Table `user_progress`:**
  - `id`: UUID, Primary Key
  - `user_id`: UUID, Foreign Key -> profiles.id
  - `topic_id`: UUID, Foreign Key -> topics.id
  - `is_completed`: Boolean (default: false)
  - `completed_at`: Timestamptz (nullable)
- **Table `notes`:**
  - `id`: UUID, Primary Key
  - `user_id`: UUID, Foreign Key -> profiles.id
  - `roadmap_id`: UUID, Foreign Key -> roadmaps.id
  - `module_id`: UUID (nullable), Foreign Key -> modules.id
  - `content`: Text
  - `updated_at`: Timestamptz
  - `created_at`: Timestamptz

---

## 5. Visual Style Guide

- **Vibe:** Focused, Modern, Developer-Centric & Inspiring.
- **Color Palette:**
  - Primary Brand Accent: `#2563EB` (Royal Blue / Blue-600)
  - Primary Hover: `#1D4ED8` (Blue-700)
  - Streak & Energy: `#F59E0B` (Amber-500)
  - Streak Glow / Light: `#FEF3C7` (Amber-100)
  - Success / Complete: `#10B981` (Emerald-500)
  - Background Light: `#F8FAFC` (Slate-50) | Dark: `#0B0F19` (Deep Slate)
  - Surface Cards Light: `#FFFFFF` | Dark: `#111827` (Gray-900)
  - Borders: `#E2E8F0` (Slate-200) | Dark: `#1F2937` (Gray-800)
- **Typography:** Inter / System Sans, Tabular Nums for stats.
- **Micro-interactions:** Smooth height transitions on accordions, celebratory particle effects / sound cues on 100% completion, smooth spring progress bar transitions.
