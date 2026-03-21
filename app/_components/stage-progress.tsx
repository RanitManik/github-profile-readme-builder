import React from "react";
import { STAGE_LABELS } from "@/lib/types";
import { Check } from "lucide-react";

interface StageProgressProps {
    currentStage: number;
}

const STAGES = [1, 2, 3, 4, 5];

export default function StageProgress({ currentStage }: StageProgressProps) {
    return (
        <div className="border-border bg-background_darker flex h-full flex-col justify-center border-b px-10 py-3.5">
            <div className="flex w-full items-start">
                {STAGES.map((stage, idx) => {
                    const isDone = currentStage > stage;
                    const isActive = currentStage === stage;
                    const isLast = idx === STAGES.length - 1;

                    return (
                        <React.Fragment key={stage}>
                            {/* Circle + label: fixed w-7 so connector starts flush at circle edge */}
                            <div className="flex w-7 flex-col items-center gap-1.5">
                                <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                                        isDone
                                            ? "border-success bg-success text-white"
                                            : isActive
                                              ? "border-accent bg-accent text-white shadow-[0_0_10px_rgba(68,147,248,0.55)]"
                                              : "border-border text-foreground-400"
                                    }`}
                                >
                                    {isDone ? <Check size={13} strokeWidth={3} /> : stage}
                                </div>
                                <span
                                    className={`hidden text-center text-[10px] leading-tight whitespace-nowrap lg:block ${
                                        isActive
                                            ? "text-accent font-semibold"
                                            : isDone
                                              ? "text-success"
                                              : "text-foreground-400"
                                    }`}
                                >
                                    {STAGE_LABELS[stage]}
                                </span>
                            </div>

                            {/* Connector line — flush between circles */}
                            {!isLast && (
                                <div
                                    className={`mt-3.25 h-0.5 flex-1 transition-all duration-500 ${
                                        currentStage > stage ? "bg-success" : "bg-border"
                                    }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
