import { ReadmeData } from "@/lib/types";

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
        showSnake,
        showProfileViews,
        showPinnedRepos,
    } = data;

    const user = username || "your-username";
    const displayName = name || username || "Your Name";
    const portfolio = portfolioUrl || `https://github.com/${user}`;
    const gh = "https://github-readme-stats.vercel.app/api";
    const sk = "https://streak-stats.demolab.com";
    const tr = "https://github-profile-trophy-ranit.vercel.app";
    const waka = wakatimeUsername || user;

    // Generates a dark/light <picture> element for theme-aware images
    const pic = (d: string, l: string, attrs: string) =>
        `<picture>\n    <source media="(prefers-color-scheme: dark)" srcset="${d}" />\n    <source media="(prefers-color-scheme: light)" srcset="${l}" />\n    <img ${attrs} src="${d}" />\n  </picture>`;

    const bullets: string[] = [];
    if (workingOn) bullets.push(`- 🔭 Currently working on **${workingOn}**.`);
    if (company)
        bullets.push(`- 👨‍💼 ${jobTitle || "Developer"} at [**${company}**](${companyUrl || "#"}).`);
    if (institution)
        bullets.push(
            `- 🏫 Pursuing a ${degree || "degree"} at [**${institution}**](${institutionUrl || "#"}).`,
        );
    if (expertise) bullets.push(`- 📚 Proficient in **${expertise}**.`);
    if (portfolioUrl)
        bullets.push(
            `- 🌐 Visit my [**Portfolio**](${portfolioUrl}) to explore projects and achievements.`,
        );
    if (email) {
        const li = linkedinUrl ? ` or connect on [**LinkedIn**](${linkedinUrl})` : "";
        bullets.push(`- 📧 Reach me via [**Email**](mailto:${email})${li}.`);
    }
    if (location) bullets.push(`- 📍 Based in **${location}**.`);

    // Stat URLs — dark (radical theme) and light variants
    const statD = `${gh}?username=${user}&show_icons=true&theme=radical&hide_border=true&include_all_commits=true&count_private=true&card_width=495`;
    const statL = `${gh}?username=${user}&show_icons=true&include_all_commits=true&count_private=true&card_width=495`;
    const strkD = `${sk}/?user=${user}&theme=radical&hide_border=true`;
    const strkL = `${sk}/?user=${user}`;
    const langD = `${gh}/top-langs/?username=${user}&layout=compact&theme=radical&hide_border=true&langs_count=14&size_weight=0.5&count_weight=0.5`;
    const langL = `${gh}/top-langs/?username=${user}&layout=compact&langs_count=14&size_weight=0.5&count_weight=0.5`;
    const wakaD = `${gh}/wakatime?username=${waka}&layout=compact&theme=radical&hide_border=true&langs_count=14&hide=other`;
    const wakaL = `${gh}/wakatime?username=${waka}&layout=compact&langs_count=14&hide=other`;
    const pD = (r: string) =>
        `${gh}/pin/?username=${user}&repo=${r}&layout=compact&theme=radical&hide_border=true&show_owner=true&description_lines_count=2`;
    const pL = (r: string) =>
        `${gh}/pin/?username=${user}&repo=${r}&layout=compact&show_owner=true&description_lines_count=2`;
    const trD = `${tr}/?username=${user}&theme=radical&no-frame=true&no-bg=false&margin-w=4&row=1`;
    const trL = `${tr}/?username=${user}&no-bg=false&margin-w=4&row=1`;
    const snkD = `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg`;
    const snkL = `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg`;

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
    const hasWakaExport = showWakatimeStats && !!wakatimeUsername;
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
    if (showPinnedRepos && (pinnedRepo1 || pinnedRepo2)) {
        pinnedSection = `\n<h2 align="center">📌 Pinned Repositories</h2>\n\n<div width="100%" align="center">\n`;
        if (pinnedRepo1)
            pinnedSection += `  ${pic(pD(pinnedRepo1), pL(pinnedRepo1), `align="center" alt="${pinnedRepo1}"`)}\n`;
        if (pinnedRepo2)
            pinnedSection += `  ${pic(pD(pinnedRepo2), pL(pinnedRepo2), `align="center" alt="${pinnedRepo2}"`)}\n`;
        pinnedSection += `</div>\n`;
    }

    const trophiesSection = showTrophies
        ? `\n<h2 align="center">🏆 GitHub Trophies</h2>\n\n<div width="100%" align="center">\n  <a href="${portfolio}">\n    <picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${trD}" />\n      <source media="(prefers-color-scheme: light)" srcset="${trL}" />\n      <img width="804px" alt="GitHub Trophies" src="${trD}" />\n    </picture>\n  </a>\n</div>\n`
        : "";

    const SKILLS_PER_ROW = 13;
    let techSection = "";
    if (skills.length > 0) {
        const chunks: string[][] = [];
        for (let i = 0; i < skills.length; i += SKILLS_PER_ROW)
            chunks.push(skills.slice(i, i + SKILLS_PER_ROW));
        const rows = chunks.map(
            (c) =>
                `    <img loading="lazy" src="https://go-skill-icons.vercel.app/api/icons?i=${c.join(",")}" alt="Tech Stack" />`,
        );
        techSection = `\n<h2 align="center">🛠️ Tech Stack</h2>\n\n<div align="center">\n  <a href="https://go-skill-icons.vercel.app">\n${rows.join("\n    <br />\n")}\n    <br />\n  </a>\n</div>\n`;
    }

    // Footer badges — profile views counter; snake full-width below
    const badgeParts: string[] = [];
    if (showProfileViews)
        badgeParts.push(
            `<img height="20" src="https://komarev.com/ghpvc/?username=${user}&color=blue&style=flat" alt="Profile Views" />`,
        );
    const footerParts: string[] = [];
    if (badgeParts.length > 0) footerParts.push(`  ${badgeParts.join(" ")}`);
    if (showSnake) footerParts.push(`  ${pic(snkD, snkL, `width="100%" alt="github-snake"`)}`);
    const footerSection =
        footerParts.length > 0
            ? `\n<hr>\n\n<div align="center">\n${footerParts.join("\n")}\n</div>\n`
            : "";

    return `# Hi👋, I'm [${displayName}](${portfolio})
${tagline ? `\n<h3>${tagline}</h3>\n` : ""}
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
        showSnake,
        showProfileViews,
        showPinnedRepos,
    } = data;

    // Real stats only unlock when the user reaches Stage 5 (GitHub Stats & Extras)
    const showRealStats = formStage >= 5;
    const hasUser = showRealStats && !!username;
    const user = username || "your-username";
    const displayName = name || username || "Your Name";
    const portfolio = portfolioUrl || `https://github.com/${user}`;
    const gh = "https://github-readme-stats.vercel.app/api";
    const waka = wakatimeUsername || user;
    // hasWaka: shows real wakatime stats only when username is set AND stage 5 is reached
    const hasWaka = showRealStats && !!wakatimeUsername;

    const plTxt = `color:#8b949e;font-style:italic;`;
    const plImg = `filter:grayscale(1);opacity:0.4;`;

    // Show val as-is (bold), or a greyed-out italic placeholder
    const t = (val: string, fb: string) =>
        val ? `**${val}**` : `<span style="${plTxt}">${fb}</span>`;

    // Returns a real img or a local SVG placeholder with grayscale
    const img = (isReal: boolean, realSrc: string, localSrc: string, attrs = "") =>
        isReal
            ? `<img ${attrs} src="${realSrc}" />`
            : `<img ${attrs} src="${localSrc}" style="${plImg}" />`;

    // Section heading helper: grays out the title when the user hasn't reached minStage yet
    const h2 = (text: string, minStage: number) =>
        formStage >= minStage
            ? `\n<h2 align="center">${text}</h2>`
            : `\n<h2 align="center" style="color:#8b949e;opacity:0.45;">${text}</h2>`;

    // All 7 bullets — always shown, placeholders when fields are empty
    const bullets = [
        `- 🔭 Currently working on ${t(workingOn, "your current project")}.`,
        `- 👨‍💼 ${jobTitle || "Developer"} at [${t(company, "Your Company")}](${companyUrl || "#"}).`,
        `- 🏫 Pursuing a ${degree || "degree"} at [${t(institution, "Your Institution")}](${institutionUrl || "#"}).`,
        `- 📚 Proficient in ${t(expertise, "your expertise")}.`,
        `- 🌐 Visit my [**Portfolio**](${portfolioUrl || "#"}) to explore projects.`,
        `- 📧 Reach me via [**Email**](mailto:${email || "#"})${linkedinUrl ? ` or connect on [**LinkedIn**](${linkedinUrl})` : ""}.`,
        `- 📍 Based in ${t(location, "Your Location")}.`,
    ].join("\n");

    // Real stat URLs — match improved params from generateREADME (dark variant for preview)
    const statReal = `${gh}?username=${user}&show_icons=true&theme=radical&hide_border=true&include_all_commits=true&count_private=true&card_width=495`;
    const strkReal = `https://streak-stats.demolab.com/?user=${user}&theme=radical&hide_border=true`;
    const langReal = `${gh}/top-langs/?username=${user}&layout=compact&theme=radical&hide_border=true&langs_count=14&size_weight=0.5&count_weight=0.5`;
    const wakaReal = `${gh}/wakatime?username=${waka}&layout=compact&theme=radical&hide_border=true&langs_count=14&hide=other`;
    const pinnReal = (r: string) =>
        `${gh}/pin/?username=${user}&repo=${r}&layout=compact&theme=radical&hide_border=true&show_owner=true&description_lines_count=2`;
    const trphReal = `https://github-profile-trophy-ranit.vercel.app/?username=${user}&theme=radical&no-frame=true&no-bg=false&margin-w=4&row=1`;

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
        pinnedSection += `  ${img(hasUser && !!pinnedRepo1, pinnReal(pinnedRepo1), "/README/variant-1/dark/pinned-repo-1.svg", `align="center" alt="Pinned Repo 1"`)}\n`;
        pinnedSection += `  ${img(hasUser && !!pinnedRepo2, pinnReal(pinnedRepo2), "/README/variant-1/dark/pinned-repo-2.svg", `align="center" alt="Pinned Repo 2"`)}\n`;
        pinnedSection += `</div>\n`;
    }

    // Trophies — heading grayed until stage 5
    const trphPlaceholder = "/README/variant-1/dark/trophies.svg";
    const trphSrc = hasUser ? trphReal : trphPlaceholder;
    const trphStyle = hasUser ? "" : ` style="${plImg}"`;
    const trophiesSection = showTrophies
        ? `${h2("🏆 GitHub Trophies", 5)}\n\n<div width="100%" align="center">\n  <a href="${portfolio}">\n    <picture>\n      <source media="(prefers-color-scheme: dark)" srcset="${trphSrc}" />\n      <source media="(prefers-color-scheme: light)" srcset="${trphSrc}" />\n      <img width="804px" alt="GitHub Trophies" src="${trphSrc}"${trphStyle} />\n    </picture>\n  </a>\n</div>\n`
        : "";

    // Tech Stack — heading grayed until stage 4; <br /> between rows only (not after last); wrapped in <a>
    const SKILLS_PER_ROW = 13;
    let techSection = `${h2("🛠️ Tech Stack", 4)}\n\n<div align="center">\n`;
    if (skills.length > 0) {
        const chunks: string[][] = [];
        for (let i = 0; i < skills.length; i += SKILLS_PER_ROW)
            chunks.push(skills.slice(i, i + SKILLS_PER_ROW));
        const rows = chunks.map(
            (c) =>
                `    <img loading="lazy" src="https://go-skill-icons.vercel.app/api/icons?i=${c.join(",")}" alt="Tech Stack" />`,
        );
        techSection += `  <a href="https://go-skill-icons.vercel.app">\n${rows.join("\n    <br />\n")}\n    <br />\n  </a>\n`;
    } else {
        techSection += `  <a href="https://go-skill-icons.vercel.app">\n    <img src="/README/variant-1/general/icons-row-1.svg" style="${plImg}" />\n    <br />\n    <img src="/README/variant-1/general/icons-row-2.svg" style="${plImg}" />\n    <br />\n    <img src="/README/variant-1/general/icons-row-3.svg" style="${plImg}" />\n  </a>\n`;
    }
    techSection += `</div>\n`;

    // Footer badges — profile views counter; snake full-width below
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
    const footerParts: string[] = [];
    if (badgeParts.length > 0) footerParts.push(`  ${badgeParts.join(" ")}`);
    if (showSnake)
        footerParts.push(
            `  ${img(hasUser, `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg`, "/README/variant-1/dark/snake.svg", `width="100%" alt="github-snake"`)}`,
        );
    const footerSection =
        footerParts.length > 0
            ? `\n<hr>\n\n<div align="center">\n${footerParts.join("\n")}\n</div>\n`
            : "";

    const nameDisplay =
        name || username
            ? `[${displayName}](${portfolio})`
            : `<span style="${plTxt}">Your Name</span>`;
    const taglineDisplay = tagline
        ? `\n<h3>${tagline}</h3>\n`
        : `\n<h3 style="${plTxt}">Your tagline goes here</h3>\n`;

    return `# Hi👋, I'm ${nameDisplay}${taglineDisplay}
${bullets}

<hr>
${statsSection}${langSection}${pinnedSection}${trophiesSection}${techSection}${footerSection}`;
}

