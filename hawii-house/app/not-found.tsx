import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 md:py-36 text-center">
      <Container narrow>
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown bg-surface px-3 py-1 rounded-full border border-border">
          404 &bull; Page Not Found
        </span>
        <h1 className="mt-6 text-3xl md:text-5xl font-serif font-bold text-foreground">
          We couldn’t find that page
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted max-w-md mx-auto leading-relaxed">
          The link you followed may have changed, or the page may have been moved. Let us help you get back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return Home
          </Button>
          <Button href="/gallery" variant="secondary" size="md">
            Explore Gallery
          </Button>
          <Button href="/blog" variant="ghost" size="md">
            Read Stories
          </Button>
        </div>
      </Container>
    </div>
  );
}
