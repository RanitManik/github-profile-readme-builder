"use client";

import Logo from "@/components/logo";
import { NextPage } from "next";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import README from "@/app/README/variant-1";

const Page: NextPage = () => {
    const [markdown, setMarkdown] = useState(README);
    const [formStage, setFormStage] = useState(1);

    return (
        <div className="grid min-h-svh md:grid-cols-5">
            {/* Left: Configuration */}
            <div className="border-border col-span-2 flex h-full flex-col border-r">
                <nav className="bg-background_darker border-border flex h-fit items-center gap-4 border-b p-4">
                    <Logo />
                    <h1 className="overflow-hidden font-semibold whitespace-nowrap select-none">
                        GitHub Profile README Builder
                    </h1>
                </nav>
                {formStage === 1 && (
                    <div className="grid h-full place-content-center gap-4 text-center">
                        <div>
                            <h1 className="text-3xl font-bold">Build GitHub README</h1>
                            <span className="text-sm">
                                Build the best ever GitHub Profile README
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="github-username" className="text-sm font-bold">
                                Enter Your GitHub Username
                            </label>
                            <div className="border-border focus-within:outline-accent focus-within:ring-accent flex items-center rounded-md border px-3 py-1.5 transition focus-within:ring-2">
                                <span className="text-border-400 text-sm">github.com /</span>
                                <input
                                    id="github-username"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    autoComplete="username"
                                    autoFocus={true}
                                    required={true}
                                    className="caret-accent flex-1 bg-transparent px-1 text-sm focus:outline-none"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Markdown Preview */}
            <div className="col-span-3 hidden h-svh p-4 md:block">
                <div
                    className="markdown-body border-border h-full overflow-auto rounded-sm border p-4"
                    style={{ width: "1870px", maxWidth: "100%" }}
                >
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
