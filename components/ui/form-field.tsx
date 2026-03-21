import React from "react";

interface FormFieldProps {
    label: string;
    optional?: boolean;
    hint?: string;
    children: React.ReactNode;
}

export default function FormField({ label, optional, hint, children }: FormFieldProps) {
    return (
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
}
