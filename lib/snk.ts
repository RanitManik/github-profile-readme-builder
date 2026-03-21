// lib/snk.ts

/**
 * Client-side GitHub Snake SVG Generator
 * Exact implementation from Platane/snk project
 * Fetches contribution data directly from GitHub GraphQL API
 */

// ============================================================
// TYPES
// ============================================================

export type ContributionLevel =
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
export type Color = 1 | 2 | 3 | 4;
export type Empty = 0;

export interface Cell {
    x: number;
    y: number;
    date: string;
    count: number;
    level: Color | Empty;
}

export interface DrawOptions {
    colorDots: Record<Color, string>;
    colorEmpty: string;
    colorDotBorder: string;
    colorSnake: string;
    sizeCell: number;
    sizeDot: number;
    sizeDotBorderRadius: number;
}

export interface Grid {
    width: number;
    height: number;
    data: Uint8Array;
}

export interface Snake {
    data: Uint8Array;
}

export interface Point {
    x: number;
    y: number;
}

export interface PointWithColor extends Point {
    color: Color | Empty;
    t: number | null;
}

// GitHub GraphQL Response Types
interface ContributionDay {
    contributionCount: number;
    contributionLevel: ContributionLevel;
    date: string;
    weekday: number;
}

interface Week {
    contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    weeks: Week[];
                };
            };
        };
    };
    errors?: Array<{ message: string }>;
}

// Exact GitHub Palettes
const GITHUB_LIGHT_PALETTE: DrawOptions = {
    colorDotBorder: "#1b1f230a",
    colorDots: {
        1: "#9be9a8",
        2: "#40c463",
        3: "#30a14e",
        4: "#216e39",
    },
    colorEmpty: "#ebedf0",
    colorSnake: "purple",
    sizeCell: 16,
    sizeDot: 12,
    sizeDotBorderRadius: 2,
};

const GITHUB_DARK_PALETTE: DrawOptions = {
    colorDotBorder: "#1b1f230a",
    colorDots: {
        1: "#01311f",
        2: "#034525",
        3: "#0f6d31",
        4: "#00c647",
    },
    colorEmpty: "#161b22",
    colorSnake: "purple",
    sizeCell: 16,
    sizeDot: 12,
    sizeDotBorderRadius: 2,
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function percent(x: number): string {
    return parseFloat((x * 100).toFixed(2)).toString() + "%";
}

function mergeKeyFrames(keyframes: { t: number; style: string }[]) {
    const s = new Map<string, number[]>();
    for (const { t, style } of keyframes) {
        s.set(style, [...(s.get(style) ?? []), t]);
    }
    return Array.from(s.entries())
        .map(([style, ts]) => ({ style, ts }))
        .sort((a, b) => a.ts[0] - b.ts[0]);
}

function createAnimation(name: string, keyframes: { t: number; style: string }[]): string {
    return (
        `@keyframes ${name}{` +
        mergeKeyFrames(keyframes)
            .map(({ style, ts }) => ts.map(percent).join(",") + `{${style}}`)
            .join("") +
        "}"
    );
}

function minifyCss(css: string): string {
    return css
        .replace(/\s+/g, " ")
        .replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, ""))
        .replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, ""))
        .replace(/;\s*}/g, "}")
        .trim();
}

function h(element: string, attributes: Record<string, any>): string {
    const attrs = Object.entries(attributes)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ");
    return `<${element} ${attrs}/>`;
}

function lerp(k: number, a: number, b: number): number {
    return (1 - k) * a + k * b;
}

// ============================================================
// GRID & SNAKE FUNCTIONS
// ============================================================

function createEmptyGrid(width: number, height: number): Grid {
    return {
        width,
        height,
        data: new Uint8Array(width * height),
    };
}

function getIndex(grid: Grid, x: number, y: number): number {
    return x * grid.height + y;
}

function getColor(grid: Grid, x: number, y: number): Color | Empty {
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) return 0;
    return grid.data[getIndex(grid, x, y)] as Color | Empty;
}

function setColor(grid: Grid, x: number, y: number, color: Color | Empty): void {
    if (x >= 0 && y >= 0 && x < grid.width && y < grid.height) {
        grid.data[getIndex(grid, x, y)] = color || 0;
    }
}

function copyGrid(grid: Grid): Grid {
    return {
        width: grid.width,
        height: grid.height,
        data: Uint8Array.from(grid.data),
    };
}

