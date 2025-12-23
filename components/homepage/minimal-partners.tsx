"use client";

import Image from "next/image";
import { useBranding } from "@/lib/context/branding-context";

interface Logo {
  id: string;
  name: string | null;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
}

interface MinimalPartnersProps {
  logos: Logo[];
}

export function MinimalPartners({ logos }: MinimalPartnersProps) {
  const { branding } = useBranding();

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
      {/* Tropical Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="partner-weave" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0,60 L30,0 L60,60 L90,0 L120,60" stroke={branding.colors.primary} strokeWidth="2" fill="none" />
              <path d="M0,60 L30,120 L60,60 L90,120 L120,60" stroke={branding.colors.accent} strokeWidth="2" fill="none" />
              <circle cx="60" cy="60" r="4" fill={branding.colors.primary} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#partner-weave)" />
        </svg>
      </div>

      {/* Decorative Accent Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-5 animate-float-slow"
           style={{ backgroundColor: branding.colors.accent }} />
      <div className="absolute bottom-20 right-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-5 animate-float-reverse"
           style={{ backgroundColor: branding.colors.primary }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Bold Typography */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block">
            {/* Decorative Line */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="h-px w-12 sm:w-16 md:w-20" style={{ backgroundColor: branding.colors.accent }} />
              <p
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
                style={{
                  color: branding.colors.accent,
                  fontFamily: '"Bebas Neue", "Arial Black", sans-serif'
                }}
              >
                In Partnership With
              </p>
              <div className="h-px w-12 sm:w-16 md:w-20" style={{ backgroundColor: branding.colors.accent }} />
            </div>

            {/* Main Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
              style={{
                fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                color: branding.colors.textPrimary
              }}
            >
              Our Partners & Affiliates
            </h2>

            {/* Accent Underline */}
            <div className="mt-3 sm:mt-4 flex justify-center gap-2">
              <div className="h-1 w-16 sm:w-20 rounded-full" style={{ backgroundColor: branding.colors.primary }} />
              <div className="h-1 w-8 sm:w-12 rounded-full" style={{ backgroundColor: branding.colors.accent }} />
            </div>
          </div>
        </div>

        {/* Diagonal Showcase Grid */}
        <div className="relative max-w-7xl mx-auto">
          {/* Logos Grid - Centered Layout */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {logos.map((logo, index) => (
              <div
                key={logo.id}
                className="group perspective-1000 w-32 sm:w-40 md:w-48 lg:w-56"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'partnerFadeIn 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {logo.link_url ? (
                  <a
                    href={logo.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <LogoCard logo={logo} branding={branding} />
                  </a>
                ) : (
                  <div>
                    <LogoCard logo={logo} branding={branding} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Animations & Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

        @keyframes partnerFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          66% {
            transform: translate(-15px, 15px) rotate(-5deg);
          }
        }

        @keyframes float-reverse {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-25px, 20px) rotate(-7deg);
          }
          66% {
            transform: translate(20px, -15px) rotate(7deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}

// Logo Card Component with Advanced Hover Effects
function LogoCard({
  logo,
  branding,
}: {
  logo: Logo;
  branding: {
    colors: {
      primary: string;
      accent: string;
    };
  };
}) {
  return (
    <div className="relative aspect-square w-full">
      {/* Decorative Border Frame */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.accent}15)`,
          boxShadow: `0 0 0 1px ${branding.colors.accent}30`
        }}
      />

      {/* Rotating Corner Accent - Top Left */}
      <div
        className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:rotate-90"
        style={{
          borderTop: `3px solid ${branding.colors.accent}`,
          borderLeft: `3px solid ${branding.colors.accent}`,
        }}
      />

      {/* Rotating Corner Accent - Bottom Right */}
      <div
        className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-0 group-hover:-rotate-90"
        style={{
          borderBottom: `3px solid ${branding.colors.primary}`,
          borderRight: `3px solid ${branding.colors.primary}`,
        }}
      />

      {/* Main Logo Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2">
        {/* Shimmer Effect on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${branding.colors.accent}15, transparent)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite'
          }}
        />

        {/* Logo Image */}
        <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center">
          <div className="relative w-full h-full transition-all duration-500 grayscale-[0.3] group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transform group-hover:scale-110">
            {logo.image_url && (
              <Image
                src={logo.image_url}
                alt={logo.name || "Partner logo"}
                fill
                className="object-contain"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{
            background: `linear-gradient(90deg, ${branding.colors.primary}, ${branding.colors.accent})`
          }}
        />
      </div>

      {/* Logo Name Tooltip on Hover */}
      {logo.name && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg"
            style={{
              backgroundColor: branding.colors.primary,
              color: 'white',
              fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
              letterSpacing: '0.05em'
            }}
          >
            {logo.name}
          </div>
        </div>
      )}
    </div>
  );
}
