"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName = SITE_NAME }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border h-16 lg:h-[72px] transition-colors">
      <Container className="h-full flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-xl lg:text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors focus-visible:outline-3 focus-visible:outline-primary py-2"
          aria-label={`${siteName} homepage`}
        >
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-8"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-semibold py-2 transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary underline decoration-2 underline-offset-8"
                    : "text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Button href="/about#contact" variant="primary" size="md">
              Get Help
            </Button>
          </div>
          <MobileNav siteName={siteName} />
        </div>
      </Container>
    </header>
  );
}
