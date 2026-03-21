"use client";

import { useEffect, useRef, useState } from "react";

interface CategorySelectProps {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}

export default function CategorySelect({ value, onChange, options }: CategorySelectProps) {
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="11"
                    height="11"
                    className={`text-foreground-400 transition-transform ${open ? "rotate-180" : ""}`}
                >
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
                </svg>
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
                            {value === opt && <span className="text-accent">✓</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
