import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    loading?: boolean
}

const MotionButton = motion.button;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg",
            secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
            outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
            ghost: "hover:bg-slate-100 text-slate-600",
            gradient: "bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:shadow-xl hover:scale-[1.02]",
        }

        const sizes = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-6 py-3 text-sm font-semibold",
            lg: "px-8 py-4 text-base font-bold",
            icon: "p-2",
        }

        return (
            <MotionButton
                whileTap={{ scale: 0.95 }}
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant as keyof typeof variants],
                    sizes[size as keyof typeof sizes],
                    className
                )}
                disabled={loading}
                {...(props as any)}
            >
                {loading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : null}
                {children}
            </MotionButton>
        )
    }
)

Button.displayName = "Button"

export { Button }
