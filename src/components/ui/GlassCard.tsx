import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, scale: 1.01 } : {}}
            className={cn(
                "relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl dark:bg-slate-900/40 dark:border-slate-800/50",
                className
            )}
        >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    )
}
