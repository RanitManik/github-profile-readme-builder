import { NextRequest, NextResponse } from "next/server";
import { generateGitHubSnakeSvg } from "@/lib/snk";

interface RequestBody {
    username: string;
    theme?: "dark" | "light";
    stepDurationMs?: number;
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RequestBody;
        const username = (body.username || "").trim();
        const theme = body.theme || "dark";
        const stepDurationMs = body.stepDurationMs || 50;

        if (!username) {
            return NextResponse.json({ error: "username is required" }, { status: 400 });
        }

        const githubToken = process.env.GITHUB_TOKEN;

        const result = await generateGitHubSnakeSvg({
            username,
            githubToken,
            theme,
            stepDurationMs,
        });

        return NextResponse.json({
            svg: result.svg,
            grid: result.grid,
            cells: result.cells,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: String(message) }, { status: 500 });
    }
}
