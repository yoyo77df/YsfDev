"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

const MotionSlot = motion.create(Slot);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? MotionSlot : motion.button;

        const variants = {
            primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 border-0",
            secondary: "bg-transparent border border-purple-500 text-white hover:bg-purple-500/20 hover:scale-105",
            outline: "border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400",
            ghost: "text-neutral-300 hover:text-white hover:bg-white/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-2.5 text-base font-medium",
            lg: "px-10 py-3 text-lg font-medium tracking-wide",
        };

        return (
            <Comp
                ref={ref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Button.displayName = "Button";
