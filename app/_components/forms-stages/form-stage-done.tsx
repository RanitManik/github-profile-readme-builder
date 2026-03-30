"use client";

import {
    Clipboard,
    Download,
    RefreshCw,
    Check,
    X,
    PartyPopper,
    Terminal,
    Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { cn } from "@/lib/utils";

interface FormStageDoneProps {
    markdown: string;
    onReset: () => void;
    onClose: () => void;
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export default function FormStageDone({ markdown, onReset, onClose }: FormStageDoneProps) {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const timeout = window.setTimeout(() => setShowConfetti(false), 8000);
        return () => window.clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out",
                    isClosing ? "opacity-0" : "animate-in fade-in opacity-100",
                )}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Confetti */}
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={2000}
                    gravity={0.25}
                    initialVelocityY={25}
                    tweenDuration={5000}
                    style={{ zIndex: 110 }}
                    colors={["#238636", "#2ea043", "#3fb950", "#58a6ff", "#1f6feb", "#f0883e"]}
                />
            )}

            {/* Modal */}
            <div
                className={cn(
                    "bg-background border-border relative z-[120] w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl transition-all duration-200 ease-in-out sm:rounded-lg",
                    isClosing
                        ? "translate-y-4 scale-95 opacity-0"
                        : "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 translate-y-0 opacity-100",
                )}
            >
                {/* Header */}
                <div className="bg-background_lighter border-border flex items-center justify-between border-b px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-success/20 text-success rounded-md p-1.5">
                            <PartyPopper size={18} />
                        </div>
                        <h2 className="text-foreground-50 text-xl font-bold">
                            Your README is ready to go!
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-foreground-400 hover:text-foreground-100 hover:bg-border/30 rounded-md p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    <div className="mb-6 text-left">
                        <p className="text-foreground-400 text-sm leading-relaxed">
                            We&apos;ve generated your personalized GitHub Profile README.
                        </p>
                    </div>

                    {/* GitHub-style Info Box */}
                    <div className="border-accent/40 bg-accent/5 mb-8 flex gap-3 rounded-lg border p-4">
                        <Info className="text-accent mt-0.5 shrink-0" size={18} />
                        <div className="text-foreground-200 text-sm leading-relaxed">
                            <span className="text-foreground-400">
                                Need to make changes? Close this modal and head back to any step to
                                refine your details.
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {/* Primary Action: Copy */}
                        <button
                            type="button"
                            onClick={handleCopy}
                            className={cn(
                                "border-success flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-semibold transition-all duration-200",
                                copied
                                    ? "bg-success text-white"
                                    : "bg-success hover:bg-success-500 shadow-success/20 text-white shadow-sm",
                            )}
                        >
                            {copied ? (
                                <>
                                    <Check size={16} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Clipboard size={16} />
                                    Copy Markdown
                                </>
                            )}
                        </button>

                        {/* Secondary Action: Download */}
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="border-border hover:bg-background_lighter hover:text-foreground-50 flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200"
                        >
                            <Download size={18} />
                            Download README.md
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-background_lighter border-border flex items-center justify-end border-t px-6 py-4">
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-foreground-400 hover:text-foreground-100 flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <RefreshCw size={14} />
                        Start Fresh
                    </button>
                </div>
            </div>
        </div>
    );
}
