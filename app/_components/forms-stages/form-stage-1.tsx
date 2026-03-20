"use client";

import { FormEvent } from "react";
import { Github } from "lucide-react";
import { ReadmeData } from "@/lib/types";

interface FormStage1Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
    goNext: () => void;
}

export default function FormStage1({ data, updateData, goNext }: FormStage1Props) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (data.username.trim()) goNext();
    };

    return (
        <div className="grid h-full place-content-center gap-6 px-4 text-center">
            <header className="space-y-2">
                <h1 className="from-accent to-success bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent">
                    Build Your Perfect GitHub Profile
                </h1>
                <p className="text-foreground-400 m-auto max-w-96 text-sm">
                    Stand out from <span className="font-semibold">100M+</span> developers with a
                    stunning profile README that showcases your best work
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-4">
                <div className="space-y-1">
                    <label
                        htmlFor="github-username"
                        className="cursor-pointer text-sm font-semibold"
                    >
                        Enter Your GitHub Username
                        <span className="text-foreground-400 ml-1 font-normal">
                            (we&apos;ll help personalize your README)
                        </span>
                        <div
                            role="group"
                            className="border-border focus-within:ring-accent mt-1 flex items-center rounded-md border px-3 py-1.25 transition focus-within:ring-2"
                        >
                            <Github size={16} className="text-foreground-400 me-1" />
                            <span className="text-foreground-400 text-sm">github.com /</span>
                            <input
                                id="github-username"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="username"
                                autoFocus
                                required
                                value={data.username}
                                onChange={(e) => updateData({ username: e.target.value })}
                                placeholder="your-username"
                                className="caret-accent flex-1 bg-transparent px-1 text-sm font-normal focus:outline-none"
                                type="text"
                            />
                        </div>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!data.username.trim()}
                    className="bg-success hover:bg-success-500 active:bg-success-700 disabled:opacity-50 flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-1.5 font-semibold text-white transition-colors duration-75 disabled:cursor-not-allowed"
                    aria-label="Start building your README"
                >
                    Start Building Your Profile
                </button>

                <div className="text-foreground-400 mt-4 space-y-2 text-left text-xs">
                    <p className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        5-minute setup with step-by-step guidance
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        Professional templates &amp; auto-updating sections
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        Instant live preview as you type
                    </p>
                </div>
            </form>
        </div>
    );
}
