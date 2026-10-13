import { TopicVideoLesson } from "../types";

export const topicVideoLessons: Record<string, TopicVideoLesson> = {
  "t1000000-0000-0000-0000-000000000001": {
    videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
    videoTitle: "HTML Tutorial for Beginners: HTML Crash Course",
    takeaways: [
      "HTML elements give page content meaning and structure.",
      "Use semantic elements to describe the role of page sections.",
      "Nest elements to build a meaningful document structure.",
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
    takeaways: [
      "Flexbox is designed for arranging items in one dimension.",
      "The flex container controls layout along a main and a cross axis.",
      "Use justify-content and align-items to distribute and align items.",
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
    takeaways: [
      "CSS Grid lays out content across rows and columns.",
      "Grid tracks are defined with properties such as grid-template-columns.",
      "The fr unit distributes available space between grid tracks.",
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
    takeaways: [
      "Tailwind CSS uses utility classes to style markup.",
      "Small utility classes can be composed directly on an element.",
      "Responsive variants apply utilities at chosen screen breakpoints.",
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
    takeaways: [
      "JavaScript adds behavior and logic to web applications.",
      "Variables hold values that a program can use and update.",
      "Functions group reusable steps and can accept input.",
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
    takeaways: [
      "React interfaces are built from reusable components.",
      "JSX lets components describe UI with a syntax resembling HTML.",
      "Props pass data from a parent component to a child component.",
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
    takeaways: [
      "The App Router organizes routes with files and folders.",
      "Server Components render on the server by default in the App Router.",
      "Client Components are used for browser-side interactivity.",
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
    takeaways: [
      "A REST API lets clients interact with resources over HTTP.",
      "HTTP methods describe the operation a client wants to perform.",
      "A stateless request contains the information needed to process it.",
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
    takeaways: [
      "Wireframes focus on structure before visual polish.",
      "Mockups add visual styling to a design.",
      "Figma can be used to turn a design into an interface prototype.",
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
    takeaways: [
      "Figma provides a canvas for creating and arranging interface designs.",
      "Frames represent screens or regions in a design.",
      "Reusable design elements help keep interface work consistent.",
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
