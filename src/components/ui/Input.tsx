import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5 text-left">
                {label && (
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-xs font-medium text-red-500 ml-1 italic">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
