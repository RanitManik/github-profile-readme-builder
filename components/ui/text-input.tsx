import React from "react";

export const INPUT_CLASS =
    "border-border bg-background focus:ring-accent w-full rounded-md border px-3 py-1.5 text-sm placeholder:text-foreground-600 focus:outline-none focus:ring-2";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function TextInput(props: TextInputProps) {
    return <input className={`${INPUT_CLASS} ${props.className ?? ""}`.trim()} {...props} />;
}