function createSnakeFromCells(points: Point[]): Snake {
    const snake = new Uint8Array((points || []).length * 2);
    for (let i = (points || []).length; i--; ) {
        snake[i * 2 + 0] = points[i].x + 2;
        snake[i * 2 + 1] = points[i].y + 2;
    }
    return { data: snake };
}

function snakeToCells(snake: Snake | null | undefined): Point[] {
    if (!snake || !snake.data || snake.data.length === 0) {
        return [];
    }

    const points: Point[] = [];
    const length = snake.data.length / 2;

    for (let i = 0; i < length; i++) {
        points.push({
            x: snake.data[i * 2 + 0] - 2,
            y: snake.data[i * 2 + 1] - 2,
        });
    }

    return points;
}

function getHeadX(snake: Snake | null | undefined): number {
    if (!snake || !snake.data || snake.data.length < 1) return 0;
    return snake.data[0] - 2;
}

function getHeadY(snake: Snake | null | undefined): number {
    if (!snake || !snake.data || snake.data.length < 2) return 0;
    return snake.data[1] - 2;
}

function moveSnake(snake: Snake, dx: number, dy: number): Snake {
    const copy = new Uint8Array(snake.data.length);
    for (let i = 2; i < snake.data.length; i++) {
        copy[i] = snake.data[i - 2];
    }
    copy[0] = snake.data[0] + dx;
    copy[1] = snake.data[1] + dy;
    return { data: copy };
}

function snakeEquals(a: Snake, b: Snake): boolean {
    if (a.data.length !== b.data.length) return false;
    for (let i = 0; i < a.data.length; i++) {
        if (a.data[i] !== b.data[i]) return false;
    }
    return true;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Convert contribution level to numeric level (0-4)
 */
function getLevelFromContributionLevel(level: ContributionLevel): Color | Empty {
    switch (level) {
        case "FOURTH_QUARTILE":
            return 4;
        case "THIRD_QUARTILE":
            return 3;
        case "SECOND_QUARTILE":
            return 2;
        case "FIRST_QUARTILE":
            return 1;
        case "NONE":
        default:
            return 0;
    }
}

/**
 * Fetch GitHub contribution data from GitHub GraphQL API
 */
async function fetchGitHubContributions(username: string, token?: string): Promise<Cell[]> {
    const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                weekday
                date
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "github-snake-generator",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
            query,
            variables: { login: username },
        }),
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result: GitHubGraphQLResponse = await response.json();

    if (result.errors?.length) {
        throw new Error(`GitHub GraphQL error: ${result.errors[0].message}`);
    }

    if (!result.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
        throw new Error(`No contribution data found for user "${username}"`);
    }

    const cells: Cell[] = [];
    const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks;

    for (let x = 0; x < weeks.length; x++) {
        const week = weeks[x];
        for (const day of week.contributionDays) {
            cells.push({
                x,
                y: day.weekday,
                date: day.date,
                count: day.contributionCount,
                level: getLevelFromContributionLevel(day.contributionLevel),
            });
        }
    }

    return cells;
}

/**
 * Convert flat cell data to 2D grid
 */
function cellsToGrid(cells: Cell[]): Grid {
    if (!cells || cells.length === 0) {
        return createEmptyGrid(1, 1);
    }

    const width = Math.max(...cells.map((c) => c.x)) + 1;
    const height = Math.max(...cells.map((c) => c.y)) + 1;

    const grid = createEmptyGrid(width, height);

    for (const cell of cells) {
        setColor(grid, cell.x, cell.y, cell.level);
    }

    return grid;
}

/**
 * Simple greedy pathfinding - move directly toward target
 */
function greedyPath(snake: Snake, targetX: number, targetY: number): Snake[] {
    const path: Snake[] = [];
    let currentSnake = snake;
    const headX = getHeadX(snake);
    const headY = getHeadY(snake);

    if (headX === targetX && headY === targetY) return [];

    let curX = headX;
    let curY = headY;
    const maxSteps = Math.abs(targetX - headX) + Math.abs(targetY - headY) + 50;
    let steps = 0;

    while ((curX !== targetX || curY !== targetY) && steps < maxSteps) {
        let dx = 0;
        let dy = 0;

        // Move towards target
        if (curX < targetX) dx = 1;
        else if (curX > targetX) dx = -1;
        else if (curY < targetY) dy = 1;
        else if (curY > targetY) dy = -1;

        currentSnake = moveSnake(currentSnake, dx, dy);
        path.push(currentSnake);

        curX += dx;
        curY += dy;
        steps++;
    }

    return path;
}

