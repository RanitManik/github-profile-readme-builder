export interface ReadmeData {
    // Stage 1 — Identity
    username: string;

    // Stage 2 — Personal Info
    name: string;
    tagline: string;
    location: string;
    portfolioUrl: string;
    email: string;
    linkedinUrl: string;

    // Stage 3 — Work & Education
    jobTitle: string;
    company: string;
    companyUrl: string;
    workingOn: string;
    expertise: string;
    degree: string;
    institution: string;
    institutionUrl: string;
    pinnedRepo1: string;
    pinnedRepo2: string;

    // Stage 4 — Tech Stack
    skills: string[];

    // Stage 5 — GitHub Stats & Extras
    showGithubStats: boolean;
    showStreakStats: boolean;
    showTopLanguages: boolean;
    showWakatimeStats: boolean;
    wakatimeUsername: string;
    showTrophies: boolean;
    showSnake: boolean;
    showProfileViews: boolean;
    showPinnedRepos: boolean;
}

export const DEFAULT_README_DATA: ReadmeData = {
    username: "",

    name: "",
    tagline: "",
    location: "",
    portfolioUrl: "",
    email: "",
    linkedinUrl: "",

    jobTitle: "",
    company: "",
    companyUrl: "",
    workingOn: "",
    expertise: "",
    degree: "",
    institution: "",
    institutionUrl: "",
    pinnedRepo1: "",
    pinnedRepo2: "",

    skills: [],

    showGithubStats: true,
    showStreakStats: true,
    showTopLanguages: true,
    showWakatimeStats: true,
    wakatimeUsername: "",
    showTrophies: true,
    showSnake: true,
    showProfileViews: true,
    showPinnedRepos: true,
};

export const STAGE_LABELS: Record<number, string> = {
    1: "Get Started",
    2: "Personal Info",
    3: "Work & Education",
    4: "Tech Stack",
    5: "GitHub Stats",
};

