import { cn } from "@/lib/utils";
import { Card } from "./Card";

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <Card className={cn("animate-pulse", className)}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="h-6 w-1/2 bg-white/10 rounded-md"></div>
                    <div className="h-5 w-16 bg-white/10 rounded-full"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-white/5 rounded-md"></div>
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="h-4 w-12 bg-white/10 rounded-md"></div>
                    <div className="h-4 w-12 bg-white/10 rounded-md"></div>
                </div>
            </div>
        </Card>
    );
}
