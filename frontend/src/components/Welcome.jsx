'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import '../animation.css';
import logo from '../../public/images/logo.svg'; // Adjust the path to your SVG file

export function Welcome() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-1 md:gap-12 items-center">
          <div className="space-y-4 animate-fade-in">
            {/* Replace the string with the SVG image */}
            <Image src={logo} alt="Cukka Logo" width={300} height={100} className="animate-fade-in-up" />
            <p className="text-gray-900 text-muted-foreground md:text-xl animate-fade-in-up delay-100">
            send money to social platform members. one click, no need for address.
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
