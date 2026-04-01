import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";
import React from "react";
import { getSiteUrl, siteConfig } from "@/lib/site";
import Script from "next/script";

const siteUrl = getSiteUrl();
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl?.toString(),
    logo: siteUrl
        ? `${siteUrl.toString().replace(/\/$/, "")}/logo.png`
        : "https://github.com/RanitManik/github-profile-readme-builder/raw/main/public/logo.png",
    description: siteConfig.description,
    sameAs: [
        "https://github.com/RanitManik/github-profile-readme-builder",
        "https://twitter.com/ranitmanik",
    ],
};

export const metadata: Metadata = {
    metadataBase: siteUrl ?? undefined,
    title: {
        default: "GitHub README Builder & Generator",
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    category: "developer tools",
    alternates: siteUrl
        ? {
              canonical: "/",
          }
        : undefined,
    openGraph: {
        type: "website",
        title: "GitHub README Builder & Generator",
        description: siteConfig.description,
        siteName: siteConfig.name,
        url: siteUrl?.toString(),
        images: siteUrl
            ? [
                  {
                      url: "/logo.png",
                      alt: "GitHub Profile README Builder logo",
                  },
              ]
            : undefined,
    },
    twitter: {
        card: "summary",
        title: "GitHub README Builder & Generator",
        description: siteConfig.description,
        images: siteUrl ? ["/logo.png"] : undefined,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    id="organization-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className="antialiased">
                {children}
                {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
            </body>
        </html>
    );
}
