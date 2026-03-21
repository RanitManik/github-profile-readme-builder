"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ReadmeData } from "@/lib/types";
import { ALL_SKILLS, CATEGORIES, getSkillsByCategory } from "@/lib/skills-data";
import CategorySelect from "@/components/ui/category-select";
import SkillChip from "@/components/ui/skill-chip";

const PAGE_SIZE = 60;
const ALL_CAT = "All";

interface FormStage4Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
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
