"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  return (
    <details
      className={cn(
        "group rounded-xl bg-surface border border-border p-5 transition-colors duration-150 mb-2 last:mb-0",
        className
      )}
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between cursor-pointer list-none min-h-[48px] text-foreground select-none focus-visible:outline-3 focus-visible:outline-primary rounded-lg">
        <span className="font-serif text-lg md:text-xl font-semibold pr-4 text-left">
          {question}
        </span>
        <ChevronDown className="w-5 h-5 text-brown shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="pt-4 text-base md:text-lg text-foreground/90 leading-relaxed border-t border-border/40 mt-3 animate-in fade-in duration-200">
        {children}
      </div>
    </details>
  );
}
