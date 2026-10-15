import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PortableText } from "@/components/content/PortableText";
import { mockAboutPage, mockSiteSettings } from "@/lib/mock";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the mission, values, history, and dedicated team behind Hawii House support organization.",
};

export default function AboutPage() {
  const about = mockAboutPage;
  const settings = mockSiteSettings;

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        eyebrow="Our Story & Mission"
        title="Dignity, Care, and Lasting Recovery"
        intro={about.intro}
      />

      {/* Story & Body in narrow prose container */}
      <section className="py-16 md:py-20 bg-background">
        <Container narrow>
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-xs mb-10">
            <Image
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80"
              alt="Hawii House community gathering in our common hall"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>

          <PortableText value={about.body} />
        </Container>
      </section>

      {/* Values Grid */}
      <Section
        tone="surface"
        eyebrow="Our Guiding Principles"
        title="Values That Anchor Our Work"
        intro="Every program, policy, and conversation at Hawii House is shaped by these core commitments."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {about.values.map((val, idx) => (
            <Card key={idx} tone="background" className="h-full">
              <CardContent className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-foreground font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {val.title}
                </h3>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {val.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Grid */}
      {about.team && about.team.length > 0 && (
        <Section
          tone="default"
          eyebrow="Leadership & Staff"
          title="Meet the Team Behind the Care"
          intro="Passionate social workers, advocates, and program coordinators dedicated to community wellbeing."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.team.map((member, idx) => (
              <Card key={idx} tone="surface" className="h-full text-center">
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm">
                    <Image
                      src={member.photo?.url || ""}
                      alt={member.photo?.alt || member.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary">
                      {member.role}
                    </p>
                  </div>
                  {member.bio && (
                    <p className="text-xs md:text-sm text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Contact Block */}
      <section id="contact" className="py-16 md:py-24 bg-surface border-t border-border">
        <Container narrow>
          <div className="bg-background rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-foreground mx-auto mb-4">
              <Heart className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              Reach Out & Connect
            </h2>
            <p className="text-base text-muted max-w-md mx-auto mb-8">
              Whether you need urgent emergency advice, information regarding our temporary rooms, or wish to support our mission, our doors are open.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brown">Visit Us</h3>
                  <p className="text-sm text-foreground mt-1">{settings.address}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brown">Email</h3>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-sm text-primary hover:underline mt-1 block"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brown">Call Us</h3>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-sm text-primary hover:underline mt-1 block"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            <Button href={`mailto:${settings.contactEmail}`} variant="primary" size="lg">
              Send an Email Directly
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
