"use client";

import { useState } from "react";
import "github-markdown-css";
import README from "@/app/_components/readme/variant-1";
import LeftHeader from "@/app/_components/left-header";
import PreviewSection from "@/app/_components/preview-section";
import Tabs from "@/app/_components/right-header";
import FormStage1 from "@/app/_components/forms-stages/form-stage-1";

const Page = () => {
    const [markdown, setMarkdown] = useState(README);
    const [formStage, setFormStage] = useState(1);
    const [activeTab, setActiveTab] = useState("preview");

    return (
        <div className="m-auto grid h-svh max-w-[1920px] md:grid-cols-5">
            {/* Configuration Section */}
            <div className="border-border col-span-2 flex h-full flex-col border-r">
                <LeftHeader />
                {formStage === 1 && <FormStage1 />}
            </div>

            {/* Preview Section */}
            <div className="col-span-3 h-full overflow-hidden p-4 md:block">
                <div className="border-border grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-lg border">
                    {/* Tab Switch + Buttons */}
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} markdown={markdown} />

                    {/* Markdown Body */}
                    <div className="markdown-body overflow-auto p-6">
                        <PreviewSection
                            markdown={
                                activeTab === "preview" ? markdown : `\`\`\`html${markdown}\n\`\`\``
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