/* ── The remaining lines below are leftover from the original static template ──

<img align="right" width="30%" src="README/variant-1/general/Programming.gif">

# Hi👋, I'm [Ranit Manik](/)

<h3>A Tech Enthusiast from India</h3>

- 👨‍💼 Frontend Developer **(Full time)** at [**Busiman**](https://github.com/Busiman-official).  
- 🏫 Pursuing a Bachelor's Degree in Computer Science at [**CEMK**](https://cemkolaghat.in/).  
- 📚 Proficient in **Full Stack Development**.  
- 🌐 Visit my [**Portfolio**](/) to explore projects and achievements.
- 📧 Reach me via [**Email**](mailto:ranitmanik.dev@gmail.com) or connect on [**LinkedIn**](https://www.linkedin.com/in/ranit-manik/).  
- 📍 Based in **Mecheda, West Bengal, India**.  

<hr>

<h2 align="center">📊 GitHub Stats</h2>

<div width="100%" align="center">
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/readme-stat-1.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/readme-stat-1.svg" />
      <img width="400px" align="center" src="README/variant-1/dark/readme-stat-1.svg" alt="GitHub Stats" />
    </picture>
  </a>
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/readme-stat-2.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/readme-stat-2.svg" />
      <img width="400px" align="center" src="README/variant-1/dark/readme-stat-2.svg" alt="Streak Stats" />
    </picture>
  </a>
</div>

<h2 align="center">🔥 Language & Coding Activity</h2>

<div width="100%" align="center">
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/readme-stat-3.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/readme-stat-3.svg" />
      <img align="center" src="README/variant-1/dark/readme-stat-3.svg" alt="Top Languages" />
    </picture>
  </a>
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/readme-stat-4.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/readme-stat-4.svg" />
      <img align="center" src="README/variant-1/dark/readme-stat-4.svg" alt="Wakatime Stats" />
    </picture>
  </a>
</div>

<h2 align="center">📌 Pinned Repositories</h2>

<div width="100%" align="center">
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/pinned-repo-1.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/pinned-repo-1.svg" />
      <img align="center" src="README/variant-1/light/pinned-repo-1.svg" alt="Pinned Repo" />
    </picture>
  </a>
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/pinned-repo-2.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/pinned-repo-2.svg" />
      <img align="center" src="README/variant-1/dark/pinned-repo-2.svg" alt="Pinned Repo" />
    </picture>
  </a>
</div>

<h2 align="center">🏆 GitHub Trophies</h2>

<div width="100%" align="center">
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/trophies.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/trophies.svg" />
      <img width="804px" alt="GitHub Trophies" src="README/variant-1/dark/trophies.svg" />
    </picture>
  <a/>
</div>

<h2 align="center">🛠️ Tech Stack</h2>

<div align="center">
  <a href="/">
    <img src="README/variant-1/general/icons-row-1.svg" />
    <br />
    <img src="README/variant-1/general/icons-row-2.svg" />
    <br />
    <img src="README/variant-1/general/icons-row-3.svg" />
  </a>
</div>

<hr>

<div align="center">
  <a style="display: inline-block;" href="/"><img height="20" src="README/variant-1/general/wakatime.svg" alt=""/></a>
  <a style="display: inline-block;" href="/"><img height="20" src="README/variant-1/general/profile-views.svg" alt=""/></a>
  <a href="/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="README/variant-1/dark/snake.svg" />
      <source media="(prefers-color-scheme: light)" srcset="README/variant-1/light/snake.svg" />
      <img width="804px" alt="github-snake" src="README/variant-1/dark/snake.svg" />
    </picture>
  </a>
</div>
` */
