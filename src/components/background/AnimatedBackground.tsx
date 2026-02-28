"use client";

import dynamic from "next/dynamic";

const StarsCanvas = dynamic(() => import("./StarBackground"), { ssr: false });

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
            <div className="absolute inset-0 bg-[#030014]" />
            <StarsCanvas />
        </div>
    );
}
