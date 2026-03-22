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
    url ? `[**${escapeMarkdownText(value)}**](${url})` : `**${escapeMarkdownText(value)}**`;

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

    // Generates a dark/light <picture> element for theme-aware images
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

    // Stat URLs — dark (radical theme) and light variants
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

    // WakaTime card only renders in the final README when username is explicitly set
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

    // Footer badges
    const badgeParts: string[] = [];
    if (showProfileViews)
        badgeParts.push(
            `<img height="20" src="https://komarev.com/ghpvc/?username=${user}&color=blue&style=flat" alt="Profile Views" />`,
        );
    if (showBmcBadge) badgeParts.push(bmcBadge);
    const footerParts: string[] = [];
    if (badgeParts.length > 0) footerParts.push(`  ${badgeParts.join(" ")}`);
    const footerSection =
        footerParts.length > 0
            ? `\n<hr>\n\n<div align="center">\n${footerParts.join("\n")}\n</div>\n`
            : "";

    return `# Hi👋, I'm [${escapeMarkdownText(displayName)}](${safePortfolioUrl})
${safeTagline ? `\n### ${escapeMarkdownText(safeTagline)}\n` : ""}
${bullets.length > 0 ? bullets.join("\n") : "<!-- Fill in the form on the left to personalise your README →"}

