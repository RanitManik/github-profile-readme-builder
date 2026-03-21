"use client";

import { ReadmeData } from "@/lib/types";
import FormField from "@/components/ui/form-field";
import TextInput from "@/components/ui/text-input";

interface FormStage2Props {
    data: ReadmeData;
    updateData: (updates: Partial<ReadmeData>) => void;
}

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

            <FormField
                label="Full Name"
                hint={`Preview: Hi👋, I'm ${data.name || data.username || "Your Name"}`}
            >
                <TextInput
                    type="text"
                    placeholder={data.username || "Ranit Manik"}
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                />
            </FormField>

            <FormField
                label="Tagline / Title"
                optional
                hint='e.g. "A Full Stack Developer from India"'
            >
                <TextInput
                    type="text"
                    placeholder="A passionate developer from Earth"
                    value={data.tagline}
                    onChange={(e) => updateData({ tagline: e.target.value })}
                />
            </FormField>

            <FormField label="Location" optional>
                <TextInput
                    type="text"
                    placeholder="San Francisco, CA"
                    value={data.location}
                    onChange={(e) => updateData({ location: e.target.value })}
                />
            </FormField>

            <FormField label="Portfolio / Website URL" optional>
                <TextInput
                    type="url"
                    placeholder="https://yourportfolio.dev"
                    value={data.portfolioUrl}
                    onChange={(e) => updateData({ portfolioUrl: e.target.value })}
                />
            </FormField>

            <FormField label="Email Address" optional>
                <TextInput
                    type="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                />
            </FormField>

            <FormField label="LinkedIn Profile URL" optional>
                <TextInput
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={data.linkedinUrl}
                    onChange={(e) => updateData({ linkedinUrl: e.target.value })}
                />
            </FormField>
        </div>
    );
}
