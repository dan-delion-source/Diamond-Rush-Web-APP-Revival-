"use client";

import React from "react";

interface PhoneFrameProps {
    children: React.ReactNode;
    title?: string;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, title = "Diamond Rush • Evolution" }) => {
    return (
        <div className="relative mx-auto w-full max-w-[420px] min-w-[320px] h-[820px] bg-neutral-900 rounded-[60px] shadow-2xl p-5 border-[10px] border-neutral-800 ring-4 ring-neutral-700/30 flex flex-col items-center">
            {/* Speaker / Camera Notch */}
            <div className="w-28 h-7 bg-neutral-800 rounded-b-2xl mb-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1.5 bg-neutral-700 rounded-full"></div>
            </div>

            {/* Screen Container */}
            <div className="flex-1 w-full relative bg-black rounded-[25px] overflow-hidden border-2 border-neutral-800 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] group">
                {/* Game Title Bar */}
                <div className="absolute top-0 left-0 w-full h-10 bg-neutral-900/90 backdrop-blur-md z-20 flex items-center px-6 justify-between border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-accent glow-text">{title}</span>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-retro-green animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    </div>
                </div>

                {/* The Emulator Viewport */}
                <div className="absolute inset-0 flex items-center justify-center pt-10">
                    <div className="w-full h-full flex items-center justify-center relative bg-[#050505]">
                        {children}
                    </div>
                </div>

                {/* CRT Overlay */}
                <div className="absolute inset-0 pointer-events-none crt-effect opacity-30 group-hover:opacity-40 transition-opacity duration-500 z-30"></div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 z-20"></div>
            </div>

            {/* Home Path / Button */}
            <div className="mt-5 w-16 h-1.5 bg-neutral-800 rounded-full mb-3 shadow-inner"></div>

            {/* Decorative Accents */}
            <div className="absolute -left-2.5 top-32 w-1.5 h-16 bg-neutral-800 rounded-l-lg border-l border-white/5"></div>
            <div className="absolute -left-2.5 top-52 w-1.5 h-16 bg-neutral-800 rounded-l-lg border-l border-white/5"></div>
            <div className="absolute -right-2.5 top-40 w-1.5 h-20 bg-neutral-800 rounded-r-lg border-r border-white/5"></div>
        </div>
    );
};

export default PhoneFrame;
