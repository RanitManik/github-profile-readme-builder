"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { ReadmeData } from "@/lib/types";
import { ALL_SKILLS, CATEGORIES, getSkillsByCategory } from "@/lib/skills-data";

const PAGE_SIZE = 60;
const ALL_CAT = "All";

interface FormStage4Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

const ICON_BASE = "https://go-skill-icons.vercel.app/api/icons?i=";

/** Custom category dropdown — no text input, just a list with a check on the active item */
function CategorySelect({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative shrink-0" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="border-border bg-background_lighter text-foreground-200 hover:border-foreground-400 flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-colors focus:outline-none"
            >
                <span className="max-w-30 truncate">{value}</span>
                <ChevronDown
                    size={11}
                    className={`text-foreground-400 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <ul className="border-border bg-background absolute right-0 z-50 mt-1 max-h-64 w-44 overflow-y-auto rounded-md border shadow-lg">
                    {options.map((opt) => (
                        <li
                            key={opt}
                            className="hover:bg-accent/10 flex cursor-pointer items-center justify-between px-3 py-1.5 text-xs"
                            onMouseDown={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                        >
                            <span
                                className={
                                    value === opt
                                        ? "text-accent font-medium"
                                        : "text-foreground-200"
                                }
                            >
                                {opt}
                            </span>
                            {value === opt && <Check size={11} className="text-accent shrink-0" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SkillChip({
    id,
    name,
    selected,
    onToggle,
}: {
    id: string;
    name: string;
    selected: boolean;
    onToggle: () => void;
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <button
            onClick={onToggle}
            title={name}
            className={`group flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-2 transition-all duration-150 ${
                selected
                    ? "border-accent bg-accent/10 shadow-[0_0_8px_rgba(68,147,248,0.25)]"
                    : "border-border bg-background_lighter hover:border-foreground-400"
            }`}
        >
            <div className="relative flex h-8 w-8 items-center justify-center">
                {/* Skeleton shown until image loads */}
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

export default function FormStage4({ data, updateData }: FormStage4Props) {
    const [activeCategory, setActiveCategory] = useState<string>(ALL_CAT);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const scrollRef = useRef<HTMLDivElement>(null);
    // callback ref for the sentinel — recreates the observer whenever the element mounts/unmounts
    const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null);

    const toggle = (id: string) => {
        const has = data.skills.includes(id);
        updateData({ skills: has ? data.skills.filter((s) => s !== id) : [...data.skills, id] });
    };

    // Skills pool for the active category
    const categorySkills =
        activeCategory === ALL_CAT ? ALL_SKILLS : getSkillsByCategory(activeCategory);

    // Filter by search query within the active category
    const q = searchQuery.trim().toLowerCase();
    const filteredSkills = q
        ? categorySkills.filter(
              (s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q),
          )
        : categorySkills;

    // Reset pagination & scroll position whenever the category or search query changes
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
        scrollRef.current?.scrollTo({ top: 0 });
    }, [activeCategory, searchQuery]);

    // IntersectionObserver: auto-load the next page when the sentinel enters the scroll viewport
    useEffect(() => {
        if (!sentinel || !scrollRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisibleCount((v) => v + PAGE_SIZE);
            },
            { root: scrollRef.current, rootMargin: "300px" },
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [sentinel]);

    // Slice to the currently loaded page
    const pagedSkills = filteredSkills.slice(0, visibleCount);
    const hasMore = visibleCount < filteredSkills.length;

    return (
        <div className="flex h-full flex-col gap-0 overflow-hidden">
            {/* Header */}
            <div className="space-y-1 px-6 pt-5 pb-3">
                <h2 className="text-lg font-bold">Tech Stack</h2>
                <p className="text-foreground-400 text-xs">
                    Click technologies to add them to your README.{" "}
                    <span className="text-accent font-medium">{data.skills.length} selected</span>
                </p>
            </div>

            {/* Search + Category filter row */}
            <div className="flex items-center gap-2 px-4 pb-3">
                {/* Search input */}
                <div className="border-border bg-background_lighter flex flex-1 items-center gap-2 rounded-md border px-3 py-1.5">
                    <Search size={13} className="text-foreground-400 shrink-0" />
                    <input
                        type="text"
                        placeholder={`Search${activeCategory !== ALL_CAT ? ` in ${activeCategory}` : ""}…`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="placeholder:text-foreground-600 w-full bg-transparent text-xs outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-foreground-400 hover:text-foreground-100 shrink-0 text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Category dropdown */}
                <CategorySelect
                    value={activeCategory}
                    onChange={(v) => {
                        setActiveCategory(v);
                        setSearchQuery("");
                    }}
                    options={[ALL_CAT, ...CATEGORIES]}
                />
            </div>

            {/* Icon grid — virtualized: only renders up to PAGE_SIZE items at once */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
                {filteredSkills.length === 0 ? (
                    <p className="text-foreground-500 pt-4 text-center text-xs">
                        No results for &ldquo;{searchQuery}&rdquo;
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(68px,1fr))] gap-2">
                            {pagedSkills.map((skill) => (
                                <SkillChip
                                    key={skill.id}
                                    id={skill.id}
                                    name={skill.name}
                                    selected={data.skills.includes(skill.id)}
                                    onToggle={() => toggle(skill.id)}
                                />
                            ))}
                        </div>
                        {/* Sentinel: enters viewport → load next page */}
                        {hasMore && <div ref={setSentinel} className="mt-2 h-4" />}
                    </>
                )}
            </div>

            {/* Selected chips summary */}
            {data.skills.length > 0 && (
                <div className="border-border bg-background_lighter border-t px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                        {data.skills.map((id) => (
                            <button
                                key={id}
                                onClick={() => toggle(id)}
                                className="border-accent/50 bg-accent/10 text-accent hover:bg-danger/10 hover:border-danger/50 hover:text-danger flex cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] transition-colors"
                                title={`Remove ${id}`}
                            >
                                {id} ×
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
