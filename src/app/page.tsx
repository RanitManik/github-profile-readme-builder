const colorVariants = [
    "accent",
    "foreground",
    "background",
    "border",
    "success",
    "attention",
    "danger",
    "done",
    "neutral",
];

const colors = colorVariants.flatMap((color) => [
    `${color}-default`,
    `${color}-emphasis`,
    `${color}-muted`,
    `${color}-subtle`,
]);

export default function ColorsPage() {
    return (
        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {colors.map((color) => (
                <div key={color} className="flex flex-col items-center">
                    <div
                        className={`h-20 w-20 rounded-lg border border-border bg-${color}`}
                    ></div>
                    <p className="mt-2 text-sm">{color}</p>
                </div>
            ))}
        </div>
    );
}
