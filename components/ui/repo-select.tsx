"use client";

import { useEffect, useRef, useState } from "react";
import { INPUT_CLASS } from "@/components/ui/text-input";

interface RepoSelectProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    repos: string[];
    loading: boolean;
    placeholder: string;
}

export default function RepoSelect({
    label,
    value,
    onChange,
    repos,
    loading,
    placeholder,
}: RepoSelectProps) {
    const [query, setQuery] = useState(value);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setQuery(value);
    }, [value]);

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
                    className={`${INPUT_CLASS} ${query ? "pr-7" : ""}`}
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
