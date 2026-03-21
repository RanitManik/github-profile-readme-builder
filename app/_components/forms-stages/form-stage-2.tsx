"use client";

import { ReadmeData } from "@/lib/types";

interface FormStage2Props {
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

export default function FormStage2({ data, updateData }: FormStage2Props) {
    return (
        <div className="flex flex-col gap-5 px-6 py-5">
            <header className="space-y-1">
                <h2 className="text-lg font-bold">Personal Info</h2>
                <p className="text-foreground-400 text-xs">
                    This fills in the intro section of your README. All fields are optional — add
                    what you&apos;d like to show.
                </p>
            </header>

            <Field
                label="Full Name"
                hint={`Preview: Hi👋, I'm ${data.name || data.username || "Your Name"}`}
            >
                <input
                    className={inputCls}
                    type="text"
                    placeholder={data.username || "Ranit Manik"}
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                />
            </Field>

            <Field label="Tagline / Title" optional hint='e.g. "A Full Stack Developer from India"'>
                <input
                    className={inputCls}
                    type="text"
                    placeholder="A passionate developer from Earth"
                    value={data.tagline}
                    onChange={(e) => updateData({ tagline: e.target.value })}
                />
            </Field>

            <Field label="Location" optional>
                <input
                    className={inputCls}
                    type="text"
                    placeholder="San Francisco, CA"
                    value={data.location}
                    onChange={(e) => updateData({ location: e.target.value })}
                />
            </Field>

            <Field label="Portfolio / Website URL" optional>
                <input
                    className={inputCls}
                    type="url"
                    placeholder="https://yourportfolio.dev"
                    value={data.portfolioUrl}
                    onChange={(e) => updateData({ portfolioUrl: e.target.value })}
                />
            </Field>

            <Field label="Email Address" optional>
                <input
                    className={inputCls}
                    type="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                />
            </Field>

            <Field label="LinkedIn Profile URL" optional>
                <input
                    className={inputCls}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={data.linkedinUrl}
                    onChange={(e) => updateData({ linkedinUrl: e.target.value })}
                />
            </Field>
        </div>
    );
}
