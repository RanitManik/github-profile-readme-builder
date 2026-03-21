"use client";

import { Clipboard, Download, RefreshCw, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface FormStageDoneProps {
    markdown: string;
    onReset: () => void;
}

export default function FormStageDone({ markdown, onReset }: FormStageDoneProps) {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const confettiPieces = useMemo(
        () =>
            Array.from({ length: 24 }, (_, index) => ({
                id: index,
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.6}s`,
                duration: `${3.2 + Math.random() * 1.4}s`,
                rotation: `${Math.random() * 360}deg`,
                color: ["#f59e0b", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6"][
                    index % 6
                ],
            })),
        [],
    );

    useEffect(() => {
        const timeout = window.setTimeout(() => setShowConfetti(false), 4200);
        return () => window.clearTimeout(timeout);
    }, []);

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
        <div className="relative grid h-full place-content-center gap-6 overflow-hidden px-6 text-center">
            {showConfetti && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    {confettiPieces.map((piece) => (
                        <span
                            key={piece.id}
                            className="absolute top-0 h-3 w-2 rounded-full opacity-90"
                            style={{
                                left: piece.left,
                                backgroundColor: piece.color,
                                animation: `done-confetti-fall ${piece.duration} ease-out ${piece.delay} forwards`,
                                transform: `translateY(-12vh) rotate(${piece.rotation})`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Success icon */}
            <div className="relative z-10 flex justify-center">
                <div className="bg-success/10 border-success/30 flex h-20 w-20 items-center justify-center rounded-full border-2">
                    <span className="text-4xl">🎉</span>
                </div>
            </div>

            <header className="relative z-10 space-y-2">
                <h2 className="text-2xl font-bold">Your README is Ready!</h2>
                <p className="text-foreground-400 m-auto max-w-sm text-sm">
                    Your live preview stays on the right, and this final step is all about export.
                    Copy the markdown or download a ready-to-use{" "}
                    <span className="text-foreground-100 font-medium">README.md</span>.
                </p>
            </header>

            <div className="relative z-10 flex flex-col gap-3">
                {/* Copy */}
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
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
                    type="button"
                    onClick={handleDownload}
                    className="border-border hover:bg-background flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                    <Download size={16} />
                    Download README.md
                </button>
            </div>

            <div className="border-border relative z-10 border-t pt-4">
                <p className="text-foreground-500 mb-3 text-xs">
                    Want to make changes? Head back to any step — the preview updates live.
                </p>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-foreground-400 hover:text-foreground-100 flex cursor-pointer items-center justify-center gap-2 text-sm transition-colors"
                >
                    <RefreshCw size={14} />
                    Start Over
                </button>
            </div>

            <style jsx>{`
                @keyframes done-confetti-fall {
                    0% {
                        opacity: 0;
                        transform: translateY(-12vh) rotate(0deg) scale(0.85);
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(115vh) rotate(540deg) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
