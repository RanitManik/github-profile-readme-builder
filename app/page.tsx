import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "@/app/_components/home-page-client";
import { getSiteUrl, siteConfig } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "GitHub README Builder & Generator",
    description: siteConfig.description,
    alternates: siteUrl
        ? {
              canonical: "/",
          }
        : undefined,
};

const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteUrl?.toString(),
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    featureList: [
        "GitHub profile README builder",
        "Live markdown preview",
        "README generator with export-ready markdown",
        "Skill badge and widget configuration",
        "Pinned repository and GitHub stats sections",
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is this GitHub README builder used for?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It helps developers create a GitHub profile README with guided steps, live preview, and export-ready markdown.",
            },
        },
        {
            "@type": "Question",
            name: "Does this GitHub README generator support profile widgets and skill badges?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The builder supports sections like GitHub stats, streaks, top languages, trophies, pinned repositories, profile views, and skill icons.",
            },
        },
        {
            "@type": "Question",
            name: "Can I use this README builder without changing the generated markdown manually?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The app generates markdown for you and includes a live preview so you can copy or download the finished README.md file.",
            },
        },
    ],
};

export default function Page() {
    return (
        <>
            <Script
                id="software-application-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <HomePageClient />
            <section className="sr-only" aria-label="GitHub README builder details">
                <h2>GitHub README Builder and Generator</h2>
                <p>
                    This free GitHub profile README builder helps developers generate a polished
                    README.md for their GitHub profile with a live preview and guided form flow.
                </p>
                <p>
                    The GitHub README generator includes profile intro sections, work and education
                    details, social links, skill badges, pinned repositories, GitHub stats, streaks,
                    top languages, trophies, WakaTime cards, and profile view widgets.
                </p>
                <p>
                    Use it to build a GitHub profile README quickly, customize the output, and copy
                    or download the generated markdown when you are done.
                </p>
            </section>
        </>
    );
}
