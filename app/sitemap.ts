import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();

    if (!siteUrl) return [];

    const url = siteUrl.toString().replace(/\/$/, "");

    return [
        {
            url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
}
