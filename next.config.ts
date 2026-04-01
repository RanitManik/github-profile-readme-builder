import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        formats: ["image/avif", "image/webp"],
    },

    // Enable compression
    compress: true,

    // Headers for SEO and security
    headers: async () => {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },

    // Redirects for better UX
    redirects: async () => {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true,
            },
        ];
    },

    // Rewrites for clean URLs
    rewrites: async () => {
        return {
            beforeFiles: [],
            afterFiles: [],
            fallback: [],
        };
    },

    // Optimize bundle
    swcMinify: true,
    poweredByHeader: false,
};

export default nextConfig;
