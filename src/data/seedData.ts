import { Roadmap, UserProfile, Note } from "../types";

export const initialUserProfile: UserProfile = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  email: "alex.pratama@example.com",
  full_name: "Alex Pratama",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  current_streak: 5,
  last_active_date: new Date().toISOString().split("T")[0],
  created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  weekly_activity: {
    // Last 7 days active status
    [new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0]]: false,
    [new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0]]: false,
    [new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0]]: true,
    [new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0]]: true,
    [new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0]]: true,
    [new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0]]: true,
    [new Date().toISOString().split("T")[0]]: true,
  },
};

export const initialRoadmaps: Roadmap[] = [
  {
    id: "f1000000-0000-0000-0000-000000000001",
    slug: "frontend-web-developer",
    title: "Frontend Web Developer",
    description: "Master modern web engineering from semantic markup and responsive CSS architectures to React, Next.js App Router, state management, and production cloud deployment.",
    category: "Development",
    icon: "Code2",
    estimated_hours: 75,
    level: "Career Track",
    modules: [
      {
        id: "m1000000-0000-0000-0000-000000000001",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "HTML & Semantic Web",
        description: "Build accessible, SEO-optimized, and robust document foundations using modern HTML5 semantics.",
        order_index: 1,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000001",
            module_id: "m1000000-0000-0000-0000-000000000001",
            title: "Semantic HTML5 Elements (<header>, <main>, <nav>, <article>)",
            description: "Understand proper structural document outlines, avoid div-soup, and assist search crawler indexing.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
            resource_label: "MDN Semantics Guide",
            order_index: 1,
            estimated_minutes: 30,
            difficulty: "Beginner",
            is_completed: true,
            completed_at: new Date(Date.now() - 4 * 86400000).toISOString(),
            key_takeaways: [
              "Always have exactly one <main> landmark per page",
              "Use <article> for self-contained syndicatable content",
              "Use <nav> for major navigation link clusters"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000002",
            module_id: "m1000000-0000-0000-0000-000000000001",
            title: "Web Accessibility (ARIA roles, contrast, & keyboard navigation)",
            description: "Build WCAG 2.1 compliant experiences with visible focus rings, aria labels, and screen reader testing.",
            resource_url: "https://web.dev/learn/accessibility/",
            resource_label: "web.dev A11y Course",
            order_index: 2,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: true,
            completed_at: new Date(Date.now() - 3 * 86400000).toISOString(),
            key_takeaways: [
              "First rule of ARIA: Do not use ARIA if a native HTML element exists",
              "Maintain 4.5:1 minimum color contrast ratio",
              "Ensure all interactive elements can be operated with Tab and Space/Enter"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000003",
            module_id: "m1000000-0000-0000-0000-000000000001",
            title: "Forms, Native Validations, and Input Constraints",
            description: "Accessible form controls with explicit labels, custom regex validation patterns, and UX helpers.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
            resource_label: "MDN Web Forms",
            order_index: 3,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: true,
            completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
            key_takeaways: [
              "Always bind <label htmlFor='id'> explicitly to inputs",
              "Leverage native input types: email, url, tel, number",
              "Provide clear error descriptions using aria-describedby"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000004",
            module_id: "m1000000-0000-0000-0000-000000000001",
            title: "SEO Essentials, Meta Tags, Open Graph & JSON-LD",
            description: "Craft rich social sharing card previews and structured schema.org snippets for Google search rankings.",
            resource_url: "https://moz.com/learn/seo/meta-tags",
            resource_label: "Moz Meta Tags Guide",
            order_index: 4,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: true,
            completed_at: new Date(Date.now() - 1 * 86400000).toISOString(),
            key_takeaways: [
              "Unique <title> (under 60 chars) and meta description (under 160 chars)",
              "Add og:image (1200x630px) for Twitter and LinkedIn previews",
              "Use JSON-LD for rich Google recipe, article, or product cards"
            ]
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000002",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "CSS & Modern Layouts (Flexbox/Grid/Tailwind)",
        description: "Master CSS box models, modern responsive layout engines, custom properties, and utility-first styling.",
        order_index: 2,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000005",
            module_id: "m1000000-0000-0000-0000-000000000002",
            title: "CSS Box Model, Specificity, & CSS Cascade Layers",
            description: "Deep dive into margin collapse, box-sizing: border-box, specificity scoring, and the @layer rule.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model",
            resource_label: "MDN Box Model",
            order_index: 1,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: true,
            completed_at: new Date(Date.now() - 4 * 3600000).toISOString(),
            key_takeaways: [
              "border-box ensures padding & border do not inflate element width",
              "Understand inline vs block formatting contexts",
              "@layer organizes CSS priorities cleanly without specificity wars"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000006",
            module_id: "m1000000-0000-0000-0000-000000000002",
            title: "Flexbox Alignment, Distribution, and Wrapping",
            description: "One-dimensional flexible layouts: justify-content, align-items, flex-grow, shrink, and wrap patterns.",
            resource_url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            resource_label: "CSS-Tricks Flexbox",
            order_index: 2,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false,
            key_takeaways: [
              "Main axis is governed by flex-direction; cross axis is perpendicular",
              "gap property replaces messy margin hacks on child items",
              "flex: 1 1 0 vs flex: 1 1 auto difference"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000007",
            module_id: "m1000000-0000-0000-0000-000000000002",
            title: "CSS Grid (Template areas, minmax, auto-fit/fill)",
            description: "Two-dimensional fluid grids without media queries using repeat(auto-fit, minmax(280px, 1fr)).",
            resource_url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            resource_label: "CSS-Tricks Grid Guide",
            order_index: 3,
            estimated_minutes: 50,
            difficulty: "Intermediate",
            is_completed: false,
            key_takeaways: [
              "auto-fit expands items to fill empty track space",
              "grid-template-areas provides ASCII-like layout readability",
              "subgrid allows child items to align with parent tracks"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000008",
            module_id: "m1000000-0000-0000-0000-000000000002",
            title: "Tailwind CSS Architecture & Modern Tokens",
            description: "Rapid utility prototyping, theme extensions, custom color variables, and dark mode variants.",
            resource_url: "https://tailwindcss.com/docs",
            resource_label: "Tailwind CSS Official",
            order_index: 4,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: false,
            key_takeaways: [
              "Utility classes keep CSS bundle size flat over time",
              "Arbitrary values [calc(100%-2rem)] for edge cases",
              "group-hover and peer modifiers for reactive UI styling"
            ]
          },
          {
            id: "t1000000-0000-0000-0000-000000000009",
            module_id: "m1000000-0000-0000-0000-000000000002",
            title: "Responsive Design & Container Queries (@container)",
            description: "Component-level responsive styling decoupled from global viewport width for modular UI cards.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
            resource_label: "MDN Container Queries",
            order_index: 5,
            estimated_minutes: 40,
            difficulty: "Advanced",
            is_completed: false,
            key_takeaways: [
              "Declare container-type: inline-size on parent wrapper",
              "Query child components with @container (min-width: 400px)",
              "Enables true plug-and-play UI widgets anywhere in the DOM"
            ]
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000003",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "JavaScript & DOM",
        description: "Core ES6+ syntax, asynchronous programming, closures, event delegation, and browser APIs.",
        order_index: 3,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000010",
            module_id: "m1000000-0000-0000-0000-000000000003",
            title: "Modern ES6+ Syntax (Destructuring, Spread, Optional Chaining)",
            description: "Clean, idiomatic modern JS primitives, array methods (.map, .filter, .reduce), and nullish coalescing.",
            resource_url: "https://javascript.info/",
            resource_label: "JavaScript.info Handbook",
            order_index: 1,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000011",
            module_id: "m1000000-0000-0000-0000-000000000003",
            title: "DOM Manipulation, Event Bubbling & Delegation",
            description: "Efficient event handling by attaching listeners to ancestors instead of hundreds of child nodes.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events",
            resource_label: "MDN Events Deep Dive",
            order_index: 2,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000012",
            module_id: "m1000000-0000-0000-0000-000000000003",
            title: "Asynchronous JS: Promises, Async/Await & Event Loop",
            description: "Understand the microtask queue, call stack, async/await error catching with try/catch, and Promise.all.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
            resource_label: "MDN Async Guide",
            order_index: 3,
            estimated_minutes: 60,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000013",
            module_id: "m1000000-0000-0000-0000-000000000003",
            title: "Browser Storage (localStorage, sessionStorage, IndexedDB)",
            description: "Persisting user settings client-side with robust JSON parsing error handling and quota limits.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
            resource_label: "MDN Storage API",
            order_index: 4,
            estimated_minutes: 30,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000004",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "React Fundamentals",
        description: "Component-driven UI architecture, JSX compilation, hooks lifecycle, props flow, and immutability.",
        order_index: 4,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000014",
            module_id: "m1000000-0000-0000-0000-000000000004",
            title: "JSX Syntax, Components & Props Composition",
            description: "Thinking in React: decomposing UI mockups into clean, reusable single-responsibility components.",
            resource_url: "https://react.dev/learn/describing-the-ui",
            resource_label: "React.dev UI Guide",
            order_index: 1,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000015",
            module_id: "m1000000-0000-0000-0000-000000000004",
            title: "useState & Component Interactivity",
            description: "State as a snapshot, updater functions, and immutable array/object updates without mutating state.",
            resource_url: "https://react.dev/learn/state-a-components-memory",
            resource_label: "React.dev State",
            order_index: 2,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000016",
            module_id: "m1000000-0000-0000-0000-000000000004",
            title: "useEffect & Lifecycle Synchronization",
            description: "Synchronizing with external systems, subscription cleanups, and avoiding infinite re-render loops.",
            resource_url: "https://react.dev/learn/synchronizing-with-effects",
            resource_label: "React.dev Effects",
            order_index: 3,
            estimated_minutes: 55,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000017",
            module_id: "m1000000-0000-0000-0000-000000000004",
            title: "Custom Hooks & Reusable Logic Extraction",
            description: "Encapsulating debouncing, window resize listeners, and local storage synchronization into useHooks.",
            resource_url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
            resource_label: "React.dev Custom Hooks",
            order_index: 4,
            estimated_minutes: 50,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000005",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "Next.js App Router",
        description: "Full-stack React framework with server components (RSC), nested layouts, dynamic routes, and streaming SSR.",
        order_index: 5,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000018",
            module_id: "m1000000-0000-0000-0000-000000000005",
            title: "Server vs Client Components (RSC Boundary)",
            description: "Zero bundle size server rendering vs interactive 'use client' directives at leaf nodes.",
            resource_url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
            resource_label: "Next.js Server Components",
            order_index: 1,
            estimated_minutes: 50,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000019",
            module_id: "m1000000-0000-0000-0000-000000000005",
            title: "File-system Routing (page.tsx, layout.tsx, loading.tsx)",
            description: "Nested layouts, suspense boundary skeletons, and dynamic [slug] parameter routing.",
            resource_url: "https://nextjs.org/docs/app/building-your-application/routing",
            resource_label: "Next.js App Routing",
            order_index: 2,
            estimated_minutes: 40,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000020",
            module_id: "m1000000-0000-0000-0000-000000000005",
            title: "Server Actions & Form Mutations",
            description: "Secure server-side database mutations invoked directly from React actions without boilerplate API routes.",
            resource_url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
            resource_label: "Next.js Server Actions",
            order_index: 3,
            estimated_minutes: 55,
            difficulty: "Advanced",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000021",
            module_id: "m1000000-0000-0000-0000-000000000005",
            title: "Image, Font & Script Optimization",
            description: "Automatic WebP/AVIF compression, self-hosted Google fonts via next/font, and zero CLS shifts.",
            resource_url: "https://nextjs.org/docs/app/building-your-application/optimizing/images",
            resource_label: "Next.js Optimizations",
            order_index: 4,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: false
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000006",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "State Management",
        description: "Choosing the right state abstraction: Context API, Zustand, TanStack Query, and optimistic updates.",
        order_index: 6,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000022",
            module_id: "m1000000-0000-0000-0000-000000000006",
            title: "React Context & useReducer for Global App State",
            description: "Centralized action dispatching for themes, authentication sessions, and modal managers.",
            resource_url: "https://react.dev/learn/scaling-up-with-reducer-and-context",
            resource_label: "React State Architecture",
            order_index: 1,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000023",
            module_id: "m1000000-0000-0000-0000-000000000006",
            title: "Zustand & Minimalist State Stores",
            description: "High-performance outside-React stores with fine-grained selector subscriptions.",
            resource_url: "https://zustand.docs.pmnd.rs/",
            resource_label: "Zustand Docs",
            order_index: 2,
            estimated_minutes: 40,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000024",
            module_id: "m1000000-0000-0000-0000-000000000006",
            title: "Server State Caching with TanStack Query (React Query)",
            description: "Automatic background refetching, caching, deduplication, and optimistic mutations.",
            resource_url: "https://tanstack.com/query/latest",
            resource_label: "TanStack Query",
            order_index: 3,
            estimated_minutes: 50,
            difficulty: "Advanced",
            is_completed: false
          }
        ]
      },
      {
        id: "m1000000-0000-0000-0000-000000000007",
        roadmap_id: "f1000000-0000-0000-0000-000000000001",
        title: "API Integration & Deployment",
        description: "REST APIs, GraphQL, environment variable security, CI/CD pipelines, and hosting on Vercel or cloud providers.",
        order_index: 7,
        topics: [
          {
            id: "t1000000-0000-0000-0000-000000000025",
            module_id: "m1000000-0000-0000-0000-000000000007",
            title: "RESTful API Patterns, HTTP Methods & Status Codes",
            description: "Designing predictable JSON endpoints, payload structures, idempotency, and status code etiquette.",
            resource_url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
            resource_label: "MDN HTTP Guide",
            order_index: 1,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000026",
            module_id: "m1000000-0000-0000-0000-000000000007",
            title: "Environment Variables & Secret Hygiene (.env.local)",
            description: "Distinguishing NEXT_PUBLIC_ variables from sensitive server-side database credentials.",
            resource_url: "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables",
            resource_label: "Next.js Security",
            order_index: 2,
            estimated_minutes: 30,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000027",
            module_id: "m1000000-0000-0000-0000-000000000007",
            title: "Vercel Deployment, Custom Domains & Preview Branches",
            description: "Git integration, automated branch previews, edge CDN routing, and SSL certificate provisioning.",
            resource_url: "https://vercel.com/docs/deployments/overview",
            resource_label: "Vercel Deployments",
            order_index: 3,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t1000000-0000-0000-0000-000000000028",
            module_id: "m1000000-0000-0000-0000-000000000007",
            title: "Lighthouse Audits & Core Web Vitals Optimization",
            description: "Diagnosing performance bottlenecks: LCP hero images, layout shifts (CLS), and interaction responsiveness (INP).",
            resource_url: "https://web.dev/vitals/",
            resource_label: "web.dev Vitals Guide",
            order_index: 4,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      }
    ]
  },
  {
    id: "d2000000-0000-0000-0000-000000000001",
    slug: "basic-ui-ux-design",
    title: "Basic UI/UX Design",
    description: "Learn human-centered product design principles, wireframing, Figma design systems, typography hierarchy, interactive micro-prototyping, and usability testing.",
    category: "Design",
    icon: "Palette",
    estimated_hours: 48,
    level: "Beginner Friendly",
    modules: [
      {
        id: "m2000000-0000-0000-0000-000000000001",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Design Thinking & UX Research",
        description: "Empathize with users, identify core pain points, conduct qualitative interviews, and define persona maps.",
        order_index: 1,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000001",
            module_id: "m2000000-0000-0000-0000-000000000001",
            title: "The 5 Stages of Design Thinking (Empathize to Test)",
            description: "Iterative non-linear process: Empathize, Define, Ideate, Prototype, and Test real human problems.",
            resource_url: "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process",
            resource_label: "IxDF Design Thinking",
            order_index: 1,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: true,
            completed_at: new Date(Date.now() - 3 * 86400000).toISOString(),
            key_takeaways: [
              "Design Thinking is iterative, not strictly sequential",
              "Fall in love with the user's problem, not your first solution",
              "Prototyping early prevents expensive re-work later"
            ]
          },
          {
            id: "t2000000-0000-0000-0000-000000000002",
            module_id: "m2000000-0000-0000-0000-000000000001",
            title: "User Personas, Empathy Maps & Journey Mapping",
            description: "Synthesizing qualitative interview data into realistic archetypes with emotional highs and lows.",
            resource_url: "https://www.nngroup.com/articles/persona/",
            resource_label: "NN/g Persona Guide",
            order_index: 2,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000003",
            module_id: "m2000000-0000-0000-0000-000000000001",
            title: "Conducting User Interviews & Heuristic Evaluation",
            description: "Master Jakob Nielsen's 10 usability heuristics and conduct impartial user interviews without bias.",
            resource_url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
            resource_label: "NN/g 10 Usability Heuristics",
            order_index: 3,
            estimated_minutes: 50,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      },
      {
        id: "m2000000-0000-0000-0000-000000000002",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Wireframing & Information Architecture",
        description: "Organize digital content logically, map user flows, and construct low-fidelity structural blueprints.",
        order_index: 2,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000004",
            module_id: "m2000000-0000-0000-0000-000000000002",
            title: "Card Sorting, Sitemaps & Navigation Taxonomies",
            description: "Categorize features according to user mental models; flat vs deep navigation hierarchies.",
            resource_url: "https://www.nngroup.com/articles/card-sorting-definition/",
            resource_label: "NN/g Card Sorting",
            order_index: 1,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000005",
            module_id: "m2000000-0000-0000-0000-000000000002",
            title: "User Flow Diagrams & Decision Trees",
            description: "Visualizing happy paths and error states from initial touchpoint to ultimate conversion goal.",
            resource_url: "https://balsamiq.com/learn/articles/user-flows/",
            resource_label: "Balsamiq Flow Course",
            order_index: 2,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000006",
            module_id: "m2000000-0000-0000-0000-000000000002",
            title: "Low-Fidelity Wireframing (Paper to Digital Grayscale)",
            description: "Rapid iteration on layout, proportion, and scanning patterns without colors or typography distractions.",
            resource_url: "https://uxdesign.cc/how-to-wireframe-a-step-by-step-guide-22c676d6cbf5",
            resource_label: "UX Collective Guide",
            order_index: 3,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false
          }
        ]
      },
      {
        id: "m2000000-0000-0000-0000-000000000003",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Figma Essentials",
        description: "Industry standard UI design tool mastery: Frames, Auto Layout, Components, and Variants.",
        order_index: 3,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000007",
            module_id: "m2000000-0000-0000-0000-000000000003",
            title: "Figma Interface, Frames, Vector Networks & Constraints",
            description: "Understand infinite canvas navigation, bezier vectors, and responsive frame resizing behavior.",
            resource_url: "https://help.figma.com/hc/en-us/articles/360040450133-Create-and-edit-vector-networks",
            resource_label: "Figma Vectors Guide",
            order_index: 1,
            estimated_minutes: 45,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000008",
            module_id: "m2000000-0000-0000-0000-000000000003",
            title: "Auto Layout Mastery (Padding, Gap, Fill Container)",
            description: "Mirror real CSS Flexbox logic directly in Figma for effortless dynamic content expansion.",
            resource_url: "https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties",
            resource_label: "Figma Auto Layout",
            order_index: 2,
            estimated_minutes: 60,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000009",
            module_id: "m2000000-0000-0000-0000-000000000003",
            title: "Components, Variants & Component Properties",
            description: "Build robust UI component libraries with swap properties, boolean visibility toggles, and state matrices.",
            resource_url: "https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants",
            resource_label: "Figma Variants Docs",
            order_index: 3,
            estimated_minutes: 55,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      },
      {
        id: "m2000000-0000-0000-0000-000000000004",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Typography & Color Theory",
        description: "Visual hierarchy, font pairing scales, color psychology, 60-30-10 rule, and dark mode contrast standards.",
        order_index: 4,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000010",
            module_id: "m2000000-0000-0000-0000-000000000004",
            title: "Modular Type Scales, Line Height & Kerning",
            description: "Establishing readable typographic hierarchies using ratio scales like Major Third (1.25) or Perfect Fourth (1.333).",
            resource_url: "https://type-scale.com/",
            resource_label: "Type Scale Tool",
            order_index: 1,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000011",
            module_id: "m2000000-0000-0000-0000-000000000004",
            title: "Color Systems (60-30-10 Rule, Accents & Neutral Slates)",
            description: "Harmonizing primary, secondary, and accent colors with functional semantic statuses (success, warning, error).",
            resource_url: "https://m3.material.io/styles/color/overview",
            resource_label: "Material Design Color",
            order_index: 2,
            estimated_minutes: 40,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000012",
            module_id: "m2000000-0000-0000-0000-000000000004",
            title: "WCAG 2.1 Contrast Guidelines (AA & AAA Certification)",
            description: "Color blindness considerations, APCA modern contrast algorithms, and dark mode tint balances.",
            resource_url: "https://webaim.org/resources/contrastchecker/",
            resource_label: "WebAIM Contrast Checker",
            order_index: 3,
            estimated_minutes: 30,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      },
      {
        id: "m2000000-0000-0000-0000-000000000005",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Interactive Prototyping",
        description: "Bring static screens to life: Smart Animate, interactive components, micro-interactions, and variables.",
        order_index: 5,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000013",
            module_id: "m2000000-0000-0000-0000-000000000005",
            title: "Figma Smart Animate & Micro-Transitions",
            description: "Physics-based easings, drawer slides, accordion toggles, and seamless screen morphing.",
            resource_url: "https://help.figma.com/hc/en-us/articles/360040035874-Create-animations-with-Smart-Animate",
            resource_label: "Figma Smart Animate",
            order_index: 1,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000014",
            module_id: "m2000000-0000-0000-0000-000000000005",
            title: "Interactive Component States (Hover, Active, Disabled)",
            description: "Self-contained interactive button and checkbox component sets that react on click without screen duplication.",
            resource_url: "https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components",
            resource_label: "Interactive Components",
            order_index: 2,
            estimated_minutes: 40,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000015",
            module_id: "m2000000-0000-0000-0000-000000000005",
            title: "Figma Variables & Conditional Prototype Logic",
            description: "Store string, number, and boolean state to simulate realistic cart checkout, dark mode switches, and form inputs.",
            resource_url: "https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-and-modes",
            resource_label: "Figma Variables",
            order_index: 3,
            estimated_minutes: 55,
            difficulty: "Advanced",
            is_completed: false
          }
        ]
      },
      {
        id: "m2000000-0000-0000-0000-000000000006",
        roadmap_id: "d2000000-0000-0000-0000-000000000001",
        title: "Usability Testing & Design Systems",
        description: "Design token governance, component libraries, developer handoff specs, and conducting moderated user tests.",
        order_index: 6,
        topics: [
          {
            id: "t2000000-0000-0000-0000-000000000016",
            module_id: "m2000000-0000-0000-0000-000000000006",
            title: "Design Tokens Architecture (Colors, Spacing, Elevation)",
            description: "Translating brand values into structured token JSON that bridges Figma and frontend CSS variables.",
            resource_url: "https://m3.material.io/foundations/design-tokens/overview",
            resource_label: "Design Tokens Overview",
            order_index: 1,
            estimated_minutes: 45,
            difficulty: "Intermediate",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000017",
            module_id: "m2000000-0000-0000-0000-000000000006",
            title: "Developer Handoff Best Practices & Dev Mode",
            description: "Writing comprehensive spec documentation, export assets, inspect spacing tokens, and provide responsive rules.",
            resource_url: "https://help.figma.com/hc/en-us/articles/15023124642200-Guide-to-Dev-Mode",
            resource_label: "Figma Dev Mode",
            order_index: 2,
            estimated_minutes: 35,
            difficulty: "Beginner",
            is_completed: false
          },
          {
            id: "t2000000-0000-0000-0000-000000000018",
            module_id: "m2000000-0000-0000-0000-000000000006",
            title: "Unmoderated Usability Testing (Maze / UserTesting)",
            description: "Crafting non-biased task prompts, calculating misclick rate, System Usability Scale (SUS) benchmarking.",
            resource_url: "https://maze.co/guides/usability-testing/",
            resource_label: "Maze Testing Guide",
            order_index: 3,
            estimated_minutes: 50,
            difficulty: "Intermediate",
            is_completed: false
          }
        ]
      }
    ]
  }
];

export const initialNotes: Note[] = [
  {
    id: "n1000000-0000-0000-0000-000000000001",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    roadmap_id: "f1000000-0000-0000-0000-000000000001",
    module_id: "m1000000-0000-0000-0000-000000000001",
    content: `### 📌 Study Notes — Semantic Web & Accessibility

- Always use \`<main>\` once per page for unique core content.
- Use \`<button type="button">\` for in-page actions; never bind click handlers to plain \`<div>\`.
- Minimum WCAG AA contrast ratio: **4.5:1** for regular text.
- Essential ARIA attributes: \`aria-expanded\`, \`aria-controls\`, and \`aria-label\`.

**Bookmarks:**
- https://web.dev/learn/accessibility/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA`,
    updated_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "n2000000-0000-0000-0000-000000000001",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    roadmap_id: "d2000000-0000-0000-0000-000000000001",
    module_id: "m2000000-0000-0000-0000-000000000001",
    content: `### 🎨 UI/UX Research Cheat Sheet

- **Jakob's Law:** Users spend most of their time on other sites. Match familiar patterns!
- **60-30-10 Rule:** 60% Dominant Background, 30% Secondary Card/Structure, 10% Vibrant Call-to-Action Accent.
- **Interviews:** Always ask open-ended questions like *"Tell me about the last time you..."* instead of *"Do you like this feature?"*`,
    updated_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];
