import Link from "next/link";
import Logo from "@/components/logo";

export default function ContentPageLayout({
    children,
    currentPage,
}: {
    children: React.ReactNode;
    currentPage: "features" | "guides" | "faq";
}) {
    const navItems = [
        { href: "/", label: "Home", key: "home" },
        { href: "/features", label: "Features", key: "features" },
        { href: "/guides", label: "Guides", key: "guides" },
        { href: "/faq", label: "FAQ", key: "faq" },
    ];

    return (
        <div className="bg-background flex min-h-screen flex-col">
            {/* Navigation */}
            <nav className="bg-background_darker border-border sticky top-0 z-50 border-b">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-3 transition-opacity hover:opacity-80"
                        >
                            <div className="h-8 w-8">
                                <Logo />
                            </div>
                            <span className="text-foreground-50 hidden text-sm font-semibold sm:inline">
                                README Builder
                            </span>
                        </Link>

                        <div className="flex gap-1 sm:gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                                        currentPage === item.key
                                            ? "bg-accent text-background"
                                            : "text-foreground-300 hover:text-foreground-50 hover:bg-neutral-900"
                                    }`}
                                >
                                    <span className="hidden sm:inline">{item.label}</span>
                                    <span className="sm:hidden">{item.label.slice(0, 1)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer CTA */}
            <footer className="bg-background_darker border-border mt-20 border-t">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-foreground-300 mb-6">
                            Ready to create your professional GitHub profile README?
                        </p>
                        <Link
                            href="/"
                            className="bg-accent text-background hover:bg-accent-600 inline-block rounded-lg px-6 py-3 font-semibold transition-colors"
                        >
                            Start Building Now →
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
