import React from "react";
import { Clipboard, Download } from "lucide-react";
import TabSwitch from "@/components/tab-switch";
import ActionButtons from "@/components/action-buttons";

interface RightHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    markdown: string;
}

const RightHeader: React.FC<RightHeaderProps> = ({ activeTab, setActiveTab, markdown }) => {
    //* 📋 helper function to copy the markdown text
    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
    };

    //* 📥 helper function to download the markdown file
    const handleDownload = () => {
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    //* 📊 Calculate lines and file size
    const lineCount = markdown.split("\n").length;
    const loc = markdown.split("\n").filter((line) => line.trim() !== "").length;
    const fileSize = new Blob([markdown]).size / 1024; // Convert to KB

    return (
        <div className="border-border bg-background_lighter flex items-center justify-between border-b px-2 py-1 text-sm text-white">
            {/* Left Section: Tabs */}
            <div className="flex items-center gap-1">
                <TabSwitch
                    tabs={["preview", "code"]}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Lines and Size Info */}
                <span className="font-mono text-xs text-gray-400">
                    {lineCount} lines ({loc} loc) • {fileSize.toFixed(2)} KB
                </span>
            </div>

            {/* Right Section: Actions (Raw, Copy, Download) */}
            <ActionButtons
                buttons={[
                    {
                        label: "View Raw",
                        icon: "Raw",
                        onClick: () => console.log("Raw clicked"),
                    },
                    { label: "Copy", icon: <Clipboard size={15} />, onClick: handleCopy },
                    { label: "Download", icon: <Download size={15} />, onClick: handleDownload },
                ]}
            />
        </div>
    );
};

export default RightHeader;
