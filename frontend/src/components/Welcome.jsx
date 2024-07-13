'use client';
import Link from "next/link";

export function Welcome() {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Cukka
        </h1>
        <p className="text-muted-foreground md:text-xl mt-4">
          Cukka is a revolutionary platform that empowers businesses to thrive in the digital age. Discover how we
          can help you transform your operations and unlock new opportunities.
        </p>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-6"
          prefetch={false}>
          Explore Cukka
        </Link>
      </div>
    </section>
  );
}

export default Welcome;
