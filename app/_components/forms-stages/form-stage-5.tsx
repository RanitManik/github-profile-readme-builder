"use client";

import { ReadmeData } from "@/lib/types";
import { useEffect, useState } from "react";
import ToggleSwitch from "@/components/ui/toggle-switch";
import RepoSelect from "@/components/ui/repo-select";
import TextInput from "@/components/ui/text-input";

interface FormStage5Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

export default function FormStage5({ data, updateData }: FormStage5Props) {
    const [repos, setRepos] = useState<string[]>([]);
    const [reposLoading, setReposLoading] = useState(false);

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
                <ToggleSwitch
                    label="GitHub Stats Card"
                    description="Stars, commits, PRs, issues & contributions"
                    checked={data.showGithubStats}
                    onChange={(v) => updateData({ showGithubStats: v })}
                />
                <ToggleSwitch
                    label="GitHub Streak Stats"
                    description="Current streak, longest streak & total contributions"
                    checked={data.showStreakStats}
                    onChange={(v) => updateData({ showStreakStats: v })}
                />
                <ToggleSwitch
                    label="Top Languages Card"
                    description="Most used programming languages across your repos"
                    checked={data.showTopLanguages}
                    onChange={(v) => updateData({ showTopLanguages: v })}
                />
                <ToggleSwitch
                    label="WakaTime Coding Stats"
                    description="Time spent coding per language (requires WakaTime setup)"
                    checked={data.showWakatimeStats}
                    onChange={(v) => updateData({ showWakatimeStats: v })}
                />
                {data.showWakatimeStats && (
                    <div className="space-y-1 pl-3">
                        <label className="block text-xs font-semibold">WakaTime Username</label>
                        <TextInput
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
                <ToggleSwitch
                    label="GitHub Trophies"
                    description="Achievement badges based on your GitHub activity"
                    checked={data.showTrophies}
                    onChange={(v) => updateData({ showTrophies: v })}
                />
                <ToggleSwitch
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
                <ToggleSwitch
                    label="Contribution Snake Animation"
                    description="Animated snake eating your GitHub contribution graph"
                    checked={data.showSnake}
                    onChange={(v) => updateData({ showSnake: v })}
                />
                <ToggleSwitch
                    label="Profile Views Counter"
                    description="Badge showing how many times your profile was viewed"
                    checked={data.showProfileViews}
                    onChange={(v) => updateData({ showProfileViews: v })}
                />
            </div>
        </div>
    );
}
