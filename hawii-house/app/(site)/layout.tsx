import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { sanityFetch } from "@/lib/sanity/fetch";
import { settingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/types";
import { mockSiteSettings } from "@/lib/mock";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sanitySettings = await sanityFetch<SiteSettings>({
    query: settingsQuery,
    tags: ["siteSettings"],
  });

  const settings = sanitySettings || mockSiteSettings;

  return (
    <>
      <SkipLink />
      <Header siteName={settings.siteName} />
      <main id="main" className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
