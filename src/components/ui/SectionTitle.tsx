"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    alignment?: "left" | "center" | "right";
}

export function SectionTitle({ title, subtitle, alignment = "center", className }: SectionTitleProps) {
    const alignClass = {
        left: "text-left items-start",
        center: "text-center items-center mx-auto",
        right: "text-right items-end ml-auto",
    }[alignment];

    return (
        <div className={cn("mb-16 md:mb-24 flex flex-col", alignClass, className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-block"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-tight">
                    {title}
                </h2>

                {/* Premium Divider: Gradient line + Glowing dot */}
                <div className="absolute -bottom-6 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(112,66,248,0.8)]" />
                </div>
            </motion.div>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-neutral-400 max-w-2xl mt-10 text-lg md:text-xl font-light"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
