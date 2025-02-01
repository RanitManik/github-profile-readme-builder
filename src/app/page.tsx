import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="grid min-h-svh place-content-center bg-foreground">
            <button
                className={cn(
                    "bg-background",
                    "rounded-full px-4 py-1.5 text-foreground transition-transform hover:scale-105 active:scale-95",
                )}
            >
                Example page
            </button>
        </div>
    );
}
