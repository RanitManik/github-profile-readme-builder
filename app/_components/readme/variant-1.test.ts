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
});

describe("generatePreviewREADME", () => {
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

        expect(markdown).toContain("[&lt;b&gt;Ada&lt;/b&gt;](https://github.com/octocat)");
        expect(markdown).not.toContain("javascript:");
        expect(markdown).toContain("Your tagline goes here");
    });
});
