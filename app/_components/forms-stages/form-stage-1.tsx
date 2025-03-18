import { Github } from "lucide-react";

export default function FormStage1() {
    return (
        <div className="grid h-full place-content-center gap-6 px-4 text-center">
            <header className="space-y-2">
                <h1 className="from-accent to-success bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                    Build Your Perfect GitHub Profile
                </h1>
                <p className="text-muted-foreground m-auto max-w-96 text-sm">
                    Stand out from <span className="font-semibold">100M+</span> developers with a
                    stunning profile README that showcases your best work
                </p>
            </header>

            <form className="mx-auto flex w-full max-w-md flex-col gap-4">
                <div className="space-y-1">
                    <label
                        htmlFor="github-username"
                        className="cursor-pointer text-sm font-semibold"
                    >
                        Enter Your GitHub Username
                        <span className="text-muted-foreground ml-1 font-normal">
                            (we&apos;ll help personalize your README)
                        </span>
                        <div
                            role="group"
                            className="border-border focus-within:outline-accent focus-within:ring-accent mt-1 flex items-center rounded-md border px-3 py-[5px] transition focus-within:ring-2"
                        >
                            <Github size={16} className="text-border-400 me-1" />
                            <span className="text-border-400 text-sm transition">github.com /</span>
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
                    className="bg-success hover:bg-success-500 active:bg-success-700 flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-1.5 font-semibold text-white transition-colors duration-75"
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
    );
}
