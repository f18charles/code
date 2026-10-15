import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/lib/sanity/fetch";
import { faqItemsQuery } from "@/lib/sanity/queries";
import { FaqItem } from "@/lib/types";
import { mockFaqs } from "@/lib/mock";
import { groupBy } from "@/lib/utils";
import { MessageCircleQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about housing assistance, eligibility, community meals, and volunteer opportunities at Hawii House.",
};

export default async function FaqPage() {
  const sanityFaqs = await sanityFetch<FaqItem[]>({
    query: faqItemsQuery,
    tags: ["faqItem"],
  });

  const faqs = sanityFaqs && sanityFaqs.length > 0 ? sanityFaqs : mockFaqs;
  const groupedFaqs = groupBy(faqs, (f) => f.category || "General Inquiries");

  // Build FAQPage schema for JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof faq.answer === "string"
            ? faq.answer
            : "Please contact Hawii House for further details.",
      },
    })),
  };

  return (
    <div>
      <JsonLd data={faqSchema} />

      <PageHeader
        eyebrow="Help & Information"
        title="Frequently Asked Questions"
        intro="Find clear answers to questions regarding our admissions process, temporary shelter, daily meal services, and volunteering."
      />

      <section className="py-16 md:py-24 bg-background">
        <Container narrow>
          {/* FAQ Accordions Grouped by Category */}
          <div className="space-y-12">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground border-b border-border pb-2">
                  {category}
                </h2>
                <div className="space-y-3 pt-2">
                  {items.map((item, idx) => (
                    <AccordionItem
                      key={item._id}
                      question={item.question}
                      defaultOpen={idx === 0 && category === "Getting Help"}
                    >
                      <p className="text-foreground/90">
                        {typeof item.answer === "string"
                          ? item.answer
                          : "Please contact our staff directly for more specifics."}
                      </p>
                    </AccordionItem>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 p-8 md:p-10 rounded-2xl bg-surface border border-border text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-foreground mx-auto mb-4">
              <MessageCircleQuestion className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
              Still have a question?
            </h3>
            <p className="text-base text-muted max-w-md mx-auto mb-6 leading-relaxed">
              Our compassionate intake staff is available every day. We’re here to listen, answer your inquiries, and guide you with respect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/about#contact" variant="primary" size="md">
                Contact Our Team
              </Button>
              <Button href="tel:+15553498201" variant="secondary" size="md">
                Call +1 (555) 349-8201
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
