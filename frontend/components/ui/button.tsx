import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "gradient"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-br from-[#CADCFC] to-[#A0B9D1] text-[#0a0c12] hover:opacity-90": variant === "default" || variant === "gradient",
            "border border-[--border] bg-transparent hover:bg-white/5": variant === "outline",
            "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
            "h-9 px-3 text-sm": size === "default",
            "h-8 px-2 text-sm": size === "sm",
            "h-12 px-6 text-base": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

