import { Container } from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container className="py-16 text-center">
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
        Hawii House
      </h1>
      <p className="text-lg text-muted max-w-prose mx-auto">
        Warmth, dignity, and supportive community care. Foundation phase loaded.
      </p>
    </Container>
  );
}
