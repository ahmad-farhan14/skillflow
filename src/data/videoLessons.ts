import { TopicVideoLesson } from "../types";
import { buildTopicVideoQuiz } from "../utils/quiz";

function createVideoLesson(
  videoUrl: string,
  videoTitle: string,
  overview: string,
  takeaways: string[],
  prompt: string,
  correctAnswer: string,
  distractors: [string, string],
  correctIndex: number,
): TopicVideoLesson {
  if (
    !Number.isInteger(correctIndex) ||
    correctIndex < 0 ||
    correctIndex > distractors.length
  ) {
    throw new Error(`Invalid quiz answer index for "${videoTitle}".`);
  }

  const options = distractors.map((text) => ({ text }));
  options.splice(correctIndex, 0, { text: correctAnswer });

  return {
    videoUrl,
    videoTitle,
    overview,
    takeaways,
    quiz: [{ prompt, options, correctIndex }],
  };
}

const lessonSources: Record<string, TopicVideoLesson> = {
  "t1000000-0000-0000-0000-000000000001": {
    videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
    videoTitle: "HTML Tutorial for Beginners: HTML Crash Course",
    overview:
      "This lesson introduces HTML as the foundation that gives web pages their content and structure. It walks through building a document from nested elements and choosing semantic tags so both browsers and people can understand each section.",
    takeaways: [
      "Start a page with the standard `<!doctype html>`, `<html>`, `<head>`, and `<body>` document structure.",
      "Wrap content in matching opening and closing tags, such as `<h1>Title</h1>` and `<p>Text</p>`.",
      "Choose semantic elements such as `<header>`, `<main>`, `<nav>`, and `<footer>` to communicate each region's purpose.",
      "Nest child elements inside their parent and close them in reverse order to keep the document hierarchy valid.",
    ],
    quiz: [
      {
        prompt: "What does semantic HTML communicate?",
        correctIndex: 0,
        options: [
          { text: "The role and meaning of page content" },
          { text: "The visual styling of page content" },
          { text: "The order in which scripts execute" },
        ],
      },
      {
        prompt: "What is the purpose of nesting HTML elements?",
        correctIndex: 1,
        options: [
          { text: "To control the visual spacing between elements" },
          { text: "To express structure and relationships in a document" },
          { text: "To define how the browser handles user events" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000006": {
    videoUrl: "https://www.youtube.com/watch?v=phWxA89Dy94",
    videoTitle: "Learn Flexbox CSS in 8 minutes",
    overview:
      "This lesson explains Flexbox as a one-dimensional layout system for arranging items in a row or a column. It connects the container's main and cross axes to the properties used to align, distribute, and space its children.",
    takeaways: [
      "Set `display: flex` on the parent to make its direct children flex items.",
      "Use `flex-direction: row` or `column` to choose the main axis and the order of layout.",
      "Apply `justify-content` along the main axis and `align-items` along the cross axis.",
      "Use `gap` for consistent spacing between items instead of adding margins to each child.",
    ],
    quiz: [
      {
        prompt:
          "Flexbox is primarily designed for layouts in how many dimensions?",
        correctIndex: 1,
        options: [
          { text: "Two" },
          { text: "One" },
          { text: "A fixed number of columns" },
        ],
      },
      {
        prompt: "Which pair of properties aligns and distributes flex items?",
        correctIndex: 0,
        options: [
          { text: "justify-content and align-items" },
          { text: "flex-direction and flex-wrap" },
          { text: "order and flex-basis" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000007": {
    videoUrl: "https://www.youtube.com/watch?v=EiNiSFIPIQE",
    videoTitle: "Learn CSS Grid - A 13 Minute Deep Dive",
    overview:
      "This lesson presents CSS Grid as a two-dimensional layout system for placing content across rows and columns. It covers defining grid tracks on a container and using fractional units to distribute available space between them.",
    takeaways: [
      "Turn a parent into a grid container with `display: grid` before defining its tracks.",
      "Use `grid-template-columns: 1fr 1fr` or `repeat(3, 1fr)` to describe column sizing.",
      "Use the `fr` unit to divide the remaining container space proportionally between tracks.",
      "Set `gap` on the grid container to maintain consistent spacing between rows and columns.",
    ],
    quiz: [
      {
        prompt: "What kind of layout is CSS Grid designed to create?",
        correctIndex: 0,
        options: [
          { text: "Two-dimensional layouts with rows and columns" },
          { text: "A single row or column controlled by one axis" },
          { text: "A sequence of inline elements within a text line" },
        ],
      },
      {
        prompt: "What does the fr unit distribute in a grid?",
        correctIndex: 1,
        options: [
          { text: "A fixed number of pixels in every track" },
          { text: "Available space between tracks" },
          { text: "The percentage of the viewport used by each item" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000008": {
    videoUrl: "https://www.youtube.com/watch?v=mr15Xzb1Ook",
    videoTitle: "Tailwind in 100 Seconds",
    overview:
      "This lesson introduces Tailwind CSS's utility-first approach, where small classes apply individual styling decisions directly in markup. It shows how composing utilities and adding responsive variants can build and adapt an interface without leaving the component.",
    takeaways: [
      "Compose utility classes such as `flex`, `p-4`, and `text-sm` on the element that needs each style.",
      "Combine layout and visual utilities on one element rather than creating a separate class for every combination.",
      "Prefix a utility with a breakpoint variant, such as `md:flex`, to apply it at that screen size and above.",
      "Use state variants such as `hover:bg-blue-600` to style interaction states alongside the base style.",
    ],
    quiz: [
      {
        prompt: "How does Tailwind primarily apply styles?",
        correctIndex: 2,
        options: [
          { text: "By writing a separate stylesheet for each component" },
          { text: "By assigning styles only through element selectors" },
          { text: "By composing utility classes in markup" },
        ],
      },
      {
        prompt: "What do responsive variants let you do?",
        correctIndex: 0,
        options: [
          { text: "Apply utilities at selected breakpoints" },
          { text: "Change utility classes into component names" },
          { text: "Apply every style only at the largest screen size" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000010": {
    videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    videoTitle:
      "JavaScript Course for Beginners – Your First Step to Web Development",
    overview:
      "This lesson introduces JavaScript as the language that adds behavior and decision-making to web applications. It builds foundational programming ideas around values, variables, expressions, and reusable functions that accept input and produce results.",
    takeaways: [
      "Declare a value that should not be reassigned with `const`; use `let` when reassignment is needed.",
      "Store related data with suitable types, such as strings for text and numbers for arithmetic.",
      "Define reusable behavior with a function, for example `function greet(name) { ... }`, and pass input through parameters.",
      "Use `return` to send a function's result back to the code that called it.",
    ],
    quiz: [
      {
        prompt: "What role does JavaScript play in a web application?",
        correctIndex: 1,
        options: [
          { text: "It defines the document's content structure" },
          { text: "It adds behavior and program logic" },
          { text: "It controls the page's visual styling rules" },
        ],
      },
      {
        prompt: "What is a function used for?",
        correctIndex: 0,
        options: [
          { text: "Grouping reusable steps that can accept input" },
          { text: "Storing a value that cannot be used again" },
          { text: "Declaring a variable's visual type" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000014": {
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    videoTitle:
      "React Course - Beginner's Tutorial for React JavaScript Library [2022]",
    overview:
      "This lesson introduces React's component-based approach to building user interfaces from small, reusable pieces. It explains how JSX describes the rendered interface and how components receive data through props and respond to changing state.",
    takeaways: [
      "Create a component as a function that returns the part of the interface it represents.",
      "Write JSX to describe UI, and wrap sibling elements in one parent or a fragment.",
      "Pass values from a parent to a child as props, then read them from the component's parameters.",
      "Use state for values that change over time so React can re-render the component when they update.",
    ],
    quiz: [
      {
        prompt: "What is the main building block of a React interface?",
        correctIndex: 1,
        options: [
          { text: "A browser event listener" },
          { text: "A reusable component" },
          { text: "A single root HTML document" },
        ],
      },
      {
        prompt: "How does a parent commonly pass data to a child component?",
        correctIndex: 2,
        options: [
          { text: "Through the child's local state" },
          { text: "Through a DOM event handler only" },
          { text: "Through props" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000018": {
    videoUrl: "https://www.youtube.com/watch?v=ZVnjOPwW4ZA",
    videoTitle:
      "Next js Tutorial for Beginners | Nextjs 13 (App Router) with TypeScript",
    overview:
      "This lesson introduces the Next.js App Router and its file-system approach to organizing application routes and shared layouts. It also distinguishes server-rendered components from client components, helping developers choose where browser-side interactivity belongs.",
    takeaways: [
      "Create route segments as folders under `app/` and expose a page with a `page.tsx` file.",
      "Put shared UI in a `layout.tsx` file so it can wrap pages in that route segment.",
      "Keep components as Server Components by default when they do not need browser APIs or event handlers.",
      "Add the `'use client'` directive at a component boundary when state, effects, or browser interaction is required.",
    ],
    quiz: [
      {
        prompt: "What does the App Router use to organize routes?",
        correctIndex: 1,
        options: [
          { text: "A separate route registry in every component" },
          { text: "A file-system convention" },
          { text: "URL fragments declared in CSS" },
        ],
      },
      {
        prompt: "When is a Client Component appropriate?",
        correctIndex: 0,
        options: [
          { text: "When browser-side interactivity is needed" },
          { text: "For every page, even when it has no interaction" },
          { text: "Only when a route reads a database schema" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000025": {
    videoUrl: "https://www.youtube.com/watch?v=lsMQRaeKNDk",
    videoTitle: "What is a REST API?",
    overview:
      "This lesson explains how a REST API exposes resources that clients can access over HTTP. It connects resource URLs and HTTP methods with the idea of stateless requests, where each request carries the information needed for the server to process it.",
    takeaways: [
      "Model API endpoints around resources, using URLs such as `/users/42` to identify a specific resource.",
      "Use HTTP methods to express intent: `GET` to read, `POST` to create, `PUT` or `PATCH` to update, and `DELETE` to remove.",
      "Return an appropriate HTTP status code so clients can distinguish success from errors.",
      "Keep requests stateless by including the authentication and input needed for each operation rather than relying on hidden server-side session context.",
    ],
    quiz: [
      {
        prompt: "What does a REST API expose for clients to interact with?",
        correctIndex: 0,
        options: [
          { text: "Resources over HTTP" },
          { text: "A rendered page with no resource interface" },
          { text: "A direct connection to the client's local files" },
        ],
      },
      {
        prompt: "What does a stateless request imply?",
        correctIndex: 1,
        options: [
          {
            text: "The server must remember the previous request's full state",
          },
          { text: "Each request carries the information needed to process it" },
          { text: "The client must keep a persistent connection open" },
        ],
      },
    ],
  },
  "t2000000-0000-0000-0000-000000000006": {
    videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
    videoTitle: "UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma",
    overview:
      "This lesson walks through a UI/UX design workflow that moves from a wireframe to a polished mockup and then to an interactive prototype. It emphasizes solving the screen's structure and hierarchy before refining its visual details.",
    takeaways: [
      "Sketch a wireframe first to establish the screen layout, content hierarchy, and key user flow.",
      "Use mockups to add colors, typography, and other visual styling after the structure is clear.",
      "Keep spacing and alignment consistent so related content reads as a coherent interface.",
      "Link screens in a prototype to demonstrate how a user moves through the design before implementation.",
    ],
    quiz: [
      {
        prompt: "What should a wireframe communicate first?",
        correctIndex: 2,
        options: [
          { text: "Final colors, shadows, and typography" },
          { text: "Detailed interaction animations" },
          { text: "The structure and layout of a screen" },
        ],
      },
      {
        prompt: "What does a mockup add to a wireframe?",
        correctIndex: 1,
        options: [
          { text: "A second navigation hierarchy" },
          { text: "Visual styling" },
          { text: "A user-testing session recording" },
        ],
      },
    ],
  },
  "t2000000-0000-0000-0000-000000000007": {
    videoUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
    videoTitle: "Figma UI Design Tutorial: Get Started in Just 24 Minutes!",
    overview:
      "This lesson introduces Figma's canvas and core tools for designing interface screens. It shows how frames organize a design, how reusable elements improve consistency, and how those screens can be connected into a prototype.",
    takeaways: [
      "Create a frame for each screen or bounded region so its dimensions and contents stay organized.",
      "Use layers to select, rename, and arrange individual interface elements in a predictable hierarchy.",
      "Turn repeated UI into reusable components so shared changes stay consistent across screens.",
      "Connect frames in prototype mode to preview navigation and communicate the intended interaction flow.",
    ],
    quiz: [
      {
        prompt: "What does a Figma frame commonly represent?",
        correctIndex: 0,
        options: [
          { text: "A screen or region of an interface design" },
          { text: "A reusable group of interface elements" },
          { text: "A path in a vector network" },
        ],
      },
      {
        prompt: "Why use reusable elements in a design?",
        correctIndex: 2,
        options: [
          { text: "To avoid defining a layout for each screen" },
          { text: "To turn a mockup into a user interview" },
          { text: "To keep repeated interface elements consistent" },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000002": createVideoLesson(
    "https://www.youtube.com/watch?v=VyWRmepESoQ",
    "Web Accessibility Tutorial (A11y) - Keyboard Navigation, Aria Tags, Contrast, Semantics and more!",
    "This lesson demonstrates practical web accessibility through semantic HTML, keyboard operation, ARIA, and readable contrast. It shows how small implementation choices affect people navigating with keyboards and assistive technology.",
    [
      "Prefer native semantic controls such as `<button>` and `<a>` before adding custom ARIA roles.",
      "Give icon-only controls accessible names with visible text or an appropriate `aria-label`.",
      "Keep every interactive control reachable and usable with the keyboard, with a visible focus indicator.",
      "Check text and control contrast against WCAG guidance instead of relying on color alone.",
    ],
    "What should you prefer when a native element already provides the required semantics?",
    "Use the native HTML element before adding ARIA.",
    [
      "Replace it with a generic div and add visual styling.",
      "Add ARIA roles to every element by default.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000003": createVideoLesson(
    "https://www.youtube.com/watch?v=h5qqmE83Tes",
    "How to set custom error messages for your HTML forms",
    "This lesson shows how browser-native form validation can be made clearer with custom error messages. It builds on semantic form controls and explains how to connect validation feedback to the field a person needs to fix.",
    [
      "Use the correct input type and constraints such as `required`, `min`, `max`, or `pattern` before writing custom validation.",
      "Listen for the form's `invalid` event and use `setCustomValidity()` when a field needs a specific message.",
      "Clear a custom message with `setCustomValidity('')` after the value changes and becomes valid.",
      "Associate each control with a visible `<label>` and expose useful error text to assistive technology.",
    ],
    "How do you clear a custom validity message after a field becomes valid?",
    "Call `setCustomValidity('')` on the input.",
    [
      "Remove the input's `required` attribute.",
      "Call `form.reset()` after every keystroke.",
    ],
    0,
  ),
  "t1000000-0000-0000-0000-000000000004": createVideoLesson(
    "https://www.youtube.com/watch?v=lI6EtxjoyDU",
    "JSON-LD Structured Data: Where to Insert in a Page?",
    "This lesson explains how JSON-LD structured data is placed in a page and how search engines can use it to understand content. It complements page titles, descriptions, and social metadata by showing how structured facts are represented for crawlers.",
    [
      "Add a descriptive, unique `<title>` and meta description to each page.",
      'Represent supported structured information in a JSON-LD `<script type="application/ld+json">` block.',
      "Keep structured data accurate and consistent with content visible on the page.",
      "Validate markup with Google's Rich Results Test and treat eligibility as separate from a ranking guarantee.",
    ],
    "Which script type is used to embed JSON-LD structured data?",
    "`application/ld+json`",
    ["`text/css`", "`application/javascript`"],
    2,
  ),
  "t1000000-0000-0000-0000-000000000005": createVideoLesson(
    "https://www.youtube.com/watch?v=jhjVKZB9yc0",
    "These CSS features give us more control on the cascade and specificity",
    "This lesson explores how modern CSS cascade features make style priority easier to reason about. It connects cascade layers and specificity to practical techniques for organizing rules without relying on increasingly complex selectors.",
    [
      "Use `box-sizing: border-box` when you want declared widths to include padding and borders.",
      "Remember that the cascade considers origin, importance, layers, specificity, and source order.",
      "Declare `@layer` order centrally so component and utility rules have a predictable priority.",
      "Prefer a deliberate layer structure over escalating selector specificity to override earlier rules.",
    ],
    "What is a practical reason to use CSS cascade layers?",
    "They make groups of styles follow an explicit, predictable precedence order.",
    [
      "They disable the specificity calculation for every declaration.",
      "They replace the box model and remove element dimensions.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000009": createVideoLesson(
    "https://www.youtube.com/watch?v=2rlWBZ17Wes",
    "Learn how to use Media queries & Container queries",
    "Kevin Powell introduces responsive styling with viewport media queries and element-based container queries. The lesson shows why a reusable component often needs to respond to the width of its own container rather than the entire screen.",
    [
      "Establish an inline-size query container with `container-type: inline-size` on the ancestor.",
      "Use `@container (min-width: 30rem) { ... }` to adapt a component to its available container width.",
      "Use media queries for viewport-level layout decisions and container queries for reusable component decisions.",
      "Test a component at several parent widths, including narrow sidebars and multi-column layouts.",
    ],
    "What does a container query measure to decide when its styles apply?",
    "The size of a designated ancestor container.",
    [
      "The user's device pixel ratio.",
      "The width of the browser's full viewport only.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000011": createVideoLesson(
    "https://www.youtube.com/watch?v=cOoP8-NPLSo",
    "Learn Event Delegation In 10 Minutes",
    "This lesson explains how bubbling lets an ancestor handle events from many child elements. Event delegation reduces repeated listeners and is especially useful for lists whose items can be added or removed dynamically.",
    [
      "Attach one listener to a stable parent instead of registering identical handlers on every child.",
      "Inspect `event.target` and use `closest()` to locate the actionable descendant.",
      "Confirm the matched element belongs to the delegated container before acting on it.",
      "Use `event.currentTarget` for the listener-owning element and `event.target` for the originating element.",
    ],
    "Why can event delegation handle a list item added after the listener is registered?",
    "The parent listener receives the new item's bubbled events.",
    [
      "The browser automatically attaches a copy of the listener to each new item.",
      "The event is converted into a capture-only event.",
    ],
    2,
  ),
  "t1000000-0000-0000-0000-000000000012": createVideoLesson(
    "https://www.youtube.com/watch?v=670f71LTWpM",
    "Asynchronous JavaScript in ~10 Minutes - Callbacks, Promises, and Async/Await",
    "This lesson introduces asynchronous JavaScript through callbacks, promises, and `async`/`await`. It explains how asynchronous work lets the main thread continue and how promise reactions are scheduled separately from synchronous code.",
    [
      "Return a promise from asynchronous functions so callers can compose or await the result.",
      "Use `async` functions and `await` to express sequential promise-based work clearly.",
      "Wrap awaited operations in `try`/`catch` or use `.catch()` so rejections are handled.",
      "Use `Promise.all()` when independent tasks should run together and all results are required.",
    ],
    "What does `await` do inside an async function?",
    "It waits for a promise to settle before continuing that function.",
    [
      "It blocks the browser's entire JavaScript thread until completion.",
      "It converts every rejected promise into a successful value.",
    ],
    0,
  ),
  "t1000000-0000-0000-0000-000000000013": createVideoLesson(
    "https://www.youtube.com/watch?v=07c9vKj47vk",
    "#17. JavaScript Browser Storage: localStorage, sessionStorage & IndexedDB | JS 2026",
    "This lesson compares browser storage choices for persisting client-side data. It distinguishes simple string key-value storage from IndexedDB's asynchronous structured data store and highlights the need to handle parsing and storage failures.",
    [
      "Use `localStorage` for small string values that should remain across browser sessions.",
      "Choose `sessionStorage` when data should be scoped to the current tab session.",
      "Serialize objects with `JSON.stringify()` and handle invalid stored JSON when parsing.",
      "Use IndexedDB for larger structured datasets and account for its asynchronous API and quota errors.",
    ],
    "Which storage option is designed for larger structured client-side datasets?",
    "IndexedDB",
    ["`sessionStorage` only.", "A URL fragment."],
    2,
  ),
  "t1000000-0000-0000-0000-000000000015": createVideoLesson(
    "https://www.youtube.com/watch?v=V9i3cGD-mts",
    "Learn React Hooks: useState - Simply Explained!",
    "This lesson introduces `useState` as React's way to preserve a component value between renders and trigger an update when it changes. It demonstrates the setter pattern and why updates to objects and arrays should create new values rather than mutate existing state.",
    [
      "Initialize state with `const [value, setValue] = useState(initialValue)` inside a component.",
      "Use a functional update such as `setCount(current => current + 1)` when the next value depends on the previous one.",
      "Replace objects and arrays immutably instead of modifying the existing state value in place.",
      "Keep state minimal and derived values calculated from existing props or state where practical.",
    ],
    "When should you use a functional state update?",
    "When the next state depends on the current state value.",
    [
      "Whenever a component renders for the first time.",
      "To mutate an object directly without triggering a render.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000016": createVideoLesson(
    "https://www.youtube.com/watch?v=VCd_zL2C3XM",
    "useEffect - Avoid This Common Mistake in React",
    "This lesson focuses on using `useEffect` to synchronize a React component with systems outside React, rather than as a general place for derived calculations. It covers dependency tracking and cleanup so subscriptions and other external work remain aligned with current props and state.",
    [
      "Use an effect to synchronize with an external system such as a subscription, timer, or browser API.",
      "List every reactive value read by the effect in its dependency array.",
      "Return a cleanup function to unsubscribe, clear timers, or abort work when dependencies change or the component unmounts.",
      "Calculate values from props and state during rendering instead of copying them into state with an effect.",
    ],
    "What is the primary purpose of `useEffect`?",
    "Synchronizing a component with an external system.",
    [
      "Declaring a value that is recalculated during rendering.",
      "Replacing event handlers for every user interaction.",
    ],
    0,
  ),
  "t1000000-0000-0000-0000-000000000017": createVideoLesson(
    "https://www.youtube.com/watch?v=I2Bgi0Qcdvc",
    "Custom Hooks in React (Design Patterns)",
    "This lesson shows how a custom Hook can package reusable stateful behavior behind a function beginning with `use`. It emphasizes sharing logic between components while keeping each component's state independent and its effects properly cleaned up.",
    [
      "Name custom Hooks with the `use` prefix, such as `useWindowSize()` or `useDebouncedValue()`.",
      "Call Hooks at the top level of a component or another Hook, not inside conditions or loops.",
      "Extract behavior and state wiring into a Hook while leaving component-specific rendering in the component.",
      "Return a cleanup function from effects inside the Hook when registering listeners or timers.",
    ],
    "What does a custom Hook primarily let you reuse?",
    "Stateful logic and synchronization behavior between components.",
    [
      "A single shared state instance for every component using the Hook.",
      "A way to call React Hooks conditionally.",
    ],
    2,
  ),
  "t1000000-0000-0000-0000-000000000019": createVideoLesson(
    "https://www.youtube.com/watch?v=gSSsZReIFRk",
    "Next.js App Router: Routing, Data Fetching, Caching",
    "This Vercel lesson introduces the App Router's file-system route structure and the way layouts can be shared across nested segments. It connects page, layout, and loading conventions to how a route's UI is composed and streamed.",
    [
      "Create a route segment with a folder under `app/` and render its page from `page.tsx`.",
      "Use `layout.tsx` for UI shared by nested pages and preserve it during navigation.",
      "Add `loading.tsx` to provide a route-level loading UI while content is being prepared.",
      "Use dynamic segment folders such as `[slug]` when part of the route is data-driven.",
    ],
    "Which file defines the UI for a route segment in the App Router?",
    "`page.tsx`",
    ["`route.css`.", "`middleware.tsx` in every folder."],
    1,
  ),
  "t1000000-0000-0000-0000-000000000020": createVideoLesson(
    "https://www.youtube.com/watch?v=g9Lu81MuNxE",
    "Master Next.js Server Actions for Data Mutations & Forms (2026 Guide)",
    "This lesson demonstrates server actions as server-side functions that can handle form submissions and data mutations. It discusses the boundary between client input and trusted server logic, including validation and updating the UI after a change.",
    [
      "Mark a server action with `'use server'` and keep privileged data access on the server.",
      "Treat all submitted `FormData` as untrusted and validate it before performing a mutation.",
      "Use a form `action` to submit data and provide pending/error feedback to the user.",
      "Revalidate or refresh affected data after a successful write so the rendered UI stays current.",
    ],
    "Where should a Server Action validate submitted form data?",
    "On the server, before applying the mutation.",
    [
      "Only in client-side form validation.",
      "After returning success to the browser.",
    ],
    0,
  ),
  "t1000000-0000-0000-0000-000000000021": createVideoLesson(
    "https://www.youtube.com/watch?v=7IQ25YIJrg8",
    "NextJS Tutorial #14 - Images & Fonts Optimization",
    "This lesson covers Next.js image and font optimization through framework-aware components and loading strategies. It explains how choosing dimensions, formats, and locally managed fonts can improve rendering performance and reduce layout movement.",
    [
      "Use `next/image` with an accurate `alt` value and provide dimensions or a responsive fill layout.",
      "Prioritize the actual above-the-fold hero image rather than eager-loading every image.",
      "Load fonts through `next/font` to optimize delivery and reduce layout shifts.",
      "Load third-party scripts with an intentional strategy instead of blocking initial rendering by default.",
    ],
    "Which Next.js feature is intended to optimize image rendering?",
    "The `next/image` component.",
    ["The `next/script` component.", "A CSS `@font-face` declaration alone."],
    1,
  ),
  "t1000000-0000-0000-0000-000000000022": createVideoLesson(
    "https://www.youtube.com/watch?v=6uV26eM11XE",
    "Global State in React with Context API + useReducer | Code With Me",
    "This lesson combines React Context with `useReducer` to share and update application state across a component tree. It distinguishes the context provider that distributes a value from the reducer that centralizes state transitions.",
    [
      "Define a reducer as `(state, action) => nextState` and keep it free of side effects.",
      "Dispatch descriptive actions and handle each transition in the reducer's switch or equivalent logic.",
      "Place a context provider around the components that need the shared state and dispatch function.",
      "Keep state local when it is only needed by one small part of the UI to avoid unnecessary global coupling.",
    ],
    "What role does the reducer play in a Context + useReducer setup?",
    "It calculates the next state from the current state and dispatched action.",
    [
      "It automatically persists state to a database.",
      "It renders provider children directly.",
    ],
    2,
  ),
  "t1000000-0000-0000-0000-000000000023": createVideoLesson(
    "https://www.youtube.com/watch?v=_ngCLZ5Iz-0",
    "Zustand - Complete Tutorial",
    "This lesson introduces Zustand as a small external store for sharing state in React without wrapping the app in many nested providers. It covers defining a store and selecting only the state a component needs.",
    [
      "Create a store with `create()` and define state plus actions together in one store creator.",
      "Select a specific value with a selector rather than subscribing a component to the entire store.",
      "Update state through store actions and avoid mutating nested values in place.",
      "Keep server-fetched data and client-owned UI state separate when their caching needs differ.",
    ],
    "Why use a selector when reading from a Zustand store?",
    "To subscribe a component to only the state it needs.",
    [
      "To make the store available without creating it.",
      "To turn the store into a server component.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000024": createVideoLesson(
    "https://www.youtube.com/watch?v=mPaCnwpFvZY",
    "TanStack Query - How to become a React Query God",
    "This lesson explains how TanStack Query manages server state through queries, caching, and background updates. It shows how stable query keys identify cached data and how mutations can keep that cache in sync.",
    [
      "Use `useQuery` with a stable `queryKey` that includes every value affecting the fetched result.",
      "Return parsed data from the query function and throw on failed HTTP responses so errors reach the query state.",
      "Invalidate the affected query key after a mutation when the cached result needs to be fetched again.",
      "Configure stale time intentionally to balance freshness against unnecessary network requests.",
    ],
    "What is a TanStack Query key used for?",
    "Identifying and organizing a cached server-state result.",
    [
      "Declaring a React component's local state.",
      "Replacing the server's HTTP status code.",
    ],
    0,
  ),
  "t1000000-0000-0000-0000-000000000026": createVideoLesson(
    "https://www.youtube.com/watch?v=ks0JiPArq-M",
    "Secure NextJS App with Env Variables #NextJS",
    "This lesson covers configuring environment variables in a Next.js application without exposing secrets to browser code. It distinguishes server-only settings from variables intentionally exposed through the public prefix.",
    [
      "Store local secrets in `.env.local` and keep that file out of version control.",
      "Never prefix a secret with `NEXT_PUBLIC_`; that prefix makes a value available to browser bundles.",
      "Read private credentials in server-only code and validate required configuration at startup.",
      "Use separate environment values for local, preview, and production deployments.",
    ],
    "What happens when a Next.js environment variable is prefixed with `NEXT_PUBLIC_`?",
    "It can be exposed to code sent to the browser.",
    [
      "It becomes encrypted and safe for any secret.",
      "It is automatically omitted from every client bundle.",
    ],
    1,
  ),
  "t1000000-0000-0000-0000-000000000027": createVideoLesson(
    "https://www.youtube.com/watch?v=W3jKJ3V_4V4",
    "Deploy ANY Next.js app in 9 Minutes (using the Vercel CLI with your own domain name)",
    "This lesson walks through deploying a Next.js project to Vercel and attaching a custom domain. It covers the deployment workflow and how platform configuration, DNS, and previews fit into shipping changes safely.",
    [
      "Connect a Git repository or deploy with the Vercel CLI from the project directory.",
      "Configure required environment variables in the Vercel project settings for each target environment.",
      "Use generated preview deployments to inspect changes before promoting them to production.",
      "Add a custom domain in project settings and configure the DNS records Vercel provides.",
    ],
    "What is a preview deployment useful for?",
    "Reviewing a branch's changes before they are promoted to production.",
    [
      "Replacing all production environment variables permanently.",
      "Skipping the build step on every deployment.",
    ],
    2,
  ),
  "t1000000-0000-0000-0000-000000000028": createVideoLesson(
    "https://www.youtube.com/watch?v=sInYS-EZ2Hg",
    "How Core Web Vitals and Lighthouse saved Zalando's release",
    "This Chrome for Developers case study shows how a team used Lighthouse and Core Web Vitals to identify performance problems before a release. It connects lab diagnostics with release decisions and the real user experience measured by performance metrics.",
    [
      "Use Lighthouse and field data together to identify real user performance bottlenecks.",
      "Improve LCP by reducing server response time and prioritizing the actual largest above-the-fold resource.",
      "Prevent CLS with reserved image dimensions and stable space for content that loads later.",
      "Track INP by keeping event handlers responsive and moving expensive work off interaction-critical paths.",
    ],
    "What does LCP measure?",
    "How quickly the largest visible content element is rendered.",
    [
      "How many JavaScript files are in the source tree.",
      "The number of layout shifts after the page is closed.",
    ],
    1,
  ),
  "t2000000-0000-0000-0000-000000000001": createVideoLesson(
    "https://www.youtube.com/watch?v=ldYzbV0NDp8",
    "What is Design Thinking? | IDEO U",
    "IDEO U introduces design thinking as a human-centered way to understand needs and develop solutions through experimentation. Its familiar stages—empathize, define, ideate, prototype, and test—are a flexible cycle rather than a one-way checklist.",
    [
      "Start with empathy work that observes users and uncovers their unmet needs.",
      "Frame a focused problem statement before selecting a solution.",
      "Generate multiple possible ideas before committing to a single direction.",
      "Build a low-cost prototype, test it with users, and use the learning to revise the problem or solution.",
    ],
    "What is the main purpose of prototyping in design thinking?",
    "To make an idea tangible so it can be tested and improved.",
    [
      "To lock the design before gathering user input.",
      "To replace the need to define a user problem.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000002": createVideoLesson(
    "https://www.youtube.com/watch?v=2W13ext26kQ",
    "Customer Journey Mapping 101",
    "This NN/g lesson demonstrates how to map a customer's experience across stages and touchpoints. Journey maps and personas help teams synthesize research, but they should reflect observed user evidence rather than invented stereotypes.",
    [
      "Base personas on patterns from research and describe goals, behaviors, and context rather than unsupported demographics.",
      "Map journey stages, user actions, channels, and pain points from the user's perspective.",
      "Use an empathy map to organize what users say, think, do, and feel from research evidence.",
      "Highlight moments of friction and opportunity so the map informs a specific design decision.",
    ],
    "What should a useful journey map be grounded in?",
    "Evidence about real user goals, actions, and pain points.",
    [
      "A team's assumptions about a typical customer.",
      "A list of visual design trends.",
    ],
    2,
  ),
  "t2000000-0000-0000-0000-000000000003": createVideoLesson(
    "https://www.youtube.com/watch?v=6Bw0n6Jvwxk",
    "Heuristic Evaluation of User Interfaces",
    "This NN/g lesson shows how reviewers inspect an interface against usability principles and record issues systematically. It complements user interviews and usability tests by identifying likely interaction problems for further investigation.",
    [
      "Evaluate key screens against usability principles such as visibility of system status and error prevention.",
      "Record each finding with the affected screen, observed issue, and a concrete user impact.",
      "Separate heuristic inspection from user testing; expert review does not replace observing real users.",
      "Prioritize findings by severity and frequency before proposing design changes.",
    ],
    "What does a heuristic evaluation compare an interface against?",
    "Established usability principles or heuristics.",
    [
      "Only the product's brand colors.",
      "A single participant's personal preference.",
    ],
    1,
  ),
  "t2000000-0000-0000-0000-000000000004": createVideoLesson(
    "https://www.youtube.com/watch?v=v39z0JPeIc8",
    "Information Architecture: 3 Key Models",
    "This NN/g lesson introduces information architecture models that help organize content around user needs. It connects card sorting, sitemaps, and taxonomies to navigation structures people can understand and find their way through.",
    [
      "Use open card sorting to discover how participants group and label content.",
      "Use closed card sorting to test whether content fits an existing set of categories.",
      "Translate validated groups into a sitemap and keep labels aligned with users' language.",
      "Test the resulting navigation hierarchy rather than assuming an internal org chart matches user mental models.",
    ],
    "What can card sorting reveal?",
    "How users group and label information.",
    [
      "Which button color produces the highest contrast.",
      "Whether a page's JavaScript bundle is too large.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000005": createVideoLesson(
    "https://www.youtube.com/watch?v=Gh4FABsped8",
    "How To Make User Flow In Figma (Easiest Way) [2026 GUIDE]",
    "This lesson demonstrates how to diagram a user's path through a task using Figma. User flows make screens, decisions, and alternative outcomes visible before high-fidelity interface work begins.",
    [
      "Start with the user's goal and identify the entry point and successful end state.",
      "Represent screens or steps consistently and label decision branches with their outcomes.",
      "Include common error, empty, and recovery paths rather than diagramming only the ideal journey.",
      "Review the flow with stakeholders and use it to define which screens a prototype must cover.",
    ],
    "What should a user flow make clear?",
    "The sequence of steps and decisions a user takes to reach a goal.",
    [
      "The final shadow and elevation values of every component.",
      "The database indexes used by the production app.",
    ],
    2,
  ),
  "t2000000-0000-0000-0000-000000000008": createVideoLesson(
    "https://www.youtube.com/watch?v=1odqpkfkDL8",
    "A Guide to Auto Layout: Best Practices, Tips & Tricks | Figma",
    "Figma's official lesson introduces Auto Layout as a way to make frames respond to their contents and spacing rules. It explains padding, item gaps, and fill behavior as tools for building components that adapt instead of relying on manual positioning.",
    [
      "Apply Auto Layout to a frame and set direction, item gap, and padding intentionally.",
      "Use Hug contents when a frame should wrap its children and Fill container when it should use available parent space.",
      "Prefer constraints and resizing behavior over manually repositioning elements after every content change.",
      "Test components with longer text and different child counts to catch brittle sizing choices.",
    ],
    "What does Fill container tell an Auto Layout child to do?",
    "Use the available space offered by its parent.",
    [
      "Resize itself to the exact dimensions of its text.",
      "Ignore the parent frame's layout rules.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000009": createVideoLesson(
    "https://www.youtube.com/watch?v=iIq8FLt1hUY",
    "Figma tutorial: Component properties",
    "This Figma lesson explains component properties as a way to expose useful variations without detaching instances. It connects variants and boolean, text, and instance-swap properties to scalable, understandable component libraries.",
    [
      "Create variants for meaningful component states or options and name their properties consistently.",
      "Use boolean properties to expose optional layers without creating duplicate components.",
      "Use text and instance-swap properties to let an instance change content or nested assets safely.",
      "Keep property names and variant combinations purposeful so designers can find the intended option.",
    ],
    "What is a benefit of component properties in Figma?",
    "They let instances expose controlled variations while staying connected to the component.",
    [
      "They automatically convert every frame into a prototype.",
      "They remove the need to organize component variants.",
    ],
    1,
  ),
  "t2000000-0000-0000-0000-000000000010": createVideoLesson(
    "https://www.youtube.com/watch?v=ot-5dQG2v5M",
    "Typographic Scales in Web Design & UI Design",
    "This lesson explains how a type scale creates a consistent hierarchy across interface text. It connects font size to line height, spacing, and legibility so headings and body copy work together at different screen sizes.",
    [
      "Choose a base text size and define a limited scale for headings and supporting text.",
      "Set line height for readability; body text generally needs more vertical space than display headings.",
      "Adjust letter spacing and kerning carefully, especially for large headings and all-caps labels.",
      "Test the type scale with real interface content and at narrow viewport widths.",
    ],
    "What does a typographic scale help establish?",
    "A consistent visual hierarchy between text sizes.",
    [
      "A fixed grid column count for every screen.",
      "The contrast ratio between two colors.",
    ],
    2,
  ),
  "t2000000-0000-0000-0000-000000000011": createVideoLesson(
    "https://www.youtube.com/watch?v=yYwEnLYT55c",
    "How I make UI color palettes",
    "This lesson walks through building interface color palettes with roles rather than selecting isolated attractive swatches. It shows how neutrals, brand colors, and semantic accents work together while remaining legible and consistent.",
    [
      "Define role-based tokens such as surface, text, border, primary action, and status colors.",
      "Choose a dominant neutral foundation and reserve accents for meaningful emphasis.",
      "Check text and control contrast for each foreground-background pairing.",
      "Test palette use in real screens and include hover, focus, disabled, and error states.",
    ],
    "Why define role-based color tokens?",
    "They keep colors consistent and make global theme changes easier.",
    [
      "They guarantee every color passes contrast without testing.",
      "They replace the need for interaction states.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000012": createVideoLesson(
    "https://www.youtube.com/watch?v=70zOzIE7y9I",
    "Web Accessibility (a11y) Deep Dive Series: Color Contrast: WCAG Ratios and How to Actually Test Them",
    "This lesson explains how WCAG contrast ratios help assess text legibility and how to test real foreground and background combinations. It reinforces that color contrast is one part of accessibility, alongside clear labels, keyboard access, and non-color cues.",
    [
      "Check normal text against the WCAG AA contrast ratio of at least 4.5:1.",
      "Use at least 3:1 contrast for large text and qualifying user-interface components.",
      "Measure the actual rendered foreground and background colors, including hover and disabled states.",
      "Do not use color as the only way to communicate errors, selections, or status.",
    ],
    "What is the WCAG AA minimum contrast ratio for normal-sized text?",
    "4.5:1",
    ["3:1 for every size of text.", "1:1 when the text uses a brand color."],
    1,
  ),
  "t2000000-0000-0000-0000-000000000013": createVideoLesson(
    "https://www.youtube.com/watch?v=-d6zNGeF59M",
    "Figma Tutorial: Prototyping & Transitions",
    "Figma's official lesson demonstrates connecting frames and choosing transitions to communicate how an interface responds. Smart Animate can interpolate matching layers between frames, making small state changes feel continuous without obscuring the interaction.",
    [
      "Connect the starting control to the destination frame in Prototype mode.",
      "Use Smart Animate when matching layer names and hierarchy should interpolate between states.",
      "Choose a short, purposeful duration and easing curve that reinforces rather than delays the task.",
      "Preview the interaction and provide a clear destination or back path for each prototype transition.",
    ],
    "When is Smart Animate most useful?",
    "When matching layers between frames should animate their changes.",
    [
      "When the prototype contains no frames or layers.",
      "When every transition must open an external website.",
    ],
    2,
  ),
  "t2000000-0000-0000-0000-000000000014": createVideoLesson(
    "https://www.youtube.com/watch?v=ReNbXhaL3Xk",
    "Figma tutorial: Interactive components",
    "Figma's official lesson shows how interactive components can model recurring interface states within a reusable component. Hover, pressed, selected, and disabled variants make the prototype communicate behavior consistently across instances.",
    [
      "Create clearly named variants for states such as default, hover, pressed, and disabled.",
      "Use component interactions to define triggers and state changes once for every instance.",
      "Make disabled states visibly distinct and ensure they do not imply an available action.",
      "Preview with pointer and keyboard-oriented flows to check that each state transition makes sense.",
    ],
    "What do interactive components help prototype?",
    "Reusable component states and transitions between them.",
    [
      "Only a page's static typography scale.",
      "Database writes performed by a deployed application.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000015": createVideoLesson(
    "https://www.youtube.com/watch?v=VEuwKJAz7Jg",
    "Figma tutorial: Prototype with variables",
    "Figma's official lesson demonstrates variables in prototypes for stateful behavior such as changing selections or displaying conditional content. Variables let a prototype represent simple logic without duplicating a frame for every possible state.",
    [
      "Create a variable with a clear name and suitable type for the value it represents.",
      "Bind component properties or layer visibility to variables where the design should react to state.",
      "Use prototype actions to set or toggle a variable in response to an interaction.",
      "Test both branches of a conditional flow and provide a way to return or reset the prototype state.",
    ],
    "What do variables add to a Figma prototype?",
    "State that can change and drive conditional behavior.",
    [
      "Automatic production data persistence.",
      "A replacement for organizing the design's frames.",
    ],
    1,
  ),
  "t2000000-0000-0000-0000-000000000016": createVideoLesson(
    "https://www.youtube.com/watch?v=JyCmacSyDY4",
    "Tokens, variables, and styles - Update: Introduction to design systems",
    "This Figma lesson introduces shared design values as a foundation for a consistent system. Color, spacing, and elevation tokens give teams a single vocabulary for repeating decisions and evolving themes.",
    [
      "Name tokens by role and intent, such as `color.text.primary` or `space.4`, rather than by one screen.",
      "Use a spacing scale consistently instead of choosing unrelated values for each component.",
      "Define elevation levels sparingly and verify they remain perceivable in every supported theme.",
      "Document token ownership and update shared values centrally when a system decision changes.",
    ],
    "What is a design token?",
    "A named, reusable value for a design decision such as color or spacing.",
    [
      "A screenshot exported from a prototype.",
      "A one-off value that cannot be reused.",
    ],
    2,
  ),
  "t2000000-0000-0000-0000-000000000017": createVideoLesson(
    "https://www.youtube.com/watch?v=xCJsRuH7v9w",
    "Figma tutorial: Collaboration and handoff in Dev Mode",
    "Figma's official lesson introduces Dev Mode as a workspace for inspecting designs and collaborating across design and engineering. It focuses on helping developers understand layout, assets, and implementation details from the source design.",
    [
      "Inspect the selected frame and component measurements rather than estimating spacing from a screenshot.",
      "Use shared component and variable names to connect design decisions with implementation tokens.",
      "Export or reference the correct assets and confirm their intended formats and sizes.",
      "Resolve open questions with the designer and record interaction behavior that static measurements cannot show.",
    ],
    "What is Dev Mode primarily intended to support?",
    "Inspecting designs and coordinating developer handoff.",
    [
      "Generating production-ready application code without review.",
      "Replacing usability research and testing.",
    ],
    0,
  ),
  "t2000000-0000-0000-0000-000000000018": createVideoLesson(
    "https://www.youtube.com/watch?v=LlbfdLxPpyk",
    "How To: Unmoderated User Testing in Maze Using a Figma Prototype",
    "This lesson demonstrates running an unmoderated usability study with a Figma prototype in Maze. It covers turning research goals into tasks, collecting participant behavior, and interpreting results as evidence rather than as a complete explanation on their own.",
    [
      "Write neutral tasks that describe a participant's goal without revealing the intended navigation.",
      "Test the prototype flow and task wording before inviting a larger participant group.",
      "Use success rates, paths, and participant comments together to locate usability problems.",
      "Treat unmoderated findings as evidence to investigate and iterate, not as a substitute for every research method.",
    ],
    "What makes a usability testing task less biased?",
    "It describes the participant's goal without telling them which control to choose.",
    [
      "It names the exact button to click in every step.",
      "It explains the expected answer before the task begins.",
    ],
    1,
  ),
};

const quizSources = Object.entries(lessonSources).map(([topicId, lesson]) => ({
  topicId,
  topicTitle: lesson.videoTitle,
  videoTitle: lesson.videoTitle,
  takeaways: lesson.takeaways,
}));

export const topicVideoLessons: Record<string, TopicVideoLesson> =
  Object.fromEntries(
    Object.entries(lessonSources).map(([topicId, lesson]) => [
      topicId,
      {
        ...lesson,
        quiz: buildTopicVideoQuiz(
          quizSources.find((source) => source.topicId === topicId)!,
          quizSources,
          lesson.quiz,
        ),
      },
    ]),
  );
