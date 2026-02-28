"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    gradientBorder?: boolean;
    children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, gradientBorder = false, children, ...props }, ref) => {
        if (gradientBorder) {
            return (
                <motion.div
                    ref={ref}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                        "p-[1px] rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300",
                        className
                    )}
                    {...props}
                >
                    <div className="bg-[#0c0c1d] p-6 sm:p-8 rounded-2xl h-full flex flex-col gap-4 hover:bg-[#151525] transition-colors relative overflow-hidden group">
                        {/* Subtle inner glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 h-full w-full flex flex-col">
                            {children}
                        </div>
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div
                ref={ref}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                    "relative overflow-hidden rounded-2xl bg-[#0c0c1d] border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300",
                    "hover:shadow-[0_20px_40px_-15px_rgba(112,66,248,0.15)]",
                    className
                )}
                {...props}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                <div className="relative z-10 h-full w-full p-6 sm:p-8">
                    {children}
                </div>
            </motion.div>
        );
    }
);

Card.displayName = "Card";
