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

    return (
        <div className="grid min-h-svh md:grid-cols-5">
            {/* Left: Configuration */}
            <div className="border-border col-span-2 h-full border-r">
                <nav className="bg-background_darker border-border flex items-center gap-4 border-b p-4">
                    <Logo />
                    <h1 className="overflow-hidden font-semibold whitespace-nowrap select-none">
                        GitHub Profile README Builder
                    </h1>
                </nav>
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
