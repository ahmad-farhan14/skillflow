-- ==========================================================
-- SkillFlow Seed Data SQL Script (v1.0)
-- Matches coldstart.md presets & user persona Alex Pratama
-- ==========================================================

-- 1. SEED USER PROFILE
INSERT INTO profiles (id, email, full_name, avatar_url, current_streak, last_active_date)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'alex.pratama@example.com',
    'Alex Pratama',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    5,
    CURRENT_DATE
) ON CONFLICT (email) DO NOTHING;

-- 2. SEED ROADMAPS
-- Frontend Web Developer Roadmap
INSERT INTO roadmaps (id, slug, title, description, category, icon, estimated_hours, level)
VALUES (
    'f1000000-0000-0000-0000-000000000001',
    'frontend-web-developer',
    'Frontend Web Developer',
    'Master modern web engineering from semantic markup and responsive CSS architectures to React, Next.js App Router, state management, and production cloud deployment.',
    'Development',
    'Code',
    75,
    'Career Track'
) ON CONFLICT (slug) DO NOTHING;

-- Basic UI/UX Design Roadmap
INSERT INTO roadmaps (id, slug, title, description, category, icon, estimated_hours, level)
VALUES (
    'd2000000-0000-0000-0000-000000000001',
    'basic-ui-ux-design',
    'Basic UI/UX Design',
    'Learn human-centered product design principles, wireframing, Figma design systems, typography hierarchy, interactive micro-prototyping, and usability testing.',
    'Design',
    'Palette',
    48,
    'Beginner Friendly'
) ON CONFLICT (slug) DO NOTHING;

-- 3. SEED MODULES & TOPICS FOR FRONTEND ROADMAP
-- Module 1: HTML & Semantic Web
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000001',
    'f1000000-0000-0000-0000-000000000001',
    'HTML & Semantic Web',
    'Build accessible, SEO-optimized, and robust document foundations using modern HTML5 semantics.',
    1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Semantic HTML5 Elements (<header>, <main>, <nav>, <article>)', 'Proper structural hierarchy and search engine readability', 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html', 'MDN Web Docs', 1, 30, 'Beginner'),
