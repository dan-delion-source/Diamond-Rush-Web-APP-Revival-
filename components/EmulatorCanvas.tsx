'use client';

import React, { useRef } from 'react';
import { useEmulator } from '@/hooks/useEmulator';
import { Loader2, AlertTriangle } from 'lucide-react';

const LoadingMessage = () => {
    const [index, setIndex] = React.useState(0);
    const messages = [
        "Synthesizing Java VM...",
        "Initializing Neural Link...",
        "Optimizing WASM Pipeline...",
        "Calibrating Graphics Core...",
        "Hydrating Memory Buffers...",
        "Synchronizing Emulator Clock..."
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 1200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-accent text-[10px] tracking-[0.3em] font-black animate-pulse uppercase text-center h-4">
            {messages[index]}
        </div>
    );
};

interface EmulatorCanvasProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    isReady: boolean;
    isLoading: boolean;
    error: string | null;
    width?: number;
    height?: number;
}

const EmulatorCanvas: React.FC<EmulatorCanvasProps> = ({ containerRef, isReady, isLoading, error, width = 240, height = 320 }) => {

    return (
        <div
            className="relative w-full bg-black overflow-hidden flex items-center justify-center rounded-[30px] border border-white/10 shadow-2xl"
            style={{ aspectRatio: '240 / 320' }}
        >
            {/* CheerpJ Display Container — Java AWT renders directly into this div */}
            <div
                ref={containerRef}
                id="cheerpj-display"
                className={`absolute inset-0 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            />

            {/* Force all CheerpJ-injected elements to stretch and fill the container */}
            <style jsx global>{`
                #cheerpj-display,
                #cheerpj-display > *,
                #cheerpj-display canvas,
                #cheerpj-display iframe,
                #cheerpj-display div {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    max-width: none !important;
                    max-height: none !important;
                    min-width: 100% !important;
                    min-height: 100% !important;
                    object-fit: fill !important;
                    image-rendering: pixelated;
                    image-rendering: crisp-edges;
                    display: block !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    transform: none !important;
                }
                #cheerpj-display {
                    overflow: hidden !important;
                }
            `}</style>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
                    <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
                    <LoadingMessage />
                </div>
            )}

            {/* Error Overlay */}
            {error && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                    <div className="text-red-500 text-sm font-black tracking-widest uppercase mb-2">
                        Runtime Failure
                    </div>
                    <p className="text-neutral-500 text-[10px] uppercase max-w-[200px] leading-relaxed">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-red-500/30 transition-all"
                    >
                        Re-initialize
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmulatorCanvas;
