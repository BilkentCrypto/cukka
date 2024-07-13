'use client';
import Link from 'next/link';

export function Welcome() {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-1 md:gap-12 items-center">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-fade-in-up">
              Welcome to Cukka
            </h1>
            <p className="text-muted-foreground md:text-xl animate-fade-in-up delay-100">
              Cukka is a revolutionary platform that empowers businesses to thrive in the digital age. Discover how we
              can help you transform your operations and unlock new opportunities.
            </p>
            <Link
              href="#about-us"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 animate-fade-in-up delay-200"
            >
              Explore Cukka
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
