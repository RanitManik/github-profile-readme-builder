const FALLBACK_SITE_NAME = "GitHub Profile README Builder";
const FALLBACK_SITE_DESCRIPTION =
    "Free GitHub README builder and generator for creating GitHub profile README.md files with live preview, customizable sections, skill badges, and export-ready markdown.";

function normalizeUrl(value?: string | null) {
    if (!value) return null;

    const trimmed = value.trim();
    if (!trimmed) return null;

    const withProtocol =
        trimmed.startsWith("http://") || trimmed.startsWith("https://")
            ? trimmed
            : `https://${trimmed}`;

    try {
        return new URL(withProtocol);
    } catch {
        return null;
    }
}

export function getSiteUrl() {
    return (
        normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
        normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
        normalizeUrl(process.env.VERCEL_URL)
    );
}

export const siteConfig = {
    name: FALLBACK_SITE_NAME,
    shortName: "README Builder",
    description: FALLBACK_SITE_DESCRIPTION,
    keywords: [
        "github readme builder",
        "github readme generator",
        "github profile readme builder",
        "github profile readme generator",
        "readme builder",
        "readme generator",
        "github profile generator",
        "markdown readme builder",
    ],
} as const;
