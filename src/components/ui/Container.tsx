import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("mx-auto w-full px-6 sm:px-8 md:px-12 max-w-[1200px]", className)} {...props}>
            {children}
        </div>
    );
}
