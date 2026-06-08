# DevAtlas

A professional learning platform for mastering programming languages — from absolute basics to expert-level concepts.

## Features

- **Structured roadmaps** — Each language is organized into Beginner, Intermediate, Advanced, and Expert levels
- **Up-to-date content** — Java curriculum covers JDK 21 LTS features (virtual threads, records, pattern matching, and more)
- **Extensible architecture** — Add new languages by editing a single data file
- **Modern UI** — Dark-themed, responsive design built with React and Tailwind CSS

## Getting Started

```bash
git checkout cursor/java-learning-ui-d938   # if not already on this branch
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

> **Note:** The app code is on the `cursor/java-learning-ui-d938` branch. Run the commands above from that branch.

## Live Demo

After GitHub Pages is enabled, the app is available at:

**https://sudheerchandra5.github.io/DevAtlas/**

To enable GitHub Pages: go to repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Production Preview

```bash
npm run build
npm run preview
```

Open **http://localhost:4173**

## Adding a New Language

Edit `src/data/languages.ts` and add a new entry to the `languages` array:

```typescript
{
  id: 'python',
  name: 'Python',
  tagline: 'Simple, readable, powerful',
  description: '...',
  icon: '🐍',
  color: '#3776ab',
  gradient: 'from-blue-500/20 via-yellow-500/10 to-blue-600/20',
  currentVersion: 'Python 3.12',
  available: true,
  sections: [
    {
      id: 'beginner',
      title: 'Beginner',
      description: '...',
      topics: [ /* ... */ ],
    },
    // intermediate, advanced, expert sections...
  ],
}
```

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for fast development and builds
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation

## Java Curriculum

| Level | Topics | Highlights |
|-------|--------|------------|
| Beginner | 12 | Variables, control flow, methods, I/O |
| Intermediate | 15 | OOP, collections, generics, JUnit |
| Advanced | 15 | Lambdas, streams, virtual threads, Spring Boot |
| Expert | 15 | JVM tuning, design patterns, GraalVM, observability |

## License

MIT
