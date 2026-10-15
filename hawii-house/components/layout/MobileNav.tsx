"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/site";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  siteName: string;
}

export function MobileNav({ siteName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Esc key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center p-2 rounded-xl text-foreground hover:bg-surface focus-visible:outline-3 focus-visible:outline-primary min-w-[44px] min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-50 bg-background/95 backdrop-blur-md border-b border-border p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-medium py-3 px-4 rounded-xl transition-colors min-h-[44px] flex items-center ${
                    isActive
                      ? "text-primary font-bold bg-surface underline decoration-2 underline-offset-4"
                      : "text-foreground hover:bg-surface"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border flex flex-col gap-4">
            <Button
              href="/about#contact"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Get Help
            </Button>
            <p className="text-center text-sm text-muted">
              {siteName} &bull; Supportive NGO
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
