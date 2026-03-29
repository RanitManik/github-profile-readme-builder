import { ReadmeData } from "@/lib/types";

const normalizeText = (value: string) => value.trim();

const escapeMarkdownText = (value: string) =>
    normalizeText(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\\/g, "\\\\")
        .replace(/([`*_{}[\]()|])/g, "\\$1");

const escapeHtmlAttribute = (value: string) =>
    normalizeText(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

const sanitizeUsername = (value: string) => normalizeText(value).replace(/^@+/, "");

const sanitizeWebUrl = (value: string, fallback?: string) => {
    const normalized = normalizeText(value);
    if (!normalized) return fallback;

    try {
        const url = new URL(normalized);
        return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : fallback;
    } catch {
        return fallback;
    }
};

const sanitizeEmail = (value: string) => {
    const normalized = normalizeText(value);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : undefined;
};

const buildUrl = (base: string, params: Record<string, string>) => {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
};

const buildSkillIconsUrl = (skills: string[], theme?: "dark" | "light") =>
    buildUrl("https://go-skill-icons.vercel.app/api/icons", {
        i: skills.join(","),
        ...(theme ? { theme } : {}),
    });

const buildSkillIconsPicture = (skills: string[], attrs = `loading="lazy" alt="Tech Stack"`) =>
    `<picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${buildSkillIconsUrl(skills, "dark")}" />\n      <source media="(prefers-color-scheme: light)" srcset="${buildSkillIconsUrl(skills, "light")}" />\n      <img ${attrs} src="${buildSkillIconsUrl(skills, "dark")}" />\n    </picture>`;

const linkText = (value: string, url?: string) =>
    url && url !== "#" && url !== ""
        ? `[**${escapeMarkdownText(value)}**](${url})`
        : `**${escapeMarkdownText(value)}**`;

export function generateREADME(data: ReadmeData): string {
    const {
        username,
        name,
        tagline,
        location,
        portfolioUrl,
        email,
        linkedinUrl,
        jobTitle,
        company,
        companyUrl,
        workingOn,
        expertise,
        degree,
        institution,
        institutionUrl,
        pinnedRepo1,
        pinnedRepo2,
        skills,
        showGithubStats,
        showStreakStats,
        showTopLanguages,
        showWakatimeStats,
        wakatimeUsername,
        showTrophies,
        showProfileViews,
        showBmcBadge,
        showPinnedRepos,
    } = data;

    const safeUsername = sanitizeUsername(username);
    const user = safeUsername || "your-username";
    const safeName = normalizeText(name);
    const safeTagline = normalizeText(tagline);
    const safeLocation = normalizeText(location);
    const safeWorkingOn = normalizeText(workingOn);
    const safeExpertise = normalizeText(expertise);
    const safeDegree = normalizeText(degree);
    const safeCompany = normalizeText(company);
    const safeInstitution = normalizeText(institution);
    const safePinnedRepo1 = normalizeText(pinnedRepo1);
    const safePinnedRepo2 = normalizeText(pinnedRepo2);
    const safeEmail = sanitizeEmail(email);
    const safeCompanyUrl = sanitizeWebUrl(companyUrl);
    const safeInstitutionUrl = sanitizeWebUrl(institutionUrl);
    const safePortfolioUrl = sanitizeWebUrl(
        portfolioUrl,
        `https://github.com/${encodeURIComponent(user)}`,
    );
    const safeLinkedinUrl = sanitizeWebUrl(linkedinUrl);
    const safeWakatime = sanitizeUsername(wakatimeUsername) || user;
    const displayName = safeName || safeUsername || "Your Name";
    const bmcBadge = `<a href="https://buymeacoffee.com/ranitmanik"><img height="20" alt="Buy Me a Coffee" src="https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee" /></a>`;

    const pic = (d: string, l: string, attrs: string) =>
        `<picture>\n    <source media="(prefers-color-scheme: dark)" srcset="${d}" />\n    <source media="(prefers-color-scheme: light)" srcset="${l}" />\n    <img ${attrs} src="${d}" />\n  </picture>`;

    const bullets: string[] = [];
    if (safeWorkingOn)
        bullets.push(`- 🔭 Currently working on **${escapeMarkdownText(safeWorkingOn)}**.`);
    if (safeCompany)
        bullets.push(
            `- 👨‍💼 ${escapeMarkdownText(jobTitle || "Developer")} at ${linkText(safeCompany, safeCompanyUrl)}.`,
        );
    if (safeInstitution)
        bullets.push(
            `- 🏫 Pursuing a ${escapeMarkdownText(safeDegree || "degree")} at ${linkText(safeInstitution, safeInstitutionUrl)}.`,
        );
    if (safeExpertise) bullets.push(`- 📚 Proficient in **${escapeMarkdownText(safeExpertise)}**.`);
    if (sanitizeWebUrl(portfolioUrl))
        bullets.push(
            `- 🌐 Visit my [**Portfolio**](${safePortfolioUrl}) to explore projects and achievements.`,
        );
    if (safeEmail) {
        const linkedinSuffix = safeLinkedinUrl
            ? ` or connect on [**LinkedIn**](${safeLinkedinUrl})`
            : "";
        bullets.push(
            `- 📧 Reach me via [**Email**](mailto:${encodeURIComponent(safeEmail)})${linkedinSuffix}.`,
        );
    }
    if (!safeEmail && safeLinkedinUrl)
        bullets.push(`- 💼 Connect with me on [**LinkedIn**](${safeLinkedinUrl}).`);
    if (safeLocation) bullets.push(`- 📍 Based in **${escapeMarkdownText(safeLocation)}**.`);

    const statD = buildUrl("https://github-readme-stats-ranit.vercel.app/api", {
        username: user,
        show_icons: "true",
        theme: "radical",
        hide_border: "true",
        include_all_commits: "true",
        count_private: "true",
        card_width: "495",
    });
    const statL = buildUrl("https://github-readme-stats-ranit.vercel.app/api", {
        username: user,
        show_icons: "true",
        include_all_commits: "true",
        count_private: "true",
        card_width: "495",
    });
    const strkD = buildUrl("https://streak-stats.demolab.com", {
        user,
        theme: "radical",
        hide_border: "true",
    });
    const strkL = buildUrl("https://streak-stats.demolab.com", { user });
    const langD = buildUrl("https://github-readme-stats-ranit.vercel.app/api/top-langs", {
        username: user,
        layout: "compact",
        theme: "radical",
        hide_border: "true",
        langs_count: "14",
        size_weight: "0.5",
        count_weight: "0.5",
    });
    const langL = buildUrl("https://github-readme-stats-ranit.vercel.app/api/top-langs", {
        username: user,
        layout: "compact",
        langs_count: "14",
        size_weight: "0.5",
        count_weight: "0.5",
    });
    const wakaD = buildUrl("https://github-readme-stats-ranit.vercel.app/api/wakatime", {
        username: safeWakatime,
        layout: "compact",
        theme: "radical",
        hide_border: "true",
        langs_count: "14",
        hide: "other",
    });
    const wakaL = buildUrl("https://github-readme-stats-ranit.vercel.app/api/wakatime", {
        username: safeWakatime,
        layout: "compact",
        langs_count: "14",
        hide: "other",
    });
    const pD = (r: string) =>
        buildUrl("https://github-readme-stats-ranit.vercel.app/api/pin", {
            username: user,
            repo: r,
            layout: "compact",
            theme: "radical",
            hide_border: "true",
            show_owner: "true",
            description_lines_count: "2",
        });
    const pL = (r: string) =>
        buildUrl("https://github-readme-stats-ranit.vercel.app/api/pin", {
            username: user,
            repo: r,
            layout: "compact",
            show_owner: "true",
            description_lines_count: "2",
        });
    const trD = buildUrl("https://github-profile-trophy-ranit.vercel.app", {
        username: user,
        theme: "radical",
        "no-frame": "true",
        "no-bg": "false",
        "margin-w": "4",
        row: "1",
    });
    const trL = buildUrl("https://github-profile-trophy-ranit.vercel.app", {
        username: user,
        "no-bg": "false",
        "margin-w": "4",
        row: "1",
    });

    let statsSection = "";
    if (showGithubStats || showStreakStats) {
        statsSection = `\n<h2 align="center">📊 GitHub Stats</h2>\n\n<div width="100%" align="center">\n`;
        if (showGithubStats)
            statsSection += `  ${pic(statD, statL, `width="400px" align="center" alt="GitHub Stats"`)}\n`;
        if (showStreakStats)
            statsSection += `  ${pic(strkD, strkL, `width="400px" align="center" alt="Streak Stats"`)}\n`;
        statsSection += `</div>\n`;
    }

    const hasWakaExport = showWakatimeStats && !!sanitizeUsername(wakatimeUsername);
    let langSection = "";
    if (showTopLanguages || hasWakaExport) {
        langSection = `\n<h2 align="center">🔥 Language & Coding Activity</h2>\n\n<div width="100%" align="center">\n`;
        if (showTopLanguages)
            langSection += `  ${pic(langD, langL, `align="center" alt="Top Languages"`)}\n`;
        if (hasWakaExport)
            langSection += `  ${pic(wakaD, wakaL, `align="center" alt="Wakatime Stats"`)}\n`;
        langSection += `</div>\n`;
    }

    let pinnedSection = "";
    if (showPinnedRepos && (safePinnedRepo1 || safePinnedRepo2)) {
        pinnedSection = `\n<h2 align="center">📌 Pinned Repositories</h2>\n\n<div width="100%" align="center">\n`;
        if (safePinnedRepo1)
            pinnedSection += `  ${pic(pD(safePinnedRepo1), pL(safePinnedRepo1), `align="center" alt="${escapeHtmlAttribute(safePinnedRepo1)}"`)}\n`;
        if (safePinnedRepo2)
            pinnedSection += `  ${pic(pD(safePinnedRepo2), pL(safePinnedRepo2), `align="center" alt="${escapeHtmlAttribute(safePinnedRepo2)}"`)}\n`;
        pinnedSection += `</div>\n`;
    }

    const trophiesSection = showTrophies
        ? `\n<h2 align="center">🏆 GitHub Trophies</h2>\n\n<div width="100%" align="center">\n  <a href="${safePortfolioUrl}">\n    <picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${trD}" />\n      <source media="(prefers-color-scheme: light)" srcset="${trL}" />\n      <img width="804px" alt="GitHub Trophies" src="${trD}" />\n    </picture>\n  </a>\n</div>\n`
        : "";

    const SKILLS_PER_ROW = 13;
    let techSection = "";
    if (skills.length > 0) {
        const chunks: string[][] = [];
        for (let i = 0; i < skills.length; i += SKILLS_PER_ROW)
            chunks.push(skills.slice(i, i + SKILLS_PER_ROW));
        const rows = chunks.map((c) => `    ${buildSkillIconsPicture(c)}`);
        techSection = `\n<h2 align="center">🛠️ Tech Stack</h2>\n\n<div align="center">\n  <a href="https://go-skill-icons.vercel.app">\n${rows.join("\n    <br />\n")}\n    <br />\n  </a>\n</div>\n`;
    }

    const badgeParts: string[] = [];
    if (showProfileViews)
        badgeParts.push(
            `<img height="20" src="https://komarev.com/ghpvc/?username=${user}&color=blue&style=flat" alt="Profile Views" />`,
        );
    if (showBmcBadge) badgeParts.push(bmcBadge);

    const footerSection =
        badgeParts.length > 0
            ? `\n<div align="center">\n  ${badgeParts.join(" ")}\n</div>\n`
            : "";

    const middleContent = [
        statsSection,
        langSection,
        pinnedSection,
        trophiesSection,
        techSection,
    ]
        .filter(Boolean)
        .join("");

    let result = `# Hi👋, I'm [${escapeMarkdownText(displayName)}](${safePortfolioUrl})
${safeTagline ? `\n### ${escapeMarkdownText(safeTagline)}\n` : ""}
${bullets.length > 0 ? bullets.join("\n") : "<!-- Fill in the form on the left to personalise your README →"}\n`;

    if (middleContent || footerSection) {
        result += `\n<hr>\n${middleContent}`;
        if (footerSection) {
            if (middleContent) result += `\n<hr>\n`;
            result += footerSection;
        }
    }

    return result;
}

export function generatePreviewREADME(data: ReadmeData, formStage: number): string {
    const {
        username,
        name,
        tagline,
        location,
        portfolioUrl,
        email,
        linkedinUrl,
        jobTitle,
        company,
        companyUrl,
        workingOn,
        expertise,
        degree,
        institution,
        institutionUrl,
        pinnedRepo1,
        pinnedRepo2,
        skills,
        showGithubStats,
        showStreakStats,
        showTopLanguages,
        showWakatimeStats,
        wakatimeUsername,
        showTrophies,
        showProfileViews,
        showBmcBadge,
        showPinnedRepos,
    } = data;

    const isShowcasePreview = formStage === 1;
    const isStageFinal = formStage >= 5;
    const isStageTech = formStage >= 4;

    const v = (val: string, showcaseVal: string) => {
        if (isShowcasePreview) return val || showcaseVal;
        return val;
    };

    const safeUsername = sanitizeUsername(username);
    const hasUser = isStageFinal && !!safeUsername;
    const user = safeUsername || (isShowcasePreview ? "ranitmanik" : "your-username");

    const safeName = normalizeText(v(name, "Ranit Manik"));
    const safeTagline = normalizeText(v(tagline, "Building Digital Products, Brands & Experience"));
    const safeLocation = normalizeText(v(location, "West Bengal, India"));
    const safeWorkingOn = normalizeText(v(workingOn, "GitHub Profile README Builder"));
    const safeExpertise = normalizeText(v(expertise, "Full Stack Web Development"));
    const safeDegree = normalizeText(v(degree, "B.Tech in Computer Science"));
    const safeCompany = normalizeText(v(company, "Freelance"));
    const safeInstitution = normalizeText(v(institution, "MAKAUT"));
    const safePinnedRepo1 = normalizeText(v(pinnedRepo1, "github-profile-readme-builder"));
    const safePinnedRepo2 = normalizeText(v(pinnedRepo2, "nextjs-portfolio"));

    const safeCompanyUrl = sanitizeWebUrl(v(companyUrl, ""), "");
    const safeInstitutionUrl = sanitizeWebUrl(v(institutionUrl, ""), "");
    const safePortfolioUrl = sanitizeWebUrl(
        v(portfolioUrl, `https://github.com/${encodeURIComponent(user)}`),
        `https://github.com/${encodeURIComponent(user)}`,
    );
    const safeLinkedinUrl = sanitizeWebUrl(v(linkedinUrl, ""), "");
    const safeEmail = sanitizeEmail(v(email, isShowcasePreview ? "hello@ranit.dev" : ""));
    const displayName = safeName || safeUsername || "Your Name";
    const waka = sanitizeUsername(v(wakatimeUsername, user)) || user;
    const bmcBadge = `<a href="https://buymeacoffee.com/ranitmanik"><img height="20" alt="Buy Me a Coffee" src="https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee" /></a>`;

    const img = (isReal: boolean, realSrc: string, localSrc: string, attrs = "") => {
        if (isReal) return `<img ${attrs} src="${realSrc}" />`;
        if (isShowcasePreview) return `<img ${attrs} src="${localSrc}" />`;
        return "";
    };

    const bullets: string[] = [];
    if (safeWorkingOn)
        bullets.push(`- 🔭 Currently working on **${escapeMarkdownText(safeWorkingOn)}**.`);
    if (safeCompany)
        bullets.push(
            `- 👨‍💼 ${escapeMarkdownText(jobTitle || "Developer")} at ${linkText(safeCompany, safeCompanyUrl)}.`,
        );
    if (safeInstitution)
        bullets.push(
            `- 🏫 Pursuing a ${escapeMarkdownText(safeDegree || "degree")} at ${linkText(safeInstitution, safeInstitutionUrl)}.`,
        );
    if (safeExpertise) bullets.push(`- 📚 Proficient in **${escapeMarkdownText(safeExpertise)}**.`);
    if (isShowcasePreview || (portfolioUrl && sanitizeWebUrl(portfolioUrl)))
        bullets.push(
            `- 🌐 Visit my [**Portfolio**](${safePortfolioUrl}) to explore projects and achievements.`,
        );

    if (safeEmail) {
        const linkedinSuffix = safeLinkedinUrl ? ` or connect on [**LinkedIn**](${safeLinkedinUrl})` : "";
        bullets.push(
            `- 📧 Reach me via [**Email**](mailto:${encodeURIComponent(safeEmail)})${linkedinSuffix}.`,
        );
    } else if (safeLinkedinUrl) {
        bullets.push(`- 💼 Connect with me on [**LinkedIn**](${safeLinkedinUrl}).`);
    }

    if (safeLocation) bullets.push(`- 📍 Based in **${escapeMarkdownText(safeLocation)}**.`);

    const bulletSection =
        bullets.length > 0
            ? bullets.join("\n")
            : "<!-- Fill in the form on the left to personalise your README →";

    const statReal = buildUrl("https://github-readme-stats-ranit.vercel.app/api", {
        username: user,
        show_icons: "true",
        theme: "radical",
        hide_border: "true",
        include_all_commits: "true",
        count_private: "true",
        card_width: "495",
    });
    const strkReal = buildUrl("https://streak-stats.demolab.com", {
        user,
        theme: "radical",
        hide_border: "true",
    });
    const langReal = buildUrl("https://github-readme-stats-ranit.vercel.app/api/top-langs", {
        username: user,
        layout: "compact",
        theme: "radical",
        hide_border: "true",
        langs_count: "14",
        size_weight: "0.5",
        count_weight: "0.5",
    });
    const wakaReal = buildUrl("https://github-readme-stats-ranit.vercel.app/api/wakatime", {
        username: waka,
        layout: "compact",
        theme: "radical",
        hide_border: "true",
        langs_count: "14",
        hide: "other",
    });
    const pinnReal = (r: string) =>
        buildUrl("https://github-readme-stats-ranit.vercel.app/api/pin", {
            username: user,
            repo: r,
            layout: "compact",
            theme: "radical",
            hide_border: "true",
            show_owner: "true",
            description_lines_count: "2",
        });
    const trphReal = buildUrl("https://github-profile-trophy-ranit.vercel.app", {
        username: user,
        theme: "radical",
        "no-frame": "true",
        "no-bg": "false",
        "margin-w": "4",
        row: "1",
    });

    let statsSection = "";
    if ((isShowcasePreview || isStageFinal) && (showGithubStats || showStreakStats)) {
        const s1 = showGithubStats ? img(hasUser, statReal, "/README/variant-1/dark/readme-stat-1.svg", `width="400px" align="center" alt="GitHub Stats"`) : "";
        const s2 = showStreakStats ? img(hasUser, strkReal, "/README/variant-1/dark/readme-stat-2.svg", `width="400px" align="center" alt="Streak Stats"`) : "";
        
        if (s1 || s2) {
            statsSection = `\n<h2 align="center">📊 GitHub Stats</h2>\n\n<div width="100%" align="center">\n  ${[s1, s2].filter(Boolean).join("\n  ")}\n</div>\n`;
        }
    }

    let langSection = "";
    if ((isShowcasePreview || isStageFinal) && (showTopLanguages || showWakatimeStats)) {
        const l1 = showTopLanguages ? img(hasUser, langReal, "/README/variant-1/dark/readme-stat-3.svg", `align="center" alt="Top Languages"`) : "";
        const l2 = showWakatimeStats ? img(isStageFinal && !!sanitizeUsername(wakatimeUsername), wakaReal, "/README/variant-1/dark/readme-stat-4.svg", `align="center" alt="Wakatime Stats"`) : "";
        
        if (l1 || l2) {
            langSection = `\n<h2 align="center">🔥 Language & Coding Activity</h2>\n\n<div width="100%" align="center">\n  ${[l1, l2].filter(Boolean).join("\n  ")}\n</div>\n`;
        }
    }

    let pinnedSection = "";
    if ((isShowcasePreview || isStageFinal) && showPinnedRepos) {
        const p1 = img(hasUser && !!normalizeText(pinnedRepo1), pinnReal(pinnedRepo1), "/README/variant-1/dark/pinned-repo-1.svg", `align="center" alt="Pinned Repo 1"`);
        const p2 = img(hasUser && !!normalizeText(pinnedRepo2), pinnReal(pinnedRepo2), "/README/variant-1/dark/pinned-repo-2.svg", `align="center" alt="Pinned Repo 2"`);
        
        if (p1 || p2) {
            pinnedSection = `\n<h2 align="center">📌 Pinned Repositories</h2>\n\n<div width="100%" align="center">\n  ${[p1, p2].filter(Boolean).join("\n  ")}\n</div>\n`;
        }
    }

    let trophiesSection = "";
    if ((isShowcasePreview || isStageFinal) && showTrophies) {
        const tSrc = hasUser ? trphReal : (isShowcasePreview ? "/README/variant-1/dark/trophies.svg" : "");
        if (tSrc) {
            trophiesSection = `\n<h2 align="center">🏆 GitHub Trophies</h2>\n\n<div width="100%" align="center">\n  <a href="${safePortfolioUrl}">\n    <picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${tSrc}" />\n      <source media="(prefers-color-scheme: light)" srcset="${tSrc}" />\n      <img width="804px" alt="GitHub Trophies" src="${tSrc}" />\n    </picture>\n  </a>\n</div>\n`;
        }
    }

    const showcaseSkills = ["react", "nextjs", "typescript", "tailwind", "nodejs", "git"];
    const activeSkills = skills.length > 0 ? skills : isShowcasePreview ? showcaseSkills : [];
    const SKILLS_PER_ROW = 13;
    let techSection = "";
    if ((isShowcasePreview || isStageTech) && activeSkills.length > 0) {
        const chunks: string[][] = [];
        for (let i = 0; i < activeSkills.length; i += SKILLS_PER_ROW)
            chunks.push(activeSkills.slice(i, i + SKILLS_PER_ROW));
        const rows = chunks.map((c) => `    ${buildSkillIconsPicture(c)}`);
        techSection = `\n<h2 align="center">🛠️ Tech Stack</h2>\n\n<div align="center">\n  <a href="https://go-skill-icons.vercel.app">\n${rows.join("\n    <br />\n")}\n    <br />\n  </a>\n</div>\n`;
    }

    const badgeParts: string[] = [];
    if ((isShowcasePreview || isStageFinal) && showProfileViews) {
        const b = img(hasUser, `https://komarev.com/ghpvc/?username=${user}&color=blue&style=flat`, "/README/variant-1/general/profile-views.svg", `height="20" alt="Profile Views"`);
        if (b) badgeParts.push(b);
    }
    if ((isShowcasePreview || isStageFinal) && showBmcBadge) badgeParts.push(bmcBadge);

    const footerSection =
        badgeParts.length > 0
            ? `\n<div align="center">\n  ${badgeParts.join(" ")}\n</div>\n`
            : "";

    const middleContent = [
        statsSection,
        langSection,
        pinnedSection,
        trophiesSection,
        techSection,
    ]
        .filter(Boolean)
        .join("");

    const nameDisplay = isShowcasePreview
        ? `[**${escapeMarkdownText(safeName)}**](${safePortfolioUrl})`
        : safeName || safeUsername
          ? `[**${escapeMarkdownText(displayName)}**](${safePortfolioUrl})`
          : "";

    const taglineDisplay = safeTagline ? `\n### ${escapeMarkdownText(safeTagline)}\n` : "";

    let result = `# Hi👋, I'm ${nameDisplay}${taglineDisplay}\n${bulletSection}\n`;

    if (middleContent || footerSection) {
        result += `\n<hr>\n${middleContent}`;
        if (footerSection) {
            if (middleContent) result += `\n<hr>\n`;
            result += footerSection;
        }
    }

    return result;
}

export default generateREADME;
