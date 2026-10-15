import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "md" | "lg";
  target?: string;
  rel?: string;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 cursor-pointer active:translate-y-px focus-visible:outline-3 focus-visible:outline-primary focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed text-center";

  const sizeClasses = {
    md: "min-h-[48px] px-6 text-base",
    lg: "min-h-[54px] px-8 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-95 active:brightness-90 shadow-sm",
    secondary:
      "border-2 border-primary text-primary bg-transparent hover:bg-surface active:bg-surface/80",
    ghost:
      "text-primary bg-transparent hover:underline px-4 min-h-[44px]",
    dark:
      "bg-foreground text-background hover:opacity-90 active:opacity-85 shadow-sm",
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? props.target || "_blank" : props.target}
        rel={isExternal ? props.rel || "noopener noreferrer" : props.rel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
