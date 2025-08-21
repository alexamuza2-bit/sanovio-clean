import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "solid" };
export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = "", variant = "solid", ...props }, ref) => (
    <button
      ref={ref}
      className={
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition " +
        (variant === "outline"
          ? "border rounded-2xl bg-white hover:bg-slate-50 " + className
          : "rounded-2xl text-white " + className)
      }
      {...props}
    />
  )
);
Button.displayName = "Button";
export default Button;
