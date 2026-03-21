"use client";

import { ReadmeData } from "@/lib/types";

interface FormStage3Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

const inputCls =
    "border-border bg-background focus:ring-accent w-full rounded-md border px-3 py-1.5 text-sm placeholder:text-foreground-600 focus:outline-none focus:ring-2";

const Field = ({
    label,
    optional,
    hint,
    children,
}: {
    label: string;
    optional?: boolean;
    hint?: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-1">
        <label className="block text-sm font-semibold">
            {label}
            {optional && (
                <span className="text-foreground-500 ml-1 text-xs font-normal">(optional)</span>
            )}
        </label>
        {hint && <p className="text-foreground-500 text-xs">{hint}</p>}
        {children}
    </div>
);

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

            <Field label="Currently Working On" optional hint='e.g. "an open-source CLI tool"'>
                <input
                    className={inputCls}
                    type="text"
                    placeholder="my awesome side project"
                    value={data.workingOn}
                    onChange={(e) => updateData({ workingOn: e.target.value })}
                />
            </Field>

            <Field label="Job Title" optional>
                <input
                    className={inputCls}
                    type="text"
                    placeholder="Full Stack Developer"
                    value={data.jobTitle}
                    onChange={(e) => updateData({ jobTitle: e.target.value })}
                />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field label="Company / Org" optional>
                    <input
                        className={inputCls}
                        type="text"
                        placeholder="Acme Corp"
                        value={data.company}
                        onChange={(e) => updateData({ company: e.target.value })}
                    />
                </Field>
                <Field label="Company URL" optional>
                    <input
                        className={inputCls}
                        type="url"
                        placeholder="https://acme.com"
                        value={data.companyUrl}
                        onChange={(e) => updateData({ companyUrl: e.target.value })}
                    />
                </Field>
            </div>

            <Field
                label="Areas of Expertise"
                optional
                hint='e.g. "Full Stack Development, Machine Learning"'
            >
                <input
                    className={inputCls}
                    type="text"
                    placeholder="Full Stack Development"
                    value={data.expertise}
                    onChange={(e) => updateData({ expertise: e.target.value })}
                />
            </Field>

            {/* ── Education ── */}
            <p className="text-foreground-300 border-border border-b pb-1 text-xs font-semibold tracking-wider uppercase">
                🏫 Education
            </p>

            <Field label="Degree / Program" optional>
                <input
                    className={inputCls}
                    type="text"
                    placeholder="Bachelor's in Computer Science"
                    value={data.degree}
                    onChange={(e) => updateData({ degree: e.target.value })}
                />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field label="Institution" optional>
                    <input
                        className={inputCls}
                        type="text"
                        placeholder="MIT"
                        value={data.institution}
                        onChange={(e) => updateData({ institution: e.target.value })}
                    />
                </Field>
                <Field label="Institution URL" optional>
                    <input
                        className={inputCls}
                        type="url"
                        placeholder="https://mit.edu"
                        value={data.institutionUrl}
                        onChange={(e) => updateData({ institutionUrl: e.target.value })}
                    />
                </Field>
            </div>
        </div>
    );
}
