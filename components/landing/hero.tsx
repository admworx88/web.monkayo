import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold">
              Logo
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm hover:text-primary">
                Services
              </Link>
              <Link href="#" className="text-sm hover:text-primary">
                How it works
              </Link>
              <Link href="#" className="text-sm hover:text-primary">
                Testimonials
              </Link>
              <Link href="#" className="text-sm hover:text-primary">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:text-primary">
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full border bg-secondary text-sm">
            <span className="text-primary font-semibold">NEW</span>
            <span className="mx-2">•</span>
            <span>1000+ active users</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Transform Your Content{' '}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Management
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful SaaS platform that helps teams collaborate, create, and manage content efficiently.
            Built for modern teams who value speed and simplicity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Trusted by teams at leading companies worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
