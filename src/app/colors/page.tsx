import React from "react";

const colors = [
    "accent",
    "foreground",
    "neutral",
    "background",
    "background_darker",
    "border",
    "success",
    "attention",
    "danger",
    "done",
];

const variants = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
];

const ColorPalette = () => {
    return (
        <div className="min-h-screen bg-gray-900 p-10 text-white">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Tailwind Color Palette
            </h1>
            <div className="space-y-8">
                {colors.map((name) => (
                    <div key={name} className="flex w-full flex-col">
                        <h2 className="mb-2 text-lg font-semibold">{name}</h2>
                        <div className="grid w-full grid-cols-11">
                            {variants.map((variant) => (
                                <div
                                    key={variant}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={`h-16 w-full rounded-lg shadow-lg bg-${name}-${variant} flex items-center justify-center text-xs font-semibold`}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPalette;
