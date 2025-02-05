"use client";

import Logo from "@/components/logo";
import { NextPage } from "next";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import README from "@/app/README/variant-1";
import { Github } from "lucide-react";

const Page: NextPage = () => {
    const [markdown, setMarkdown] = useState(README);
    const [formStage, setFormStage] = useState(1);

    return (
        <div className="grid min-h-svh md:grid-cols-5">
            {/* Configuration Section */}
            <div className="border-border col-span-2 flex h-full flex-col border-r">
                <nav className="bg-background_darker border-border flex h-fit items-center gap-4 border-b p-4">
                    <Logo />
                    <h1 className="overflow-hidden font-semibold whitespace-nowrap select-none">
                        GitHub Profile README Builder
                    </h1>
                </nav>
                {formStage === 1 && (
                    <div className="grid h-full place-content-center gap-4 px-4 text-center">
                        <header className="space-y-2">
                            <h1 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                                Build Your Perfect GitHub Profile
                            </h1>
                            <p className="text-muted-foreground m-auto max-w-96 text-sm">
                                Stand out from <span className="font-semibold">100M+</span>{" "}
                                developers with a stunning profile README that showcases your best
                                work
                            </p>
                        </header>

                        <form className="mx-auto flex w-full max-w-md flex-col gap-4">
                            <div className="space-y-1">
                                <label
                                    htmlFor="github-username"
                                    className="cursor-pointer text-sm font-semibold"
                                >
                                    Your GitHub Username
                                    <span className="text-muted-foreground ml-1 font-normal">
                                        (we&apos;ll help personalize your README)
                                    </span>
                                    <div
                                        role="group"
                                        className="border-border focus-within:outline-accent focus-within:ring-accent flex items-center rounded-md border px-3 py-[5px] transition focus-within:ring-2"
                                    >
                                        <Github size={16} className="text-border-400 me-1" />
                                        <span className="text-border-400 text-sm">
                                            github.com /
                                        </span>
                                        <input
                                            id="github-username"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            autoComplete="username"
                                            autoFocus
                                            required
                                            className="caret-accent flex-1 bg-transparent px-1 text-sm font-normal focus:outline-none"
                                            type="text"
                                        />
                                    </div>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="bg-success hover:bg-success-500 active:bg-success-700 flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-1.5 font-medium font-semibold text-white transition-colors duration-75"
                                aria-label="Start building your README"
                            >
                                Start Building Your Profile
                            </button>

                            <div className="text-muted-foreground mt-4 space-y-2 text-left text-xs">
                                <p className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    3-minute setup with step-by-step guidance
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    Professional templates & auto-updating sections
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    Instant GitHub integration & preview
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Preview Section */}
            <div
                className="col-span-3 hidden h-svh p-4 md:block"
                role="region"
                aria-label="README preview example"
            >
                <div className="markdown-body border-border h-full overflow-auto rounded-lg border p-6">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: (props) => (
                                <a {...props} className="hover:no-underline!">
                                    {props.children}
                                </a>
                            ),
                            picture: (props) => (
                                <picture {...props} className="inline-block!">
                                    {props.children}
                                </picture>
                            ),
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Page;
