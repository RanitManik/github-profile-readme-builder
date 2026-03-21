# GitHub Profile README Builder

A guided Next.js app for creating polished GitHub profile `README.md` files with a live preview, staged form flow, tech-stack picker, and export-ready markdown.

## Features

- Five-step builder for identity, profile details, work, education, skills, and GitHub widgets
- Live README preview that mirrors GitHub-style markdown rendering
- Dynamic cards for GitHub stats, streaks, top languages, WakaTime, trophies, pinned repos, and profile views
- Searchable skill picker backed by `go-skill-icons`
- One-click copy/download flow for the generated `README.md`

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run test -- --run
npm run build
```

## Production Notes

- The app is fully client-side. There is no database or authentication layer.
- Repo suggestions are fetched from the public GitHub REST API in the browser.
- Generated README sections rely on third-party image/card providers:
    - `github-readme-stats.vercel.app`
    - `streak-stats.demolab.com`
    - `github-profile-trophy-ranit.vercel.app`
    - `go-skill-icons.vercel.app`
    - `komarev.com`
- If any of those services are unavailable or rate-limited, the generated README may show broken or delayed images even though the app itself is working.

## Quality Checks

The repo is expected to pass:

```bash
npm run lint
npm run test -- --run
npm run build
```

## Project Structure

```text
app/
  _components/        UI flow, form stages, preview, README generation
components/ui/        Reusable form controls
lib/                  Shared types and skill metadata
public/README/        Preview placeholder assets
styles/               Global styling
```

## Contributing

Community docs are available in:

- [`.github/CONTRIBUTING.md`](/Users/ranitmanik/code/github-profile-readme-builder/.github/CONTRIBUTING.md)
- [`.github/CODE_OF_CONDUCT.md`](/Users/ranitmanik/code/github-profile-readme-builder/.github/CODE_OF_CONDUCT.md)

## License

Add a license before publishing publicly if you want others to have clear reuse permissions.
