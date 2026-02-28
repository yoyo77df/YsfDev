import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "outline" | "success" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        outline: "bg-transparent border-neutral-600 text-neutral-300",
        success: "bg-green-500/20 text-green-300 border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
