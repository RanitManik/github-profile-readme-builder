import type { Metadata } from "next";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Guides - GitHub README Builder",
    description:
        "Learn how to create an amazing GitHub profile README with our comprehensive guides and best practices.",
    alternates: siteUrl
        ? {
              canonical: "/guides",
          }
        : undefined,
    openGraph: {
        type: "website",
        title: "Guides - GitHub README Builder",
        description: "Comprehensive guides about creating stunning GitHub profile READMEs",
        url: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/guides` : undefined,
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
            name: "Guides",
            item: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/guides` : "",
        },
    ],
};

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GitHub README Builder Guides",
    description: "Collection of comprehensive guides about GitHub profile README creation",
    hasPart: [
        {
            "@type": "BlogPosting",
            headline: "How to Create a GitHub Profile README That Gets Noticed",
            description:
                "Learn the essentials of crafting a GitHub profile README that stands out and attracts opportunities.",
            datePublished: "2025-04-01",
            author: { "@type": "Organization", name: siteConfig.name },
        },
        {
            "@type": "BlogPosting",
            headline: "GitHub README Best Practices and Tips",
            description:
                "Master the best practices for creating engaging, professional GitHub profile READMEs.",
            datePublished: "2025-04-01",
            author: { "@type": "Organization", name: siteConfig.name },
        },
        {
            "@type": "BlogPosting",
            headline: "Showcase Your Skills in Your GitHub Profile",
            description:
                "Effective strategies for displaying your technical skills and technologies in your GitHub profile.",
            datePublished: "2025-04-01",
            author: { "@type": "Organization", name: siteConfig.name },
        },
    ],
};

const guides = [
    {
        id: "create-github-readme",
        title: "How to Create a GitHub Profile README That Gets Noticed",
        excerpt:
            "Learn the essentials of crafting a GitHub profile README that stands out and attracts opportunities.",
        readTime: "5 min read",
        category: "Getting Started",
    },
    {
        id: "github-readme-best-practices",
        title: "GitHub README Best Practices and Tips",
        excerpt:
            "Master the best practices for creating engaging, professional GitHub profile READMEs.",
        readTime: "7 min read",
        category: "Best Practices",
    },
    {
        id: "showcase-skills",
        title: "Showcase Your Skills in Your GitHub Profile",
        excerpt:
            "Effective strategies for displaying your technical skills and technologies in your GitHub profile.",
        readTime: "6 min read",
        category: "Skills & Badges",
    },
    {
        id: "github-stats-widgets",
        title: "Using GitHub Stats Widgets and Analytics",
        excerpt:
            "How to add GitHub stats, language statistics, and contribution analytics to your profile README.",
        readTime: "5 min read",
        category: "Widgets",
    },
    {
        id: "portfolio-readme",
        title: "Turn Your GitHub Profile into a Portfolio",
        excerpt:
            "Use your GitHub profile README as a professional portfolio to showcase your best work.",
        readTime: "8 min read",
        category: "Portfolio",
    },
    {
        id: "readme-seo",
        title: "Making Your GitHub Profile SEO-Friendly",
        excerpt:
            "Optimize your GitHub profile and README for better discoverability and search visibility.",
        readTime: "6 min read",
        category: "SEO",
    },
];

export default function GuidesPage() {
    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
                                <Link
                                    href="/features"
                                    className="text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    Features
                                </Link>
                                <Link href="/guides" className="font-semibold text-blue-600">
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
                            GitHub README Guides & Resources
                        </h1>
                        <p className="mt-4 text-xl text-slate-600">
                            Learn everything you need to know about creating an amazing GitHub
                            profile README.
                        </p>
                    </div>
                </section>

                {/* Guides Grid */}
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {guides.map((guide) => (
                            <article
                                key={guide.id}
                                className="flex flex-col rounded-lg border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
                            >
                                <div className="mb-4">
                                    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                                        {guide.category}
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900">
                                    {guide.title}
                                </h3>
                                <p className="mb-4 grow text-slate-600">{guide.excerpt}</p>
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>{guide.readTime}</span>
                                    <Link
                                        href={`/guides/${guide.id}`}
                                        className="font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Read →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-900">
                            Ready to create your GitHub README?
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
