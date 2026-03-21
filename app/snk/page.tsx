"use client";

import { FormEvent, useState } from "react";
import { Copy, Download, Check, AlertCircle } from "lucide-react";

type Theme = "dark" | "light";

const SnkPage = () => {
    const [username, setUsername] = useState("");
    const [theme, setTheme] = useState<Theme>("dark");
    const [stepDurationMs, setStepDurationMs] = useState<number>(50);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setSvg("");

        if (!username.trim()) {
            setError("Please enter a GitHub username.");
            return;
        }

        setLoading(true);

        try {
            const resp = await fetch("/api/snk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    theme,
                    stepDurationMs,
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                setError(data.error || "Failed to generate snake SVG.");
            } else {
                setSvg(data.svg);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(svg);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        element.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
        element.setAttribute("download", `${username}-snake.svg`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const isDark = theme === "dark";

    return (
        <div
            className={`flex h-screen flex-col ${
                isDark
                    ? "bg-linear-to-br from-slate-950 to-slate-900"
                    : "bg-linear-to-br from-slate-50 to-white"
            }`}
        >
            {/* Header - Fixed, No Overflow */}
            <header
                className={`border-b ${
                    isDark
                        ? "border-slate-800 bg-slate-950/95 backdrop-blur-sm"
                        : "border-slate-200 bg-white/95 backdrop-blur-sm"
                } sticky top-0 z-40`}
            >
                <div className="flex h-14 items-center px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-green-600 to-emerald-600 text-sm font-bold">
                            🐍
                        </div>
                        <div>
                            <h1 className="text-base leading-none font-semibold">GitHub Snake</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Scrollable */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Sidebar - Form */}
                        <aside className="lg:col-span-1">
                            <div
                                className={`rounded-lg border ${
                                    isDark
                                        ? "border-slate-800 bg-slate-900/50"
                                        : "border-slate-200 bg-slate-50/50"
                                } sticky max-h-[calc(100vh-100px)] overflow-y-auto p-4`}
                            >
                                <h2 className="mb-4 text-sm font-semibold">Generate Snake</h2>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {/* Username Input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="username"
                                            className="text-xs font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            GitHub username
                                        </label>
                                        <input
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="e.g. torvalds"
                                            className={`rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:ring-offset-0 focus:outline-none ${
                                                isDark
                                                    ? "border-slate-700 bg-slate-800 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                                                    : "border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                            required
                                        />
                                    </div>

                                    {/* Theme Select */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="theme"
                                            className="text-xs font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Theme
                                        </label>
                                        <select
                                            id="theme"
                                            value={theme}
                                            onChange={(e) => setTheme(e.target.value as Theme)}
                                            className={`rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none ${
                                                isDark
                                                    ? "border-slate-700 bg-slate-800 text-slate-100 focus:border-blue-500 focus:ring-blue-500/20"
                                                    : "border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                        >
                                            <option value="dark">Dark</option>
                                            <option value="light">Light</option>
                                        </select>
                                    </div>

                                    {/* Animation Speed */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="stepDurationMs"
                                            className="text-xs font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Animation speed
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                id="stepDurationMs"
                                                type="range"
                                                min={10}
                                                max={500}
                                                step={10}
                                                value={stepDurationMs}
                                                onChange={(e) =>
                                                    setStepDurationMs(Number(e.target.value))
                                                }
                                                className="h-2 flex-1 cursor-pointer appearance-none rounded-lg accent-green-600"
                                            />
                                            <span className="min-w-11.25 rounded bg-slate-800/50 px-2 py-1 text-right font-mono text-xs text-slate-400 dark:bg-slate-700/50 dark:text-slate-300">
                                                {stepDurationMs}ms
                                            </span>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div
                                            className={`flex gap-2 rounded-md p-3 text-xs ${
                                                isDark
                                                    ? "border border-red-800/50 bg-red-950/40 text-red-300"
                                                    : "border border-red-200 bg-red-50 text-red-700"
                                            }`}
                                        >
                                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`mt-2 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                            loading
                                                ? "cursor-not-allowed bg-slate-600 text-white opacity-60"
                                                : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                <span className="text-xs">Generating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Generate</span>
                                                <span>🐍</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </aside>

                        {/* Main Content - Preview */}
                        <article className="lg:col-span-3">
                            {svg ? (
                                <div className="space-y-4">
                                    {/* SVG Preview */}
                                    <div
                                        className={`overflow-hidden rounded-lg border ${
                                            isDark
                                                ? "border-slate-800 bg-slate-900/50"
                                                : "border-slate-200 bg-white/50"
                                        }`}
                                    >
                                        <div
                                            className={`border-b px-4 py-3 ${
                                                isDark
                                                    ? "border-slate-800 bg-slate-800/30"
                                                    : "border-slate-200 bg-slate-50/50"
                                            }`}
                                        >
                                            <h3 className="text-sm font-semibold">Preview</h3>
                                            <p
                                                className={`text-xs ${
                                                    isDark ? "text-slate-400" : "text-slate-600"
                                                }`}
                                            >
                                                @{username} • {theme === "dark" ? "Dark" : "Light"}{" "}
                                                theme
                                            </p>
                                        </div>
                                        <div
                                            className={`px-6 py-8 ${
                                                isDark ? "bg-slate-950" : "bg-white"
                                            } flex justify-center`}
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: svg }} />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCopy}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                                                isDark
                                                    ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                                                    : "border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100"
                                            }`}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={16} />
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={16} />
                                                    <span>Copy SVG</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                                                isDark
                                                    ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                                                    : "border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100"
                                            }`}
                                        >
                                            <Download size={16} />
                                            <span>Download</span>
                                        </button>
                                    </div>

                                    {/* Code Block */}
                                    <div
                                        className={`overflow-hidden rounded-lg border ${
                                            isDark
                                                ? "border-slate-800 bg-slate-900/50"
                                                : "border-slate-200 bg-white/50"
                                        }`}
                                    >
                                        <div
                                            className={`border-b px-4 py-2 text-xs font-semibold ${
                                                isDark
                                                    ? "border-slate-800 bg-slate-800/30"
                                                    : "border-slate-200 bg-slate-50/50"
                                            }`}
                                        >
                                            SVG Markup
                                        </div>
                                        <textarea
                                            readOnly
                                            value={svg}
                                            className={`h-64 w-full resize-none p-4 font-mono text-xs focus:outline-none ${
                                                isDark
                                                    ? "bg-slate-950 text-slate-300"
                                                    : "bg-white text-slate-700"
                                            }`}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex min-h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center ${
                                        isDark
                                            ? "border-slate-800 bg-slate-900/20"
                                            : "border-slate-200 bg-slate-50/50"
                                    }`}
                                >
                                    <div className="mb-4 text-5xl">🐍</div>
                                    <h3 className="mb-2 text-base font-semibold">No snake yet!</h3>
                                    <p
                                        className={`max-w-xs text-sm ${
                                            isDark ? "text-slate-400" : "text-slate-600"
                                        }`}
                                    >
                                        Enter a GitHub username and click Generate to create your
                                        animated contribution snake.
                                    </p>
                                </div>
                            )}
                        </article>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer
                className={`border-t ${
                    isDark ? "border-slate-800 bg-slate-950/50" : "border-slate-200 bg-slate-50/50"
                } px-4 py-4`}
            >
                <div className="mx-auto max-w-7xl text-center">
                    <p className="text-xs text-slate-500">
                        Built with GitHub&apos;s design •{" "}
                        <a
                            href="https://github.com/Platane/snk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-400"
                        >
                            Platane/snk
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default SnkPage;
