import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface FormNavigationProps {
    currentStage: number;
    totalStages: number;
    onBack: () => void;
    onNext: () => void;
}

export default function FormNavigation({
    currentStage,
    totalStages,
    onBack,
    onNext,
}: FormNavigationProps) {
    const isFinalStage = currentStage === totalStages;

    return (
        <div className="border-border bg-background_lighter flex items-center justify-between border-t px-4 py-3">
            <button
                onClick={onBack}
                className="border-border hover:bg-background text-foreground-300 hover:text-foreground-50 flex cursor-pointer items-center gap-2 rounded-md border px-4 py-1.5 text-sm transition-colors"
            >
                <ArrowLeft size={15} />
                Back
            </button>

            <span className="text-foreground-400 text-xs">
                Step {currentStage} of {totalStages}
            </span>

            <button
                onClick={onNext}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold text-white transition-colors ${
                    isFinalStage
                        ? "bg-success hover:bg-success-500"
                        : "bg-accent hover:bg-accent-600"
                }`}
            >
                {isFinalStage ? (
                    <>
                        <Sparkles size={15} />
                        Get My README
                    </>
                ) : (
                    <>
                        Next
                        <ArrowRight size={15} />
                    </>
                )}
            </button>
        </div>
    );
}
