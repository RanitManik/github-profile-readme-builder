import type { Metadata } from "next";
import "@/styles/globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "GitHub Profile README Builder",
    description: "Build beautiful, customizable GitHub Profile README files quickly and easily.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
