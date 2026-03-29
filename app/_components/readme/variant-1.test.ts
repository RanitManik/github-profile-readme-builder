import { describe, expect, it } from "vitest";
import { generatePreviewREADME, generateREADME } from "./variant-1";
import { DEFAULT_README_DATA } from "@/lib/types";

describe("generateREADME", () => {
    it("omits dead placeholder links in the final README output", () => {
        const markdown = generateREADME({
            ...DEFAULT_README_DATA,
            username: "octocat",
            company: "GitHub",
            institution: "MIT",
        });

        expect(markdown).toContain("at **GitHub**.");
        expect(markdown).toContain("at **MIT**.");
        expect(markdown).not.toContain("](#)");
    });

    it("sanitizes user-provided markdown and unsafe URLs", () => {
        const markdown = generateREADME({
            ...DEFAULT_README_DATA,
            username: "octocat",
            name: "<b>Ada</b> [x]",
            tagline: "<script>alert('xss')</script>",
            company: "ACME [Lab]",
            companyUrl: "javascript:alert('xss')",
            email: "ada@example.com",
            linkedinUrl: "javascript:alert('xss')",
        });

        expect(markdown).toContain(
            "# Hi👋, I'm [&lt;b&gt;Ada&lt;/b&gt; \\[x\\]](https://github.com/octocat)",
        );
        expect(markdown).toContain("### &lt;script&gt;alert\\('xss'\\)&lt;/script&gt;");
        expect(markdown).toContain("at **ACME \\[Lab\\]**.");
        expect(markdown).not.toContain("javascript:");
    });

    it("keeps a LinkedIn contact option when no email is provided", () => {
        const markdown = generateREADME({
            ...DEFAULT_README_DATA,
            username: "octocat",
            linkedinUrl: "https://linkedin.com/in/octocat",
            email: "",
        });

        expect(markdown).toContain(
            "Connect with me on [**LinkedIn**](https://linkedin.com/in/octocat).",
        );
    });

    it("renders skill icon rows as theme-aware picture elements", () => {
        const markdown = generateREADME({
            ...DEFAULT_README_DATA,
            username: "octocat",
            skills: ["go", "typescript"],
        });

        expect(markdown).toContain("<picture>");
        expect(markdown).toContain("prefers-color-scheme: dark");
        expect(markdown).toContain("theme=dark");
        expect(markdown).toContain("theme=light");
    });

    it("adds a Buy Me a Coffee badge to the footer when enabled", () => {
        const markdown = generateREADME({
            ...DEFAULT_README_DATA,
            username: "octocat",
            showBmcBadge: true,
        });

        expect(markdown).toContain("buymeacoffee.com/ranitmanik");
        expect(markdown).toContain('<a href="https://buymeacoffee.com/ranitmanik">');
        expect(markdown).toContain(
            "img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee",
        );
    });
});

describe("generatePreviewREADME", () => {
    it("shows a full-strength example preview on stage 1", () => {
        const markdown = generatePreviewREADME(DEFAULT_README_DATA, 1);

        expect(markdown).not.toContain("filter:grayscale(1);opacity:0.4;");
        expect(markdown).toContain('<h2 align="center">📊 GitHub Stats</h2>');
        expect(markdown).toContain(
            '<img width="400px" align="center" alt="GitHub Stats" src="/README/variant-1/dark/readme-stat-1.svg" />',
        );
    });

    it("renders the Buy Me a Coffee badge in preview when enabled", () => {
        const markdown = generatePreviewREADME(
            {
                ...DEFAULT_README_DATA,
                username: "octocat",
                showBmcBadge: true,
            },
            5,
        );

        expect(markdown).toContain("buymeacoffee.com/ranitmanik");
        expect(markdown).toContain('<a href="https://buymeacoffee.com/ranitmanik">');
        expect(markdown).toContain(
            'src="https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee"',
        );
    });

    it("sanitizes preview content while keeping stage placeholders", () => {
        const markdown = generatePreviewREADME(
            {
                ...DEFAULT_README_DATA,
                username: "octocat",
                name: "<b>Ada</b>",
                portfolioUrl: "javascript:alert('xss')",
            },
            2,
        );

        expect(markdown).toContain("[**&lt;b&gt;Ada&lt;/b&gt;**](https://github.com/octocat)");
        expect(markdown).not.toContain("javascript:");
        expect(markdown).not.toContain("Your tagline goes here");
        expect(markdown).not.toContain("###");
    });
});
