"use client";

import React from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { FreeJ2MEManager } from "@/emulator/FreeJ2MEManager";
import { mapKeyToAWT } from "@/hooks/useEmulator";

interface ControlsProps {
    manager: FreeJ2MEManager | null;
}

const Controls: React.FC<ControlsProps> = ({ manager }) => {
    const handlePress = (key: string) => {
        if (!manager) return;
        const awtCode = mapKeyToAWT(key);
        if (awtCode !== 0) {
            manager.sendKeyDown(awtCode);
        }

        // Provide haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(15);
        }
    };

    const handleRelease = (key: string) => {
        if (!manager) return;
        const awtCode = mapKeyToAWT(key);
        if (awtCode !== 0) {
            manager.sendKeyUp(awtCode);
        }
    };

    const ControlButton = ({
        children,
        keyName,
        className = ""
    }: {
        children: React.ReactNode;
        keyName: string;
        className?: string;
    }) => (
        <button
            onMouseDown={() => handlePress(keyName)}
            onMouseUp={() => handleRelease(keyName)}
            onTouchStart={(e) => { e.preventDefault(); handlePress(keyName); }}
            onTouchEnd={(e) => { e.preventDefault(); handleRelease(keyName); }}
            className={`active:scale-90 transition-transform flex items-center justify-center bg-neutral-800 rounded-full border border-white/10 shadow-lg ${className}`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full flex-col flex items-center gap-6 mt-8 mb-12">
            {/* Top Action Buttons (Softkeys) */}
            <div className="flex justify-between w-full px-8 mb-4">
                <ControlButton keyName="q" className="w-14 h-8 rounded-lg text-[8px] font-black uppercase text-neutral-400">
                    Options
                </ControlButton>
                <ControlButton keyName="w" className="w-14 h-8 rounded-lg text-[8px] font-black uppercase text-neutral-400">
                    Back
                </ControlButton>
            </div>

            <div className="flex items-center justify-between w-full px-4 gap-4">
                {/* D-PAD */}
                <div className="relative w-32 h-32 bg-neutral-900 rounded-full shadow-2xl border-2 border-neutral-800 flex items-center justify-center p-1">
                    <ControlButton keyName="ArrowUp" className="absolute top-1 w-12 h-10 rounded-t-xl bg-neutral-800">
                        <ChevronUp size={24} className="text-accent" />
                    </ControlButton>
                    <ControlButton keyName="ArrowDown" className="absolute bottom-1 w-12 h-10 rounded-b-xl bg-neutral-800">
                        <ChevronDown size={24} className="text-accent" />
                    </ControlButton>
                    <ControlButton keyName="ArrowLeft" className="absolute left-1 h-12 w-10 rounded-l-xl bg-neutral-800">
                        <ChevronLeft size={24} className="text-accent" />
                    </ControlButton>
                    <ControlButton keyName="ArrowRight" className="absolute right-1 h-12 w-10 rounded-r-xl bg-neutral-800">
                        <ChevronRight size={24} className="text-accent" />
                    </ControlButton>

                    <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center shadow-inner">
                        <div className="w-2 h-2 rounded-full bg-accent/20"></div>
                    </div>
                </div>

                {/* Secondary Actions (Z/X) and OK */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                        <ControlButton keyName="z" className="w-10 h-10 rounded-lg text-xs font-black text-neutral-400">
                            *
                        </ControlButton>
                        <ControlButton keyName="x" className="w-10 h-10 rounded-lg text-xs font-black text-neutral-400">
                            #
                        </ControlButton>
                    </div>
                    {/* Action Button (OK / 5 / Enter) */}
                    <ControlButton keyName="Enter" className="w-24 h-24 rounded-full bg-neutral-900 border-4 border-neutral-800">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-xl tracking-tighter">OK</span>
                        </div>
                    </ControlButton>
                </div>
            </div>
        </div>
    );
};

export default Controls;
