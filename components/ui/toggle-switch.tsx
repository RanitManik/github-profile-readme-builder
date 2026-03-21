import React from "react";

interface ToggleSwitchProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}

export default function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
    return (
        <label className="border-border hover:border-foreground-500 flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-colors">
            <div className="space-y-0.5">
                <p className="text-sm font-semibold">{label}</p>
                {description && <p className="text-foreground-400 text-xs">{description}</p>}
            </div>
            <button
                role="switch"
                aria-checked={checked}
                onClick={(e) => {
                    e.preventDefault();
                    onChange(!checked);
                }}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    checked ? "bg-accent" : "bg-border"
                }`}
            >
                <span
                    className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </label>
    );
}
