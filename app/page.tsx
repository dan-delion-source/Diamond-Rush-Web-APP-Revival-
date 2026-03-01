"use client";

import React from "react";
import PhoneFrame from "@/components/PhoneFrame";
import EmulatorCanvas from "@/components/EmulatorCanvas";
import Controls from "@/components/Controls";
import { useEmulator } from "@/hooks/useEmulator";
import { Gamepad2, RotateCcw, Zap } from "lucide-react";

export default function ArcadePage() {
  const [isCRT, setIsCRT] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { isLoading, isReady, error, manager } = useEmulator("/games/DiamondRush.jar", containerRef);

  return (
    <main className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-[1600px] w-full grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16 items-center relative z-10 px-4 md:px-8 py-10">
        {/* Left Column: Info & Stats */}
        <div className="xl:col-span-3 space-y-8 order-2 xl:order-1 flex flex-col justify-center">
          <div className="glass-panel p-8 rounded-[32px] space-y-6 border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex items-center gap-4 relative">
              <div className="p-3 bg-accent/20 rounded-2xl shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
                <Gamepad2 className="text-accent w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter glow-text uppercase leading-none mb-1">Diamond Rush</h1>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-black">Nokia Evolution v2.0</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-bold opacity-80 border-l-2 border-accent/20 pl-4">
              The legendary relic hunter returns in high fidelity. Navigate hazardous catacombs and ancient enigmas in this WASM-powered mobile reconstruction.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 relative">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[8px] uppercase text-neutral-600 font-black mb-1 tracking-widest">VM Status</p>
                <p className="text-lg font-black text-retro-green tabular-nums drop-shadow-[0_0_8px_rgba(51,255,51,0.3)]">OPTIMAL</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                <p className="text-[8px] uppercase text-neutral-600 font-black mb-1 tracking-widest">Bridge</p>
                <p className="text-lg font-black text-accent uppercase drop-shadow-[0_0_8px_rgba(0,242,255,0.3)]">WASM CORE</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[32px] space-y-6 border-white/5">
            <h3 className="text-[10px] uppercase text-neutral-500 font-black tracking-[0.3em] flex items-center gap-2">
              <Zap size={10} className="text-accent" /> Console Logic
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsCRT(!isCRT)}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-500 ${isCRT ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_25px_rgba(var(--accent-rgb),0.3)]' : 'bg-white/5 border-white/10 text-neutral-500 hover:text-neutral-300 hover:bg-white/10'}`}
              >
                <Zap size={18} />
                <span className="text-[10px] font-black uppercase tracking-tight">CRT Filter</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-neutral-500 hover:text-neutral-300 hover:bg-white/10 transition-all duration-300"
              >
                <RotateCcw size={18} />
                <span className="text-[10px] font-black uppercase tracking-tight">Reset Core</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Phone UI */}
        <div className="xl:col-span-6 order-1 xl:order-2 flex justify-center items-center py-10 relative">
          <div className={`relative transition-all duration-1000 scale-100 sm:scale-110 lg:scale-[1.15] xl:scale-[1.2] w-full max-w-[420px] flex justify-center ${isCRT ? "crt-flicker" : ""}`}>
            {/* Immersive Glow Aura */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square bg-accent/20 blur-[150px] rounded-full -z-10 animate-pulse-slow"></div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square bg-purple-500/10 blur-[200px] rounded-full -z-20 delay-1000"></div>

            <PhoneFrame title="Diamond Rush • Legacy">
              <EmulatorCanvas
                containerRef={containerRef}
                isReady={isReady}
                isLoading={isLoading}
                error={error}
              />
            </PhoneFrame>

            {/* Neural Link Status Indicator */}
            <div className={`absolute -bottom-16 flex flex-col items-center gap-2 transition-opacity duration-500 ${isLoading || isReady ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Pipeline:</span>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${isReady ? 'text-retro-green' : 'text-accent animate-pulse'}`}>
                    {isLoading ? "Executing Machine Code" : isReady ? "Bridge Stable" : "Offline"}
                  </span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Latency:</span>
                  <span className="text-[9px] text-accent font-black tracking-tighter uppercase">Minimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="xl:col-span-3 order-3 flex flex-col justify-center">
          <div className="glass-panel p-8 xl:p-10 rounded-[48px] border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <div className="mb-10 flex items-center justify-between">
              <h3 className="text-[10px] uppercase text-neutral-500 font-black tracking-[0.3em]">Neural Link</h3>
              <div className="px-3 py-1.5 bg-retro-green/10 rounded-lg border border-retro-green/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-retro-green animate-ping"></div>
                <span className="text-retro-green text-[9px] font-black uppercase tracking-widest leading-none">Synced</span>
              </div>
            </div>

            <div className="scale-105 xl:scale-110">
              <Controls manager={manager} />
            </div>

            <div className="mt-12 pt-10 border-t border-white/10 hidden xl:block">
              <h3 className="text-[10px] uppercase text-neutral-500 font-black tracking-[0.3em] mb-6">Instruction Set</h3>
              <div className="space-y-4">
                {[
                  { k: "Arrows", a: "Movement Matrix" },
                  { k: "Q / W", a: "Options / Back" },
                  { k: "Z / X", a: "Star / Pound" },
                  { k: "Enter", a: "System Action" }
                ].map((map, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] font-black group cursor-default">
                    <span className="bg-white/5 px-3 py-1.5 rounded-xl text-accent border border-white/10 shadow-lg group-hover:bg-accent group-hover:text-black transition-all duration-300 font-mono tracking-tighter">{map.k}</span>
                    <span className="text-neutral-500 uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-neutral-300 transition-all">{map.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <footer className="w-full max-w-[1600px] mt-8 px-8 flex justify-center relative z-10">
        <p className="text-[8px] md:text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity">
          This site runs a locally hosted Java ME game. All rights belong to the original publisher.
        </p>
      </footer>
    </main>
  );
}
