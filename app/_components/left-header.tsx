import { Coffee } from "lucide-react";
import Logo from "@/components/logo";

export default function LeftHeader() {
    return (
        <nav className="bg-background_darker border-border flex h-full flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex min-w-0 items-center gap-4">
                <Logo />
                <div className="min-w-0">
                    <h1 className="truncate text-sm font-semibold tracking-tight select-none sm:text-base">
                        GitHub Profile README Builder
                    </h1>
                    <p className="text-foreground-400 truncate text-xs">
                        Craft a cleaner profile README with live preview and guided stages.
                    </p>
                </div>
            </div>

            <a
                href="https://buymeacoffee.com/ranitmanik"
                target="_blank"
                rel="noreferrer"
                className="bg-success hover:bg-success-500 active:bg-success-700 inline-flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
                aria-label="Support this project on Buy Me a Coffee"
            >
                <Coffee size={16} />
                Buy Me a Coffee
            </a>
        </nav>
    );
}
