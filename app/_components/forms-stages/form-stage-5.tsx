"use client";

import { ReadmeData } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

interface FormStage5Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

function Toggle({
    label,
    description,
    checked,
    onChange,
}: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="border-border hover:border-foreground-500 flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-colors">
            <div className="space-y-0.5">
                <p className="text-sm font-semibold">{label}</p>
                {description && <p className="text-foreground-400 text-xs">{description}</p>}
            </div>
            <button
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    checked ? "bg-accent" : "bg-border"
                }`}
            >
                <span
                    className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </label>
    );
}

const inputCls =
    "border-border bg-background focus:ring-accent w-full rounded-md border px-3 py-1.5 text-sm placeholder:text-foreground-600 focus:outline-none focus:ring-2";

/** Searchable repo select — fetches from GitHub when a username is available */
function RepoSelect({
    label,
    value,
    onChange,
    repos,
    loading,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    repos: string[];
    loading: boolean;
    placeholder: string;
}) {
    const [query, setQuery] = useState(value);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Keep local query in sync when parent value changes (e.g. cleared externally)
    useEffect(() => {
        setQuery(value);
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = repos.filter((r) => r.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="space-y-1" ref={ref}>
            <label className="block text-xs font-semibold">{label}</label>
            <div className="relative">
                <input
                    className={`${inputCls} ${query ? "pr-7" : ""}`}
                    type="text"
                    placeholder={loading ? "Fetching repos…" : placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onChange(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => repos.length > 0 && setOpen(true)}
                />
                {query && (
                    <button
                        type="button"
                        aria-label="Clear"
                        className="text-foreground-400 hover:text-foreground-100 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-xs"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onChange("");
                            setQuery("");
                            setOpen(false);
                        }}
                    >
                        ✕
                    </button>
                )}
                {open && filtered.length > 0 && (
                    <ul className="border-border bg-background absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-md border shadow-lg">
                        {filtered.map((r) => (
                            <li
                                key={r}
                                className="hover:bg-accent/10 cursor-pointer px-3 py-1.5 text-sm"
                                onMouseDown={() => {
                                    onChange(r);
                                    setQuery(r);
                                    setOpen(false);
                                }}
                            >
                                {r}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function FormStage5({ data, updateData }: FormStage5Props) {
    const [repos, setRepos] = useState<string[]>([]);
    const [reposLoading, setReposLoading] = useState(false);

    // Fetch public repos whenever the GitHub username changes
    useEffect(() => {
        if (!data.username) {
            setRepos([]);
            return;
        }
        setReposLoading(true);
        fetch(`https://api.github.com/users/${data.username}/repos?per_page=100&sort=updated`)
            .then((r) => (r.ok ? r.json() : []))
            .then((list: { name: string }[]) => setRepos(list.map((r) => r.name)))
            .catch(() => setRepos([]))
            .finally(() => setReposLoading(false));
    }, [data.username]);

    return (
        <div className="flex flex-col gap-5 px-6 py-5">
            <header className="space-y-1">
                <h2 className="text-lg font-bold">GitHub Stats &amp; Extras</h2>
                <p className="text-foreground-400 text-xs">
                    Choose which dynamic widgets to include in your README. They update
                    automatically from GitHub.
                </p>
            </header>

            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                📊 Statistics
            </p>

            <div className="flex flex-col gap-2">
                <Toggle
                    label="GitHub Stats Card"
                    description="Stars, commits, PRs, issues & contributions"
                    checked={data.showGithubStats}
                    onChange={(v) => updateData({ showGithubStats: v })}
                />
                <Toggle
                    label="GitHub Streak Stats"
                    description="Current streak, longest streak & total contributions"
                    checked={data.showStreakStats}
                    onChange={(v) => updateData({ showStreakStats: v })}
                />
                <Toggle
                    label="Top Languages Card"
                    description="Most used programming languages across your repos"
                    checked={data.showTopLanguages}
                    onChange={(v) => updateData({ showTopLanguages: v })}
                />
                <Toggle
                    label="WakaTime Coding Stats"
                    description="Time spent coding per language (requires WakaTime setup)"
                    checked={data.showWakatimeStats}
                    onChange={(v) => updateData({ showWakatimeStats: v })}
                />
                {data.showWakatimeStats && (
                    <div className="space-y-1 pl-3">
                        <label className="block text-xs font-semibold">WakaTime Username</label>
                        <input
                            className={inputCls}
                            type="text"
                            placeholder={data.username || "your-wakatime-username"}
                            value={data.wakatimeUsername}
                            onChange={(e) => updateData({ wakatimeUsername: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                🏆 Showcase
            </p>

            <div className="flex flex-col gap-2">
                <Toggle
                    label="GitHub Trophies"
                    description="Achievement badges based on your GitHub activity"
                    checked={data.showTrophies}
                    onChange={(v) => updateData({ showTrophies: v })}
                />
                <Toggle
                    label="Pinned Repositories"
                    description="Showcase up to two repos as card previews"
                    checked={data.showPinnedRepos}
                    onChange={(v) => updateData({ showPinnedRepos: v })}
                />
                {data.showPinnedRepos && (
                    <div className="grid grid-cols-2 gap-3 pl-3">
                        <RepoSelect
                            label="Left Repo"
                            value={data.pinnedRepo1}
                            onChange={(v) => updateData({ pinnedRepo1: v })}
                            repos={repos}
                            loading={reposLoading}
                            placeholder={data.username ? "search repos…" : "enter username first"}
                        />
                        <RepoSelect
                            label="Right Repo"
                            value={data.pinnedRepo2}
                            onChange={(v) => updateData({ pinnedRepo2: v })}
                            repos={repos}
                            loading={reposLoading}
                            placeholder={data.username ? "search repos…" : "enter username first"}
                        />
                    </div>
                )}
            </div>

            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                ✨ Extras
            </p>

            <div className="flex flex-col gap-2">
                <Toggle
                    label="Contribution Snake Animation"
                    description="Animated snake eating your GitHub contribution graph"
                    checked={data.showSnake}
                    onChange={(v) => updateData({ showSnake: v })}
                />
                <Toggle
                    label="Profile Views Counter"
                    description="Badge showing how many times your profile was viewed"
                    checked={data.showProfileViews}
                    onChange={(v) => updateData({ showProfileViews: v })}
                />
            </div>
        </div>
    );
}
