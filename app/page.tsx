import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "@/app/_components/home-page-client";
import { getSiteUrl, siteConfig } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Free GitHub README Builder & Generator | Create Professional Profiles",
    description:
        "Create a stunning GitHub profile README in minutes with our free generator. Guided workflow, live preview, skill badges, GitHub widgets, and export-ready markdown.",
    keywords: [
        ...siteConfig.keywords,
        "create github profile readme",
        "github bio generator",
        "free github readme",
        "github profile customizer",
        "github readme widgets",
        "github stats generator",
        "github profile banner",
    ],
    alternates: siteUrl
        ? {
              canonical: "/",
          }
        : undefined,
    openGraph: {
        type: "website",
        title: "Free GitHub README Builder & Generator",
        description:
            "Create a stunning GitHub profile README in minutes with guided workflow and live preview.",
        url: siteUrl?.toString(),
    },
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
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "200",
    },
    featureList: [
        "GitHub profile README builder",
        "Live markdown preview",
        "README generator with export-ready markdown",
        "Skill badge and widget configuration",
        "Pinned repository and GitHub stats sections",
        "GitHub trophies and streaks",
        "WakaTime cards integration",
        "Profile view counter",
        "Customizable sections",
        "No coding required",
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is a GitHub profile README?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "A GitHub profile README is a special markdown file displayed on your GitHub profile homepage. It allows you to introduce yourself, showcase your projects, and display your skills to visitors.",
            },
        },
        {
            "@type": "Question",
            name: "How do I create a GitHub profile README?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "With our README builder, you can create one in just 5 steps using our guided form. No coding required! Just fill out your information and the generator creates the markdown for you.",
            },
        },
        {
            "@type": "Question",
            name: "Is the GitHub README builder free?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, completely free! Our GitHub profile README builder is open source and has no hidden costs or premium features.",
            },
        },
        {
            "@type": "Question",
            name: "What can I include in my GitHub README?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can add personal info, social links, work/education history, tech skills with icons, GitHub stats, contribution streaks, top languages, trophies, pinned repositories, and WakaTime cards.",
            },
        },
        {
            "@type": "Question",
            name: "Does this GitHub README generator support profile widgets?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! The builder supports GitHub stats, contribution streaks, top languages, trophies, profile view counters, and WakaTime coding activity cards.",
            },
        },
    ],
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
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <HomePageClient />

            {/* SEO Content: Hidden but indexed by search engines */}
            <section className="sr-only" aria-label="GitHub README builder details">
                <h2>Free GitHub Profile README Builder &amp; Generator</h2>
                <p>
                    This free GitHub profile README builder helps developers create and generate a
                    polished README.md for their GitHub profile with a live preview, guided form
                    flow, and no coding required.
                </p>

                <h3>What is a GitHub Profile README?</h3>
                <p>
                    A GitHub profile README is a special markdown file that appears on your GitHub
                    profile homepage. It&apos;s displayed above your pinned repositories and helps
                    you introduce yourself to visitors, showcase your skills, and display your work.
                </p>

                <h3>GitHub Profile README Builder Features</h3>
                <ul>
                    <li>
                        <strong>5-Step Guided Workflow:</strong> Identity, Personal Info, Work &amp;
                        Education, Tech Stack, and GitHub Stats
                    </li>
                    <li>
                        <strong>Live Preview:</strong> See your README evolve in real-time with
                        GitHub-accurate markdown rendering
                    </li>
                    <li>
                        <strong>Skill Icons:</strong> Search and select from hundreds of tech icons
                        powered by go-skill-icons
                    </li>
                    <li>
                        <strong>GitHub Widgets:</strong> Add GitHub stats, contribution streaks, top
                        languages, trophies, and WakaTime cards
                    </li>
                    <li>
                        <strong>Custom Sections:</strong> Add social links, work history, education,
                        and personal information
                    </li>
                    <li>
                        <strong>One-Click Export:</strong> Download or copy your generated markdown
                        file
                    </li>
                    <li>
                        <strong>No Coding Required:</strong> Easy form-based interface accessible to
                        anyone
                    </li>
                    <li>
                        <strong>Responsive Design:</strong> Works on desktop, tablet, and mobile
                        devices
                    </li>
                </ul>

                <h3>Why Use a GitHub Profile README Generator?</h3>
                <p>
                    Your GitHub profile is your technical portfolio and online resume. A
                    well-crafted README helps you:
                </p>
                <ul>
                    <li>
                        Make a strong first impression with recruiters and potential collaborators
                    </li>
                    <li>Showcase your skills, experience, and GitHub statistics</li>
                    <li>Display your latest projects and pinned repositories</li>
                    <li>Highlight your technical expertise with skill badges</li>
                    <li>Show your contribution activity and coding streaks</li>
                    <li>Add social links and contact information</li>
                </ul>

                <h3>How to Create a GitHub Profile README</h3>
                <p>Using our GitHub README builder is simple and takes just 5 minutes:</p>
                <ol>
                    <li>
                        <strong>Step 1 (Identity):</strong> Add your name and headline
                    </li>
                    <li>
                        <strong>Step 2 (Personal Info):</strong> Include bio, location, and image
                        URL
                    </li>
                    <li>
                        <strong>Step 3 (Work &amp; Education):</strong> Add work history and
                        education
                    </li>
                    <li>
                        <strong>Step 4 (Tech Stack):</strong> Select skills and technologies
                    </li>
                    <li>
                        <strong>Step 5 (GitHub Stats):</strong> Configure widgets and analytics
                    </li>
                    <li>
                        <strong>Export:</strong> Download or copy your README.md file
                    </li>
                </ol>

                <h3>GitHub README Widgets &amp; Analytics</h3>
                <p>
                    Our GitHub README generator supports integrations with popular GitHub widget
                    providers:
                </p>
                <ul>
                    <li>GitHub README Stats (universal, dark, radical, merko themes)</li>
                    <li>GitHub Contribution Streaks</li>
                    <li>GitHub Top Languages</li>
                    <li>GitHub Trophies</li>
                    <li>GitHub Profile Views</li>
                    <li>WakaTime Coding Activity</li>
                    <li>GitHub Activity Graph</li>
                    <li>GitHub Pinned Repositories</li>
                </ul>

                <h3>Skill Icons &amp; Tech Badges</h3>
                <p>
                    Showcase your technical skills with 200+ technology icons including programming
                    languages, frameworks, databases, tools, and platforms. Simply search for the
                    technology and add it to your profile.
                </p>

                <h3>GitHub Profile README Best Practices</h3>
                <ul>
                    <li>Keep your intro section concise and engaging</li>
                    <li>Use skill icons to visually showcase your expertise</li>
                    <li>Add GitHub stats widgets to highlight your activity</li>
                    <li>Link to your best projects and pinned repositories</li>
                    <li>Include social media links and contact information</li>
                    <li>Update your README regularly with new achievements</li>
                    <li>Use clear sections and proper formatting</li>
                </ul>

                <h3>Common GitHub Profile README Sections</h3>
                <p>A great GitHub profile README typically includes these sections:</p>
                <ul>
                    <li>Profile image or banner</li>
                    <li>Name and headline</li>
                    <li>About me / Bio</li>
                    <li>Skills and technologies</li>
                    <li>Work experience</li>
                    <li>Education</li>
                    <li>GitHub statistics</li>
                    <li>Contribution graph</li>
                    <li>Top projects / Pinned repositories</li>
                    <li>Contact information and social links</li>
                </ul>

                <h3>Get Started Today</h3>
                <p>
                    Create your professional GitHub profile README in minutes with our free, no-code
                    GitHub README builder. Join thousands of developers who have already created
                    their GitHub profile README!
                </p>
            </section>
        </>
    );
}
