# GitHub Profile README Builder

GitHub Profile README Builder is a guided web app for creating polished, export-ready GitHub profile `README.md` files. It combines a structured multi-step form, live preview, skill selection, and GitHub widget configuration so users can build a profile README without writing markdown by hand.

## Highlights

- Guided five-step workflow for profile, work, education, skills, and widgets
- Live markdown preview with GitHub-style rendering
- Searchable tech stack picker powered by `go-skill-icons`
- Support for popular GitHub profile widgets and cards
- One-click copy and download for the generated `README.md`

## Built With

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test -- --run
npm run format
```

## How It Works

1. Fill out the staged form with your profile details.
2. Choose skills, widgets, and profile sections.
3. Preview the generated markdown in real time.
4. Copy or download the final `README.md`.

## Project Structure

```text
app/
  _components/        Core builder flow, preview, and README generation
components/ui/        Shared UI primitives
lib/                  Shared types and supporting data
public/README/        Preview assets
styles/               Global styles
```

## Production Notes

- The application is fully client-side and does not require a database or authentication.
- Repository suggestions are fetched from the public GitHub REST API in the browser.
- Generated README widgets depend on third-party providers such as GitHub stats, streaks, trophies, and skill icon services.
- If those services are unavailable or rate-limited, generated widget images may not render correctly even when the app itself is working as expected.

## Quality Checks

Run the following before publishing changes:

```bash
npm run lint
npm run test -- --run
npm run build
```

## Contributing

Contributions are welcome. Please review the project guidelines before opening a pull request:

- [Contributing Guide](./.github/CONTRIBUTING.md)
- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