/**
 * Generate snake chain - visits all colored cells
 */
function generateSnakePath(grid: Grid, cells: Cell[]): Snake[] {
    if (!cells || cells.length === 0) {
        return [createSnakeFromCells([{ x: 0, y: 0 }])];
    }

    // Start with 4-cell snake at center
    const centerX = Math.max(0, Math.floor(grid.width / 2));
    const centerY = Math.max(0, Math.floor(grid.height / 2));

    const initialSnake = createSnakeFromCells([
        { x: centerX, y: centerY },
        { x: centerX - 1, y: centerY },
        { x: centerX - 2, y: centerY },
        { x: centerX - 3, y: centerY },
    ]);

    const chain: Snake[] = [initialSnake];
    let currentSnake = initialSnake;

    // Get all colored cells
    const coloredCells = cells.filter((c) => c.level > 0);

    if (coloredCells.length === 0) {
        return chain;
    }

    // Sort by color (highest first), then by proximity
    const maxColor = Math.max(...coloredCells.map((c) => c.level));

    for (let color = maxColor; color >= 1; color--) {
        const cellsOfColor = coloredCells.filter((c) => c.level === color);

        // For each color, visit cells in order of proximity
        while (cellsOfColor.length > 0) {
            const headX = getHeadX(currentSnake);
            const headY = getHeadY(currentSnake);

            // Find closest unvisited cell
            let closestIdx = 0;
            let closestDist = Infinity;

            for (let i = 0; i < cellsOfColor.length; i++) {
                const dist = Math.hypot(cellsOfColor[i].x - headX, cellsOfColor[i].y - headY);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = i;
                }
            }

            const targetCell = cellsOfColor[closestIdx];
            const path = greedyPath(currentSnake, targetCell.x, targetCell.y);

            if (path.length > 0) {
                for (const snake of path) {
                    chain.push(snake);
                    currentSnake = snake;
                }
            }

            // Remove visited cell
            cellsOfColor.splice(closestIdx, 1);
        }
    }

    return chain;
}

/**
 * Create animation timing for each cell
 */
function createLivingCells(cells: Cell[], chain: Snake[]): PointWithColor[] {
    return cells.map((cell) => {
        let t: number | null = null;

        // Find when snake head visited this cell
        for (let i = 0; i < chain.length; i++) {
            const headX = getHeadX(chain[i]);
            const headY = getHeadY(chain[i]);

            if (headX === cell.x && headY === cell.y) {
                t = i / Math.max(1, chain.length - 1);
                break;
            }
        }

        return {
            x: cell.x,
            y: cell.y,
            color: cell.level,
            t,
        };
    });
}

/**
 * Create grid SVG elements and styles
 */
function createGrid(
    cells: PointWithColor[],
    drawOptions: DrawOptions,
    duration: number,
): { svgElements: string[]; styles: string[] } {
    const { sizeDotBorderRadius, sizeDot, sizeCell } = drawOptions;
    const svgElements: string[] = [];
    const styles = [
        `.c{
      shape-rendering: geometricPrecision;
      fill: var(--ce);
      stroke-width: 1px;
      stroke: var(--cb);
      animation: none ${duration}ms linear infinite;
      width: ${sizeDot}px;
      height: ${sizeDot}px;
    }`,
    ];

    let i = 0;
    for (const { x, y, color, t } of cells) {
        const id = t !== null ? "c" + (i++).toString(36) : null;
        const m = (sizeCell - sizeDot) / 2;

        if (t !== null && id) {
            const animationName = id;

            styles.push(
                createAnimation(animationName, [
                    { t: Math.max(0, t - 0.0001), style: `fill:var(--c${color})` },
                    { t: Math.min(1, t + 0.0001), style: `fill:var(--ce)` },
                    { t: 1, style: `fill:var(--ce)` },
                ]),

                `.c.${id}{
          fill: var(--c${color});
          animation-name: ${animationName}
        }`,
            );
        }

        svgElements.push(
            h("rect", {
                class: ["c", id].filter(Boolean).join(" "),
                x: x * sizeCell + m,
                y: y * sizeCell + m,
                width: sizeDot,
                height: sizeDot,
                rx: sizeDotBorderRadius,
                ry: sizeDotBorderRadius,
            }),
        );
    }

    return { svgElements, styles };
}

