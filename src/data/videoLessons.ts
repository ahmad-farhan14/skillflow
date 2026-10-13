import { TopicVideoLesson } from "../types";

export const topicVideoLessons: Record<string, TopicVideoLesson> = {
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
        options: [
          { text: "The role and meaning of page content", isCorrect: true },
          { text: "The visual styling of page content", isCorrect: false },
          { text: "The order in which scripts execute", isCorrect: false },
        ],
      },
      {
        prompt: "What is the purpose of nesting HTML elements?",
        options: [
          { text: "To express structure and relationships in a document", isCorrect: true },
          { text: "To control the visual spacing between elements", isCorrect: false },
          { text: "To define how the browser handles user events", isCorrect: false },
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
        prompt: "Flexbox is primarily designed for layouts in how many dimensions?",
        options: [
          { text: "One", isCorrect: true },
          { text: "Two", isCorrect: false },
          { text: "A fixed number of columns", isCorrect: false },
        ],
      },
      {
        prompt: "Which pair of properties aligns and distributes flex items?",
        options: [
          { text: "justify-content and align-items", isCorrect: true },
          { text: "flex-direction and flex-wrap", isCorrect: false },
          { text: "order and flex-basis", isCorrect: false },
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
        options: [
          { text: "Two-dimensional layouts with rows and columns", isCorrect: true },
          { text: "A single row or column controlled by one axis", isCorrect: false },
          { text: "A sequence of inline elements within a text line", isCorrect: false },
        ],
      },
      {
        prompt: "What does the fr unit distribute in a grid?",
        options: [
          { text: "Available space between tracks", isCorrect: true },
          { text: "A fixed number of pixels in every track", isCorrect: false },
          { text: "The percentage of the viewport used by each item", isCorrect: false },
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
        options: [
          { text: "By composing utility classes in markup", isCorrect: true },
          { text: "By writing a separate stylesheet for each component", isCorrect: false },
          { text: "By assigning styles only through element selectors", isCorrect: false },
        ],
      },
      {
        prompt: "What do responsive variants let you do?",
        options: [
          { text: "Apply utilities at selected breakpoints", isCorrect: true },
          { text: "Change utility classes into component names", isCorrect: false },
          { text: "Apply every style only at the largest screen size", isCorrect: false },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000010": {
    videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    videoTitle: "JavaScript Course for Beginners – Your First Step to Web Development",
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
        options: [
          { text: "It adds behavior and program logic", isCorrect: true },
          { text: "It defines the document's content structure", isCorrect: false },
          { text: "It controls the page's visual styling rules", isCorrect: false },
        ],
      },
      {
        prompt: "What is a function used for?",
        options: [
          { text: "Grouping reusable steps that can accept input", isCorrect: true },
          { text: "Storing a value that cannot be used again", isCorrect: false },
          { text: "Declaring a variable's visual type", isCorrect: false },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000014": {
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    videoTitle: "React Course - Beginner's Tutorial for React JavaScript Library",
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
        options: [
          { text: "A reusable component", isCorrect: true },
          { text: "A browser event listener", isCorrect: false },
          { text: "A single root HTML document", isCorrect: false },
        ],
      },
      {
        prompt: "How does a parent commonly pass data to a child component?",
        options: [
          { text: "Through props", isCorrect: true },
          { text: "Through the child's local state", isCorrect: false },
          { text: "Through a DOM event handler only", isCorrect: false },
        ],
      },
    ],
  },
  "t1000000-0000-0000-0000-000000000018": {
    videoUrl: "https://www.youtube.com/watch?v=ZVnjOPwW4ZA",
    videoTitle: "Next js Tutorial for Beginners | Nextjs 13 (App Router) with TypeScript",
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
        options: [
          { text: "A file-system convention", isCorrect: true },
          { text: "A separate route registry in every component", isCorrect: false },
          { text: "URL fragments declared in CSS", isCorrect: false },
        ],
      },
      {
        prompt: "When is a Client Component appropriate?",
        options: [
          { text: "When browser-side interactivity is needed", isCorrect: true },
          { text: "For every page, even when it has no interaction", isCorrect: false },
          { text: "Only when a route reads a database schema", isCorrect: false },
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
        options: [
          { text: "Resources over HTTP", isCorrect: true },
          { text: "A rendered page with no resource interface", isCorrect: false },
          { text: "A direct connection to the client's local files", isCorrect: false },
        ],
      },
      {
        prompt: "What does a stateless request imply?",
        options: [
          { text: "Each request carries the information needed to process it", isCorrect: true },
          { text: "The server must remember the previous request's full state", isCorrect: false },
          { text: "The client must keep a persistent connection open", isCorrect: false },
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
        options: [
          { text: "The structure and layout of a screen", isCorrect: true },
          { text: "Final colors, shadows, and typography", isCorrect: false },
          { text: "Detailed interaction animations", isCorrect: false },
        ],
      },
      {
        prompt: "What does a mockup add to a wireframe?",
        options: [
          { text: "Visual styling", isCorrect: true },
          { text: "A second navigation hierarchy", isCorrect: false },
          { text: "A user-testing session recording", isCorrect: false },
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
        options: [
          { text: "A screen or region of an interface design", isCorrect: true },
          { text: "A reusable group of interface elements", isCorrect: false },
          { text: "A path in a vector network", isCorrect: false },
        ],
      },
      {
        prompt: "Why use reusable elements in a design?",
        options: [
          { text: "To keep repeated interface elements consistent", isCorrect: true },
          { text: "To avoid defining a layout for each screen", isCorrect: false },
          { text: "To turn a mockup into a user interview", isCorrect: false },
        ],
      },
    ],
  },
};