('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Web Accessibility (ARIA roles, contrast, & keyboard navigation)', 'Building WCAG compliant experiences for assistive tech', 'https://web.dev/learn/accessibility/', 'web.dev A11y', 2, 45, 'Intermediate'),
('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Forms, Native Validations, and Input Constraints', 'Accessible form controls, regex pattern matching, and UX', 'https://developer.mozilla.org/en-US/docs/Learn/Forms', 'MDN Forms Guide', 3, 40, 'Beginner'),
('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 'SEO Essentials, Meta Tags, Open Graph & JSON-LD', 'Optimizing sharing previews and rich structured search snippets', 'https://moz.com/learn/seo/meta-tags', 'Moz Meta Guide', 4, 35, 'Beginner')
ON CONFLICT (id) DO NOTHING;

-- Module 2: CSS & Modern Layouts
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000002',
    'f1000000-0000-0000-0000-000000000001',
    'CSS & Modern Layouts (Flexbox/Grid/Tailwind)',
    'Master CSS box models, modern responsive layout engines, custom properties, and utility-first styling.',
    2
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'CSS Box Model, Specificity, & CSS Cascade Layers', 'Deep dive into margin collapse, specificity wars, and @layer', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model', 'MDN Box Model', 1, 35, 'Beginner'),
('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000002', 'Flexbox Alignment, Distribution, and Wrapping', 'One-dimensional dynamic flex layouts and alignment axes', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'CSS Tricks Flexbox', 2, 45, 'Beginner'),
('b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 'CSS Grid (Template areas, minmax, auto-fit/fill)', 'Two-dimensional fluid grids without media queries', 'https://css-tricks.com/snippets/css/complete-guide-grid/', 'CSS Tricks Grid Guide', 3, 50, 'Intermediate'),
('b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 'Tailwind CSS Architecture & Modern Tokens', 'Rapid utility prototyping, theme extensions, and dark mode variants', 'https://tailwindcss.com/docs', 'Tailwind Docs', 4, 45, 'Intermediate'),
('b1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000002', 'Responsive Design & Container Queries (@container)', 'Component-level responsive styling decoupled from viewport width', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries', 'MDN Container Queries', 5, 40, 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- Module 3: JavaScript & DOM
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000003',
    'f1000000-0000-0000-0000-000000000001',
    'JavaScript & DOM',
    'Core ES6+ syntax, asynchronous programming, closures, event delegation, and browser APIs.',
    3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000003', 'Modern ES6+ Syntax (Destructuring, Spread, Optional Chaining)', 'Clean, idiomatic modern JS primitives and expression syntax', 'https://javascript.info/', 'JavaScript.info', 1, 40, 'Beginner'),
('b1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000003', 'DOM Manipulation, Event Bubbling & Delegation', 'Efficient event listeners, traversing elements, and mutations', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events', 'MDN Events Guide', 2, 45, 'Beginner'),
('b1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000003', 'Asynchronous JS: Promises, Async/Await & Event Loop', 'Microtasks, macrotasks, fetch error handling, and concurrency', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', 'MDN Async Guide', 3, 60, 'Intermediate'),
('b1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000003', 'Browser Storage (localStorage, sessionStorage, IndexedDB)', 'Persisting state client-side safely with JSON serialization', 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API', 'MDN Web Storage', 4, 30, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Module 4: React Fundamentals
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000004',
    'f1000000-0000-0000-0000-000000000001',
    'React Fundamentals',
    'Component-driven UI architecture, JSX compilation, hooks lifecycle, props flow, and immutability.',
    4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000004', 'JSX Syntax, Components & Props Composition', 'Passing data through props, children, and component boundaries', 'https://react.dev/learn/describing-the-ui', 'React.dev UI', 1, 40, 'Beginner'),
('b1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000004', 'useState & Component Interactivity', 'Managing local state, functional updates, and controlled inputs', 'https://react.dev/learn/state-a-components-memory', 'React.dev State', 2, 45, 'Beginner'),
('b1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000004', 'useEffect & Lifecycle Synchronization', 'Data fetching side-effects, dependencies array, and cleanup timers', 'https://react.dev/learn/synchronizing-with-effects', 'React.dev Effects', 3, 55, 'Intermediate'),
('b1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000004', 'Custom Hooks & Reusable Logic Extraction', 'Packaging stateful logic across multiple components seamlessly', 'https://react.dev/learn/reusing-logic-with-custom-hooks', 'React.dev Custom Hooks', 4, 50, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Module 5: Next.js App Router
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000005',
    'f1000000-0000-0000-0000-000000000001',
    'Next.js App Router',
    'Full-stack React framework with server components (RSC), nested layouts, dynamic routes, and streaming SSR.',
    5
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000005', 'Server vs Client Components (RSC Boundary)', 'Reducing client bundle size and fetching data on the server', 'https://nextjs.org/docs/app/building-your-application/rendering/server-components', 'Next.js Docs', 1, 50, 'Intermediate'),
('b1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000005', 'File-system Routing (page.tsx, layout.tsx, loading.tsx)', 'Nested layouts, route segments, and dynamic parameter routing', 'https://nextjs.org/docs/app/building-your-application/routing', 'Next.js Routing', 2, 40, 'Intermediate'),
('b1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000005', 'Server Actions & Form Mutations', 'Executing server-side mutations directly from React forms', 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations', 'Server Actions', 3, 55, 'Advanced'),
('b1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000005', 'Image, Font & Script Optimization', 'Next.js automated Core Web Vitals optimization techniques', 'https://nextjs.org/docs/app/building-your-application/optimizing/images', 'Optimization Docs', 4, 35, 'Beginner')
ON CONFLICT (id) DO NOTHING;

-- Module 6: State Management
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000006',
    'f1000000-0000-0000-0000-000000000001',
    'State Management',
    'Choosing the right state abstraction: Context API, Zustand, TanStack Query, and optimistic updates.',
    6
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000006', 'React Context & useReducer for Global App State', 'Avoiding prop drilling for theme, auth, and user preferences', 'https://react.dev/learn/scaling-up-with-reducer-and-context', 'React Scaling', 1, 45, 'Intermediate'),
('b1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000006', 'Zustand & Minimalist State Stores', 'Hook-based store pattern with zero boilerplate and middleware', 'https://zustand.docs.pmnd.rs/', 'Zustand Docs', 2, 40, 'Intermediate'),
('b1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000006', 'Server State Caching with TanStack Query (React Query)', 'Cache invalidation, stale-while-revalidate, and pagination', 'https://tanstack.com/query/latest', 'TanStack Query', 3, 50, 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- Module 7: API Integration & Deployment
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a1000000-0000-0000-0000-000000000007',
    'f1000000-0000-0000-0000-000000000001',
    'API Integration & Deployment',
    'REST APIs, GraphQL, environment variable security, CI/CD pipelines, and hosting on Vercel or cloud providers.',
    7
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000007', 'RESTful API Patterns, HTTP Methods & Status Codes', 'Standard status headers, error bodies, and payload standards', 'https://developer.mozilla.org/en-US/docs/Web/HTTP', 'MDN HTTP Overview', 1, 35, 'Beginner'),
('b1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000007', 'Environment Variables & Secret Hygiene (.env.local)', 'Preventing secret leakage in client builds and runtime configs', 'https://nextjs.org/docs/app/building-your-application/configuring/environment-variables', 'Next.js Env Vars', 2, 30, 'Intermediate'),
('b1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000007', 'Vercel Deployment, Custom Domains & Preview Branches', 'Automated git deployments with instant preview URLs and edge caching', 'https://vercel.com/docs/deployments/overview', 'Vercel Docs', 3, 40, 'Beginner'),
('b1000000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000007', 'Lighthouse Audits & Core Web Vitals Optimization', 'Achieving 95+ scores on LCP, INP, and CLS benchmarks', 'https://web.dev/vitals/', 'web.dev Core Vitals', 4, 45, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- 4. SEED MODULES & TOPICS FOR UI/UX DESIGN ROADMAP
-- Module 1: Design Thinking & UX Research
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000001',
    'd2000000-0000-0000-0000-000000000001',
    'Design Thinking & UX Research',
    'Empathize with users, identify core pain points, conduct qualitative interviews, and define persona maps.',
    1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000001', 'The 5 Stages of Design Thinking (Empathize to Test)', 'Iterative human-centered framework popularized by Stanford d.school', 'https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process', 'IxDF Guide', 1, 40, 'Beginner'),
('b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000001', 'User Personas, Empathy Maps & Journey Mapping', 'Synthesizing user goals, motivations, frustrations, and behaviors', 'https://www.nngroup.com/articles/persona/', 'Nielsen Norman Group', 2, 45, 'Beginner'),
('b2000000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000001', 'Conducting User Interviews & Heuristic Evaluation', 'Asking non-leading questions and Jakob Nielsen 10 usability heuristics', 'https://www.nngroup.com/articles/ten-usability-heuristics/', 'NN/g Heuristics', 3, 50, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Module 2: Wireframing & Information Architecture
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000002',
    'd2000000-0000-0000-0000-000000000001',
    'Wireframing & Information Architecture',
    'Organize digital content logically, map user flows, and construct low-fidelity structural blueprints.',
    2
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000002', 'Card Sorting, Sitemaps & Navigation Taxonomies', 'Categorizing content according to mental models', 'https://www.nngroup.com/articles/card-sorting-definition/', 'NN/g Card Sorting', 1, 35, 'Beginner'),
('b2000000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000002', 'User Flow Diagrams & Decision Trees', 'Mapping step-by-step pathways to complete key conversion goals', 'https://balsamiq.com/learn/articles/user-flows/', 'Balsamiq Flows', 2, 40, 'Beginner'),
('b2000000-0000-0000-0000-000000000006', 'a2000000-0000-0000-0000-000000000002', 'Low-Fidelity Wireframing (Paper to Digital Grayscale)', 'Iterating rapid layouts before visual polish', 'https://uxdesign.cc/how-to-wireframe-a-step-by-step-guide-22c676d6cbf5', 'UX Collective', 3, 45, 'Beginner')
ON CONFLICT (id) DO NOTHING;

-- Module 3: Figma Essentials
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000003',
    'd2000000-0000-0000-0000-000000000001',
    'Figma Essentials',
    'Industry standard UI design tool mastery: Frames, Auto Layout, Components, and Variants.',
    3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000007', 'a2000000-0000-0000-0000-000000000003', 'Figma Interface, Frames, Vector Networks & Constraints', 'Mastering canvases, responsive pinning, and boolean vector ops', 'https://help.figma.com/hc/en-us/articles/360040450133-Create-and-edit-vector-networks', 'Figma Vector Docs', 1, 45, 'Beginner'),
('b2000000-0000-0000-0000-000000000008', 'a2000000-0000-0000-0000-000000000003', 'Auto Layout Mastery (Padding, Gap, Fill Container)', 'Building truly responsive cards, navbars, and layouts in Figma', 'https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties', 'Figma Auto Layout', 2, 60, 'Intermediate'),
('b2000000-0000-0000-0000-000000000009', 'a2000000-0000-0000-0000-000000000003', 'Components, Variants & Component Properties', 'Reusable design primitives with interactive boolean and swap states', 'https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants', 'Figma Variants', 3, 55, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Module 4: Typography & Color Theory
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000004',
    'd2000000-0000-0000-0000-000000000001',
    'Typography & Color Theory',
    'Visual hierarchy, font pairing scales, color psychology, 60-30-10 rule, and dark mode contrast standards.',
    4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000010', 'a2000000-0000-0000-0000-000000000004', 'Modular Type Scales, Line Height & Kerning', 'Establishing harmonious typographic rhythms across screen sizes', 'https://type-scale.com/', 'Type Scale Calculator', 1, 35, 'Beginner'),
('b2000000-0000-0000-0000-000000000011', 'a2000000-0000-0000-0000-000000000004', 'Color Systems (60-30-10 Rule, Accents & Neutral Slates)', 'Creating functional, harmonious palette systems for apps', 'https://m3.material.io/styles/color/overview', 'Material 3 Color System', 2, 40, 'Beginner'),
('b2000000-0000-0000-0000-000000000012', 'a2000000-0000-0000-0000-000000000004', 'WCAG 2.1 Contrast Guidelines (AA & AAA Certification)', 'Ensuring readable UI for low vision users and varying lighting conditions', 'https://webaim.org/resources/contrastchecker/', 'WebAIM Contrast', 3, 30, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- Module 5: Interactive Prototyping
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000005',
    'd2000000-0000-0000-0000-000000000001',
    'Interactive Prototyping',
    'Bring static screens to life: Smart Animate, interactive components, micro-interactions, and variables.',
    5
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000013', 'a2000000-0000-0000-0000-000000000005', 'Figma Smart Animate & Micro-Transitions', 'Smooth spring curves, modals, and slide-in drawers', 'https://help.figma.com/hc/en-us/articles/360040035874-Create-animations-with-Smart-Animate', 'Figma Smart Animate', 1, 45, 'Intermediate'),
('b2000000-0000-0000-0000-000000000014', 'a2000000-0000-0000-0000-000000000005', 'Interactive Component States (Hover, Active, Disabled)', 'Self-contained interactive button and input states', 'https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components', 'Interactive Components', 2, 40, 'Intermediate'),
('b2000000-0000-0000-0000-000000000015', 'a2000000-0000-0000-0000-000000000005', 'Figma Variables & Conditional Prototype Logic', 'Simulating realistic cart counters and toggles with local variables', 'https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-and-modes', 'Figma Variables', 3, 55, 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- Module 6: Usability Testing & Design Systems
INSERT INTO modules (id, roadmap_id, title, description, order_index)
VALUES (
    'a2000000-0000-0000-0000-000000000006',
    'd2000000-0000-0000-0000-000000000001',
    'Usability Testing & Design Systems',
    'Design token governance, component libraries, developer handoff specs, and conducting moderated user tests.',
    6
) ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, module_id, title, description, resource_url, resource_label, order_index, estimated_mins, difficulty) VALUES
('b2000000-0000-0000-0000-000000000016', 'a2000000-0000-0000-0000-000000000006', 'Design Tokens Architecture (Colors, Spacing, Elevation)', 'Single source of truth between Figma and CSS/Tailwind variables', 'https://m3.material.io/foundations/design-tokens/overview', 'Material Design Tokens', 1, 45, 'Intermediate'),
('b2000000-0000-0000-0000-000000000017', 'a2000000-0000-0000-0000-000000000006', 'Developer Handoff Best Practices & Dev Mode', 'Specifying redlines, exports, CSS attributes, and edge case notes', 'https://help.figma.com/hc/en-us/articles/15023124642200-Guide-to-Dev-Mode', 'Figma Dev Mode', 2, 35, 'Beginner'),
('b2000000-0000-0000-0000-000000000018', 'a2000000-0000-0000-0000-000000000006', 'Unmoderated Usability Testing (Maze / UserTesting)', 'Measuring completion rates, time on task, and System Usability Scale (SUS)', 'https://maze.co/guides/usability-testing/', 'Maze Guide', 3, 50, 'Intermediate')
ON CONFLICT (id) DO NOTHING;

-- 5. INITIAL USER PROGRESS FOR ALEX (Demonstrating partial progress)
INSERT INTO user_progress (user_id, topic_id, is_completed, completed_at) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1000000-0000-0000-0000-000000000001', TRUE, NOW() - INTERVAL '4 days'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1000000-0000-0000-0000-000000000002', TRUE, NOW() - INTERVAL '3 days'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1000000-0000-0000-0000-000000000003', TRUE, NOW() - INTERVAL '2 days'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1000000-0000-0000-0000-000000000004', TRUE, NOW() - INTERVAL '1 days'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1000000-0000-0000-0000-000000000005', TRUE, NOW() - INTERVAL '4 hours')
ON CONFLICT (user_id, topic_id) DO NOTHING;

-- 6. INITIAL USER NOTES
INSERT INTO notes (id, user_id, roadmap_id, module_id, content) VALUES
(
    'c1000000-0000-0000-0000-000000000001',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000001',
    '# Study Notes — Semantic Web & A11y

- Always use `<main>` once per page to enclose primary unique content.
- For buttons that trigger action without changing URL: use `<button type="button">`, NEVER `<div onClick>`.
- Color contrast ratio minimum for normal text: 4.5:1 (WCAG AA).
- Key learning: `aria-expanded` and `aria-controls` are essential for accessible accordions and dropdowns!'
) ON CONFLICT (id) DO NOTHING;
