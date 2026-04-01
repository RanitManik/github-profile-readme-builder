import type { Metadata } from "next";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Features - GitHub README Builder",
    description:
        "Explore all the features of our GitHub Profile README builder including live preview, skill badges, GitHub widgets, and more.",
    alternates: siteUrl
        ? {
              canonical: "/features",
          }
        : undefined,
    openGraph: {
        type: "website",
        title: "Features - GitHub README Builder",
        description:
            "Explore all the features of our free GitHub Profile README builder and generator.",
        url: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/features` : undefined,
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl?.toString() ?? "",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Features",
            item: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/features` : "",
        },
    ],
};

const featureListSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "GitHub README Builder Features",
    description: "Complete feature list of the GitHub Profile README builder",
    author: {
        "@type": "Organization",
        name: siteConfig.name,
    },
    hasPart: [
        {
            "@type": "Thing",
            name: "Guided 5-Step Workflow",
            description:
                "Structured form covering Identity, Personal Info, Work & Education, Tech Stack, and GitHub Stats",
        },
        {
            "@type": "Thing",
            name: "Live Preview",
            description:
                "See your README evolve in real-time with GitHub-accurate markdown previewer",
        },
        {
            "@type": "Thing",
            name: "Tech Stack Picker",
            description: "Search and select from hundreds of tech icons powered by go-skill-icons",
        },
        {
            "@type": "Thing",
            name: "Dynamic Widgets",
            description:
                "Easily toggle and configure GitHub Stats, Streaks, Languages, Trophies, WakaTime cards, and more",
        },
        {
            "@type": "Thing",
            name: "Export-Ready",
            description:
                "One-click to copy the markdown or download the .md file for immediate use",
        },
        {
            "@type": "Thing",
            name: "Performance-First",
            description: "Built with Next.js 15 and React 19 for a fast, snappy experience",
        },
    ],
};

export default function FeaturesPage() {
    const features = [
        {
            icon: "🎯",
            title: "Guided 5-Step Workflow",
            description:
                "A structured form covering everything: Identity, Personal Info, Work & Education, Tech Stack, and GitHub Stats. No guessing required.",
        },
        {
            icon: "👁️",
            title: "Live Preview",
            description:
                "See your README evolve in real-time with a GitHub-accurate markdown previewer. What you see is what you get.",
        },
        {
            icon: "🛠️",
            title: "Tech Stack Picker",
            description:
                "Search and select from hundreds of tech icons. Integration with go-skill-icons makes it easy to showcase your skills.",
        },
        {
            icon: "📊",
            title: "Dynamic Widgets",
            description:
                "Toggle and configure multiple widgets: GitHub Stats, Streaks, Top Languages, Trophies, Profile View counters, WakaTime cards, and pinned repositories.",
        },
        {
            icon: "💾",
            title: "Export-Ready",
            description:
                "One-click to copy the markdown or download the .md file. Your README is ready to paste directly into your GitHub profile.",
        },
        {
            icon: "⚡",
            title: "Performance-First",
            description:
                "Built with Next.js 15 and React 19 for a fast, snappy experience. Optimized for speed and reliability.",
        },
        {
            icon: "🔧",
            title: "Customizable Sections",
            description:
                "Add intro text, work history, education, social links, and more. Customize every section to match your style.",
        },
        {
            icon: "📱",
            title: "Responsive Design",
            description:
                "Works seamlessly across all devices. Build your GitHub profile README on any screen size.",
        },
    ];

    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="feature-list-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(featureListSchema) }}
            />
            <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
                {/* Navigation */}
                <nav className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="text-xl font-bold text-slate-900">
                                README Builder
                            </Link>
                            <div className="flex gap-4">
                                <Link
                                    href="/"
                                    className="text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    Home
                                </Link>
                                <Link href="/features" className="font-semibold text-blue-600">
                                    Features
                                </Link>
                                <Link
                                    href="/guides"
                                    className="text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    Guides
                                </Link>
                                <Link
                                    href="/faq"
                                    className="text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    FAQ
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                            Powerful Features for GitHub Profile READMEs
                        </h1>
                        <p className="mt-4 text-xl text-slate-600">
                            Everything you need to create a stunning GitHub profile README in
                            minutes.
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
                            >
                                <div className="mb-4 text-4xl">{feature.icon}</div>
                                <h3 className="mb-2 text-xl font-bold text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-900">
                            Ready to build your GitHub README?
                        </h2>
                        <Link
                            href="/"
                            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            Start Building →
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
