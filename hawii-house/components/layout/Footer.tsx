import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NAV_ITEMS, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = 2026;
  const siteName = settings?.siteName || SITE_NAME;
  const tagline = settings?.tagline || SITE_TAGLINE;
  const contactEmail = settings?.contactEmail || "support@hawiihouse.org";
  const contactPhone = settings?.contactPhone || "+1 (555) 234-5678";
  const address = settings?.address || "124 Haven Lane, Hope Valley";
  const footerNote =
    settings?.footerNote ||
    "Hawii House is an independent non-profit support organization registered in service of community care.";

  return (
    <footer className="w-full bg-surface border-t border-border mt-auto transition-colors">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: About & Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-foreground">
              {siteName}
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              {tagline}
            </p>
            <div className="pt-2 text-sm text-foreground space-y-1">
              <p>{address}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-primary hover:underline underline-offset-2"
                >
                  {contactEmail}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${contactPhone}`}
                  className="text-primary hover:underline underline-offset-2"
                >
                  {contactPhone}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-foreground">
              Quick Links
            </h2>
            <nav className="flex flex-col space-y-2.5" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted hover:text-primary transition-colors text-sm w-fit"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about#contact"
                className="text-primary font-semibold hover:underline text-sm w-fit pt-1"
              >
                Get Support Today &rarr;
              </Link>
            </nav>
          </div>

          {/* Column 3: Social & Mission Note */}
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-foreground">
              Community & Social
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {footerNote}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                settings.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {social.platform}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
