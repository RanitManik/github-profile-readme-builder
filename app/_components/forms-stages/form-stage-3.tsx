"use client";

import { ReadmeData } from "@/lib/types";
import FormField from "@/components/ui/form-field";
import TextInput from "@/components/ui/text-input";

interface FormStage3Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

export default function FormStage3({ data, updateData }: FormStage3Props) {
    return (
        <div className="flex flex-col gap-5 px-6 py-5">
            <header className="space-y-1">
                <h2 className="text-lg font-bold">Work &amp; Education</h2>
                <p className="text-foreground-400 text-xs">
                    Showcase what you&apos;re working on, where you work, and your academic
                    background.
                </p>
            </header>

            {/* ── Work ── */}
            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                💼 Work
            </p>

            <FormField label="Currently Working On" optional hint='e.g. "an open-source CLI tool"'>
                <TextInput
                    type="text"
                    placeholder="my awesome side project"
                    value={data.workingOn}
                    onChange={(e) => updateData({ workingOn: e.target.value })}
                />
            </FormField>

            <FormField label="Job Title" optional>
                <TextInput
                    type="text"
                    placeholder="Full Stack Developer"
                    value={data.jobTitle}
                    onChange={(e) => updateData({ jobTitle: e.target.value })}
                />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
                <FormField label="Company / Org" optional>
                    <TextInput
                        type="text"
                        placeholder="Acme Corp"
                        value={data.company}
                        onChange={(e) => updateData({ company: e.target.value })}
                    />
                </FormField>
                <FormField label="Company URL" optional>
                    <TextInput
                        type="url"
                        placeholder="https://acme.com"
                        value={data.companyUrl}
                        onChange={(e) => updateData({ companyUrl: e.target.value })}
                    />
                </FormField>
            </div>

            <FormField
                label="Areas of Expertise"
                optional
                hint='e.g. "Full Stack Development, Machine Learning"'
            >
                <TextInput
                    type="text"
                    placeholder="Full Stack Development"
                    value={data.expertise}
                    onChange={(e) => updateData({ expertise: e.target.value })}
                />
            </FormField>

            {/* ── Education ── */}
            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                🏫 Education
            </p>

            <FormField label="Degree / Program" optional>
                <TextInput
                    type="text"
                    placeholder="Bachelor's in Computer Science"
                    value={data.degree}
                    onChange={(e) => updateData({ degree: e.target.value })}
                />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
                <FormField label="Institution" optional>
                    <TextInput
                        type="text"
                        placeholder="MIT"
                        value={data.institution}
                        onChange={(e) => updateData({ institution: e.target.value })}
                    />
                </FormField>
                <FormField label="Institution URL" optional>
                    <TextInput
                        type="url"
                        placeholder="https://mit.edu"
                        value={data.institutionUrl}
                        onChange={(e) => updateData({ institutionUrl: e.target.value })}
                    />
                </FormField>
            </div>
        </div>
    );
}
