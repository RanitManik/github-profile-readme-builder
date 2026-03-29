# GEMINI.md

## Project Overview

**GitHub Profile README Builder** is a modern web application designed to help developers create professional, export-ready GitHub profile READMEs through a guided, multi-step interface. It eliminates the need for manual markdown writing by providing a structured form flow, live preview, and integrated configuration for popular GitHub widgets.

### Main Technologies

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Markdown Rendering:** `react-markdown`, `rehype-highlight`, `rehype-raw`
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting & Formatting:** ESLint, Prettier

### Architecture

- `app/`: Contains the main application routes and page layouts.
    - `_components/`: Core logic for the builder, including form stages (`forms-stages/`), progress tracking, and README generation logic (`readme/`).
- `components/ui/`: Reusable, atomic UI components (e.g., `text-input.tsx`, `skill-chip.tsx`).
- `lib/`: Shared utilities, TypeScript types (`types.ts`), and static data like `skills.json`.
- `public/`: Static assets, including specialized preview images for the README variants.
- `styles/`: Global CSS and utility styles.

---

## Building and Running

### Prerequisites

- **Node.js:** >= 20.x
- **Package Manager:** npm

### Commands

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev` (uses Turbopack)
- **Production Build:** `npm run build`
- **Start Production Server:** `npm run start`
- **Run Tests:** `npm run test`
- **Linting:** `npm run lint`
- **Format Code:** `npm run format`

---

## Development Conventions

### Coding Style

- **Functional Components:** Prefer functional components with React Hooks.
- **Tailwind CSS:** Use Tailwind for all styling, following the Tailwind 4 standards configured in the project.
- **Strict Typing:** Leverage TypeScript interfaces (defined in `lib/types.ts`) for all data structures, especially `ReadmeData`.
- **File Naming:** Use kebab-case for files and directories.

### Testing Practices

- **Unit Testing:** Use Vitest for testing README generation logic and utility functions.
- **Test Files:** Keep tests close to the implementation (e.g., `app/_components/readme/variant-1.test.ts`).

### Contribution Workflow

- **Conventional Commits:** The project enforces conventional commit messages via `@commitlint/cli` and `husky`.
- **Pre-commit Hooks:** Husky runs `lint-staged` on every commit to ensure linting and formatting standards are met.
- **PR Template:** Follow the provided [pull request template](.github/pull_request_template.md) for all contributions.

### README Generation

The core logic for generating the README markdown resides in `app/_components/readme/`. If adding new sections or widgets, ensure they are reflected in both `generateREADME` (final output) and `generatePreviewREADME` (live preview).
