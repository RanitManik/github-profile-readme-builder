import skillsJson from "./skills.json";

export interface Skill {
    id: string;
    name: string;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
}

/** Flat list of every supported skill icon — sourced from lib/skills.json. */
export const ALL_SKILLS: Skill[] = skillsJson.map(({ id, name }) => ({ id, name }));

/** Sorted unique list of categories derived directly from skills.json */
export const CATEGORIES: string[] = Array.from(
    new Set((skillsJson as { id: string; name: string; category?: string }[]).map((s) => s.category ?? "Other"))
).sort();

/** All skills belonging to a given category */
export const getSkillsByCategory = (category: string): Skill[] =>
    (skillsJson as { id: string; name: string; category?: string }[])
        .filter((s) => (s.category ?? "Other") === category)
        .map(({ id, name }) => ({ id, name }));

/** Pick skills from ALL_SKILLS by their IDs (preserves order, skips unknowns) */
const pick = (ids: string[]): Skill[] =>
    ids.flatMap((id) => {
        const found = ALL_SKILLS.find((s) => s.id === id);
        return found ? [found] : [];
    });

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        name: "Languages",
        skills: pick(["js", "ts", "py", "java", "c", "cpp", "cs", "go", "rust", "php", "ruby", "swift", "kotlin", "dart", "scala", "r", "lua", "haskell"]),
    },
    {
        name: "Frontend",
        skills: pick(["html", "css", "react", "vue", "angular", "svelte", "nextjs", "nuxtjs", "astro", "tailwind", "bootstrap", "sass", "threejs"]),
    },
    {
        name: "Backend",
        skills: pick(["nodejs", "express", "bun", "deno", "django", "flask", "fastapi", "spring", "laravel", "dotnet", "rails", "graphql"]),
    },
    {
        name: "Databases",
        skills: pick(["mysql", "postgresql", "mongodb", "redis", "sqlite", "firebase", "supabase", "prisma", "cassandra", "dynamodb"]),
    },
    {
        name: "DevOps & Cloud",
        skills: pick(["docker", "kubernetes", "linux", "aws", "azure", "gcp", "git", "github", "gitlab", "nginx", "terraform", "githubactions"]),
    },
    {
        name: "Tools",
        skills: pick(["vscode", "figma", "postman", "jest", "vitest", "vite", "webpack", "electron", "tauri", "unity"]),
    },
];

