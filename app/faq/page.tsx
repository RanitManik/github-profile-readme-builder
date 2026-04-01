import type { Metadata } from "next";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";
import ContentPageLayout from "@/app/_components/content-page-layout";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "FAQ - GitHub README Builder",
    description:
        "Find answers to frequently asked questions about the GitHub Profile README Builder.",
    alternates: siteUrl
        ? {
              canonical: "/faq",
          }
        : undefined,
    openGraph: {
        type: "website",
        title: "FAQ - GitHub README Builder",
        description: "Frequently asked questions about the GitHub Profile README Builder",
        url: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/faq` : undefined,
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
            name: "FAQ",
            item: siteUrl ? `${siteUrl.toString().replace(/\/$/, "")}/faq` : "",
        },
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is the GitHub Profile README Builder?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The GitHub Profile README Builder is a free web application that helps developers create stunning GitHub profile READMEs with a guided 5-step workflow. It includes a live preview, skill badges, widgets configuration, and export-ready markdown.",
            },
        },
        {
            "@type": "Question",
            name: "Is the GitHub README Builder free to use?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! The GitHub Profile README Builder is completely free. No sign-up required, no limitations, and no hidden costs.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need to code to use this README generator?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No coding required at all! The builder uses an intuitive form-based interface with a live preview. You can create a professional README without touching any code.",
            },
        },
        {
            "@type": "Question",
            name: "What widgets and sections does the README builder support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The builder supports profile intro, work and education history, social links, skill badges, GitHub stats, contribution streaks, top languages, GitHub trophies, WakaTime cards, pinned repositories, and profile view counters.",
            },
        },
        {
            "@type": "Question",
            name: "Can I edit the generated markdown after downloading it?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely! The generated markdown is standard GitHub Markdown (GFM), so you can edit it in any text editor or directly on GitHub. You can always regenerate it later using the builder.",
            },
        },
        {
            "@type": "Question",
            name: "How do I use the generated README on my GitHub profile?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Once you generate your README, download it or copy the text. Then create a special repository with your GitHub username as the name (e.g., 'ranitmanik/ranitmanik'). Upload or paste the README.md file into that repository, and it will automatically appear on your GitHub profile.",
            },
        },
        {
            "@type": "Question",
            name: "Is my data saved anywhere?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No, your data is completely private and only stored in your browser's local storage. It's never sent to any server. You have full control over your data.",
            },
        },
        {
            "@type": "Question",
            name: "Can I use the GitHub stats and widgets on my README?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! The builder integrates with popular GitHub widget providers like github-readme-stats, github-readme-streak-stats, github-readme-activity-graph, and more. You can toggle these widgets on and off as needed.",
            },
        },
        {
            "@type": "Question",
            name: "How do I update my GitHub profile README later?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Simply use the README builder again to regenerate your profile. Edit your information in the form, see the live preview, and download or copy the updated markdown to replace your existing README.",
            },
        },
        {
            "@type": "Question",
            name: "Does this tool support multiple profile images?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can add an image URL in the Personal Info section. This could be your avatar, profile picture, or any image you want to showcase at the top of your README.",
            },
        },
        {
            "@type": "Question",
            name: "Can I customize the colors and styling?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The builder generates markdown that you can further customize. Some widgets support color parameters that you can modify after generation. The live preview shows you exactly what it will look like.",
            },
        },
        {
            "@type": "Question",
            name: "Is there an API or can I contribute to the project?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The GitHub README Builder is open source! You can find the source code on GitHub at github.com/RanitManik/github-profile-readme-builder. Contributions, issues, and feature requests are welcome!",
            },
        },
    ],
};

const faqs = [
    {
        question: "What is the GitHub Profile README Builder?",
        answer: "The GitHub Profile README Builder is a free web application that helps developers create stunning GitHub profile READMEs with a guided 5-step workflow. It includes a live preview, skill badges, widgets configuration, and export-ready markdown.",
    },
    {
        question: "Is the GitHub README Builder free to use?",
        answer: "Yes! The GitHub Profile README Builder is completely free. No sign-up required, no limitations, and no hidden costs.",
    },
    {
        question: "Do I need to code to use this README generator?",
        answer: "No coding required at all! The builder uses an intuitive form-based interface with a live preview. You can create a professional README without touching any code.",
    },
    {
        question: "What widgets and sections does the README builder support?",
        answer: "The builder supports profile intro, work and education history, social links, skill badges, GitHub stats, contribution streaks, top languages, GitHub trophies, WakaTime cards, pinned repositories, and profile view counters.",
    },
    {
        question: "Can I edit the generated markdown after downloading it?",
        answer: "Absolutely! The generated markdown is standard GitHub Markdown (GFM), so you can edit it in any text editor or directly on GitHub. You can always regenerate it later using the builder.",
    },
    {
        question: "How do I use the generated README on my GitHub profile?",
        answer: "Once you generate your README, download it or copy the text. Then create a special repository with your GitHub username as the name (e.g., 'ranitmanik/ranitmanik'). Upload or paste the README.md file into that repository, and it will automatically appear on your GitHub profile.",
    },
    {
        question: "Is my data saved anywhere?",
        answer: "No, your data is completely private and only stored in your browser's local storage. It's never sent to any server. You have full control over your data.",
    },
    {
        question: "Can I use the GitHub stats and widgets on my README?",
        answer: "Yes! The builder integrates with popular GitHub widget providers like github-readme-stats, github-readme-streak-stats, github-readme-activity-graph, and more. You can toggle these widgets on and off as needed.",
    },
    {
        question: "How do I update my GitHub profile README later?",
        answer: "Simply use the README builder again to regenerate your profile. Edit your information in the form, see the live preview, and download or copy the updated markdown to replace your existing README.",
    },
    {
        question: "Does this tool support multiple profile images?",
        answer: "You can add an image URL in the Personal Info section. This could be your avatar, profile picture, or any image you want to showcase at the top of your README.",
    },
    {
        question: "Can I customize the colors and styling?",
        answer: "The builder generates markdown that you can further customize. Some widgets support color parameters that you can modify after generation. The live preview shows you exactly what it will look like.",
    },
    {
        question: "Is there an API or can I contribute to the project?",
        answer: "The GitHub README Builder is open source! You can find the source code on GitHub. Contributions, issues, and feature requests are welcome!",
    },
];

export default function FAQPage() {
    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ContentPageLayout currentPage="faq">
                <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-foreground-50 text-4xl font-bold sm:text-5xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-foreground-300 mt-4 text-lg">
                            Find answers to common questions about the GitHub README Builder.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-border hover:border-accent rounded-lg border bg-neutral-950 p-6 transition-colors"
                            >
                                <h3 className="text-foreground-50 mb-3 text-lg font-bold">
                                    {faq.question}
                                </h3>
                                <p className="text-foreground-300 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </ContentPageLayout>
        </>
    );
}
