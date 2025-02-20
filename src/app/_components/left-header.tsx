import Logo from "@/components/logo";

export default function LeftHeader() {
    return (
        <nav className="bg-background_darker border-border flex h-fit items-center gap-4 border-b p-4">
            <Logo />
            <h1 className="overflow-hidden font-semibold whitespace-nowrap select-none">
                GitHub Profile README Builder
            </h1>
        </nav>
    );
}
