import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  tone?: "surface" | "background";
  className?: string;
  children: React.ReactNode;
}

export function Card({
  href,
  tone = "surface",
  className,
  children,
  ...props
}: CardProps) {
  const toneClasses = {
    surface: "bg-surface",
    background: "bg-background",
  };

  const baseClasses = cn(
    "group block relative rounded-2xl border border-border overflow-hidden transition-all duration-200",
    toneClasses[tone],
    href && "hover:border-primary/40 cursor-pointer shadow-sm hover:shadow-md",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 md:p-6", className)} {...props}>
      {children}
    </div>
  );
}
