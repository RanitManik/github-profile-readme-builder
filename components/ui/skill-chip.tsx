"use client";

import { useState } from "react";

interface SkillChipProps {
    id: string;
    name: string;
    selected: boolean;
    onToggle: () => void;
}

const ICON_BASE = "https://go-skill-icons.vercel.app/api/icons?i=";

export default function SkillChip({ id, name, selected, onToggle }: SkillChipProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <button
            type="button"
            onClick={onToggle}
            title={name}
            className={`group flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 transition-all duration-150 ${
                selected
                    ? "border-accent bg-accent/10 shadow-[0_0_8px_rgba(68,147,248,0.25)]"
                    : "border-border bg-background_lighter hover:border-foreground-400"
            }`}
        >
            <div className="relative flex h-8 w-8 items-center justify-center">
                {!loaded && (
                    <div className="bg-border/60 absolute inset-0 animate-pulse rounded-md" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`${ICON_BASE}${id}`}
                    alt={name}
                    width={32}
                    height={32}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`h-8 w-8 transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
            </div>
            <span
                className={`max-w-13 truncate text-center text-[9px] leading-tight ${
                    selected ? "text-accent font-semibold" : "text-foreground-400"
                }`}
            >
                {name}
            </span>
        </button>
    );
}