<hr>
${statsSection}${langSection}${pinnedSection}${trophiesSection}${techSection}${footerSection}`;
}

export default generateREADME;

// ── Preview-only variant: always shows the full README with placeholder SVGs ──
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

    // Stage 1 acts as a showcase preview, so placeholders should render at full strength there.
    const isShowcasePreview = formStage === 1;

    // Real stats only unlock when the user reaches Stage 5 (GitHub Stats & Extras)
    const showRealStats = formStage >= 5;
    const safeUsername = sanitizeUsername(username);
    const hasUser = showRealStats && !!safeUsername;
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
    const safeCompanyUrl = sanitizeWebUrl(companyUrl, "#");
    const safeInstitutionUrl = sanitizeWebUrl(institutionUrl, "#");
    const safePortfolioUrl = sanitizeWebUrl(
        portfolioUrl,
        `https://github.com/${encodeURIComponent(user)}`,
    );
    const safeLinkedinUrl = sanitizeWebUrl(linkedinUrl, "#");
    const safeEmail = sanitizeEmail(email);
    const displayName = safeName || safeUsername || "Your Name";
    const waka = sanitizeUsername(wakatimeUsername) || user;
    const bmcBadge = `<a href="https://buymeacoffee.com/ranitmanik"><img height="20" alt="Buy Me a Coffee" src="https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee" /></a>`;
    // hasWaka: shows real wakatime stats only when username is set AND stage 5 is reached
    const hasWaka = showRealStats && !!sanitizeUsername(wakatimeUsername);

    const plTxt = `color:#8b949e;font-style:italic;`;
    const plImg = isShowcasePreview ? "" : `filter:grayscale(1);opacity:0.4;`;

    // Show val as-is (bold), or a greyed-out italic placeholder
    const t = (val: string, fb: string) =>
        normalizeText(val)
            ? `**${escapeMarkdownText(val)}**`
            : `<span style="${plTxt}">${escapeHtmlAttribute(fb)}</span>`;

    // Returns a real img or a local SVG placeholder with grayscale
    const img = (isReal: boolean, realSrc: string, localSrc: string, attrs = "") =>
        isReal
            ? `<img ${attrs} src="${realSrc}" />`
            : `<img ${attrs} src="${localSrc}" style="${plImg}" />`;

    // Section heading helper: grays out the title when the user hasn't reached minStage yet
    const h2 = (text: string, minStage: number) =>
        isShowcasePreview || formStage >= minStage
            ? `\n<h2 align="center">${text}</h2>`
            : `\n<h2 align="center" style="color:#8b949e;opacity:0.45;">${text}</h2>`;

    // All 7 bullets — always shown, placeholders when fields are empty
    const contactTarget = safeEmail ? `mailto:${encodeURIComponent(safeEmail)}` : "#";
    const linkedinText =
        safeLinkedinUrl !== "#" ? ` or connect on [**LinkedIn**](${safeLinkedinUrl})` : "";
    const bullets = [
        `- 🔭 Currently working on ${t(safeWorkingOn, "your current project")}.`,
        `- 👨‍💼 ${escapeMarkdownText(jobTitle || "Developer")} at [${t(safeCompany, "Your Company")}](${safeCompanyUrl}).`,
        `- 🏫 Pursuing a ${escapeMarkdownText(safeDegree || "degree")} at [${t(safeInstitution, "Your Institution")}](${safeInstitutionUrl}).`,
        `- 📚 Proficient in ${t(safeExpertise, "your expertise")}.`,
        `- 🌐 Visit my [**Portfolio**](${safePortfolioUrl}) to explore projects.`,
        `- 📧 Reach me via [**Email**](${contactTarget})${linkedinText}.`,
        `- 📍 Based in ${t(safeLocation, "Your Location")}.`,
    ].join("\n");

    // Real stat URLs — match improved params from generateREADME (dark variant for preview)
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

    // GitHub Stats — heading grayed until stage 5
    let statsSection = "";
    if (showGithubStats || showStreakStats) {
        statsSection = `${h2("📊 GitHub Stats", 5)}\n\n<div width="100%" align="center">\n`;
        if (showGithubStats)
            statsSection += `  ${img(hasUser, statReal, "/README/variant-1/dark/readme-stat-1.svg", `width="400px" align="center" alt="GitHub Stats"`)}\n`;
        if (showStreakStats)
            statsSection += `  ${img(hasUser, strkReal, "/README/variant-1/dark/readme-stat-2.svg", `width="400px" align="center" alt="Streak Stats"`)}\n`;
        statsSection += `</div>\n`;
    }

    // Language & Coding Activity — show only if at least one card is enabled
    // Wakatime card shows when toggle is ON (default true); placeholder until username set + stage 5
    let langSection = "";
    if (showTopLanguages || showWakatimeStats) {
        langSection = `${h2("🔥 Language & Coding Activity", 5)}\n\n<div width="100%" align="center">\n`;
        if (showTopLanguages)
            langSection += `  ${img(hasUser, langReal, "/README/variant-1/dark/readme-stat-3.svg", `align="center" alt="Top Languages"`)}\n`;
        if (showWakatimeStats)
            langSection += `  ${img(hasWaka, wakaReal, "/README/variant-1/dark/readme-stat-4.svg", `align="center" alt="Wakatime Stats"`)}\n`;
        langSection += `</div>\n`;
    }

    // Pinned Repos — heading grayed until stage 5
    let pinnedSection = "";
    if (showPinnedRepos) {
        pinnedSection = `${h2("📌 Pinned Repositories", 5)}\n\n<div width="100%" align="center">\n`;
        pinnedSection += `  ${img(hasUser && !!safePinnedRepo1, pinnReal(safePinnedRepo1), "/README/variant-1/dark/pinned-repo-1.svg", `align="center" alt="Pinned Repo 1"`)}\n`;
        pinnedSection += `  ${img(hasUser && !!safePinnedRepo2, pinnReal(safePinnedRepo2), "/README/variant-1/dark/pinned-repo-2.svg", `align="center" alt="Pinned Repo 2"`)}\n`;
        pinnedSection += `</div>\n`;
    }

    // Trophies — heading grayed until stage 5
    const trphPlaceholder = "/README/variant-1/dark/trophies.svg";
    const trphSrc = hasUser ? trphReal : trphPlaceholder;
    const trphStyle = hasUser ? "" : ` style="${plImg}"`;
    const trophiesSection = showTrophies
        ? `${h2("🏆 GitHub Trophies", 5)}\n\n<div width="100%" align="center">\n  <a href="${safePortfolioUrl}">\n    <picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${trphSrc}" />\n      <source media="(prefers-color-scheme: light)" srcset="${trphSrc}" />\n      <img width="804px" alt="GitHub Trophies" src="${trphSrc}"${trphStyle} />\n    </picture>\n  </a>\n</div>\n`
        : "";

    // Tech Stack — heading grayed until stage 4; <br /> between rows only (not after last); wrapped in <a>
    const SKILLS_PER_ROW = 13;
    let techSection = `${h2("🛠️ Tech Stack", 4)}\n\n<div align="center">\n`;
    if (skills.length > 0) {
        const chunks: string[][] = [];
        for (let i = 0; i < skills.length; i += SKILLS_PER_ROW)
            chunks.push(skills.slice(i, i + SKILLS_PER_ROW));
        const rows = chunks.map((c) => `    ${buildSkillIconsPicture(c)}`);
        techSection += `  <a href="https://go-skill-icons.vercel.app">\n${rows.join("\n    <br />\n")}\n    <br />\n  </a>\n`;
    } else {
        techSection += `  <a href="https://go-skill-icons.vercel.app">\n    <img src="/README/variant-1/general/icons-row-1.svg" style="${plImg}" />\n    <br />\n    <img src="/README/variant-1/general/icons-row-2.svg" style="${plImg}" />\n    <br />\n    <img src="/README/variant-1/general/icons-row-3.svg" style="${plImg}" />\n  </a>\n`;
    }
    techSection += `</div>\n`;

    // Footer badges
    const badgeParts: string[] = [];
    if (showProfileViews)
        badgeParts.push(
            img(
                hasUser,
                `https://komarev.com/ghpvc/?username=${user}&color=blue&style=flat`,
                "/README/variant-1/general/profile-views.svg",
                `height="20" alt="Profile Views"`,
            ),
        );
    if (showBmcBadge) badgeParts.push(bmcBadge);
    const footerParts: string[] = [];
    if (badgeParts.length > 0) footerParts.push(`  ${badgeParts.join(" ")}`);
    const footerSection =
        footerParts.length > 0
            ? `\n<hr>\n\n<div align="center">\n${footerParts.join("\n")}\n</div>\n`
            : "";

    const nameDisplay =
        safeName || safeUsername
            ? `[${escapeMarkdownText(displayName)}](${safePortfolioUrl})`
            : `<span style="${plTxt}">Your Name</span>`;
    const taglineDisplay = safeTagline
        ? `\n### ${escapeMarkdownText(safeTagline)}\n`
        : `\n<h3 style="${plTxt}">Your tagline goes here</h3>\n`;

    return `# Hi👋, I'm ${nameDisplay}${taglineDisplay}
${bullets}

<hr>
${statsSection}${langSection}${pinnedSection}${trophiesSection}${techSection}${footerSection}`;
}
