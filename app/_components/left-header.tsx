import Image from "next/image";
import GitHubButton from "react-github-btn";
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

            <div className="space-x-2">
                <GitHubButton
                    href="https://github.com/RanitManik/github-profile-readme-builder"
                    data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                    data-size="large"
                    data-show-count={true}
                    data-text="Star"
                    aria-label="Star RanitManik/github-profile-readme-builder on GitHub"
                />

                <a
                    href="https://buymeacoffee.com/ranitmanik"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-7 items-center"
                    aria-label="Support this project on Buy Me a Coffee"
                >
                    <Image
                        src="/bmc-button.png"
                        alt="Buy Me a Coffee"
                        width={140}
                        height={39}
                        className="h-7 w-auto"
                    />
                </a>
            </div>
        </nav>
    );
}
