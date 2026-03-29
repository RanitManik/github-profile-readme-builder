<div align="center">
  <img src="logo.png" alt="GitHub Profile README Builder Logo" width="120" />

# GitHub Profile README Builder

**A powerful, guided web application to create stunning, export-ready GitHub profile READMEs in minutes.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Explore the App](https://github-profile-readme-builder.vercel.app) • [Report Bug](https://github.com/RanitManik/github-profile-readme-builder/issues) • [Request Feature](https://github.com/RanitManik/github-profile-readme-builder/issues)

</div>

---

## 🚀 Why This Project?

Creating a great GitHub profile README often involves manually writing complex markdown, searching for badge URLs, and configuring third-party widgets. This project simplifies that entire process into a **guided 5-step workflow**.

Whether you're a student, a seasoned professional, or an open-source maintainer, this tool helps you showcase your identity, work, skills, and stats with zero manual coding.

## ✨ Key Features

- **🎯 Guided Workflow:** A structured five-step form covering Identity, Personal Info, Work & Education, Tech Stack, and GitHub Stats.
- **👁️ Live Preview:** See your README evolve in real-time with a GitHub-accurate markdown previewer.
- **🛠️ Tech Stack Picker:** Search and select from hundreds of tech icons powered by `go-skill-icons`.
- **📊 Dynamic Widgets:** Easily toggle and configure:
    - GitHub Stats, Streaks, and Top Languages.
    - GitHub Trophies and Profile View counters.
    - WakaTime coding activity cards.
    - Pinned repository previews (fetched directly via GitHub API).
- **💾 Export-Ready:** One-click to copy the markdown or download the `.md` file.
- **⚡ Performance-First:** Built with Next.js 15 and React 19 for a fast, snappy experience.

## 🛠️ Tech Stack

- **Core:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, Lucide React (Icons)
- **Markdown:** React Markdown, Remark GFM, Rehype Highlight
- **State & Logic:** React Hooks (Memo, State, Effect)
- **Testing:** Vitest
- **Linting/Formatting:** ESLint, Prettier, Husky, Lint-Staged

## 📦 Project Structure

```text
├── app/
│   ├── _components/        # Core business logic & builder flow
│   │   ├── forms-stages/   # The 5-step guided form components
│   │   ├── readme/         # Markdown generation & variant logic
│   │   └── ...             # Layout components (Header, Navigation, etc.)
│   ├── layout.tsx          # Global layout & metadata
│   └── page.tsx            # Main application entry point
├── components/
│   └── ui/                 # Atomic, reusable UI primitives (Inputs, Toggles, etc.)
├── lib/
│   ├── types.ts            # Centralized TypeScript interfaces
│   ├── skills-data.ts      # Logic for skill icon processing
│   └── utils.ts            # Shared helper functions
├── public/                 # Static assets & README preview images
└── styles/                 # Global CSS & Tailwind configuration
```

## 👨‍💻 Getting Started

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** or **pnpm**

### Installation & Run

1. **Clone the repository:**

    ```bash
    git clone https://github.com/RanitManik/github-profile-readme-builder.git
    cd github-profile-readme-builder
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Quality Assurance

We maintain high standards for code quality and reliability:

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Testing:** `npm run test`
- **Build Check:** `npm run build`

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for our contribution guidelines and [CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md) for our community standards.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/RanitManik">Ranit Manik</a>
</div>
