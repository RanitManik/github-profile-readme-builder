import React from "react";

interface TabSwitchProps {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="bg-background_lighter flex px-2 py-1.5">
            <div className="border-border bg-foreground rounded-md border">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`cursor-pointer px-4 py-0.5 text-sm text-white ${activeTab === tab ? "bg-background_darker outline-border-500 rounded-md font-semibold outline" : "hover:bg-background/10 rounded-r-md"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabSwitch;
