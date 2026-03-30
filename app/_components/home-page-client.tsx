"use client";

import { useMemo, useState } from "react";
import "github-markdown-css";
import { generateREADME, generatePreviewREADME } from "@/app/_components/readme/variant-1";
import LeftHeader from "@/app/_components/left-header";
import PreviewSection from "@/app/_components/preview-section";
import StageProgress from "@/app/_components/stage-progress";
import FormNavigation from "@/app/_components/form-navigation";
import FormStage1 from "@/app/_components/forms-stages/form-stage-1";
import FormStage2 from "@/app/_components/forms-stages/form-stage-2";
import FormStage3 from "@/app/_components/forms-stages/form-stage-3";
import FormStage4 from "@/app/_components/forms-stages/form-stage-4";
import FormStage5 from "@/app/_components/forms-stages/form-stage-5";
import FormStageDone from "@/app/_components/forms-stages/form-stage-done";
import { DEFAULT_README_DATA, ReadmeData } from "@/lib/types";

const TOTAL_STAGES = 5; // stages 1-5; stage 6 = Done

export default function HomePageClient() {
    const [readmeData, setReadmeData] = useState<ReadmeData>(DEFAULT_README_DATA);
    const [formStage, setFormStage] = useState(1);
    const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");

    const markdown = useMemo(() => generateREADME(readmeData), [readmeData]);
    const previewMarkdown = useMemo(
        () => generatePreviewREADME(readmeData, formStage),
        [readmeData, formStage],
    );

    const updateData = (updates: Partial<ReadmeData>) =>
        setReadmeData((prev) => ({ ...prev, ...updates }));

    const goNext = () => setFormStage((s) => Math.min(s + 1, TOTAL_STAGES + 1));
    const goBack = () => setFormStage((s) => Math.max(s - 1, 1));
    const reset = () => {
        setReadmeData(DEFAULT_README_DATA);
        setFormStage(1);
    };

    const isDone = formStage > TOTAL_STAGES;

    return (
        <main className="m-auto flex h-svh max-w-480 flex-col md:grid md:grid-cols-5 md:grid-rows-[auto_1fr]">
            {/* Desktop Headers: Only visible on md+ screens */}
            <div className="hidden md:col-span-5 md:flex md:flex-row">
                <div className="border-border order-2 flex-1 border-b md:order-1 md:col-span-2 md:border-r md:border-b-0">
                    <StageProgress currentStage={Math.min(formStage, TOTAL_STAGES)} />
                </div>
                <div className="border-border order-1 flex-[1.5] border-b md:order-2 md:col-span-3 md:border-b-0">
                    <LeftHeader />
                </div>
            </div>

            {/* Mobile Toggle Bar: Always visible on mobile except when Done modal is active */}
            {!isDone && (
                <div className="bg-background_darker border-border flex border-b md:hidden">
                    <button
                        onClick={() => setViewMode("editor")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                            viewMode === "editor"
                                ? "border-accent bg-background text-accent border-b-2"
                                : "text-foreground-400"
                        }`}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setViewMode("preview")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                            viewMode === "preview"
                                ? "border-accent bg-background text-accent border-b-2"
                                : "text-foreground-400"
                        }`}
                    >
                        Preview
                    </button>
                </div>
            )}

            {/* Content Area */}
            <div className="flex min-h-0 flex-1 flex-col md:col-span-5 md:grid md:grid-cols-5">
                {/* Editor Section */}
                <div
                    className={`border-border flex flex-1 flex-col overflow-hidden md:col-span-2 md:border-r ${
                        viewMode === "editor" ? "flex" : "hidden md:flex"
                    }`}
                >
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {formStage === 1 && (
                            <FormStage1 data={readmeData} updateData={updateData} goNext={goNext} />
                        )}
                        {formStage === 2 && (
                            <FormStage2 data={readmeData} updateData={updateData} />
                        )}
                        {formStage === 3 && (
                            <FormStage3 data={readmeData} updateData={updateData} />
                        )}
                        {formStage === 4 && (
                            <FormStage4 data={readmeData} updateData={updateData} />
                        )}
                        {(formStage === 5 || isDone) && (
                            <FormStage5 data={readmeData} updateData={updateData} />
                        )}
                    </div>

                    {formStage >= 2 && (
                        <FormNavigation
                            currentStage={Math.min(formStage, TOTAL_STAGES)}
                            totalStages={TOTAL_STAGES}
                            onBack={goBack}
                            onNext={goNext}
                        />
                    )}
                </div>

                {/* Preview Section */}
                <div
                    className={`flex-1 overflow-hidden md:col-span-3 ${
                        viewMode === "preview" ? "block" : "hidden md:block"
                    }`}
                >
                    <div className="h-full overflow-hidden">
                        <div className="markdown-body h-full overflow-auto p-4 md:p-6">
                            <div className="mx-auto max-w-211.5">
                                <PreviewSection markdown={previewMarkdown} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isDone && (
                <FormStageDone
                    markdown={markdown}
                    onReset={reset}
                    onClose={() => setFormStage(TOTAL_STAGES)}
                />
            )}
        </main>
    );
}
