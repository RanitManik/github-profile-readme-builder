import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                /* Accent colors */
                accent: {
                    DEFAULT: "rgb(var(--accent-default))",
                    emphasis: "rgb(var(--accent-emphasis))",
                    muted: "rgb(var(--accent-muted))",
                    subtle: "rgb(var(--accent-subtle))",
                },
                /* Foreground colors */
                foreground: {
                    DEFAULT: "rgb(var(--fg-default))",
                    emphasis: "rgb(var(--fg-emphasis))",
                    muted: "rgb(var(--fg-muted))",
                    subtle: "rgb(var(--fg-subtle))",
                },
                /* Background colors */
                background: {
                    DEFAULT: "rgb(var(--bg-default))",
                    inset: "rgb(var(--bg-inset))",
                    subtle: "rgb(var(--bg-subtle))",
                    muted: "rgb(var(--bg-muted))",
                },
                /* Border colors */
                border: {
                    DEFAULT: "rgb(var(--border-default))",
                    muted: "rgb(var(--border-muted))",
                    subtle: "rgb(var(--border-subtle))",
                },
                /* Success colors */
                success: {
                    DEFAULT: "rgb(var(--success-default))",
                    emphasis: "rgb(var(--success-emphasis))",
                    muted: "rgb(var(--success-muted))",
                    subtle: "rgb(var(--success-subtle))",
                },
                /* Attention colors */
                attention: {
                    DEFAULT: "rgb(var(--attention-default))",
                    emphasis: "rgb(var(--attention-emphasis))",
                    muted: "rgb(var(--attention-muted))",
                    subtle: "rgb(var(--attention-subtle))",
                },
                /* Danger colors */
                danger: {
                    DEFAULT: "rgb(var(--danger-default))",
                    emphasis: "rgb(var(--danger-emphasis))",
                    muted: "rgb(var(--danger-muted))",
                    subtle: "rgb(var(--danger-subtle))",
                },
                /* Done colors */
                done: {
                    DEFAULT: "rgb(var(--done-default))",
                    emphasis: "rgb(var(--done-emphasis))",
                    muted: "rgb(var(--done-muted))",
                    subtle: "rgb(var(--done-subtle))",
                },
                /* Neutral colors */
                neutral: {
                    DEFAULT: "rgb(var(--neutral-default))",
                    muted: "rgb(var(--neutral-muted))",
                    emphasis: "rgb(var(--neutral-emphasis))",
                    subtle: "rgb(var(--neutral-subtle))",
                },
            },
            boxShadow: {
                focus: "var(--primer-shadow-focus)",
                inset: "var(--primer-shadow-inset)",
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [tailwindcss_animate],
} satisfies Config;
