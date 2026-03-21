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

const Page = () => {
    const [readmeData, setReadmeData] = useState<ReadmeData>(DEFAULT_README_DATA);
    const [formStage, setFormStage] = useState(1);

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
        <div className="m-auto grid h-svh max-w-480 md:grid-cols-5 md:grid-rows-[auto_1fr]">
            {/* ── Row 1 Left: Stage Progress ──────────────────────────────── */}
            <div className="border-border col-span-2 border-r">
                {!isDone && <StageProgress currentStage={formStage} />}
            </div>

            {/* ── Row 1 Right: Logo + Title ────────────────────────────────── */}
            <div className="col-span-3">
                <LeftHeader />
            </div>

            {/* ── Row 2 Left: Configuration ───────────────────────────────── */}
            <div className="border-border col-span-2 flex min-h-0 flex-col overflow-hidden border-r">
                {/* Scrollable form area */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    {formStage === 1 && (
                        <FormStage1 data={readmeData} updateData={updateData} goNext={goNext} />
                    )}
                    {formStage === 2 && <FormStage2 data={readmeData} updateData={updateData} />}
                    {formStage === 3 && <FormStage3 data={readmeData} updateData={updateData} />}
                    {formStage === 4 && <FormStage4 data={readmeData} updateData={updateData} />}
                    {formStage === 5 && <FormStage5 data={readmeData} updateData={updateData} />}
                    {isDone && <FormStageDone markdown={markdown} onReset={reset} />}
                </div>

                {/* Back / Next navigation (stages 2-5) */}
                {formStage >= 2 && !isDone && (
                    <FormNavigation
                        currentStage={formStage}
                        totalStages={TOTAL_STAGES}
                        onBack={goBack}
                        onNext={goNext}
                    />
                )}
            </div>

            {/* ── Row 2 Right: Live Preview ────────────────────────────────── */}
            <div className="col-span-3 min-h-0 overflow-hidden">
                <div className="h-full overflow-hidden">
                    <div className="markdown-body h-full overflow-auto p-6">
                        {/* 846 px = GitHub's actual README content width */}
                        <div className="mx-auto max-w-211.5">
                            <PreviewSection markdown={previewMarkdown} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