/**
 * Create snake SVG elements and styles - multiple blocks getting smaller
 */
function createSnake(
    chain: Snake[],
    drawOptions: DrawOptions,
    duration: number,
): { svgElements: string[]; styles: string[] } {
    const { sizeCell, sizeDot } = drawOptions;
    const snakeN = 4; // 4 segments of snake body

    // Collect all positions for each snake segment across the chain
    const snakeParts: Point[][] = Array.from({ length: snakeN }, () => []);

    for (const snake of chain) {
        const cellsArray = snakeToCells(snake);
        for (let i = 0; i < Math.min(snakeN, cellsArray.length); i++) {
            snakeParts[i].push(cellsArray[i]);
        }
    }

    // Create SVG rect for each snake segment (decreasing size)
    const svgElements = snakeParts.map((_, i) => {
        const dMin = sizeDot * 0.8;
        const dMax = sizeCell * 0.9;
        const iMax = Math.min(4, snakeN);

        // Reverse index so head is largest
        const reverseI = snakeN - 1 - i;
        const u = Math.pow(reverseI / Math.max(1, iMax), 2);
        const s = lerp(u, dMin, dMax);
        const m = (sizeCell - s) / 2;
        const r = Math.min(4.5, (4 * s) / sizeDot);

        return h("rect", {
            class: `s s${i}`,
            x: m.toFixed(1),
            y: m.toFixed(1),
            width: s.toFixed(1),
            height: s.toFixed(1),
            rx: r.toFixed(1),
            ry: r.toFixed(1),
        });
    });

    const transform = ({ x, y }: Point) =>
        `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;

    const styles = [
        `.s{ 
      shape-rendering: geometricPrecision;
      fill: var(--cs);
      animation: none linear ${duration}ms infinite
    }`,

        ...snakeParts
            .map((positions, i) => {
                if (positions.length === 0) return [];

                const id = `s${i}`;
                const animationName = id;

                // Filter out duplicate consecutive positions
                const uniquePositions: Point[] = [];
                for (let j = 0; j < positions.length; j++) {
                    if (
                        j === 0 ||
                        positions[j].x !== positions[j - 1].x ||
                        positions[j].y !== positions[j - 1].y
                    ) {
                        uniquePositions.push(positions[j]);
                    }
                }

                const keyframes = uniquePositions.map((pos, j, arr) => ({
                    t: arr.length > 0 ? j / Math.max(1, arr.length - 1) : 0,
                    style: transform(pos),
                }));

                return [
                    createAnimation(animationName, keyframes),

                    `.s.${id}{
          ${transform(uniquePositions[0] || { x: 0, y: 0 })};
          animation-name: ${animationName}
        }`,
                ];
            })
            .flat(),
    ].flat();

    return { svgElements, styles };
}

/**
 * Create stack SVG elements and styles
 */
function createStack(
    cells: PointWithColor[],
    drawOptions: DrawOptions,
    width: number,
    y: number,
    duration: number,
): { svgElements: string[]; styles: string[] } {
    const { sizeDot } = drawOptions;
    const svgElements: string[] = [];
    const styles = [
        `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`,
    ];

    const stack = cells
        .slice()
        .filter((a) => a.t !== null)
        .sort((a, b) => (a.t ?? 0) - (b.t ?? 0));

    const blocks: { color: Color | Empty; ts: number[] }[] = [];
    stack.forEach(({ color, t }) => {
        const latest = blocks[blocks.length - 1];
        if (latest?.color === color) latest.ts.push(t ?? 0);
        else blocks.push({ color, ts: [t ?? 0] });
    });

    const stackLength = Math.max(1, stack.length);
    const m = width / stackLength;
    let i = 0;
    let nx = 0;

    for (const { color, ts } of blocks) {
        const id = "u" + (i++).toString(36);
        const animationName = id;
        const x = (nx * m).toFixed(1);

        nx += ts.length;

        svgElements.push(
            h("rect", {
                class: `u ${id}`,
                height: sizeDot,
                width: (ts.length * m + 0.6).toFixed(1),
                x,
                y,
            }),
        );

        styles.push(
            createAnimation(
                animationName,
                [
                    ...ts
                        .map((t, i, { length }) => [
                            { scale: length > 0 ? i / length : 0, t: Math.max(0, t - 0.0001) },
                            {
                                scale: length > 0 ? (i + 1) / length : 0,
                                t: Math.min(1, t + 0.0001),
                            },
                        ])
                        .flat(),
                    { scale: 1, t: 1 },
                ].map(({ scale, t }) => ({
                    t: Math.max(0, Math.min(1, t)),
                    style: `transform:scale(${scale.toFixed(3)},1)`,
                })),
            ),

            `.u.${id} {
        fill: var(--c${color});
        animation-name: ${animationName};
        transform-origin: ${x}px 0
      }`,
        );
    }

    return { svgElements, styles };
}

/**
 * Main SVG generation function
 */
function createSvg(
    grid: Grid,
    cells: Cell[],
    chain: Snake[],
    drawOptions: DrawOptions,
    stepDurationMs: number = 100,
): string {
    const width = (grid.width + 2) * drawOptions.sizeCell;
    const height = (grid.height + 5) * drawOptions.sizeCell;
    const duration = Math.max(1, stepDurationMs * chain.length);

    const livingCells = createLivingCells(cells, chain);

    const gridEl = createGrid(livingCells, drawOptions, duration);
    const stackEl = createStack(
        livingCells,
        drawOptions,
        grid.width * drawOptions.sizeCell,
        (grid.height + 2) * drawOptions.sizeCell,
        duration,
    );
    const snakeEl = createSnake(chain, drawOptions, duration);

    const elements = [gridEl, stackEl, snakeEl];

    const viewBox = [-drawOptions.sizeCell, -drawOptions.sizeCell * 2, width, height].join(" ");

    const generateColorVar = (): string => {
        return `
      :root {
      --cb: ${drawOptions.colorDotBorder};
      --cs: ${drawOptions.colorSnake};
      --ce: ${drawOptions.colorEmpty};
      ${Object.entries(drawOptions.colorDots)
          .map(([i, color]) => `--c${i}:${color};`)
          .join("")}
      }
    `;
    };

    const style =
        generateColorVar() +
        elements
            .map((e) => e.styles)
            .flat()
            .join("\n");

    const svg = [
        h("svg", {
            viewBox,
            width,
            height,
            xmlns: "http://www.w3.org/2000/svg",
        }).replace("/>", ">"),

        "<desc>",
        "Generated with https://github.com/Platane/snk",
        "</desc>",

        "<style>",
        minifyCss(style),
        "</style>",

        ...elements.map((e) => e.svgElements).flat(),

        "</svg>",
    ].join("");

    return svg;
}

// ============================================================
// PUBLIC API
// ============================================================

export interface GenerateSnakeSvgOptions {
    username: string;
    githubToken?: string;
    theme?: "dark" | "light";
    stepDurationMs?: number;
    drawOptions?: Partial<DrawOptions>;
}

export interface GenerateSnakeSvgResult {
    svg: string;
    grid: Grid;
    cells: Cell[];
}

/**
 * Main helper function to generate GitHub snake SVG
 * @example
 * ```tsx
 * const result = await generateGitHubSnakeSvg({
 *   username: 'RamKrishna7410',
 *   theme: 'dark'
 * });
 * document.getElementById('svg-container').innerHTML = result.svg;
 * ```
 */
export async function generateGitHubSnakeSvg(
    options: GenerateSnakeSvgOptions,
): Promise<GenerateSnakeSvgResult> {
    const {
        username,
        githubToken,
        theme = "dark",
        stepDurationMs = 100,
        drawOptions: customDrawOptions,
    } = options;

    const cells = await fetchGitHubContributions(username, githubToken);

    if (!cells || cells.length === 0) {
        throw new Error(`No contribution data found for user "${username}"`);
    }

    const grid = cellsToGrid(cells);
    const chain = generateSnakePath(grid, cells);

    if (!chain || chain.length === 0) {
        throw new Error("Failed to generate snake path");
    }

    const baseDrawOptions = theme === "dark" ? GITHUB_DARK_PALETTE : GITHUB_LIGHT_PALETTE;
    const drawOptions = { ...baseDrawOptions, ...customDrawOptions };

    const svg = createSvg(grid, cells, chain, drawOptions, stepDurationMs);

    return { svg, grid, cells };
}

/**
 * Download SVG
 */
export function downloadSnakeSvg(svg: string, filename: string = "github-snake"): void {
    const element = document.createElement("a");
    element.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
    element.setAttribute("download", `${filename}.svg`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export const themes = {
    dark: GITHUB_DARK_PALETTE,
    light: GITHUB_LIGHT_PALETTE,
};
