"use client";

import { Clipboard, Download, RefreshCw, Check } from "lucide-react";
import { useState } from "react";

interface FormStageDoneProps {
    markdown: string;
    onReset: () => void;
}

export default function FormStageDone({ markdown, onReset }: FormStageDoneProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="grid h-full place-content-center gap-6 px-6 text-center">
            {/* Success icon */}
            <div className="flex justify-center">
                <div className="bg-success/10 border-success/30 flex h-20 w-20 items-center justify-center rounded-full border-2">
                    <span className="text-4xl">🎉</span>
                </div>
            </div>

            <header className="space-y-2">
                <h2 className="text-2xl font-bold">Your README is Ready!</h2>
                <p className="text-foreground-400 m-auto max-w-sm text-sm">
                    The live preview is on the right. Switch between{" "}
                    <span className="text-foreground-100 font-medium">Preview</span> and{" "}
                    <span className="text-foreground-100 font-medium">Code</span> tabs — then copy or
                    download your file.
                </p>
            </header>

            <div className="flex flex-col gap-3">
                {/* Copy */}
                <button
                    onClick={handleCopy}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 font-semibold text-white transition-colors ${
                        copied ? "bg-success" : "bg-accent hover:bg-accent-600"
                    }`}
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            Copied to Clipboard!
                        </>
                    ) : (
                        <>
                            <Clipboard size={16} />
                            Copy README Markdown
                        </>
                    )}
                </button>

                {/* Download */}
                <button
                    onClick={handleDownload}
                    className="border-border hover:bg-background flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                    <Download size={16} />
                    Download README.md
                </button>
            </div>

            <div className="border-border border-t pt-4">
                <p className="text-foreground-500 mb-3 text-xs">
                    Want to make changes? Head back to any step — the preview updates live.
                </p>
                <button
                    onClick={onReset}
                    className="text-foreground-400 hover:text-foreground-100 flex cursor-pointer items-center justify-center gap-2 text-sm transition-colors"
                >
                    <RefreshCw size={14} />
                    Start Over
                </button>
            </div>
        </div>
    );
}

